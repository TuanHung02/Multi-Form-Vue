<template>
  <div class="form-container" v-for="(formItem) in formList" :key="formItem.id">
    <!-- Vị trí từng làm -->
    <div class="form-input-company">
      <div class="input">

        <input type="text" v-model="formItem.company" :class="{ 'error-border': errors[formItem.id]?.company }" required
          placeholder="Nhập tên công ty" @blur="validateForm(formItem)" />
        <span v-if="errors[formItem.id]?.company" class="error-text"> {{ errors[formItem.id].company }}</span>
      </div>
    </div>
  </div>


  <div class="add-company" @click="addCompany">
    Thêm công ty</div>
  <div class="btn" :disabled="!isFormValid" @click="isFormValid && emitData" :class="{ 'btn-active': isFormValid }">
    Tiếp</div>

</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['save-data']);

interface FormItem {
  id: number;
  company: string;
  errors: {
    company?: string;
  };
}

const formList = ref<FormItem[]>([{ id: 1, company: '', errors: {} }]);

onMounted(() => {
  const savedData = localStorage.getItem('experiencesFormData');
  if (savedData) {
    formList.value = JSON.parse(savedData);
  }
});

// Thêm hàm validate
const errors = ref<{ [key: number]: { company?: string; } }>({});

const validateForm = (formItem: FormItem) => {
  const formErrors: { company?: string; prevPosition?: string; startAt?: string; endAt?: string; jd?: string } = {};
  let isValid = true;

  // Kiểm tra từng trường
  if (!formItem.company || formItem.company.length > 100) {
    formErrors.company = 'Tên công ty là bắt buộc và không quá 100 kí tự';
    isValid = false;
  }

  // Ghi nhận lỗi cho formItem hiện tại
  errors.value[formItem.id] = formErrors;

  return isValid;
};


const addCompany = () => {
  const newId = formList.value.length + 1;
  formList.value.push({
    id: newId,
    company: '',
    errors: {}
  });
};


const isFormValid = computed(() => {
  return formList.value.every((formItem) => validateForm(formItem));
});


const emitData = () => {
  let isAllValid = true;

  formList.value.forEach((formItem) => {
    const isValid = validateForm(formItem);
    if (!isValid) {
      isAllValid = false;
    }
  });

  if (!isAllValid) return;

  // Save data to localStorage
  const savedData = localStorage.getItem('experiencesFormData');
  const parsedData: FormItem[] = savedData ? JSON.parse(savedData) : [];

  formList.value.forEach((formItem) => {
    const existingItem = parsedData.find((item: FormItem) => item.id === formItem.id);
    if (existingItem) {
      Object.assign(existingItem, formItem);
    } else {
      parsedData.push(formItem);
    }
  });

  localStorage.setItem('experiencesFormData', JSON.stringify(parsedData));

  emit('save-data', formList.value, true);
  router.push('/confirm');
};
</script>
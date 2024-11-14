<template>
  <div class="date-picker-wrapper">
    <div class="date-picker-container">
      <!-- DatePicker với icon và placeholder -->
      <Datepicker style="width: 0px;" v-model="selectedDate" :format="format" placeholder="0000/00/00"
        input-class="custom-input" ref="datepickerRef" />

    </div>
    <div>Ngày đã chọn: {{ formattedDate }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Datepicker from 'vue3-datepicker';

const selectedDate = ref<Date | undefined>(undefined);
const format = 'YYYY/MM/DD';

// Ref cho Datepicker
const datepickerRef = ref<HTMLElement | null>(null);
const formattedDate = computed(() => {
  if (!selectedDate.value) return '0000/00/00';

  // Tạo đối tượng Date và định dạng lại ngày thành YYYY/MM/DD
  const year = selectedDate.value.getFullYear();
  const month = String(selectedDate.value.getMonth() + 1).padStart(2, '0'); // Thêm '0' nếu tháng nhỏ hơn 10
  const day = String(selectedDate.value.getDate()).padStart(2, '0'); // Thêm '0' nếu ngày nhỏ hơn 10

  return `${year}/${month}/${day}`;
});

// Hàm mở dropdown khi click vào icon

</script>

<style scoped>
.date-picker-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.date-picker-container {
  display: flex;
  align-items: center;
  position: relative;
}

.custom-input {
  width: 150px;
  padding: 5px;
  font-size: 14px;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}

.calendar-icon {
  font-size: 20px;
}
</style>

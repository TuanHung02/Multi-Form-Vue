<template>
    <div class="form-container">
        <div class="form-group">
            <div class="title">
                <p>Must</p>
                <label>Họ và tên</label>
            </div>
            <input id="name" class="input-info" v-model="form.name" :class="{ 'error-border': errors.name }"
                placeholder="Nhập họ và tên" />
            <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>

        <div class="form-group">
            <div class="title">
                <p>Must</p>
                <label>Ngày sinh</label>
            </div>
            <input type="date" id="dob" class="input-info" v-model="form.dob" :class="{ 'error-border': errors.dob }" />
            <span v-if="errors.dob" class="error-text">{{ errors.dob }}</span>
        </div>

        <div class="form-group">
            <div class="title">
                <label for="city">Thành Phố</label>
            </div>
            <select class="input-info" id="city" v-model="form.city">
                <option value="" disabled>Chọn thành phố</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Hà Nội">Cần thơ</option>
                <option value="Hồ Chí Minh">Nha Trang</option>
            </select>
        </div>

        <div class="form-group">
            <div class="title">
                <p>Must</p>
                <label>Vị trí làm việc</label>
            </div>
            <input id="position" class="input-info" v-model="form.position" :class="{ 'error-border': errors.position }"
                placeholder="Nhập vị trí bạn muốn làm việc" />
            <span v-if="errors.position" class="error-text">{{ errors.position }}</span>
        </div>

        <div class="form-group">
            <div class="title">
                <label for="description">Mô tả bản thân</label>
            </div>
            <textarea id="description" v-model="form.description" maxlength="1000" placeholder="Mô tả về bản thân"
                :class="{ 'error-border': errors.description }"></textarea>
            <div>{{ form.description.length }}/1000</div>
            <span v-if="errors.description" class="error-text">{{ errors.description }}</span>
        </div>
    </div>
    <div class="btn" :class="{ 'btn-active': isFormValid() }" :disabled="!isFormValid()" @click="validateForm">Tiếp
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const emit = defineEmits(['save-data']);

const form = ref({
    name: '',
    dob: '',
    city: '',
    position: '',
    description: '',
});

const errors = ref({
    name: '',
    dob: '',
    city: '',
    position: '',
    description: '',
});

onMounted(() => {
    const savedForm = localStorage.getItem('profileFormData');
    if (savedForm) {
        form.value = JSON.parse(savedForm);
    }
});

const validateForm = () => {
    let isValid = true;

    if (!form.value.name) {
        errors.value.name = 'Họ và tên không được để trống.';
        isValid = false;
    } else if (form.value.name.length > 100) {
        errors.value.name = 'Họ và tên không được dài quá 100 ký tự.';
        isValid = false;
    } else {
        errors.value.name = '';
    }

    if (!form.value.dob) {
        errors.value.dob = 'Ngày sinh không được để trống.';
        isValid = false;
    } else {
        errors.value.dob = '';
    }

    if (!form.value.position) {
        errors.value.position = 'Vị trí làm việc không được để trống.';
        isValid = false;
    } else if (form.value.position.length > 100) {
        errors.value.position = 'Vị trí làm việc không được dài quá 100 ký tự.';
        isValid = false;
    } else {
        errors.value.position = '';
    }

    if (form.value.description.length > 1000) {
        errors.value.description = 'Mô tả không được dài quá 1000 ký tự.';
        isValid = false;
    } else {
        errors.value.description = '';
    }

    if (isValid) {
        emitData();
    }
};

const isFormValid = () => {
    return form.value.name.length > 0 &&
        form.value.dob.length > 0 &&
        form.value.position.length > 0 &&
        !errors.value.name &&
        !errors.value.dob &&
        !errors.value.position
};

const emitData = () => {
    localStorage.setItem('profileFormData', JSON.stringify(form.value));
    emit('save-data', form.value);
    router.push('/experience');
};
</script>

<style scoped>
.form-container {
    margin: 0 auto 24px auto;
    border: 1px solid rgba(220, 220, 220, 1);
    padding: 24px;
    border-radius: 4px;

}

.error-text {
    color: rgba(237, 93, 93, 1);
    font-size: 12px;
    margin-top: 5px;
    display: block;
}

.error-border {
    border: 1px solid rgba(237, 93, 93, 1) !important;
}


.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 10px 8px;
    box-sizing: border-box;
    min-width: 102px;
    height: 40px;
    gap: 0px;
    border: none;
    background-color: #dcdcdc;
    border-radius: 3px;
    opacity: 0px;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
}

.btn-active {
    background-color: rgba(98, 125, 152, 1);
    color: rgba(255, 255, 255, 1);
}



.form-group {
    margin-bottom: 24px;
    width: 528px;

    .input-info {
        height: 40px;
        border-radius: 4px;
    }

    #dob {
        width: 118px;
    }

    .title {
        display: flex;
        gap: 8px;
        margin-bottom: 6px;
    }

    p {
        font-size: 12px;
        font-weight: 700;
        line-height: 20px;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(98, 125, 152, 1);
        padding: 0 8px;
        margin: 0 !important;
        border-radius: 3px;
        width: 29px;
    }

    label {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        text-align: left;
        color: rgba(51, 51, 51, 1);
    }
}


.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid rgba(220, 220, 220, 1);
    outline: none;
}

.form-group textarea {
    height: 152px;
    overflow-x: hidden;
}

.avatar-preview {
    max-width: 150px;
    display: block;
    margin-top: 10px;
}

.steps {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.step {
    flex: 1;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 5px;
}

.step.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}
</style>
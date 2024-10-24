<template>
    <div class="form-container" v-for="(formItem) in formList" :key="formItem.id">
        <!-- Vị trí từng làm -->
        <div class="form-input-company">
            <div class="input">

                <input type="text" v-model="formItem.company" :class="{ 'error-border': errors[formItem.id]?.company }"
                    required placeholder="Nhập tên công ty" @blur="validateForm(formItem)" />
                <span v-if="errors[formItem.id]?.company" class="error-text"> {{ errors[formItem.id].company }}</span>
            </div>
            <!-- SVG trash icon để xóa -->
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                @click="removeCompany(formItem.id)" style="cursor: pointer;">
                <path d="M26.9995 7L4.99951 7.00001" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13 13V21" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19 13V21" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7"
                    stroke="#333333" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M21 7V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H13C12.4696 3 11.9609 3.21071 11.5858 3.58579C11.2107 3.96086 11 4.46957 11 5V7"
                    stroke="#333333" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        <div class="form-group">
            <div class="title">
                <p>Must</p>
                <label for="name">Vị trí từng làm</label>
            </div>
            <input class="input-info" type="text" v-model="formItem.prevPosition"
                :class="{ 'error-border': errors[formItem.id]?.prevPosition }" required
                placeholder="Nhập vị trí từng làm" @blur="validateForm(formItem)" />
            <span v-if="errors[formItem.id]?.prevPosition" class="error-text"> {{ errors[formItem.id].prevPosition
                }}</span>

        </div>

        <!-- Thời gian làm việc -->
        <div class="form-group">
            <div class="title">
                <p>Must</p>
                <label for="name">Thời gian làm việc</label>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <div class="custom-date-input">
                    <input style="width: 118px;" class="input-info" type="date" v-model="formItem.startAt"
                        :class="{ 'error-border': errors[formItem.id]?.startAt }" required
                        @blur="validateForm(formItem)" />
                    <div class="icon-calendar">
                        <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M17 3H18.5C19.8807 3 21 4.11929 21 5.5V18.5074C21 19.8881 19.8807 21.0074 18.5 21.0074H5.5C4.11929 21.0074 3 19.8881 3 18.5074V5.5C3 4.11929 4.11929 3 5.5 3H7V2.5C7 2.22386 7.22386 2 7.5 2C7.77614 2 8 2.22386 8 2.5V3H16V2.5C16 2.22386 16.2239 2 16.5 2C16.7761 2 17 2.22386 17 2.5V3ZM16 4H8V4.5C8 4.77614 7.77614 5 7.5 5C7.22386 5 7 4.77614 7 4.5V4H5.5C4.67157 4 4 4.67157 4 5.5V8H20V5.5C20 4.67157 19.3284 4 18.5 4H17V4.5C17 4.77614 16.7761 5 16.5 5C16.2239 5 16 4.77614 16 4.5V4ZM4 9H20V18.5074C20 19.3358 19.3284 20.0074 18.5 20.0074H5.5C4.67157 20.0074 4 19.3358 4 18.5074V9Z"
                                fill="#999999" />
                        </svg> -->
                    </div>

                    <span style="width: 118px;" v-if="errors[formItem.id]?.startAt" class="error-text"> {{
                        errors[formItem.id].startAt
                    }}</span>
                </div>

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 8H13.5" stroke="#BFBFBF" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="custom-date-input">
                    <input style="width: 118px;" class="input-info" type="date" v-model="formItem.endAt"
                        :class="{ 'error-border': errors[formItem.id]?.endAt }" required
                        @blur="validateForm(formItem)" />
                    <div class="icon-calendar">
                    </div>


                    <span style="width: 118px;" v-if="errors[formItem.id]?.endAt" class="error-text"> {{
                        errors[formItem.id].endAt }}</span>
                </div>

            </div>
        </div>

        <!-- Mô tả về công việc -->
        <div class="form-group">
            <div class="title">
                <label for="name">Mô tả về công việc</label>
            </div>
            <textarea v-model="formItem.jd" maxlength="1000" placeholder="Mô tả về công việc"
                @blur="validateForm(formItem)" :class="{ 'error-border': errors[formItem.id]?.jd }"></textarea>
            <span v-if="errors[formItem.id]?.jd" class="error-text"> {{ errors[formItem.id].company }}</span>

            <div>{{ formItem.jd ? formItem.jd.length : 0 }}/1000</div>

        </div>
    </div>


    <div class="add-company" @click="addCompany"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 12H20.25" stroke="#48647F" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 3.75V20.25" stroke="#48647F" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Thêm công ty</div>
    <div class="btn" :disabled="!isFormValid || isFormEmpty" @click="emitData"
        :class="{ 'btn-active': isFormValid && !isFormEmpty }">Tiếp</div>


</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['save-data']);

interface FormItem {
    id: number;
    company: string;
    prevPosition: string;
    startAt: string;
    endAt: string;
    jd: string;
    errors: {
        company?: string;
        prevPosition?: string;
        startAt?: string;
        endAt?: string;
        jd?: string;
    };
}

const formList = ref<FormItem[]>([{ id: 1, company: '', prevPosition: '', startAt: '', endAt: '', jd: '', errors: {} }]);

onMounted(() => {
    const savedData = localStorage.getItem('experiencesFormData');
    if (savedData) {
        formList.value = JSON.parse(savedData);
    }
});

const isSubmitAttempted = ref(false);

const errors = ref<{ [key: number]: { company?: string; prevPosition?: string; startAt?: string; endAt?: string; jd?: string } }>({});

const validateDateRange = (formItem: FormItem) => {
    const formErrors: { startAt?: string; endAt?: string } = {};
    let isValid = true;

    formList.value.forEach((item) => {
        if (item.id !== formItem.id) {
            // Kiểm tra trùng lặp thời gian
            const startA = new Date(formItem.startAt).getTime();
            const endA = new Date(formItem.endAt).getTime();
            const startB = new Date(item.startAt).getTime();
            const endB = new Date(item.endAt).getTime();

            if ((startA >= startB && startA <= endB) || (endA >= startB && endA <= endB)) {
                formErrors.startAt = 'Khoảng thời gian làm việc trùng với công ty khác';
                formErrors.endAt = 'Khoảng thời gian làm việc trùng với công ty khác';
                isValid = false;
            }
        }
    });

    return { formErrors, isValid };
};

const validateForm = (formItem: FormItem) => {
    if (!isSubmitAttempted.value) return true;

    const formErrors: { company?: string; prevPosition?: string; startAt?: string; endAt?: string; jd?: string } = {};
    let isValid = true;

    if (!formItem.company || formItem.company.length > 100) {
        formErrors.company = 'Tên công ty là bắt buộc và không quá 100 kí tự';
        isValid = false;
    }

    if (!formItem.prevPosition || formItem.prevPosition.length > 100) {
        formErrors.prevPosition = 'Vị trí từng làm là bắt buộc và không quá 100 kí tự';
        isValid = false;
    }

    if (!formItem.startAt) {
        formErrors.startAt = 'Ngày bắt đầu là bắt buộc';
        isValid = false;
    }

    if (!formItem.endAt) {
        formErrors.endAt = 'Ngày kết thúc là bắt buộc';
        isValid = false;
    }

    if (formItem.jd.length > 1000) {
        formErrors.jd = 'Mô tả công việc không được quá 1000 kí tự';
        isValid = false;
    }

    // Kiểm tra trùng lặp thời gian
    const { formErrors: dateErrors, isValid: isDateValid } = validateDateRange(formItem);
    Object.assign(formErrors, dateErrors);
    if (!isDateValid) isValid = false;

    errors.value[formItem.id] = formErrors;

    return isValid;
};


// Thêm công ty
const addCompany = () => {
    const newId = formList.value.length + 1;
    formList.value.push({
        id: newId,
        company: '',
        prevPosition: '',
        startAt: '',
        endAt: '',
        jd: '',
        errors: {}
    });
};

// Xóa công ty
const removeCompany = (id: number) => {
    const index = formList.value.findIndex((formItem) => formItem.id === id);
    if (index !== -1) {
        formList.value.splice(index, 1);
        localStorage.setItem('experiencesFormData', JSON.stringify(formList.value));
    }
};

const isFormValid = computed(() => {
    return formList.value.every((formItem) => validateForm(formItem));
});

const isFormEmpty = computed(() => {
    return formList.value.every((formItem) => {
        return !formItem.company || !formItem.prevPosition || !formItem.startAt || !formItem.endAt;
    });
});

const emitData = () => {
    isSubmitAttempted.value = true; // Đánh dấu rằng đã nhấn "Tiếp"

    let isAllValid = true;

    formList.value.forEach((formItem) => {
        const isValid = validateForm(formItem);
        if (!isValid) {
            isAllValid = false;
        }
    });

    if (!isAllValid) return;

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



<style scoped>
.form-container {
    margin: 0 auto 24px auto;
    border: 1px solid rgba(220, 220, 220, 1);
    padding: 24px;
    border-radius: 4px;

    input {
        outline: none;
    }
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

.add-company {
    display: flex;
    align-items: center;
    width: 151px;
    height: 40px;
    padding: 4px 8px 4px 8px;
    gap: 8px;
    border-radius: 3px;
    border: 1px solid rgba(220, 220, 220, 1);
    background: rgba(255, 255, 255, 1);
    color: rgba(72, 100, 127, 1);
    cursor: pointer;
    margin-bottom: 24px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;

}

.form-input-company {
    box-sizing: border-box;
    padding: 10px 16px 10px 16px;
    gap: 16px;
    border-radius: 4px;
    background: rgba(248, 248, 248, 1);
    margin-bottom: 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 16px;

    .input {

        width: 100%;
    }

    input {
        width: calc(100% - 20px);

        height: 40px;
        border-radius: 4px;
        border: 1px solid rgba(219, 219, 219, 1);
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
        color: rgba(51, 51, 51, 1);
        padding: 0 10px;
    }

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
        width: 125px;
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

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.custom-date-input {
    position: relative;
    display: inline-block;
}

.icon-calendar {
    position: absolute;
    right: 3px;
    top: 10px;
    /* Đảm bảo khi bấm vào không ảnh hưởng đến input */
}
</style>
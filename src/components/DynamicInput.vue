<template>
    <div :class="['form-group', { 'error-border': errorMessage }]">
        <div class="title">
            <p v-if="must">Must</p>
            <label v-if="Label">{{ Label }}</label>
        </div>
        <input class="input-info" :type="type" :style="{ width: width + 'px', height: height + 'px' }"
            :maxlength="maxLength" :required="must" v-model="inputValue" @blur="validateInput"
            :placeholder="placeHolder" />
        <!-- Hiển thị thông báo lỗi -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// Props
const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
    width: {
        type: Number,
        default: 200,
    },
    height: {
        type: Number,
        default: 40,
    },
    must: {
        type: Boolean,
        default: false,
    },
    maxLength: {
        type: Number,
        default: 255,
    },
    Label: {
        type: String,
        default: ''
    },
    placeHolder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    }
});

console.log(props.modelValue);
// Emit event
const emit = defineEmits(['update:modelValue']);

// Reactive variables
const inputValue = ref(props.modelValue);
const errorMessage = ref('');

// Method to validate input
const validateInput = () => {
    errorMessage.value = ''; // Reset error message

    // Kiểm tra `must`
    if (props.must && !inputValue.value) {
        errorMessage.value = 'This field is required.';
        return;
    }

    // Kiểm tra `maxLength`
    if (inputValue.value.length > props.maxLength) {
        errorMessage.value = `Max length is ${props.maxLength} characters.`;
    }
};

// Tự động kiểm tra lại khi người dùng gõ vào input
watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue); // Emit giá trị ra ngoài
    validateInput();
});
</script>

<style scoped>
.error-message {
    color: rgba(237, 93, 93, 1);
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    margin-top: 5px;
}

.error-border .input-info {
    border-color: rgba(237, 93, 93, 1);
}

.form-group {
    margin-bottom: 15px;
    width: 528px;
    margin-left: 15px;

    .input-info {
        border-radius: 4px;
        outline: none;
    }

    .title {
        display: flex;
        gap: 8px;
        margin-bottom: 6px;

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

}


.form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid rgba(220, 220, 220, 1);
}
</style>
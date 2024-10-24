<template>
    <div class="form-container">
        <div class="form-group">
            <div class="title">
                <p>Must</p>
                <label for="reason">Lý do muốn ứng tuyển vào công ty</label>
            </div>
            <textarea id="reason" v-model="form.reason" maxlength="1000" placeholder="Mô tả về bản thân"></textarea>
            <div>{{ form.reason.length }}/1000</div>
        </div>

        <div class="form-group">
            <div class="title">
                <p>Must</p>
                <label for="salary">Mức lương mong muốn</label>
            </div>
            <input class="input-info" type="text" id="salary" v-model="form.salary" required
                placeholder="Nhập mức lương mong muốn" />
        </div>
    </div>
    <div class="btn" @click="emitData">Hoàn thành</div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const emit = defineEmits(['save-data']);

const form = ref({
    reason: '',
    salary: '',
});

onMounted(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
        form.value = JSON.parse(savedData);
    }
});

const emitData = () => {
    localStorage.setItem('profileData', JSON.stringify(form.value));
    emit('save-data', form.value);
};
</script>


<style scoped>
.form-container {
    margin: 0 auto 24px auto;
    border: 1px solid rgba(220, 220, 220, 1);
    padding: 24px;
    border-radius: 4px;

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
    margin-bottom: 5px;
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
</style>
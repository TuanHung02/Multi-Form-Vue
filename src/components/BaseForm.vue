<template>
    <div class="container">
        <p class="title">Đơn ứng tuyển</p>
        <ul class="base-timeline">
            <!-- Bước 1 -->
            <RouterLink to="/"
                :class="['base-timeline__item', isActive('/') ? 'base-timeline__item--active' : '', isActive('/experience'), isActive('/confirm')]">
                <span class="base-timeline__summary-text">Thông tin cá nhân</span>
            </RouterLink>
            <!-- Bước 2 -->
            <RouterLink to="/experience"
                :class="['base-timeline__item', isActive('/experience') ? 'base-timeline__item--active' : '', isActive('/confirm')]">
                <span class="base-timeline__summary-text">Kinh nghiệm việc làm</span>
            </RouterLink>
            <!-- Bước 3 -->
            <RouterLink to="/confirm"
                :class="['base-timeline__item', isActive('/confirm') ? 'base-timeline__item--active' : '']">
                <span class="base-timeline__summary-text">Xác nhận thông tin</span>
            </RouterLink>
        </ul>
        <div class="content">
            <RouterView @save-data="saveData" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { ref } from 'vue';
const route = useRoute();

const isActive = (path: string) => {
    return route.path === path ? 'base-timeline__item--active' : '';
};

interface Experience {
    id: number;
    company: string;
    prevPosition: string;
    startAt: string;
    endAt: string;
    jd: string;
}

// Định nghĩa kiểu cho FormData
interface FormData {
    experiences: Experience[];
}

// Khởi tạo formData với kiểu đã xác định
const formData = ref<FormData>({ experiences: [] });

const saveData = (data: Experience[], isExperienceForm = false) => {
    if (isExperienceForm) {
        data.forEach((newExperience) => {
            const index = formData.value.experiences.findIndex(
                (exp) => exp.id === newExperience.id
            );
            if (index !== -1) {
                formData.value.experiences[index] = newExperience;
            } else {
                formData.value.experiences.push(newExperience);
            }
        });
    } else {
        // Nếu không phải, cập nhật dữ liệu khác (như ProfileForm)
        formData.value = { ...formData.value, ...data };
    }
    console.log('Dữ liệu hiện tại:', formData.value);
};

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap');

.non-clickable {
    pointer-events: none;
}

.container {
    margin: 0 auto;
    width: 100%;
    min-width: 618px;
    max-width: 926px;
    font-family: "Noto Sans JP", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
}

.btn {
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
    text-align: center;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
}


.title {
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;
    text-align: left;
    color: rgba(51, 51, 51, 1);
}

.content {
    margin-top: 76px;
}

ul,
li {
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
}

span::first-letter {
    text-transform: capitalize;
}

body {
    font-family: 'Roboto Condensed', serif;
}

.base-timeline {
    list-style-type: none;
    counter-reset: number;
    position: relative;
    display: block;
    z-index: 9999;
    width: 50%;
    margin-left: 37px;

    span {
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        text-align: center;
        color: rgba(51, 51, 51, 1);
    }
}

.base-timeline::before {
    content: '';
    width: 100%;
    border-top: 2px solid rgba(219, 219, 219, 1);
    display: inline-block;
    position: absolute;
    top: 50%;
    z-index: -1;
}

.base-timeline__item {
    position: relative;
    display: inline-block;
    width: calc(100% / 2 - 15px);
    /* change width */
    color: rgba(219, 219, 219, 1);
}

.base-timeline__item::before {
    display: flex;
    justify-content: center;
    align-items: center;
    counter-increment: number;
    /* number -1*/
    content: counter(number) '';
    border-radius: 50%;
    width: 32px;
    height: 32px;
    background-color: rgba(219, 219, 219, 1);
    color: white;
    font-weight: bold;
    transition: all 0.6s ease-in-out;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
}

/* hover element */
.base-timeline__item:hover::before {
    background-color: rgba(97, 125, 152, 1);
    width: 40px;
    height: 40px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
}

.base-timeline__item--active::before {
    background-color: rgba(97, 125, 152, 1);
    width: 40px;
    height: 40px;
    color: rgba(255, 255, 255, 1);
}

.base-timeline__item:last-child {
    width: 0;
}

.base-timeline__summary-text {
    position: absolute;
    width: 150px;
    top: 50px;
    left: -60px;
}
</style>

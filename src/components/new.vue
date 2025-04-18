<template>
    <Drawer display-mode="full" :enable-duration="true">
        <template #head>
            <h2>新建提醒事项</h2>
            <div class="actions">
                <button class="save">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="System / Save">
                            <path id="Vector"
                                d="M17 21.0002L7 21M17 21.0002L17.8031 21C18.921 21 19.48 21 19.9074 20.7822C20.2837 20.5905 20.5905 20.2843 20.7822 19.908C21 19.4806 21 18.921 21 17.8031V9.21955C21 8.77072 21 8.54521 20.9521 8.33105C20.9095 8.14 20.8393 7.95652 20.7432 7.78595C20.6366 7.59674 20.487 7.43055 20.1929 7.10378L17.4377 4.04241C17.0969 3.66374 16.9242 3.47181 16.7168 3.33398C16.5303 3.21 16.3242 3.11858 16.1073 3.06287C15.8625 3 15.5998 3 15.075 3H6.2002C5.08009 3 4.51962 3 4.0918 3.21799C3.71547 3.40973 3.40973 3.71547 3.21799 4.0918C3 4.51962 3 5.08009 3 6.2002V17.8002C3 18.9203 3 19.4796 3.21799 19.9074C3.40973 20.2837 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H7M17 21.0002V17.1969C17 16.079 17 15.5192 16.7822 15.0918C16.5905 14.7155 16.2837 14.4097 15.9074 14.218C15.4796 14 14.9203 14 13.8002 14H10.2002C9.08009 14 8.51962 14 8.0918 14.218C7.71547 14.4097 7.40973 14.7155 7.21799 15.0918C7 15.5196 7 16.0801 7 17.2002V21M15 7H9"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                    </svg>
                </button>
                <button class="delete">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M14 12V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>删除</p>
                </button>
            </div>
        </template>
        <template #container>
            <div class="container">
                <input type="text" placeholder="主要内容" class="content-main">
                <textarea class="content-secondary" placeholder="次要内容"></textarea>
                <hr>
                <h3>时间与日期</h3>
                <div class="option time">
                    <p class="name">时间</p>
                    <div class="action-button">
                        <datetime-selector type="time" v-if="is_display.time"></datetime-selector>
                        <Switch style="margin-left:10px;" @change="checked => is_display.time = checked"></Switch>
                    </div>
                </div>
                <div class="option date">
                    <p class="name">日期</p>
                    <div class="action-button">
                        <datetime-selector type="date" v-if="is_display.date"></datetime-selector>
                        <Switch style="margin-left:10px;" @change="checked => is_display.date = checked"></Switch>
                    </div>
                </div>
            </div>
        </template>
    </Drawer>
</template>
<script lang="ts" setup>
import { onUnmounted, reactive } from 'vue'
import Drawer from './drawer.vue'
import useNavStore from '@/store/nav'
import DatetimeSelector from './datetime-selector.vue'
import Switch from './switch.vue'
const navStore = useNavStore()

const is_display = reactive({
    time: false,
    date: false
})

navStore.hide()
onUnmounted(() => navStore.display())
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;

    h3 {
        margin: 15px 0;
    }

    .option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: none;
        background-color: #FFFCF5;
        border-radius: 16px;
        margin: 5px 0;
        resize: none;
        padding: 5px 20px;
        outline: none;
        box-shadow: 5px 6px 10px #8888881a;
        font-size: 13px;
        p.name{
            margin:8px 0;
        }
        .action-button {
            display: flex;
            align-items: center;
        }
    }

    .content-main,
    .content-secondary {
        border: none;
        background-color: #FFFCF5;
        border-radius: 16px;
        margin: 5px 0;
        resize: none;
        padding: 15px 20px;
        outline: none;
        box-shadow: 5px 6px 10px #8888881a;
        font-size: 13px;

        &::placeholder {
            color: #C7C7C7;
        }
    }

    hr {
        width: 100%;
        border: none;
        background-color: #655f4661;
        margin: 15px 0;
        height: 0.5px;
    }

    .content-secondary {
        height: 200px;
    }
}

.actions {
    display: flex;
    // align-items: center;
    justify-content: center;
    $size: 30px;

    button.save {
        display: flex;
        border: none;
        background-color: var(--theme-orange);
        color: white;
        width: $size;
        height: $size;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        box-shadow: 3px 3px 7px var(--theme-orange);
    }

    button.delete {
        display: flex;
        justify-content: center;
        align-items: center;
        height: $size;
        background-color: #FF8181;
        color: #FF0000;
        border: none;
        border-radius: 10000px;
        padding: 0px 10px;
        font-size: 12px;
        margin-left: 10px;
        box-shadow: 0px 2px 5px #FF8181;

        p {
            margin-left: 5px;
        }
    }

    button {
        transition: all 0.3s;
    }

    button:active {
        transform: scale(0.9);
    }
}
</style>
<template>
    <div class="format">
        <div class="slider" ref="slider">{{ formats[selected].title }}</div>
        <div class="item" ref="itemList" v-for="{ name, title }, index in formats"
            @click="selected = index; trigging(title)">
            <p>{{ title }}</p>
        </div>
        <div class="newlist">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g id="Edit / Add_Plus">
                        <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="currentColor" stroke-width="1"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                </g>
            </svg>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.format {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    margin: auto;
    width: 90%;
    display: flex;
    background-color: #FFFFFF;
    border-radius: 20px;
    box-shadow: 2px 4px 10px #95959527;
    .newlist{
        position: absolute;
        right:0;
        margin:auto 8px;
        background-color: #fff3c85b;
        border:1px solid currentColor;
        display: flex;
        height:fit-content;
        border-radius: 14px;
        top:0;
        bottom:0;
        padding:4px;
    }
    .slider {
        position: absolute;
        top: 0;
        left: 0;
        margin: 8px;
        padding: 5px 24px;
        font-size: 13px;
        border-radius: 12px;
        background-color: #FFF2C9;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0, 0, 0, 1);
        font-weight: 900;
    }

    .item {
        margin: 8px;
        padding: 5px 24px;
        font-size: 13px;
        border-radius: 10px;
        transition: all 0.2s;
        &:active{
            background-color: rgb(242, 242, 242);
        }
    }
}
</style>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
const formats = reactive([
    { title: "全部", name: "all" },
    { title: "今日", name: "today" },
    { title: "已完成", name: "finish" }
])
const itemList = ref<HTMLElement[]>([])
const selected = ref(0)
const slider = ref<HTMLElement>(null!)
const emit = defineEmits<{
    update: [value: string]
}>()
const trigging = (selectedName: string) => {
    const selectedItem = itemList.value[selected.value]
    const { left: margin } = selectedItem.getBoundingClientRect()
    const mainleft = window.innerWidth * 0.1 / 2 + 8
    const left = margin - mainleft
    slider.value.style.left = left + 'px'
    emit("update", selectedName)
}
</script>
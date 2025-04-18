<template>
    <div class="datetime-selector">
        <div class="time-selector" v-if="props.type === 'time'">
            <input type="number" :value="now.getMinutes()">
            <hr>
            <input type="number" :value="now.getSeconds()">
        </div>
        <div class="date-selector" v-if="props.type === 'date'">
            <input type="number" :value="now.getFullYear()" style="width: 4em;">
            <hr>
            <input type="number" :value="now.getMonth() + 1">
            <hr>
            <input type="number" :value="now.getDate()">
        </div>
    </div>
</template>
<script setup lang="ts">

import { ref, watch } from 'vue'

const now = new Date()
const props = defineProps<{
    type: "time" | "date",
}>()

// class LiveCheckDateTime {
//     eles: HTMLInputElement[] | null = null
//     filter: RegExp | undefined = undefined
//     handle: (message?: string) => void | Function = function () { }
//     constructor(obeservedElements: {
//         ele: HTMLInputElement,
//         filter: RegExp
//     }[], handle?: (message?: string) => void) {

//     }
//     observe() {

//     }
// }


// const emit = defineEmits<{
//     change: [value: Date],
//     error: [{ message: string }]
// }>()
// onMounted(() => {
//     switch (props.type) {
//         case "date": {
//             break
//         }
//         case "time": {
//             break
//         }
//     }
// })
</script>
<style scoped lang="scss">
.datetime-selector {
    .time-selector,
    .date-selector {
        display: flex;
        background-color: #FCF8EA;
        border-radius: 10px;
        height: 30px;
        width: fit-content;
        overflow: hidden;
        align-items: center;

        hr {
            width: 0.5px;
            height: 15px;
            border: none;
            background-color: #E8E8E8;
        }

        input {
            border: none;
            outline: none;
            width: 30px;
            height: 30px;
            background-color: transparent;
            text-align: center;
            font-family: monospace;
            color: var(--theme-regular-color);
        }
    }
}
</style>
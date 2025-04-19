<template>
    <div class="datetime-selector">
        <div class="time-selector" v-if="props.type === 'time'">
            <input type="time" class="selection" v-model.lazy="resultDate.time">
            <input type="number" :value="valueDate.time.hour" readonly>
            <hr>
            <input type="number" :value="valueDate.time.min" readonly>
        </div>
        <div class="date-selector" v-if="props.type === 'date'">
            <input type="date" class="selection" v-model.lazy="resultDate.date">
            <input type="number" :value="valueDate.date.year" style="width: 4em;" readonly>
            <hr>
            <input type="number" :value="valueDate.date.month" readonly>
            <hr>
            <input type="number" :value="valueDate.date.date" readonly>
        </div>
    </div>
</template>
<script setup lang="ts">

import { reactive, watch } from 'vue'
import { date } from '@/api/date'
const props = defineProps<{
    type: "time" | "date",
}>()
const emit = defineEmits<{
    change: [value: string]
}>()

const valueDate = reactive({
    time: {
        hour: date('H').toString(),
        min: date('i').toString()
    },
    date: {
        year: date('Y').toString(),
        month: date('m').toString(),
        date: date('d').toString()
    }
})

const resultDate = reactive({
    time: date('H:i').toString(),
    date: date('Y-m-d').toString()
})

watch(() => resultDate.time, v => {
    valueDate.time.hour = v.match(/(.*)\:(.*)/)?.[1] as string
    valueDate.time.min = v.match(/(.*)\:(.*)/)?.[2] as string
    emit('change',`${resultDate.date} ${resultDate.time}`)
})
watch(() => resultDate.date, v => {
    const r = v.match(/(.*)\-(.*)\-(.*)/)
    valueDate.date.year = String(r?.[1])
    valueDate.date.month = String(r?.[2])
    valueDate.date.date = String(r?.[3])
    emit('change',`${resultDate.date} ${resultDate.time}`)
})
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
        position: relative;

        .selection {
            position: absolute;
            opacity: 0;
            top: 0;
            left: 0;
            width: 60%;
            height: 100%;
        }

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
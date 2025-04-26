<template>
    <div class="list">
        <RemindersItem v-for="{ finished, main, secondary } in list" :finished="finished" :main="main"
            :secondary="secondary"></RemindersItem>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import RemindersItem from './reminders-item.vue'
import reminderListStore from '@/store/reminder-list'
import { CalculateDifferenceInDays } from '@/api/date'
const store = reminderListStore()
const list = ref<FiltedArray[]>([])
const props = defineProps<{
    filter: "all" | "today" | "finished"
}>()
type FiltedArray = {
    finished: boolean,
    main: string,
    secondary: string
}

function toFilter(filter: "all" | "today" | "finished", arr: typeof store.list, handle: (arr: FiltedArray[]) => void) {
    const list: FiltedArray[] = []
    type Rules = {
        isToday: boolean,
        finished: boolean
    }
    const map = new WeakMap<FiltedArray, Rules>()
    arr.forEach(i => {
        const reduced = {
            finished: i.finished,
            main: i.content?.main as string,
            secondary: i.content?.secondary as string
        }
        list.push(reduced)
        const calulator = new CalculateDifferenceInDays()
        map.set(reduced, {
            isToday: calulator.is_today(new Date(i.content?.time as string)),
            finished: i.finished
        })
    })
    switch (filter) {
        case "all":
            handle(list)
            break
        case 'today':
            handle(list.filter(i => map.get(i)?.isToday))
            break
        case 'finished':
            handle(list.filter(i => map.get(i)?.finished))
            break
    }
}
toFilter("all", store.list, arr => {
    list.value = arr
})
watch(() => props.filter, v => {
    toFilter(v, store.list, arr => {
        list.value = arr
    })
})
</script>
<style lang="scss" scoped>
.list{
    width:100%;
    height:calc(100% - 127px);
    padding-bottom:87px;
    box-sizing: border-box;
    margin-top:42px;
    overflow-y: scroll;
    overflow-x: hidden;
}
</style>
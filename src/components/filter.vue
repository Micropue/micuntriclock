<template>
    <Sheet :show="show" @closed="emit('cancel'); nav.display()">
        <template #content>
            <button class="all" :selected="selected == 'all'" @click="selected = 'all'; emit('change', selected)">
                <p>全部</p>
                <p>29</p>
            </button>
            <button class="today" :selected="selected == 'today'" @click="selected = 'today'; emit('change', selected)">
                <p>今天</p>
                <p>2</p>
            </button>
            <button class="finished" :selected="selected == 'finished'"
                @click="selected = 'finished'; emit('change', selected)">
                <p>已完成</p>
                <p>10</p>
            </button>
        </template>
    </Sheet>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import Sheet from './sheet.vue'
import navStore from '@/store/nav'
const nav = navStore()
type SelecteValue = "all" | "today" | "finished"
const emit = defineEmits<{
    cancel: [];
    change: [value: SelecteValue]
}>()
const props = defineProps<{
    show: boolean
}>()
const selected = ref<SelecteValue>("all")

const show = ref(props.show)
if (show.value) {
    nav.hide()
}
watch(() => props.show, v => {
    show.value = v;
    if (v) nav.hide()
})

</script>
<style lang="scss" scoped>
button {
    width: 100%;
    margin: 15px 0;
    border: none;
    border-radius: 16px;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    box-shadow: 3px 4px 10px #77777726;
    color: var(--theme-regular-color);
    transition: all 0.3s;

    &:active {
        transform: scale(0.95);
    }

    &[selected=true] {
        background-color: var(--theme-orange);
        box-shadow: 3px 4px 10px #ffd34179;
        color: white;
    }
}
</style>
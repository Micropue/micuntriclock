<template>
    <Head></Head>
    <RouterView></RouterView>
    <Nav :hide="navStore.hided"></Nav>
</template>
<script setup lang="ts">
import Nav from './components/nav.vue'
import Head from './components/head.vue'
import useNavStore from '@/store/nav'
import { getRemindersFromIndexedDB, setRemindersToIndexedDB } from './progress/reminders'
import { onMounted } from 'vue'
//主组件先获取提醒事项列表后更新到全局状态。
onMounted(getRemindersFromIndexedDB)

const navStore = useNavStore()
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
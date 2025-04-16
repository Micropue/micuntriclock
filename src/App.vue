<template>
    <Head></Head>
    <RouterView></RouterView>
    <Nav></Nav>
</template>
<script setup lang="ts">
import Nav from './components/nav.vue'
import Head from './components/head.vue'
import { getRemindersFromLocalStorage, setRemindersToLocalStorage } from './progress/get-reminders'
//主组件先获取提醒事项列表后更新到全局状态。
getRemindersFromLocalStorage()
</script>
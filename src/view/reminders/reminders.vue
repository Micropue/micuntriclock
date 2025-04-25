<template>
    <RemindersFormat @update="v => filter = v"></RemindersFormat>
    <ReminderList :filter="filter"></ReminderList>
    <RouterView></RouterView>
</template>
<script setup lang="ts">
import RemindersFormat from '@/components/reminders-format.vue'
import ReminderList from '@/components/reminders-list.vue'
import { ref } from 'vue'
const filter = ref<"all" | "today" | "finished">('all')
</script>
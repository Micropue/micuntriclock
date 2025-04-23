<template>
    <RemindersFormat @update="v => filter = v"></RemindersFormat>
    <RouterView></RouterView>
</template>
<script setup lang="ts">
import RemindersFormat from '@/components/reminders-format.vue'
import { ref } from 'vue'
const filter = ref('all')
</script>
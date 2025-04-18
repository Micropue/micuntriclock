<template>
    <Drawer display-mode="full" :enable-duration="true"></Drawer>
</template>
<script lang="ts" setup>
import { onUnmounted } from 'vue'
import Drawer from './drawer.vue'
import useNavStore from '@/store/nav'
const navStore = useNavStore()

navStore.hide()
onUnmounted(() => navStore.display())
</script>
<style lang="scss" scoped></style>
<template>
    <div class="item">
        <div class="container">
            <Checkbox :checked="props.finished"></Checkbox>
            <div class="content">
                <h2>{{ props.main }}</h2>
                <p>{{ props.secondary }}</p>
            </div>
        </div>
        <div class="actions">
            <div class="edit"></div>
            <div class="delete"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Checkbox from './checkbox.vue'
const props = defineProps<{
    finished: boolean,
    main: string,
    secondary: string
}>()
</script>
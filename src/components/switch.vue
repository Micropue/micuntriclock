<template>
    <div class="switch" :checked="checked" @click="checked = !checked; emit('change', checked)">
        <div class="slider"></div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(false)
const emit = defineEmits<{
    change: [checked: boolean]
}>()
</script>
<style scoped lang="scss">
.switch {
    $height: 22px;
    $width: 36px;
    $margin: 3px;
    width: $width;
    height: $height;
    border-radius: 10000px;
    background-color: #EAEAEA;
    box-shadow: inset 1px 1px 3px #9393932f;
    position: relative;
    transition: all 0.3s;

    .slider {
        position: absolute;
        $size: calc($height - $margin * 2);
        height: $size;
        width: $size;
        background-color: #FFFFFF;
        top: 0;
        bottom: 0;
        margin: auto 0;
        left: $margin;
        border-radius: 50%;
        box-shadow: 1px 2px 5px #74747439;
        transition: all 0.3s;
    }

    &[checked=true] {
        background-color: var(--theme-orange);

        .slider {
            left: $width / 2 - 1.5px;
            // right: $margin;
        }
    }
}
</style>
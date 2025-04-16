<template>
    <div class="checkbox" :checked="checked" @click="checked = !checked; emit('checkChange', checked)">
        <div class="checked">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 9.909 7.409">
                <g id="组_19" data-name="组 19" transform="translate(-47.795 -736.796)">
                    <line id="直线_20" data-name="直线 20" x2="3.5" y2="3" transform="translate(48.5 740.5)" fill="none"
                        stroke="#fff" stroke-linecap="round" stroke-width="1" />
                    <line id="直线_21" data-name="直线 21" x1="5" y2="6" transform="translate(52 737.5)" fill="none"
                        stroke="#fff" stroke-linecap="round" stroke-width="1" />
                </g>
            </svg>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
const emit = defineEmits<{
    checkChange: [newValue: boolean]
}>()
const props = defineProps<{
    checked: boolean
}>()
const checked = ref(props.checked)
watch(() => props.checked, value => {
    checked.value = value
    emit('checkChange',value)
})
</script>
<style lang="scss" scoped>
$size: 17px;

.checkbox {
    width: $size;
    height: $size;
    display: flex;
    border-radius: 50%;
    border: 2px solid var(--theme-regular-color);
    justify-content: center;
    align-items: center;
    transition: all 0.2s;

    &:active {
        transform: scale(0.9);
    }

    .checked {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: var(--theme-orange);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transform: scale(0.7);
        transition: all 0.2s;
    }

    &[checked=true] {
        border: 2px solid var(--theme-orange);
        box-shadow: 1px 2px 5px var(--theme-orange);

        .checked {
            opacity: 1;
            transform: scale(1);
        }
    }
}
</style>
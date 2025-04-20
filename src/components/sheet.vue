<template>
    <div class="sheet" :show="show">
        <div class="sheet-dialog">
            <div class="trigger"></div>
            <h2>
                <slot name="headline"></slot>
            </h2>
            <div class="content">
                <slot name="content"></slot>
            </div>
        </div>
        <div class="clip" @click="emit('closed'); show = false"></div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    show: boolean
}>()
const emit = defineEmits<{
    closed:[]
}>()

const show = ref(props.show)
watch(() => props.show, v => show.value = v)

</script>
<style scoped lang="scss">
.sheet {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0000002a;
    display: flex;
    justify-content: center;
    align-items: end;
    backdrop-filter: blur(3px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s;
    .clip{
        position: absolute;
        z-index:1;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
    &[show=true] {
        opacity: 1;
        pointer-events: all;

        .sheet-dialog {
            @keyframes sheet-in {
                0% {
                    transform: translateY(100%);
                }
            }
            animation: sheet-in 0.3s cubic-bezier(0, 0, 0, 1) normal forwards;
        }
    }
    &[show=false]{
        opacity: 0;
        pointer-events: none;
        .sheet-dialog {
            @keyframes sheet-out {
                100% {
                    transform: translateY(100%);
                }
            }
            animation: sheet-out 0.3s cubic-bezier(0, 0, 0, 1) normal forwards;
        }
    }
    .sheet-dialog {
        .trigger {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 10px;
            width: 50px;
            height: 4px;
            border-radius: 10000px;
            background-color: #655e468c;
        }

        position: absolute;
        z-index:2;
        width: 100%;
        box-sizing: border-box;
        height: fit-content;
        border-radius: 16px 16px 0 0;
        padding: 30px;
        background-color: #FFFCF5;

        .content {
            width: 100%;
            margin-top: 20px;
        }
    }
}
</style>
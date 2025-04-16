<template>
    <div :display-mode="props.displayMode" class="drawer" ref="drawer">
        <div class="trigger" ref="triggerBar"></div>
        <div class="bar"></div>
        <div class="head">
            <slot name="head"></slot>
        </div>
        <div class="container">
            <slot name="container"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
    displayMode: "half" | "full" | "hide"
}>()
const triggerBar = ref<HTMLElement>(null!)
const drawer = ref<HTMLElement>(null!)
class DrawerMove {
    private trigger: HTMLElement = null!
    private drawer: HTMLElement = null!
    private touchstarted: boolean = false
    private touchedLocationY: number = 0
    private nowDrawerLocationY: number = 0
    private nowMouseLocationY: number = 0
    constructor(trigger: HTMLElement, drawer: HTMLElement) {
        this.trigger = trigger
        this.drawer = drawer
    }
    init(): void {
        const transition: string = getComputedStyle(this.drawer).transition
        this.trigger.addEventListener("touchstart", e => {
            this.touchstarted = true
            this.touchedLocationY = e.touches[0].clientY
            this.nowDrawerLocationY = Number(getComputedStyle(this.drawer).transform.match(/matrix\(1, 0, 0, 1, 0, (.*?)\)/)?.[1])
            // this.drawer.style.transform = `translateY(${Math.abs(this.nowDrawerLocationY)}px)`
        })
        window.addEventListener("touchmove", e => {
            if (!this.touchstarted) return
            const { clientY } = e.touches[0]
            const rst = clientY - this.touchedLocationY + this.nowDrawerLocationY
            this.nowMouseLocationY = clientY
            this.drawer.style.transition = 'none'
            this.drawer.style.transform = `translateY(${rst > 0 ? rst : 0}px)`
        })
        window.addEventListener("touchend", e => {
            if (this.touchstarted) this.touchstarted = false
            const { top } = this.drawer.getBoundingClientRect()
            this.drawer.style.transition = transition
            const { innerHeight } = window
            if (innerHeight - top <= innerHeight * 0.7) {
                this.drawer.style.transform = `translateY(40%)`
            } else {
                this.drawer.style.transform = `translateY(0)`
            }
        })
    }
}
onMounted(() => {
    const drawerMove = new DrawerMove(triggerBar.value, drawer.value)
    drawerMove.init()
})
</script>
<style scoped lang="scss">
.drawer {
    background-color: #FFF1C9;
    position: fixed;
    width: 100%;
    height: 90%;
    top: 10%;
    box-shadow: 1px -1px 13px #90909045;
    border-radius: 20px 20px 0px 0px;
    transition: all cubic-bezier(0.55, 0, 0.23, 1.17) 0.6s;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 30px;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
    .trigger {
        background-color: transparent;
        opacity: 0;
        width: 100%;
        position: absolute;
        top: 0;
        height: 50px;
        left: 0;
        border-radius: 20px 20px 0 0;
    }

    .head {
        width: 100%;
        min-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        svg {
            stroke: currentColor;
        }
    }

    .container {
        width: 100%;
        height: 90%;
        box-sizing: border-box;
    }

    .bar {
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

    @each $key in (half, full, hide) {
        &[display-mode=#{$key}] {
            @if $key ==half {
                transform: translateY(40%);
            }

            @if $key ==full {
                transform: translateY(0);
            }

            @if $key ==hide {
                transform: translateY(100%);
            }
        }
    }
}
</style>
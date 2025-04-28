<template>
    <div class="clock">
        <div class="real-clock">
            <canvas ref="canvas" width="500" height="500"></canvas>
            <canvas ref="pointerCanvas" class="pointer-canvas" width="500" height="500"></canvas>
        </div>
        <p>{{ date('Y年m月d日') }} · 今年已经过去{{ percent }}</p>
    </div>
    <Drawer display-mode="half">
        <template #head>
            <h2>今日代办</h2>
            <button class="filter-button" @click="filterShowed = true">
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Interface / Filter">
                        <path id="Vector"
                            d="M20 5.6001C20 5.04005 19.9996 4.75981 19.8906 4.5459C19.7948 4.35774 19.6423 4.20487 19.4542 4.10899C19.2403 4 18.9597 4 18.3996 4H5.59961C5.03956 4 4.75981 4 4.5459 4.10899C4.35774 4.20487 4.20487 4.35774 4.10899 4.5459C4 4.75981 4 5.04005 4 5.6001V6.33736C4 6.58195 4 6.70433 4.02763 6.81942C4.05213 6.92146 4.09263 7.01893 4.14746 7.1084C4.20928 7.20928 4.29591 7.29591 4.46875 7.46875L9.53149 12.5315C9.70443 12.7044 9.79044 12.7904 9.85228 12.8914C9.90711 12.9808 9.94816 13.0786 9.97266 13.1807C10 13.2946 10 13.4155 10 13.6552V18.411C10 19.2682 10 19.6971 10.1805 19.9552C10.3382 20.1806 10.5814 20.331 10.8535 20.3712C11.1651 20.4172 11.5487 20.2257 12.3154 19.8424L13.1154 19.4424C13.4365 19.2819 13.5966 19.2013 13.7139 19.0815C13.8176 18.9756 13.897 18.8485 13.9453 18.7084C14 18.5499 14 18.37 14 18.011V13.6626C14 13.418 14 13.2958 14.0276 13.1807C14.0521 13.0786 14.0926 12.9808 14.1475 12.8914C14.2089 12.7911 14.2947 12.7053 14.4653 12.5347L14.4688 12.5315L19.5315 7.46875C19.7044 7.2958 19.7904 7.20932 19.8523 7.1084C19.9071 7.01893 19.9482 6.92146 19.9727 6.81942C20 6.70551 20 6.58444 20 6.3448V5.6001Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                </svg>
                <p>筛选</p>
            </button>
        </template>
        <template #container>
            <Item v-for="{ finished, content, id } in list" :finished="finished" :index="(id as number)">
                <template #content-main>{{ content!.main.length >= 10 ? content?.main.slice(0,10) + '...' : content?.main }}</template>
                <template #content-secondary>{{ content!.secondary.length >= 20 ? content?.secondary.slice(0, 20) +
                    '...'
                    : content?.secondary }}</template>
            </Item>
            <div class="empty" v-if="!list.length">
                <p>今日还没有未完成代办</p>
            </div>
        </template>
    </Drawer>
    <Filter :show="filterShowed" @cancel="filterShowed = false" @change="filterShowed = false"></Filter>
    <RouterView></RouterView>
</template>
<style scoped lang="scss">
.real-clock {
    $size: 250px;
    width: $size;
    height: $size;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset -8px -3px 10px #F2F2F2, -7px -3px 10px #F2F2F2;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .pointer-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: $size;
        height: $size;
        filter:drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.334));
    }
}

canvas {
    $size: 230px;
    width: $size;
    height: $size;
}

.clock {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        width: fit-content;
        margin-top: 20px;
        font-weight: 400;
    }
}

.empty {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.filter-button {
    display: flex;
    color: var(--theme-regular-color);
    border: none;
    padding: 7px 12px;
    display: flex;
    align-items: center;
    border-radius: 10000px;
    font-size: 12px;
    box-shadow: 2px 3px 10px #7474743e;
    background-color: #FFFBF4;
    transition: all cubic-bezier(0.45, 0.01, 0.2, 1.43) 0.3s;

    &:active {
        transform: scale(0.95);
        background-color: var(--theme-orange);
        color: white;
        box-shadow: 2px 3px 10px var(--theme-orange);
    }

    svg {
        $size: 18px;
        width: $size;
        height: $size;
        margin-right: 5px;
    }
}

.lists {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
<script setup lang="ts">
import Drawer from '@/components/drawer.vue'
import Item from '@/components/home-item.vue'
import useRemindersList from '@/store/reminder-list'
import { CalculateDifferenceInDays } from '@/api/date'
import Filter from '@/components/filter.vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref, type Ref } from 'vue'
import { date } from '@/api/date'
const store = useRemindersList()
const filterShowed = ref(false)
//只获取今天的列表。
const list = storeToRefs(store).list.value.filter(v => {
    const caluater = new CalculateDifferenceInDays()
    return caluater.is_today(new Date(v.content?.time as string)) && !v.finished
})

const percent = ref("0%")
function computePercent(): string {
    const _date = new Date()
    const year = _date.getFullYear()
    let allDays = 365
    if (year % 4 == 0 && year % 400 == 0) {
        allDays = 366
    }
    const month = _date.getMonth()
    let monthDay = []
    for (let i = 1; i <= month; i++) {
        const everyMonthDays = new Date(date('Y').year, i, 0).getDate()
        monthDay[i - 1] = everyMonthDays
    }
    const thisMonthDays = _date.getDate()
    monthDay[monthDay.length] = thisMonthDays
    let iter = 0
    monthDay.forEach(i => {
        iter += i
    })
    return `${Math.round(iter / allDays * 100)}%`
}
percent.value = computePercent()
setInterval(() => {
    percent.value = computePercent()
}, 5 * 1000)

const canvas = ref<HTMLCanvasElement>(null!)

class DrawCircular {
    radius: number = 200
    element: HTMLCanvasElement = null!
    constructor(radius: number, ref: Ref<HTMLCanvasElement>) {
        this.radius = radius
        this.element = ref.value
    }
    draw() {
        const ctx = this.element.getContext('2d') as CanvasRenderingContext2D
        const { width, height } = this.element
        const centerX = width / 2
        const centerY = height / 2
        ctx.clearRect(0, 0, width, height)
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const superCrumble = new FontFace('Super-Crumble', `url(${new URL('../fonts/Super Crumble.ttf', import.meta.url).href})`)
        superCrumble.load().then(() => {
            ctx.font = '50px Super-Crumble'
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * 2 * Math.PI
                //极坐标公式
                const x = centerX + this.radius * Math.cos(angle)
                const y = centerY + this.radius * Math.sin(angle)
                const hour = (i + 3) % 12 || 12 // 12点在顶部，顺时针排
                if (i % 3 === 0) {
                    ctx.fillStyle = '#FFC403'
                } else {
                    ctx.fillStyle = 'black'
                }
                // ctx.font = `50px Heiti`
                ctx.fillText(String(hour), centerX + (this.radius - 40) * Math.cos(angle), centerY + (this.radius - 40) * Math.sin(angle))
                ctx.beginPath()
                let pointSize = 5
                if (i % 3 === 0) {
                    ctx.fillStyle = '#FFC403'
                    pointSize = 10
                } else {
                    ctx.fillStyle = '#D0D0D0'
                }
                ctx.arc(x, y, pointSize, 0, 2 * Math.PI)
                ctx.fill()
                ctx.closePath()
            }
        })
    }
}

const pointerCanvas = ref<HTMLCanvasElement>(null!)

class DrawPointer {
    radius: number = 0
    canvas: HTMLCanvasElement = null!
    centerX: number = 0
    centerY: number = 0
    constructor(radius: number, ref: Ref<HTMLCanvasElement>) {
        this.radius = radius
        this.canvas = ref.value
        const { width, height } = this.canvas
        this.centerX = width / 2
        this.centerY = height / 2
    }
    private draw(): void {
        const nowtime = new Date()
        const hours = nowtime.getHours() % 12 + nowtime.getMinutes() / 60
        const minute = nowtime.getMinutes() + nowtime.getSeconds() / 60
        const rotate = {
            hours: (hours / 12) * 360 - 90,
            minute: (minute / 60) * 360 - 90
        }
        const radians = {
            hours: rotate.hours * (Math.PI / 180),
            minute: rotate.minute * (Math.PI / 180)
        }
        const location: {
            [keys: string]: {
                x: number,
                y: number
            }
        } = {
            hours: {
                x: this.centerX + (this.radius * 0.55) * Math.cos(radians.hours),
                y: this.centerY + (this.radius * 0.55) * Math.sin(radians.hours)
            },
            minute: {
                x: this.centerX + this.radius * 0.9 * Math.cos(radians.minute),
                y: this.centerY + this.radius * 0.9 * Math.sin(radians.minute)
            }
        }
        const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.clear()
        Object.keys(location).forEach(i => {
            ctx.beginPath()
            ctx.moveTo(this.centerX, this.centerY)
            ctx.lineTo(location[i].x, location[i].y)
            ctx.strokeStyle = i == 'hours' ? '#FFC403' : '#655E46'
            ctx.lineWidth = 10
            ctx.lineCap = 'round'
            ctx.stroke()
            ctx.closePath()
        })
    }
    private clear() {
        const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    init() {
        this.draw()
        setInterval(() => {
            this.draw()
        }, 1000)
    }
}

onMounted(() => {
    const drawer = new DrawCircular(canvas.value.width / 2.1, canvas)
    drawer.draw()
    const pointerDrawer = new DrawPointer(pointerCanvas.value.width / 2.5, pointerCanvas)
    pointerDrawer.init()
})

</script>
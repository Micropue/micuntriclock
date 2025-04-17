<template>
    <div class="nav" :hide="props.hide || false">
        <div :class="{ home: true, active: $route.name == 'home' }" @click="$router.push('/')">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M12 7V12L10.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" />
                </g>
            </svg>
        </div>
        <button class="new" @click="$router.push('/new')">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g id="Edit / Add_Plus">
                        <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </g>
                </g>
            </svg>
        </button>
        <div :class="{ 'all-reminders': true, active: $route.name == 'reminders' }" @click="$router.push('/reminders')">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11Z"
                        fill="currentColor" />
                    <path
                        d="M7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16Z"
                        fill="currentColor" />
                    <path
                        d="M11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11Z"
                        fill="currentColor" />
                    <path
                        d="M11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16Z"
                        fill="currentColor" />
                    <path
                        d="M15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11Z"
                        fill="currentColor" />
                    <path
                        d="M15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16Z"
                        fill="currentColor" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8 2C8.55228 2 9 2.44772 9 3V4H15V3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3V4C19.7614 4 22 6.23858 22 9V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V9C2 6.23858 4.23858 4 7 4V3C7 2.44772 7.44772 2 8 2ZM7 6C5.34315 6 4 7.34315 4 9V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V9C20 7.34315 18.6569 6 17 6C17 6.55229 16.5523 7 16 7C15.4477 7 15 6.55229 15 6H9C9 6.55229 8.55228 7 8 7C7.44772 7 7 6.55229 7 6Z"
                        fill="currentColor" />
                </g>
            </svg>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    hide?: boolean
}>()
</script>
<style lang="scss" scoped>
.nav {
    $distination: 30px;
    position: fixed;
    bottom: $distination;
    width: calc(100% - $distination * 2);
    left: $distination;
    right: $distination;
    margin: auto;
    display: flex;
    background-color: #FFFFFF;
    box-shadow: 0px 13px 46px #5d5d5d36;
    padding: 7px;
    box-sizing: border-box;
    height: 57px;
    border-radius: 10000px;
    justify-content: space-between;
    transition: transform 0.3s;
    &[hide=true]{
        transform:translateY(100px);
    }
    .home:hover,
    .all-reminders:hover {
        color: var(--theme-orange);
    }

    .home,
    .all-reminders {
        width: 40%;
        color: #655E46;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10000px;
        transition: all 0.2s;

        svg {
            width: 30px;
            height: 30px;
            transition: all 0.3s;
        }

        &.active {
            svg {
                color: var(--theme-orange);
            }

            background-color: #FAFAFA;
            box-shadow: inset 0px 1px 6px #83838331;
        }
    }

    .new {
        $size: 50px;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        width: $size;
        height: $size;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #E2AD00;
        color: white;
        background-color: var(--theme-orange);
        top: -10px;
        box-shadow: 0px 3px 11px #ffc403a5;
        transition: all 0.2s;

        &:active {
            transform: scale(0.95);
            box-shadow: 0px 3px 20px #ffc403a5;
        }

        svg {
            stroke: currentColor;
            width: 40px;
            height: 40px;
        }
    }
}
</style>
<template>
    <div class="head" v-if="$route.name != 'search'">
        <p>{{ $route.meta.displayName }}</p>
        <div class="search" @click="$router.push('/search')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23.26 24.326">
                <g id="组_3" data-name="组 3" transform="translate(-335 -14)">
                    <g id="椭圆_2" data-name="椭圆 2" transform="translate(335 14)" fill="none" stroke="#a5a5a5"
                        stroke-linecap="round" stroke-width="2">
                        <circle cx="9.5" cy="9.5" r="9.5" stroke="none" />
                        <circle cx="9.5" cy="9.5" r="8.5" fill="none" />
                    </g>
                    <line id="直线_3" data-name="直线 3" x2="6.394" y2="6.394" transform="translate(350.452 30.518)"
                        fill="none" stroke="#a5a5a5" stroke-linecap="round" stroke-width="2" />
                </g>
            </svg>
        </div>
    </div>
</template>
<style scoped lang="scss">
.head{
    width: 100%;
    padding:30px;
    color:var(--theme-regular-color);
    font-weight: 700;
    font-size:17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .search{
        display: flex;
    }
}
</style>
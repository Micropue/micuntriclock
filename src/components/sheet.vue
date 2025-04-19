<template>
    <div class="sheet">
        <div class="sheet-dialog">
            <div class="trigger"></div>
            <h2>
                <slot name="headline"></slot>
            </h2>
            <slot name="content"></slot>
        </div>
    </div>
</template>
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

        position: relative;
        width: 100%;
        box-sizing: border-box;
        height: fit-content;
        border-radius: 16px 16px 0 0;
        padding: 30px;
        background-color: #FFFCF5;
    }
}
</style>
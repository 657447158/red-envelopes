<template>
    <div class="footer">
        <router-link tag="div" to="index" class="footer-item">
            <span class="icon-mobile">&#xe76b;</span>
            <span>首页</span>
        </router-link>
        <router-link tag="div" to="personal-index" class="footer-item">
            <span class="icon-mobile">&#xe720;</span>
            <span>我</span>
        </router-link>
    </div>
</template>
<style lang="scss" scoped>
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0 1.42rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .98rem;
        background: $bg01;
        box-shadow: 0 -.05rem 1rem rgba(124, 122, 122, .15);
        &-item {
            display: flex;
            align-items: center;
            font-size: $f28;
            color: $navColor;
        }
        .icon-mobile {
            margin-right: .16rem;
            font-size: $f40;
        }
    }
</style>
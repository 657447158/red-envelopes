<template>
    <div class="footer">
        <router-link tag="div" to="index" class="footer-item">
            <span class="nav-icon nav-icon-1"></span>
            <span>发红包</span>
        </router-link>
        <router-link tag="div" to="personal-index" class="footer-item">
            <span class="nav-icon nav-icon-2"></span>
            <span>我的</span>
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
        .nav-icon {
            margin-right: .16rem;
            // font-size: $f40;
            &-1 {
                width: .38rem;
                height: .45rem;
                background: url('../../assets/images/nav-icon-1-default.png') no-repeat center / 100% 100%;
            }
            &-2 {
                width: .52rem;
                height: .41rem;
                background: url('../../assets/images/nav-icon-2-default.png') no-repeat center / 100% 100%;
            }
        }
        .router-link-exact-active .nav-icon-1 {
            background: url('../../assets/images/nav-icon-1-active.png') no-repeat center / 100% 100%;
        }
        .router-link-exact-active .nav-icon-2 {
            background: url('../../assets/images/nav-icon-2-active.png') no-repeat center / 100% 100%;
        }
    }
</style>
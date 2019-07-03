<template>
    <div class="login">
        <div class="login-tabs">
            <router-link
                class="login-tabs-item"
                v-for="(item, index) in tabList"
                :key="index"
                :to="item.path"
            >{{item.name}}</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data () {
            return {
                tabIndex: 0,
                tabList: [
                    {
                        name: '验证码登录',
                        path: '/login/code'
                    },
                    {
                        name: '账号密码登录',
                        path: '/login/psd'
                    }
                ]
            }
        }
    }
</script>
<style lang="scss" scoped>
    .login {
        padding-top: 1.33rem;
        &-tabs {
            margin-bottom: 1.4rem;
            display: flex;
            align-items: center;
            font-size: $f30;
            color: $fc02;
            height: .36rem;
            &-item {
                width: 50%;
                text-align: center;
            }
            .router-link-exact-active {
                color: $fc01;
                font-size: $f36;
            }
        }
    }
</style>

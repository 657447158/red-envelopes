<template>
    <div class="login">
        <div class="login-tabs">
            <span
                class="login-tabs-item"
                :class="tabIndex === index && 'active'"
                v-for="(item, index) in tabList"
                :key="index"
                @click="checkRouter(item.path, index)"
            >{{item.name}}</span>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
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
        },
        methods: {
            checkRouter (path, index) {
                if (this.tabIndex === index) return
                this.tabIndex = index                
                this.$router.push(path)
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
            &-item {
                width: 50%;
                text-align: center;
            }
            .active {
                color: $fc01;
                font-size: $f36;
            }
        }
    }
</style>

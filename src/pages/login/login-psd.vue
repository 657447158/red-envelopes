<template>
    <div class="login">
        <div class="login-box">
            <country-code></country-code>
            <input type="number" maxlength="11" placeholder="请输入手机号" v-model="mobile" />
        </div>
        <div class="login-box">
            <span class="label">密码</span>
            <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="login-btn" @click="bindPhone">登录</div>
    </div>
</template>
<script>
    import CountryCode from './country-code'
    export default {
        components: {
            'country-code': CountryCode
        },
        data () {
            return {
                mobile: '',
                password: '',
                selectedCode: '86'
            }
        },
        methods: {
            // 获取国家代码
            getSelectedCode (val) {
                this.selectedCode = val
            },
            bindPhone () {
                if (!this.mobile) {
                    this.Toast({
                        message: '请输入手机号'
                    })
                    return
                }
                if (!this.password) {
                    this.Toast({
                        message: '请输入密码'
                    })
                    return
                }
                this.Ajax({
                    method: 'bindLogin',
                    hasToken: 0,
                    mobile: this.mobile,
                    password: this.password,
                    countryCode: this.selectedCode
                }).then(res => {
                    if (res.code === '1') {
                        this.Toast({
                            type: 'sucess',
                            message: '绑定成功'
                        })
                    } else {
                        this.Toast({
                            type: 'error',
                            message: res.msg
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .login {
        padding: 0 .68rem 0 .65rem;
        font-size: $f28;
        &-box {
            padding: .38rem 0 .34rem;
            display: flex;
            align-items: center;
            border-bottom: 1px solid $bor01;
        }
        .label {
            display: flex;
            align-items: center;
            width: 1.5rem;
            font-size: $f26;
        }
        .icon-mobile {
            margin-left: .12rem;
            font-size: $f12;
            color: $fc05;
        }
        &-btn {
            margin-top: .74rem;
            width: 100%;
            height: .9rem;
            color: $fc10;
            text-align: center;
            line-height: .9rem;
            background: $btn01;
            border-radius: .45rem;
            box-shadow: 0 0 .15rem rgba(241, 77, 75, .4);
            &:active {
                opacity: .8;
            }
        }
    }
</style>

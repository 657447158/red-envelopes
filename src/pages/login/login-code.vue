<template>
    <div class="login">
        <div class="login-box">
            <span class="label">+86 <i class="icon-mobile">&#xe6af;</i></span>
            <input type="number" maxlength="11" placeholder="请输入手机号" v-model="mobile" />
        </div>
        <div class="login-box">
            <span class="label">验证码</span>
            <input type="text" placeholder="请输入验证码" v-model="verifycode" />
            <span class="code" @click="getCode" v-if="limitTime === 60">请输入验证码</span>
            <span class="code time" v-else>{{limitTime}}s</span>
        </div>
        <div class="login-btn" @click="login">登录</div>
    </div>
</template>
<script>
    import md5 from 'blueimp-md5'
    export default {
        data () {
            return {
                limitTime: 60,
                timer: null,
                mobile: '',
                verifycode: ''
            }
        },
        methods: {
            getCode () {
                let timestamp = new Date().getTime()
                this.Ajax({
                    method: 'getVerifycode',
                    hasToken: 0,
                    mobile: this.mobile,
                    smsType: 15,
                    smsBusi: 0,
                    date: timestamp,
                    check: md5(this.mobile + 'lme520' + timestamp)
                }).then(res => {
                    if (res.code === '1') {
                        this.countdown()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            countdown () {
                this.limitTime--
                this.timer = setInterval(() => {
                    if (this.limitTime > 0) {
                        this.limitTime--
                    } else {
                        this.limitTime = 60
                        clearInterval(this.timer)
                        this.timer = null
                    }
                }, 1000)
            },
            login () {
                this.Ajax({
                    method: 'verifycodeBindLogin',
                    hasToken: 0,
                    mobile: this.mobile,
                    verifycode: this.verifycode
                }).then(res => {
                    if (res.code === '1') {
                        console.log(res)
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
        },
        destroyed () {
            clearInterval(this.timer)
            this.timer = null
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
        input {
            width: 2.5rem;
        }
        .code {
            width: 2rem;
            text-align: right;
        }
        .time {
            color: $fc04;
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

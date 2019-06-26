<template>
    <div class="login">
        <div class="login-box">
            <span class="label">+86 <i class="icon-mobile">&#xe6af;</i></span>
            <input type="number" maxlength="11" placeholder="请输入手机号" />
        </div>
        <div class="login-box">
            <span class="label">密码</span>
            <input type="text" placeholder="请输入密码" />
        </div>
        <div class="login-btn">登录</div>
    </div>
</template>
<script>

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

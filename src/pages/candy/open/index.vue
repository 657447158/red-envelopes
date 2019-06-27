<template>
    <div class="open">
        <span class="open-btn"></span>
        <span class="title">{{info.command}}</span>
        <span class="avator-box">
            <img src="" />
        </span>
        <span>领取详情</span>
        <router-link :to="{path: '/details' ,query: {id: this.$route.query._param_a}}" class="icon-down"></router-link>
    </div>
</template>
<script>
export default {
    data () {
        return {
            info: ''
        }
    },
    created () {
        this.getInfo()
    },
    methods: {
        getInfo () {
            this.Ajax({
                method: '_receiveCandy',
                hasToken: 1,
                _param_a: this.$route.query._param_a,
                currentPage: 0
            }).then(res => {
                if (res.code === '1') {
                    this.info = res.data
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
    .open {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100vh;
        color: $fc08;
        font-size: $f24;
        background: url('../../../assets/images/candy-bg.jpg') no-repeat center / 100% 100%;
        &-btn {
            margin: 4.85rem 0 .62rem;
            width: 1.67rem;
            height: 1.67rem;
            background: url('../../../assets/images/open-candy.png') no-repeat center / 100% 100%;
        }
        .title {
            font-size: $f30;
        }
        .avator-box {
            margin: .64rem 0 .46rem;
            width: .97rem;
            height: .97rem;
            border-radius: 50%;
            overflow: hidden;
            background: $bg01;
        }
        .icon-down {
            margin-top: .16rem;
            width: .28rem;
            height: .25rem;
            background: url('../../../assets/images/icon-down.png') no-repeat center / 100% 100%;
        }
    }
</style>


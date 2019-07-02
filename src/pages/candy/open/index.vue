<template>
    <div class="open">
        <div class="status-box">
            <span class="open-btn" ref="openBtn" @click="openFn" v-if="receiveFlag"></span>
            <span class="open-btn open-ed" v-else></span>
        </div>
        <span class="title">{{info.command}}</span>
        <span class="avator-box" :class="!info.headIcon && 'no-photo'">
            <img v-if="info.headIcon" :src="info.headIcon" />
        </span>
        <router-link :to="{path: '/details' ,query: {id: id}}" class="check-detail" v-if="!receiveFlag">
            <span>领取详情</span>
            <span class="icon-down"></span>
        </router-link>
    </div>
</template>
<script>
export default {
    data () {
        return {
            id: this.$route.query._param_a,
            info: '',
            receiveFlag: true
        }
    },
    created () {
        this.getInfo()
    },
    methods: {
        getInfo () {
            this.Ajax({
                method: 'checkCandy',
                hasToken: 1,
                _param_a: this.id
            }).then(res => {
                if (res.code === '1') {
                    this.info = res.data
                    this.receiveFlag = res.receiveFlag
                } else {
                    this.Toast({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 领取红包
        openFn () {
            this.$refs.openBtn.setAttribute('class', 'open-btn animate')
            setTimeout(() => {
                this.$router.push({path: '/details', query: {id: this.id}})
            }, 2000)
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
        .status-box {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 4.85rem 0 .62rem;
            width: 100%;
            height: 1.67rem;
        }
        &-btn {
            width: 1.67rem;
            height: 1.67rem;
            background: url('../../../assets/images/open-candy.png') no-repeat center / 100% 100%;
        }
        &-ed {
            filter: grayscale(100%)
        }
        .animate {
            animation: circle 2s linear;
        }
        .title {
            height: .3rem;
            font-size: $f30;
        }
        .avator-box {
            margin: .64rem 0 .46rem;
            width: .97rem;
            height: .97rem;
            border-radius: 50%;
            overflow: hidden;
        }
        .check-detail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: $fc08;
        }
        .icon-down {
            margin-top: .16rem;
            width: .28rem;
            height: .25rem;
            background: url('../../../assets/images/icon-down.png') no-repeat center / 100% 100%;
        }
    }
    @keyframes circle {
        from {
            transform: rotateY(0)
        }
        to {
            transform: rotateY(360deg)
        }
    }
</style>


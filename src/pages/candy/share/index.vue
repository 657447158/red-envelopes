<template>
    <div class="share">
        <img src="@/assets/images/share-candy.png" class="share-btn" @click="popUp" />
        <span class="title">{{info.command}}</span>
        <span class="avator-box" :class="!info.headIcon && 'no-photo'">
            <img v-if="info.headIcon" :src="info.headIcon" />
        </span>
        <otc-modal :show="show" @hide="hide">
            <div class="share-modal">
                <p class="share-modal-title">分享到</p>
                <ul class="share-modal-list">
                    <li class="share-modal-item">
                        <div class="icon-box"><img src="@/assets/images/share-wx.png" /></div>
                        <p>微信好友</p>
                    </li>
                    <li class="share-modal-item">
                        <div class="icon-box"><img src="@/assets/images/share-pyq.png" /></div>
                        <p>朋友圈</p>
                    </li>
                    <li class="share-modal-item">
                        <div class="icon-box"><img src="@/assets/images/share-copy.png" /></div>
                        <p>复制链接</p>
                    </li>
                </ul>
                <div class="share-modal-cancel" @click="hide">取消分享</div>
            </div>
        </otc-modal>
    </div>
</template>
<script>
export default {
    data () {
        return {
            show: false,
            info: '',
            id: this.$route.query.id
        }
    },
    created () {
        this.getInfo()
    },
    methods: {
        hide () {
            this.show = false
        },
        popUp () {
            this.show = true
        },
        getInfo () {
            this.Ajax({
                method: 'checkCandy',
                hasToken: 1,
                _param_a: this.id
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
        },
    }
}
</script>
<style lang="scss" scoped>
    .share {
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
        }
        &-modal {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 4.77rem;
            color: $fc03;
            background: $bg01;
            &-title {
                margin: .6rem 0 .84rem;
                font-size: $f30;
                color: $fc02;
            }
            &-list {
                padding: 0 1.1rem 0 1rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
            &-item {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .icon-box {
                margin-bottom: .18rem;
                width: 1.08rem;
                height: 1.08rem;
            }
            &-cancel {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 1.05rem;
                color: $fc02;
                font-size: $f30;
                text-align: center;
                line-height: 1.05rem;
                border-top: 1px solid #EAEAEA;
            }
        }
    }
</style>


<template>
    <div class="personal">
        <div class="personal-top">
            <div class="personal-top-left">
                <span>资产价值(元)</span>
                <span class="money">{{info.rmbValue}}</span>
            </div>
            <span class="extract">提款</span>
        </div>
        <ul class="personal-list">
            <li
                v-for="(item, index) in filterWalletList"
                :key="index"
            >
                <span class="img-box">
                    <img :src="item.coinImage" />
                </span>
                <div class="item item-l">
                    <span class="top">{{item.coinName}}</span>
                    <span>≈￥{{item.coinPrice}}</span>
                </div>
                <div class="item item-r">
                    <span class="top">{{item.totalCoin}}</span>
                    <span>￥{{item.rmbValue}}</span>
                </div>
            </li>
        </ul>
        <div class="check-more">
            <span>查看更多</span>
            <span class="icon-mobile">&#xe6af;</span>
        </div>
        <div class="personal-bottom">
            <div class="personal-bottom-item">
                <span>红包记录</span>
                <router-link class="icon-mobile" to="/record">&#xe6a8;</router-link>
            </div>
            <div class="personal-bottom-item">
                <span>绑定手机号</span>
                <span class="phone">{{info.mobile}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            info: '',
            walletList: []
        }
    },
    created () {
        this.getMyCapital()
    },
    computed: {
        filterWalletList () {
            return this.walletList.filter((item, index) => {
                return index < 3
            })
        }
    },
    methods: {
        getMyCapital () {
            this.Ajax({
                method: 'getMyCapital',
                hasToken: 1
            }).then(res => {
                if (res.code === '1') {
                    this.info = res.data
                    this.walletList = res.data.walletList
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
    .personal {
        &-top {
            display: flex;
            justify-content: space-between;
            margin: .08rem auto 0;
            padding: .55rem .14rem 0 .37rem;
            width: 7.17rem;
            height: 2.07rem;
            color: $fc10;
            font-size: $f24;
            background: url('../../assets/images/personal-index-bg.png') no-repeat center / 100% 100%;
            &-left {
                display: flex;
                flex-direction: column;
            }
            .money {
                margin-top: .29rem;
                font-size: $f40;
            }
            .extract {
                width: 1.4rem;
                height: .6rem;
                text-align: center;
                line-height: .6rem;
                border-top-left-radius: .3rem;
                border-bottom-left-radius: .3rem;
                background: #FF8F8A;
                &:active {
                    opacity: .8;
                }
            }
        }
        &-list {
            padding: .17rem .2rem 0;
            li {
                display: flex;
                align-items: center;
                padding: 0 .1rem 0 .17rem;
                height: 1.18rem;
                border-bottom: 1px solid $bor01Opa;
            }
            .img-box {
                margin-right: .22rem;
                width: .6rem;
                height: .6rem;
                border-radius: 50%;
            }
            .item {
                display: flex;
                flex-direction: column;
                font-size: $f24;
                color: $fc04;
            }
            .item-l {
                flex: 1;
            }
            .item-r {
                align-items: flex-end;
            }
            .top {
                margin-bottom: .14rem;
                font-size: $f36;
                color: $fc06;
            }
        }
        .check-more {
            margin: .46rem 0 .34rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: $f24;
            color: $fc04;
            .icon-mobile {
                margin-left: .1rem;
                font-size: $f20;
            }
        }
        &-bottom {
            padding: 0 .2rem;
            &-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: .9rem;
                font-size: $f30;
                color: $fc02;
                border-bottom: 1px solid $bor01Opa;
            }
            .phone {
                color: $fc04;
            }
        }
    }
</style>

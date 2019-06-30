<template>
    <div class="details">
        <div class="details-top">
            <span class="img-box" :class="!info.headIcon && 'no-photo'">
                <img v-if="info.headIcon" :src="info.headIcon" />
            </span>
            <span class="name">{{info.nickName}}的红包</span>
            <span class="title">{{info.command}}</span>
            <div class="coin-box"><span>{{info.receiveMoney}}</span>{{info.coinName}}</div>
            <span class="rmb">人民币约{{info.receiveMoneyRMB}}元</span>
            <div class="bind-box1" v-if="info.hadMobile === '1'">
                <span>您的{{info.coinName}}已存入LMEtoken（账号{{info.mobile}}）</span>
                <router-link to="/personal-index">打开看看</router-link>
            </div>
            <div class="bind-box" v-else>
                <span>绑定手机号可提取</span>
                <router-link to="/login">去绑定</router-link>
            </div>
        </div>
        <div class="details-intro" v-if="info.useStatus === 1">
            <span>{{info.totalNumber}}个红包，{{info.useSeconds}}秒被抢光</span>
        </div>
        <div class="details-intro" v-else>
            <span>已领{{info.useNumber}}个红包，共{{info.totalNumber}}个红包</span>
        </div>
        <scroll-load :params="params" @list="getList">
            <ul class="details-list" slot="list">
                <li
                    class="details-list-item"
                    v-for="item in list"
                    :key="item.id"
                >
                    <div class="details-list-ct">
                        <span class="img-box" :class="!item.headIcon && 'no-photo'">
                            <img v-if="item.headIcon" :src="item.headIcon" />
                        </span>
                        <div class="name-box">
                            <span class="name">{{item.nickName}}</span>
                            <span class="time">{{item.createDate}}</span>
                        </div>
                        <div class="price-box">
                            <span class="num">{{item.receiveMoney}} {{item.coinName}}</span>
                            <span>≈￥{{item.receiveMoneyRMB}}</span>
                        </div>
                    </div>
                    <div class="details-list-lucky" v-if="item.bestTip">
                        <img src="@/assets/images/lucky-icon.png" class="lucky-icon" />
                        <span>{{item.bestTip}}</span>
                    </div>
                </li>
            </ul>
        </scroll-load>
    </div>
</template>
<script>
export default {
    data () {
        return {
            info: '',
            list: [],
            params: {
                method: '_receiveCandy',
                hasToken: 1,
                _param_a: this.$route.query.id,
                pageNum: 1
            }
        }
    },
    methods: {
        getList (val) {
            this.info = val
            this.list = this.list.concat(val.candyRecordList)
        }
    }
}
</script>
<style lang="scss" scoped>
    .details {
        &-top {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 5.38rem;
            color: $fc10;
            background: url('../../../assets/images/details-bg.png') no-repeat center / 100% 100%;
            .img-box {
                margin: .65rem 0 .18rem;
                width: .97rem;
                height: .97rem;
                border-radius: 50%;
                overflow: hidden;
            }
            .name { font-size: $f24; }
            .title {
                margin: .22rem 0 .3rem;
                font-size: $f30;
                color: $fc08;
            }
            .coin-box {
                font-size: $f30;
                span {
                    margin-right: .2rem;
                    font-size: .72rem;
                }
            }
            .rmb {
                margin: .28rem 0 .25rem;
                font-size: $f24;
            }
            .bind-box {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 3.47rem;
                height: .63rem;
                color: $fc02;
                font-size: $f24;
                background: $bg01;
                border-top-left-radius: .31rem;
                border-bottom-left-radius: .31rem;
                border-bottom-right-radius: .31rem;
                a {
                    margin-left: .2rem;
                    color: $fc11;
                    text-decoration: underline;
                }
            }
            .bind-box1 {
                font-size: $f24;
                color: $fc08;
                a {
                    color: $fc08;
                    text-decoration: underline;
                }
            }
        }
        &-intro {
            padding: .45rem .2rem 0;
            font-size: $f28;
            color: $fc04;
            span {
                padding: .26rem 0;
                display: block;
                border-bottom: 1px solid rgba(102, 102, 102, .2);
            }
        }
        &-list {
            padding: 0 .38rem 0 .2rem;
            &-ct {
                padding-top: .4rem;            
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: $f24;
                color: $fc04;
            }
            .img-box {
                margin-right: .23rem;
                width: .81rem;
                height: .81rem;
                border-radius: 50%;
                overflow: hidden;
            }
            .name-box {
                flex: 1;
                display: flex;
                flex-direction: column;
            }
            .name,
            .num
            {
                margin-bottom: .24rem;
                font-size: $f28;
                color: $fc02;
            }
            .price-box {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
            &-lucky {
                margin-top: .12rem;
                display: flex;
                justify-content: flex-end;
                font-size: $f24;
                color: $fc09;
                .lucky-icon {
                    width: .27rem;
                    height: .23rem;
                }
            }
        }
    }
</style>


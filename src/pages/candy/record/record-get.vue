<template>
    <div>
        <ul class="record-get" v-if="list.length">
            <li
                class="record-get-item"
                v-for="item in list"
                :key="item.id"
            >
                <span class="img-box" :class="!item.headIcon && 'no-photo'">
                    <img v-if="item.headIcon" :src="item.headIcon" />
                </span>
                <div class="from">
                    <p class="from-top">来自<span class="weight">{{item.nickName}}</span></p>
                    <p>{{item.createDate}}</p>
                </div>
                <div>
                    <p class="weight">{{item.receiveMoney}}{{item.coinName}}</p>
                    <p class="price">￥{{item.receiveMoneyRMB}}</p>
                </div>
            </li>
        </ul>
        <div v-else class="no-data"></div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            list: []
        }
    },
    created () {
        this.getMyInCandy()
    },
    methods: {
        getMyInCandy () {
            this.Ajax({
                method: 'getMyInCandy',
                hasToken: 1
            }).then(res => {
                if (res.code === '1') {
                    this.list = res.data
                } else {
                    this.Tost({
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
    .record-get {
        &-item {
            padding: 0 .12rem 0 .22rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.4rem;
            font-size: $f24;
            color: $fc04;
            border-bottom: 1px solid $bor01Opa;
        }
        .img-box {
            margin-right: .22rem;
            width: .88rem;
            height: .88rem;
            border-radius:50%;
            overflow: hidden;
        }
        .from {
            flex: 1;
            &-top {
                display: flex;
                align-items: flex-end;
                margin-bottom: .2rem;
            }
        }
        .weight {
            margin-left: .1rem;
            font-size: $f36;
            color: $fc06;
        }
        .price {
            margin-top: .2rem;
            text-align: right;
        }
    }
</style>


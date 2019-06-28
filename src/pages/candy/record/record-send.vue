<template>
    <div>
        <ul class="record-send" v-if="list.length">
            <li
                tag="li"
                class="record-send-item"
                v-for="item in list"
                :key="item.id"
            >
                <div>
                    <p class="top">{{item.candyTypeName}}</p>
                    <p>{{item.createDate}}</p>
                </div>
                <div>
                    <p class="top">{{item.totalNumber}}{{item.coinName}}</p>
                    <p class="status">{{item.useStatusName}}</p>
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
        this.getMyOutCandy()
    },
    methods: {
        getMyOutCandy () {
            this.Ajax({
                method: 'getMyOutCandy',
                hasToken: 1,
                pageNum: 1
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
    .record-send {
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
        .top {
            margin-bottom: .2rem;
            font-size: $f36;
            color: $fc06;
        }
        .status {
            text-align: right;
        }
    }
</style>


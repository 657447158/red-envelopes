<template>
    <div class="record">
        <div class="record-tabs">
            <router-link
                v-for="(item, index) in tabs"
                :key="index"
                :to="item.path"
            >{{item.name}}</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data () {
        return {
            router: this.$route.path,
            tabs: [{
                name: '抢到红包',
                path: '/record/get'
            }, {
                name: '发出红包',
                path: '/record/send'
            }]
        }
    },
    methods: {
        chooseTab (path) {
            if (this.router === path) return
            this.router = path
            this.$router.push(path)
        }
    }
}
</script>
<style lang="scss" scoped>
    .record {
        padding: 0 .2rem;
        &-tabs {
            padding: 0 1.27rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1rem;
            color: $fc03;
            font-size: $f30;
            border-bottom: 1px solid $bor01Opa;
            a {
                padding: 0 .12rem;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
            }
            .router-link-exact-active {
                position: relative;
                color: $fc01;
                &::before {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    content: '';
                    display: block;
                    width: 1.4rem;
                    height: .04rem;
                    background: $bg02;
                }
            }
        }
    }
</style>



<template>
    <div class="country-wrap">
        <select class="select" v-model="selectedCode">
            <option
                v-for="item in codeList"
                :key="item.id"
                :value="item.countryCode"
            >{{item.countryCh}} (+{{item.countryCode}})</option>
        </select>
        <div class="selected-val">
            <span>+{{selectedCode || 86}}</span>
            <i class="icon-mobile">&#xe6af;</i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'country-code',
    data () {
        return {
            codeList: [],
            selectedCode: 86
        }
    },
    created () {
        this.getCountryCodeList()
    },
    methods: {
        // 获取国家编码
        getCountryCodeList () {
            this.Ajax({
                method: 'getCountryCodeList',
                hasToken: 0
            }).then(res => {
                if (res.code === '1') {
                    this.codeList = res.data
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    watch: {
        selectedCode (val) {
            this.$emit('getCode', val)
        }
    }
}
</script>
<style lang="scss" scoped>
    .country-wrap {
        position: relative;
        width: 1.5rem;
        .select {
            position: absolute;
            left: 0;
            width: 1rem;
            opacity: 0;
        }
        .selected-val {
            display: flex;
            align-items: center;
        }
        .icon-mobile {
            margin-left: .12rem;
            font-size: $f12;
            color: $fc05;
        }
    }
</style>


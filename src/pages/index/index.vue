<template>
    <div class="home">
        <span class="img-box no-photo">
            <img src="" />
        </span>
        <p class="give-out">共发放
             <span v-if="candyType === 1">{{oneMoney * totalNumber}}</span> 
             <span v-else>{{totalMoney}}</span>
             枚 {{coinId.name}}</p>
        <div class="info-box">
            <div class="item border-bottom">
                <span class="left">代币</span>
                <div class="right" @click="showMoadl">
                    <span class="orange mr-12">{{coinId.name}}</span>
                    <span class="icon icon-mobile">&#xe6a8;</span>
                </div>
            </div>
            <div class="item border-bottom">
                <span class="left">{{candyType === 1 ? '单个总量' : '代币总量'}}</span>
                <div class="right">
                     <input type="number" placeholder="发放个数" v-model="count" min="0">枚
                </div>
            </div>
            <div class="item-sub">
                <span class="left gray">持有 {{coinId.name}} 总量<span>{{totalCoin}}</span></span>
                <div class="right">
                    <span class="gray">改为</span><span class="green" @click="changeType">{{candyType === 1 ? '手气红包' : '普通红包'}}</span>
                </div>
            </div>
            <div class="item border-bottom">
                <span class="left">红包个数</span>
                <div class="right">
                    <input type="number" placeholder="填写个数" v-model="totalNumber" min="0">个
                </div>
            </div>
            <div class="item border-bottom">
                <input class="left gray" placeholder="红包一响，黄金万两" v-model="command">
                <span class="right"></span>
            </div>
        </div>
        <button class="put-in" @click="showPasswordMoadl">塞钱进红包</button>
        <otc-modal :show="show" @hide="hide" dir="right" height="100%">
            <div style="width:100%;height:100%;overflow:scroll">
                <div 
                class="type-item"
                v-for="(item,index) in coinsType"
                :key=index
                @click='selectCoinsType(item)'
            >
                <div class="type-left">
                    <div class="avatar" :class="!item.image && 'no-photo'">
                        <img v-if="item.image" :src="item.image" />
                    </div>
                    {{item.title}}
                </div>
                <div class="type-right">{{item.name}}</div>
            </div>
            </div>
        </otc-modal>
        <div class="pass-wrapper">
            <otc-modal :show="showPassword" @hide="hidePassword" className="modal-wrapper" dir="none">
                <div class="pass-box">
                    <h5>请输入支付密码</h5>
                    <p>共需支付 <span v-if="candyType ===1">{{oneMoney*totalNumber}}</span><span v-else>{{totalMoney}}</span>  {{coinId.name}}</p>
                    <password-box @getPwd="checkPassword"></password-box>
                    <router-link tag="div" to="personal-index" class="tips">忘记密码？</router-link>
                </div>
            </otc-modal>
        </div>
    </div>
</template>
<script>
import PasswordBox from './passwordBox';


export default {
    data(){
        return{
            show: false,
            candyType: 0,
            showPassword: false,
            coinsType: [],
            coinId: {
                name:''
            },
            totalNumber: '',
            totalMoney: 0, // 1手气红包，糖果总量
            oneMoney: 0, // 普通红包，糖果单个总量
            command: '',
            count: '',
            totalCoin: 0
        }
    },
    mounted () {
        this.getCoinsType()
    },
    methods: {
        selectCoinsType (item) {
            this.coinId = item;
            this.totalCoin = item.totalCoin;
            this.show = false;
        },
        changeType () {
            this.candyType = this.candyType === 1 ? 0 : 1;
        },
        showMoadl () {
            this.show = true;
        },
        hide () {
            this.show = false;
        },
        showPasswordMoadl () {
            if (!this.count) {
                let msg = ''
                if (this.candyType === 0) {
                    // 手气红包
                    msg = '请输入正确的代币总量'
                } else {
                    // 普通红包
                    msg = '请输入正确的单个总量'
                }
                this.Toast({
                    message: msg
                })
                return
            }
            if (!this.totalNumber) {
                this.Toast({
                    message: '请输入正确的红包个数'
                })
                return
            }
            if (this.totalMoney > this.totalCoin) {
                this.Toast({
                    message: '余额不足'
                })
                return
            }
            this.showPassword = true;
        },
        hidePassword () {
            this.showPassword = false;
        },
        changeChoose () {
            setTimeout(()=>{
                this.hide()
            }, 500);
        },
        checkPassword (psw) {
            this.showPassword = false;
            //发送请求
            this.Ajax({
                method: 'checkUserPayPassword',
                hasToken: 1,
                payPassword: psw
            }).then(res => {
                if(res.code === '1'){
                    this.addCandy(res.data);
                }else{
                    this.Toast({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        addCandy (data) {
            this.Ajax({
                method: 'addCandy',
                hasToken: 1,
                requestNo: new Date().getTime(),
                coinId: this.coinId.id,
                candyType: this.candyType,
                totalNumber: this.totalNumber,
                totalMoney: this.totalMoney,
                oneMoney: this.oneMoney,
                command: this.command,
                payTimestamps: data.payTimestamps,
                payCertificate: data.payCertificate,
            }).then(res => {
                if (res.code === '1') {
                    this.$router.push({path: '/share-candy', query: {id: res._param_a}})
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
        getCoinsType(){
            this.Ajax({
                method: 'getCoins',
                hasToken: 1,
            }).then(res => {
                if (res.code ==="1") {
                    this.coinsType = res.data;
                    this.coinId = this.coinsType[0];
                    this.totalCoin = this.coinsType[0].totalCoin;
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    watch:{
        count(val){
            this.oneMoney = val;
            this.totalMoney = val;
        }
    },
    components:{
        PasswordBox
    }
}
</script>
<style lang="scss" scoped>
    .home{
        display: flex;
        flex-direction: column;
        align-items: center;
        .img-box {
            margin-top: .14rem;
            width: .97rem;
            height: .97rem;
            border-radius: 50%;
        }
        .border-bottom {
            border-bottom: 1px solid $bor01Opa;
        }
        .orange { color: $fc01; }
        .gray { color: $fc04; }
        .green { color: #2CC7B1; }
        .mr-12 {
            margin-right: .24rem;
            display: inline-block;
        }
        .give-out{
            margin-top: .3rem;
            display: flex;
            align-items: flex-end;
            font-size: $f30;
            color: $fc06;
            max-width: 100%;
            overflow: hidden;
            span{
                margin: 0 .1rem;
                font-size: .72rem;
                color: $fc01;
                max-width: 50%;
                overflow: hidden;
            }
        }
        .info-box{
            width: 100%;
            padding: .67rem .2rem;
            .item{
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: .9rem;
                color: $fc02;
                font-size: $f30;
                .right{
                    input{
                        margin-right: .1rem;
                        width: 1.2rem;
                        font-size: $f30;
                        text-align: right;
                        line-height: .34rem;
                    }
                }
            }
            .item-sub {
                margin: .35rem 0 .78rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: $f24;
                .right span {
                    margin-left: .1rem;
                }
            }
        }
        .put-in{
            margin-top: 0.8rem;
            width: 5.56rem;
            height: 0.9rem;
            border-radius: 0.45rem;
            background: $btn01;
            outline: none;
            border: none;
            font-size: $f30;
            color: $fc10;
            box-shadow: 0px 4px 18px 0px rgba(241,77,75,0.57);
            &:active {
                opacity: .8;
            }
        }
        .pass-wrapper{
            .modal-wrapper{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            /deep/ .otc-modal-content{
                top: 50%;
                left: 50%;    
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
                transform: translate(-50%, -50%);
                .pass-box{
                    width: 6.74rem;
                    height: 4.64rem;
                    border-radius: 0.1rem;
                    background: #ffffff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    h5{
                        // margin: 0.66rem 0;
                        margin-top: 0.66rem;
                        text-align: center;
                        font-size: $f36;
                        color: #333333;
                        font-weight: normal;
                    }
                    p{
                        margin: 0.4rem;
                        color:rgba(153,153,153,1);
                        font-size: 0.28rem;
                        span{
                            color: $fc11 ;
                        }
                    }
                    .tips{
                        font-size: $f28;
                        color: #00CFBF;
                        margin-top: 0.4rem;
                    }
                }
            }
        }
        .type-item{
            height: 1.2rem;
            background: #ffffff;
            display:flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.2rem 0.2rem;
            border-bottom: 1px solid $bor01;
            
            .type-left{
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: $f36;
                color:rgba(38,38,38,1);
                .avatar{
                    width: 0.72rem;
                    height: 0.72rem;
                    margin-right: 0.2rem;
                    border-radius: 50%;
                    border:0.02rem solid #dddddd;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: 80%;
                        height:80%;
                    }
                }
            }
            .type-right{
                font-size:$f30;
                font-weight:400;
                color:rgba(135,135,135,1);
                padding-right:1.4rem;
            }
        }
        .passwordbox{
            width:6.74rem;
            height:4.64rem;
            background:rgba(255,255,255,1);
            border-radius:10px;
        }
    }
</style>

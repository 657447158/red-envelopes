<template>
    <div class="home">
        <span class="img-box no-photo">
            <img src="" />
        </span>
        <p class="give-out">共发放 <span>40</span> 枚 ETH</p>
        <div class="info-box">
            <div class="item border-bottom">
                <span class="left">代币</span>
                <div class="right" @click="showMoadl">
                    <span class="orange mr-12">ETH</span>
                    <span class="icon icon-mobile">&#xe6a8;</span>
                </div>
            </div>
            <div class="item border-bottom">
                <span class="left">代币总量</span>
                <div class="right">
                    <span class="gray mr-12">1333</span>枚
                </div>
            </div>
            <div class="item-sub">
                <span class="left gray">持有 ETH 总量<span>2000</span></span>
                <div class="right">
                    <span class="gray">改为</span><span class="green" @click="changeType">{{packageType}}</span>
                </div>
            </div>
            <div class="item border-bottom">
                <span class="left">红包个数</span>
                <div class="right">
                    <input type="number" placeholder="填写个数">个
                </div>
            </div>
            <div class="item border-bottom">
                <input class="left gray" placeholder="红包一响，黄金万两">
                <span class="right"></span>
            </div>
        </div>
        <button class="put-in" @click="showPasswordMoadl">塞钱进红包</button>
        <otc-modal :show="show" @hide="hide" dir="right" height="100%">
            <div class="type-item">
                <div class="type-left">
                    <label class="radio">
                        <input type="radio" name="type" @change="changeChoose" ><i class="radios"></i>AAC
                    </label>
                </div>
                <div class="type-right">AcuteAngleCoin</div>
            </div>
            <div class="type-item">
                <div class="type-left">
                    <label class="radio">
                        <input type="radio" name="type"><i class="radios"></i>ACC
                    </label>
                </div>
                <div class="type-right">AcuteAngleCoin</div>
            </div>
        </otc-modal>
        <otc-modal :show="showPassword" @hide="hidePassword">
            <password-box></password-box>
        </otc-modal>
    </div>
</template>
<script>
import PasswordBox from './passwordBox';

const NORMAL="普通红包";
const LUCKY="拼手气红包";
export default {
    data(){
        return{
            show:false,
            packageType:NORMAL,
            showPassword:false,
        }
    },
    methods:{
        changeType(){
            this.packageType = this.packageType ===NORMAL?LUCKY:NORMAL;
        },
        showMoadl(){
            this.show = true;
        },
        hide(){
            this.show = false;
        },
        showPasswordMoadl(){
            this.showPassword = true;
        },
        hidePassword(){
            this.showPassword = false;
        },
        changeChoose(){
            setTimeout(()=>{
                this.hide()
            },500);
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
            span{
                margin: 0 .1rem;
                font-size: .72rem;
                color: $fc01;
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
        /deep/ .otc-modal-content{
            padding: .2rem;
        }
        .choose-modal{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: red;
        }
        .type-item{
            height: 1.2rem;
            background: #ffffff;
            display:flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.2rem 0.2rem;
            border-bottom: 1px solid $bor01Opa;
            label{
                display: flex;
                align-items: center;
                position: relative;
                font-size:$f36;
                font-weight:400;
                color:rgba(38,38,38,1);
                input{
                    visibility: hidden;
                    opacity: 0;
                    position: absolute;
                    left: 0;
                    width: 0.72rem;
                    height: 0.72rem;
                    z-index: 99999;
                    cursor: pointer;
                }
                // input:checked + .radios{
                //     background: red;
                // }
                .radios{
                    display: inline-block;
                    width: 0.72rem;
                    height: 0.72rem;
                    border-radius: 50%;
                    background: #ffffff;
                    border: 1px solid #dddddd;
                    margin-right: 0.3rem;
                    transition: all 300ms;
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

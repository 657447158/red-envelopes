<template>
    <div class='am-payPwd' :id="`ids_${id}`">
        <!-- <input type="password"
               readonly
               onfocus="this.removeAttribute('readonly');"
               maxlength="1"
               autocomplete="new-password"
               @input="changeInput"
               @click="changePwd"
               v-model="pwdList[i]"
               @keyup="keyUp($event)"
               @keydown="oldPwdList = pwdList.length"
               class="shortInput"
               v-for="(v, i) in 6" :key="i"> -->
               <input type="text"  v-model="password" @focus="inputFocus" @blur="inputBlur"  @keyup="keyUp($event)">
                <span class="shortInput"  v-for="(v, i) in 6" :key="i" >
                    <i v-show="i <=password.length && isFocus" :class="{'focus':password.length ==i}"></i>

                </span>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                pwdList: [],
                oldPwdList: [],
                isDelete: false,
                ipt: '',
                password:'',
                isFocus:false,
            }
        },
        props: {
            id:{
                type:String, // 当一个页面有多个密码输入框时，用id来区分
                default:"1"
            }
        },
        mounted () {
            this.ipt = document.querySelectorAll(`#ids_${this.id} .shortInput`)
        },
        methods:{
            inputFocus(){
                console.log('获取到焦点');
                this.isFocus = true;
            },
            inputBlur(){
                console.log('失去焦点');
                this.isFocus = false;
                this.password = '';
            },
            keyUp (ev) {
                // let index = this.pwdList.length
                // if (!index) return
                // if (ev.keyCode === 8) {
                //     this.isDelete = true
                //     if (this.oldPwdList === this.pwdList.length) {
                //         if (index === this.pwdList.length) {
                //             this.pwdList.pop()
                //         }
                //         index--
                //     } else {
                //         index > 0 && index--
                //     }
                //     this.ipt[index].focus()
                // } else if (this.isDelete && index === this.pwdList.length && /^\d$/.test(ev.key)) {
                //     this.isDelete = false
                //     this.pwdList.pop()
                //     this.pwdList.push(ev.key)
                //     this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus()
                // }
                console.log('ddd');
                if(this.password.length ===6){
                    this.$emit('getPwd', this.password);
                }
                // if(this.pwdList.join('').length == 6){
                //      this.$emit('getPwd', this.pwdList.join(''));
                //      this.pwdList =[];
                     
                // }
            },
            changePwd () {
                let index = this.pwdList.length
                index === 6 && index--
                this.ipt[index].focus()
            },
            changeInput () {
                let index = this.pwdList.length
                let val = this.pwdList[index - 1]
                if (!/[0-9]/.test(val)) {
                    this.pwdList.pop()
                    return
                }
                if (!val) {
                    this.pwdList.pop()
                    index--
                    if (index > 0) this.ipt[index - 1].focus()
                } else {
                    if (index < 6) this.ipt[index].focus()
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

    .am-payPwd {
        display: inline-block;
        border-radius: 5px;
        border: 1px solid #cccccc;
        position: relative;
        margin-left: 1px;
        input{
            position: absolute;
            left: 0;
            right:0;
            top: 0;
            bottom: 0;
            background: red;
            width: 100%;
            opacity: 0;
        }
        .shortInput {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 30px;
            float: left;
            width: 1rem;
            height: 1rem !important;
            color: #333;
            outline: #ff0067;
            border-right: 1px solid rgba(209, 209, 209, 1);
            &.focus{
                i{
                    width:1px;
                    height:16px;
                    animation: blink 1s infinite steps(1, start)
                }
            }
            i{
                display: block;
                width: .12rem;
                height: .12rem;
                border-radius: 50%;
                background: $fc06;
                &.focus{
                    width:1px;
                    height:0.4rem;
                    animation: blink 1s infinite steps(1, start)
                }
            }
            &:last-child{
                border-right:0;
             }
        }
    }
    @keyframes blink {
        0%{
            background-color: white;
        }
        50% {
         background-color: black;
        }
        100% {
            background-color: white;
        }
    }
</style>
<template>
    <div class='am-payPwd' :id="`ids_${id}`">
        <input type="password"
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
               v-for="(v, i) in 6" :key="i">
    </div>
</template>
<script>
    export default {
        data () {
            return {
                pwdList: [],
                oldPwdList: [],
                isDelete: false,
                ipt: ''
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
            keyUp (ev) {
                let index = this.pwdList.length
                if (!index) return
                if (ev.keyCode === 8) {
                    this.isDelete = true
                    if (this.oldPwdList === this.pwdList.length) {
                        if (index === this.pwdList.length) {
                            this.pwdList.pop()
                        }
                        index--
                    } else {
                        index > 0 && index--
                    }
                    this.ipt[index].focus()
                } else if (this.isDelete && index === this.pwdList.length && /^\d$/.test(ev.key)) {
                    this.isDelete = false
                    this.pwdList.pop()
                    this.pwdList.push(ev.key)
                    this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus()
                }
                if(this.pwdList.join('').length == 6){
                     this.$emit('getPwd', this.pwdList.join(''));
                     this.pwdList =[];
                     
                }
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
        .shortInput {
            text-align: center;
            font-size: 30px;
            float: left;
            width: 1rem;
            height: 1rem !important;
            color: #333;
            outline: #ff0067;
            border-right: 1px solid rgba(209, 209, 209, 1);
            &:last-child{
                border-right:0;
             }
        }
    }
</style>
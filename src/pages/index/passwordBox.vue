<template>
  <div class="am-payPwd">
    <input
      type="text"
      v-model="password"
      @focus="inputFocus"
      @blur="inputBlur"
      @keyup="keyUp($event)"
    >
    <span class="shortInput" v-for="(v, i) in 6" :key="i">
      <i v-show="i <=password.length && isFocus" :class="{'focus':password.length ==i}"></i>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pwdList: [],
      oldPwdList: [],
      isDelete: false,
      ipt: '',
      password: '',
      isFocus: false
    };
  },
  methods: {
    inputFocus() {
      this.isFocus = true;
    },
    inputBlur() {
      this.isFocus = false;
      this.password = "";
    },
    keyUp() {
      if (this.password.length === 6) {
        this.$emit("getPwd", this.password);
      }
    },
    changePwd() {
      let index = this.pwdList.length;
      index === 6 && index--;
      this.ipt[index].focus();
    }
  }
};
</script>
<style lang="scss" scoped>
.am-payPwd {
  display: inline-block;
  border-radius: 5px;
  border: 1px solid #cccccc;
  position: relative;
  margin-left: 1px;
  input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    color: transparent;
    caret-color: transparent;
    background: transparent;
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
    &.focus {
      i {
        width: 1px;
        height: 16px;
        animation: blink 1s infinite steps(1, start);
      }
    }
    i {
      display: block;
      width: 0.12rem;
      height: 0.12rem;
      border-radius: 50%;
      background: $fc06;
      &.focus {
        width: 1px;
        height: 0.4rem;
        animation: blink 1s infinite steps(1, start);
      }
    }
    &:last-child {
      border-right: 0;
    }
  }
}
@keyframes blink {
  0% {
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
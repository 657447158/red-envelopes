import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import Ajax from './service/axios'
import Toast from './components/toast'
import './components'
import './utils/scale_750'
import './assets/styles/layout.scss'

Vue.config.productionTip = false
Vue.prototype.Ajax = Ajax
Vue.use(Toast)

router.beforeEach((to, from, next) => {
  let nodeList = document.querySelectorAll('.mask')
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].click()
  }
  if (to.query.token) {
    localStorage.setItem("candytoken", to.query.token)
  }
  next()
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

import axios from 'axios'
import Toast from '@/components/toast'
let baseURL = ''

export default function ajax (p) {
    let options = {
        baseURL: baseURL,
        type: 'POST',
        url: '',
        loading: true,
        params: {
            token: localStorage.getItem('candytoken'),
            mediaType: 'h5'
        }
    }
    options.params = Object.assign({...options.params}, {...p})
    return new Promise((resolve, reject) => {
        let t
        let timer
        if (timer) {
            clearTimeout(timer)
        }
        if (options.loading) {
            t = Toast({
                show: true,
                type: 'loading',
                duration: 1000000
            })
        }
        axios({
            method: options.type,
            baseURL: '/api',
            url: options.url,
            params: options.params
        }).then(response => {
            if (options.loading) {
                t.show = false
            }
            resolve(response.data)
        }).catch(error => {
            if (options.loading) {
                t.type = 'error'
                t.message = '服务器错误'
                timer = setTimeout(() => {
                    t.show = false
                }, 1000)
            }
            reject(error)
        })
    })
}
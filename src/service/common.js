import ajax from './axios'

export default {
    /**
     * [(重点 )进去otc时调用]
     */
    initOtcUser (params) {
        return ajax({
            type: 'POST',
            url: '/api/otc/initOtcUser',
            params: Object.assign({...params})
        })
    }
}

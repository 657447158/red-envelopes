const routes = [
    {
        path: '/',
        redirect: '/index',
        component: () => import('../pages/index/index')
    },
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '发红包'
        },
        component: () => import('../pages/index/index')
    },
    {
        path: '/personal-index',
        name: 'personal-index',
        meta: {
            title: '我的'
        },
        component: () => import('../pages/personal/index')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '绑定手机号并登录'
        },
        component: () => import('../pages/login/index'),
        children: [
            {
                path: '',
                redirect: 'code'
            },
            {
                path: '/login/code',
                name: 'code',
                meta: {
                  title: '绑定手机号并登录'
                },
                component: () => import('../pages/login/login-code.vue')
            },
            {
                path: '/login/psd',
                name: 'psd',
                meta: {
                  title: '绑定手机号并登录'
                },
                component: () => import('../pages/login/login-psd.vue')
            }
        ]
    },
    {
        path: '/record',
        name: 'record',
        meta: {
            title: '红包记录'
        },
        component: () => import('../pages/candy/record/index.vue'),
        children: [
            {
                path: '',
                redirect: '/record/get'
            },
            {
                path: '/record/get',
                name: 'record-get',
                meta: {
                    title: '抢到红包'
                },
                component: () => import('../pages/candy/record/record-get.vue')
            },
            {
                path: '/record/send',
                name: 'record-send',
                meta: {
                    title: '发出红包'
                },
                component: () => import('../pages/candy/record/record-send.vue')
            }
        ]
    },
    {
        path: '/details',
        name: 'details',
        meta: {
            title: '红包详情'
        },
        component: () => import('../pages/candy/details/index.vue')
    },
    {
        path: '/open-candy',
        name: 'open-candy',
        meta: {
            title: '开红包'
        },
        component: () => import('../pages/candy/open/index.vue')
    },
    {
        path: '/share-candy',
        name: 'share-candy',
        meta: {
            title: '分享红包'
        },
        component: () => import('../pages/candy/share/index.vue')
    }
]

export default routes
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
    }
]

export default routes
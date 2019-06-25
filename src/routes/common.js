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
    }
]

export default routes
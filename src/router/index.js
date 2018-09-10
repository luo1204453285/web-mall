const navigation = r => require.ensure([], () => r(require('../pages/navigation')), 'navigation')
// const navigationPhase1 = r => require.ensure([], () => r(require('../pages/navigation/phase1')), 'navigation')
// const navigationPhase2 = r => require.ensure([], () => r(require('../pages/navigation/phase2')), 'navigation')
const pageView = r => require.ensure([], () => r(require('../pages/index')), 'pages')
//店铺
const homeView = r => require.ensure([], () => r(require('../pages/home/index')), 'home')
const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')



export default [{
    path: '/',
    component: pageView,
    children: [{
        path: 'navigation',
        component: navigation
    },
    {
        path: 'home',
        component: homeView,
        children: [
            //店铺首页
            {
                name: 'home',
                path: '/',
                component: home,
                meta: {
                     title: '视频'
                }
            }, 
        ]
    },{
        path: '*',
        redirect: '/home'
    }
    ]
}]
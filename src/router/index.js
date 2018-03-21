import Vue from 'vue'
import Router from 'vue-router'
// import Recommend from 'components/recommend/recommend'
// import Rank from 'components/rank/rank'
// import Singer from 'components/singer/singer'
// import Search from 'components/search/search'
// import SingerDetail from 'components/singer-detail/singer-detail'
// import Disc from 'components/disc/disc'
// import TopList from 'components/topList/topList'
Vue.use(Router)
//按需异步加载
const Recommend = () =>
    import('components/recommend/recommend')
const Rank = () =>
    import("components/rank/rank")
const Singer = () =>
    import("components/singer/singer")
const Search = () =>
    import("components/search/search")
const SingerDetail = () =>
    import("components/singer-detail/singer-detail")
const Disc = () =>
    import("components/disc/disc")
const TopList = () =>
    import("components/topList/topList")
const UserCenter = () => import('components/user-center/user-center')
export default new Router({
    routes: [{
        path: '/',
        redirect: '/recommend'
    },
    {
        path: '/recommend',
        component: Recommend,
        children: [{
            path: ':id',
            component: Disc
        }]
    },
    {
        path: '/Rank',
        component: Rank,
        children: [{
            path: ':id',
            component: TopList
        }]
    },
    {
        path: '/Singer',
        component: Singer,
        children: [{
            path: ':id',
            component: SingerDetail
        }]
    }, {
        path: '/Search',
        component: Search
    },
    {
        path: '/user',
        component: UserCenter
    }
    ]
})
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import List from './views/List.vue'
import Detail from './views/Detail.vue'
Vue.use(Router)
const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  children: [{ path: "/list", name: "list", component: List }, { path: "detail/:id", component: Detail, props: true }, ]
}, {
  path: '/about',
  name: 'about',
  meta: { auth: true },
  //   beforeEnter(to, from, next) {
  //     // 路由内部知道自己需要认证
  //     if (!window.isLogin) {
  //         // ...
  //     } else {
  //         next();
  //     }
  // },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import ( /* webpackChunkName: "about" */ './views/About.vue')
}]
const router = new Router();
router.addRoutes(routes);
export default router
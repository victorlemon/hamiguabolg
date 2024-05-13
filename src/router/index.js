import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutLogin from '../views/AboutLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: AboutLogin
    },
    //文章详情页的方法：
    //后端建立一个接口，根据文章id返回文章详情
    //在router/index.js中添加路由/post/:id，以及相应的组件
    //在components文件夹中新建一个PostDetail.vue文件，根据后端接口（文章id返回文章详情）返回的数据渲染文章详情
    //然后在List.vue中的每个文章页添加一个链接 <router-link :to="`/post/${post.id}`">，链接到文章详情页

    {
      path: '/post/:id',
      name: 'PostDetail',
      component: () => import('@/components/PostDetail.vue')
    }
  ]
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Footer from './components/conmen/Footer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      components: {
        default: () => import('./views/home/home.vue'),
        footer: Footer
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      components: {
        default: () => import('./views/detail/detail.vue')
      }
    },
    {
      path: '/movie',
      name: 'movie',
      components: {
        default: () => import('./views/movie/movie.vue'),
        footer: Footer
      }
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        default: () => import('./views/cart/cart.vue'),
        footer: Footer
      }
    },
    {
      path: '/close',
      name: 'close',
      components: {
        default: () => import('./views/cart/close.vue')
      }
    },
    {
      path: '/address',
      name: 'address',
      components: {
        default: () => import('./views/cart/address.vue')
      }
    },
    {
      path: '/user',
      name: 'user',
      components: {
        default: () => import('./views/user/user.vue'),
        footer: Footer
      },
      children: [
        {
          path: '/user/login',
          name: 'user/login',
          component: () => import('./components/conmen/user/login.vue')
        },
        {
          path: '/user/nologin',
          name: 'user/nologin',
          component: () => import('./components/conmen/user/nologin.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: () => import('./views/login/login.vue')
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        default: () => import('./views/register/register.vue')
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

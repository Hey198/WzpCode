import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

 

  //等级页面
  {
    path: '/level',
    meta: { title: '等级管理', icon: 'form' },
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'levelList',
        component: () => import('@/views/level/list'),
        meta: { title: '等级列表', icon: 'form' }
      }, {
        path: 'add',
        name: 'levelAdd',
        component: () => import('@/views/level/add'),
        meta: { title: '添加等级', icon: 'form' }
      }
    ]
  },
  //位置页面
  {
    path: '/location',
    meta: { title: '位置管理', icon: 'form' },
    component: Layout,
    children: [
      {
        path: 'list2',
        name: 'locationList',
        component: () => import('@/views/location/list'),
        meta: { title: '位置列表', icon: 'form' },
      },
      {
        path: 'add2',
        name: 'locationAdd',
        component: () => import('@/views/location/add'),
        meta: { title: '添加位置', icon: 'form' }
      }

    ]
  },
  //信息管理
  {
    path: '/information',
    meta: { title: '信息管理', icon: 'form' },
    component: Layout,
    children: [
      {
        path: 'list3',
        name: 'inforationList',
        component: () => import('@/views/information/list'),
        meta: { title: '信息列表', icon: 'form' }
      },
      {
        path: 'add3',
        name: 'informationAdd',
        component: () => import('@/views/information/add'),
        meta: { title: '添加信息', icon: 'form' }
      }


    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

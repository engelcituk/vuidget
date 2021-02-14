export default [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "Login" */ './views/Login.vue')
    },
    {
      path: '/sales',
      name: 'sales',
      component: () => import(/* webpackChunkName: "Sales" */ './views/Sales.vue'),
      meta:{ requiresAuth: true }
    },
    {
      path: '/bankresponse',
      name: 'bankresponse',
      component: () => import(/* webpackChunkName: "Paymentresponse" */ './views/StatusPayment.vue'),
      // meta:{ requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "Dashboard" */ './views/Dashboard.vue'),
      meta:{ requiresAuth: true, isAffiliate: true }
    },
    {
      path: '/operation',
      name: 'operation',
      component: () => import(/* webpackChunkName: "Dashboard" */ './views/Operation.vue'),      
      meta:{ requiresAuth: true, isAffiliate: true }

    },
  ]
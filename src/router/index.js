import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/routes'
import store from '../store/index'; //para acceder a state para isLogged
Vue.use(Router)

const router = new Router({
  routes
  // mode: 'history',
})

router.beforeEach((to, from, next)=> {
  const requiresAuth = to.matched.some( record => record.meta.requiresAuth)
  const isAffiliate = to.matched.some( record => record.meta.isAffiliate)
  
  const isLogged = store.state.auth.isLogged //del store a state modulo auth en la key isLogged

  //si está en el path de login, no requiere auth y está logueado
  if( !requiresAuth && isLogged && to.path === '/login'){
    next('/sales')
  } 
  //para ver si el usuario conectado verifico si este es afiliado
  // if( isAffiliate && isLogged && to.path === '/dashboard' || to.path === '/operation'){
  //   const group = store.state.auth.user.group || ''
  //   if(group === 'Affiliate'){
  //     next('/sales')
  //   }
  // }

  if( requiresAuth && !isLogged) {
    next('/login')
  }else {
    next()
  }
})

export default router

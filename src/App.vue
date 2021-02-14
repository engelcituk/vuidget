<template>
  <div id="app">
    <Loading :active.sync="loading"></Loading>
    <!-- Muestro la navegación de acuerdo si el user está loggueado-->
    <NavigationGuest v-if="!isLogged"></NavigationGuest>
    <NavigationLogged v-else :user="user"></NavigationLogged>
    <router-view/>
    <Footer ></Footer>    
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import NavigationGuest from '@/components/shared/navigations/Guest'
  import NavigationLogged from '@/components/shared/navigations/Logged'
  import Footer from '@/components/shared/footer/Footer'

  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.css'

  export default {
    
    components: {
      NavigationGuest,
      NavigationLogged,
      Footer,
      Loading
    },
    computed:{
      ...mapState('auth',['isLogged','user']),          
      ...mapState(['loading']),      
      
	
    },
    
    
  }
</script>



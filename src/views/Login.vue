<template class="">
  <b-container class="mt-4 mb-5">

    <div class="text-center text-muted">
      <h3>Iniciar sesión</h3>
    </div>    

        <b-alert
            variant="danger"
            dismissible
            fade
            :show="error"
            @dismissed="closeDismissibleAlert"
        >            
            <div v-html="errorMessage"></div>

        </b-alert>
    
    <Login :user="user" @login="submit"></Login>  
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Login from '@/components/auth/Login';

export default {
  components: {
    Login    
  },
  data(){
    return {
      user: {
        username:'',
        password:''        
      }
    }
  },
  computed: {
    ...mapState('auth',['error','errorMessage','isLogged'])
  },
  methods:{
    ...mapActions('auth', ['signIn']),
    ...mapMutations('auth', ['unsetError']),
    async submit(){
      
      await this.signIn( this.user )
      this.$router.push('/sales')
    },
    closeDismissibleAlert(){
        this.unsetError()
    } 
  }
  
}
</script>

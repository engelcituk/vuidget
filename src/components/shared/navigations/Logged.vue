<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand to="/sales">The Fives Sales</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>            
              <b-nav-item to="/sales" exact exact-active-class="active"  >Sales </b-nav-item>            
              <!-- <b-nav-item to="/dashboard" exact exact-active-class="active" v-if="user.group !='Affiliate' ">Dashboard </b-nav-item>                                          
              <b-nav-item to="/operation" exact exact-active-class="active" v-if="user.group !='Affiliate'">Operation </b-nav-item>-->
              <b-nav-item to="/dashboard" exact exact-active-class="active" >Dashboard </b-nav-item>                                          
              <b-nav-item to="/operation" exact exact-active-class="active" >Operation </b-nav-item>                                           
          </b-navbar-nav> 

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{user.name}} {{user.lastname}} </em>
              </template>              
              <b-dropdown-item @click="_clearAll" > <b-icon icon="gear-fill" aria-hidden="true"></b-icon> Clear Everything and Exit</b-dropdown-item>
              <b-dropdown-item @click="_logout" > <b-icon icon="power"></b-icon> Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav> 
        </b-collapse>
      </b-navbar>
</template>


<script>
    import Vue from 'vue'
    import { mapMutations,mapGetters, mapState } from 'vuex'

    export default {
      
      computed:{
            ...mapState('cart',['cart','cliente']),
            ...mapGetters('auth',['userInfoGetter']),
      },
      methods:{
          ...mapMutations('auth',['logout']),
          ...mapMutations('cart',['setEmptyCart']),

          _logout(){
              this.logout()
              this.$router.push('/login')                
          },

          _clearAll(){
            Vue.swal({
              title: `All data in the application will be cleaned`,
              text: `Do you want to clean up your data and log in again?`,
              icon: 'warning',                
              allowOutsideClick: false,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, clear!',
              cancelButtonText: 'Cancel!'
            }).then((result) => {
              if (result.value) {
                  this.logout()
                  this.setEmptyCart()
                  localStorage.clear()
                  this.$router.push('/login')
              }
            })
          }

      },
      props:{
          user: {
              type: Object,
              required: true
          }
      }       
  }
  /**
  
// v-if="$route.name != 'operation'"
// v-if="$route.name != 'operation'"
// v-if="$route.name != 'operation'"
 */
</script>


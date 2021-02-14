<template>

  <b-container class="mt-4 mb-5" v-if="success">          
    <b-col class="col-md-12" >
      <h3 class="text-center"> Thanks for your payment </h3>            
      <div class="swal2-icon swal2-success swal2-animate-success-icon" style="display: flex; font-size:2em;">
          <div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);">          
          </div>
          <span class="swal2-success-line-tip">            
          </span>
          <span class="swal2-success-line-long">            
          </span>
          <div class="swal2-success-ring">
          </div> 
          <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);">            
          </div>
          <div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);">            
          </div>
      </div> 
                   
    </b-col>      
    <hr>
    <b-col class="col-md-12">
      <h5 class="text-center"> Your payment was completed successfully </h5> 
    <hr>
    <div class="table-responsive">
      <table class="table table-bordered">
          <thead class="thead-dark">
            <tr >
              <th scope="col">Reference</th>
              <th scope="col">Authorization number</th>
              <!-- <th scope="col">nbResponse</th> -->
              <th scope="col">Email</th>              
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>              
              <td>{{referencia}}</td>
              <td>{{nuAut}}</td>
              <!-- <td>{{nbResponse}}</td> -->
              <td>{{email}}</td>
              <td>{{importe}}</td>
            </tr>            
          </tbody>
        </table>
    </div>
                   
    </b-col>   
    <b-col class="col-md-12" v-if="user">
      <p class="text-center">
        <router-link to="/sales" class="btn btn-info">
          <b-icon-cart-check-fill></b-icon-cart-check-fill>
            Back to start
        </router-link>
      </p>  
    </b-col> 
    <br><br>
  </b-container>

  <b-container class="mt-4 mb-5" v-else>
    <b-col class="col-md-12" > 
      <h3 class="text-center"> The transaction has been declined</h3>            
      <div class="swal2-icon swal2-error swal2-animate-error-icon" style="display: flex; font-size:2em;">
        <span class="swal2-x-mark">
          <span class="swal2-x-mark-line-left"></span>
          <span class="swal2-x-mark-line-right"></span>
        </span>
      </div>              
    </b-col>
    <b-col class="col-md-12">        
       <hr>
      <h5 class="text-center"> An error has occurred with the payment, the process has failed </h5><hr>
       <div class="table-responsive">
        <table class="table table-bordered">
            <thead class="thead-dark">
              <tr >
                <th scope="col">Reference</th>
                <th scope="col">Authorization number</th>

                <!-- <th scope="col">nbResponse</th> -->
                <th scope="col">Email</th>              
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>              
                <td>{{referencia}}</td>
                <td>{{nuAut}}</td>
                <!-- <td>{{nbResponse}}</td> -->
                <td>{{email}}</td>
                <td>{{importe}}</td>
              </tr>            
            </tbody>
          </table>
      </div> 

    </b-col>
    <b-col class="col-md-12 mb-5">
      
        <router-link to="/sales" class="btn btn-info float-left" v-if="user">
          <b-icon-cart-check-fill></b-icon-cart-check-fill>
            Back to start         
        </router-link>
        <b-button variant="success" class="float-right"
            @click="_retryPayment"          
        >
          <b-icon icon="credit-card" aria-hidden="true"></b-icon>
          Retry payment
        </b-button>
                     
    </b-col>
    <br><br>
  </b-container>
</template>


<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  require("../assets/css/success.css")

  export default {
    mounted(){     
      if(this.success){
        this.clearInfoCartCliente()                                                   
      }
    },
    data(){
      return {
        success: (this.$route.query.success === 'true') ? true : false,
        nbResponse: this.$route.query.nbResponse,
        referencia: this.$route.query.referencia,
        importe: this.$route.query.importe,
        nuAut: this.$route.query.nuAut,        
        email: this.$route.query.email,        

      }
    },
     computed:{        
        ...mapState('cart',['cliente','cart']),
        ...mapState('auth',['user']),

    },
    methods:{
      ...mapActions('cart',['sendInfoClient']),
      ...mapMutations('cart',['setEmptyCart'])       ,
      async _retryPayment(){                  
        await this.sendInfoClient(this.cliente)
      },
      clearInfoCartCliente(){        
        this.setEmptyCart()        
      }      
    }
  }
</script>

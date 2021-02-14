<template>
    <b-row>
        <b-col class="col-md-12">  
            <ValidationObserver ref="observer" v-slot="{ invalid }" >
                <b-form @submit.prevent="$emit('send-info-client')">
                    <div class="accordion" role="tablist">
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-button block v-b-toggle.accordion-1 variant="info"> <b-icon-info-circle-fill></b-icon-info-circle-fill> Customer data:</b-button>
                            </b-card-header>
                            <b-collapse id="accordion-1"  accordion="my-accordion" role="tabpanel">
                                <b-card-body>

                                    <ValidationProvider name="Hoteles" rules="required">
                                        <b-form-group slot-scope="{ valid, errors }" label="Choose hotel:">
                                        <b-form-select 
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            @change="_setHotelCliente(cliente.hotel)"
                                            v-model="cliente.hotel">
                                            <option value="">Choose the hotel</option>                                            
                                            <option v-for="hotel in hotels" :key="hotel.id" :value="hotel.id">{{hotel.name}}</option>
                                        </b-form-select>
                                            <b-form-invalid-feedback>
                                            {{ errors[0] }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </ValidationProvider>

                                    <ValidationProvider rules="required" name="nombre">
                                        <b-form-group 
                                            slot-scope="{ valid, errors }"
                                            label="Name"
                                        >
                                            <b-form-input
                                                type="text"
                                                v-model="cliente.name"
                                                :state="errors[0] ? false : (valid ? true : null)"     
                                                placeholder="Enter name customer"
                                                @blur="$emit('set-name-client', cliente.name)"
                                            >
                                            </b-form-input>
                                            <b-form-invalid-feedback>
                                                {{ errors[0] }} 
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </ValidationProvider>

                                    <ValidationProvider rules="required" name="apellidos">
                                        <b-form-group 
                                            slot-scope="{ valid, errors }"
                                            label="Last name"
                                        >
                                            <b-form-input
                                                type="text"
                                                v-model="cliente.lastname"
                                                :state="errors[0] ? false : (valid ? true : null)"     
                                                placeholder="Enter last name customer"
                                                @blur="$emit('set-lastname-client', cliente.lastname)"
                                            >
                                            </b-form-input>
                                            <b-form-invalid-feedback>
                                                {{ errors[0] }} 
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </ValidationProvider>

                                    <ValidationProvider rules="required|email" name="email">
                                        <b-form-group 
                                            slot-scope="{ valid, errors }"
                                            label="Customer email"
                                        >
                                            <b-form-input
                                                type="email"
                                                v-model="cliente.email"
                                                :state="errors[0] ? false : (valid ? true : null)"
                                                placeholder="Enter email customer"
                                                @input="$emit('set-email-client', cliente.email)"
                                            >
                                            </b-form-input>
                                            <b-form-invalid-feedback>
                                                {{ errors[0] }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </ValidationProvider>

                                    <ValidationProvider rules="required|min:10" name="telefono" vid="phone">
                                        <b-form-group 
                                            slot-scope="{ valid, errors }"
                                            label="Phone"
                                        >      
                                            <b-form-input
                                                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                                                maxlength="10"
                                                type="number"
                                                v-model="cliente.phone"
                                                :state="errors[0] ? false : (valid ? true : null)"
                                                placeholder="Enter the customer's phone"
                                                @blur="$emit('set-phone-client', cliente.phone)"                                    
                                            >
                                            </b-form-input>
                                            <b-form-invalid-feedback>
                                                {{ errors[0] }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </ValidationProvider>                             

                                     <ValidationProvider name="forma de pago" rules="required">
                                        <b-form-group slot-scope="{ valid, errors }" label="Choose a payment method:">
                                        <b-form-select 
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            @change="$emit('set-payment-method-client', cliente.paymentmethod)"
                                            v-model="cliente.paymentmethod">
                                            <option value="">Choose payment method</option>                                            
                                            <option v-for="pm in paymentMethods" :key="pm.id" :value="pm.id">{{pm.name}}</option>
                                        </b-form-select>
                                            <b-form-invalid-feedback>
                                            {{ errors[0] }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </ValidationProvider>

                                    <ValidationProvider rules="min:0" name="referencia">
                                        <b-form-group 
                                            slot-scope="{ valid, errors }"
                                            label="Reference"
                                        >
                                            <b-form-input
                                                type="text"
                                                v-model="cliente.paymentreference"
                                                :state="errors[0] ? false : (valid ? true : null)"     
                                                placeholder="Enter the reference"
                                                @blur="$emit('set-reference-client', cliente.paymentreference)"
                                            >
                                            </b-form-input>
                                            <b-form-invalid-feedback>
                                                {{ errors[0] }} 
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </ValidationProvider>

                                    <ValidationProvider rules="min:0" name="paymentlink">
                                        <b-form-group 
                                            slot-scope="{ valid, errors }"
                                            label="Payment link"
                                        >
                                            <b-form-input
                                                type="text"
                                                v-model="cliente.paymentlink"
                                                :state="errors[0] ? false : (valid ? true : null)"     
                                                placeholder="Enter payment link"
                                                @blur="$emit('set-payment-link-client', cliente.paymentlink)"
                                            >
                                            </b-form-input>
                                            <b-form-invalid-feedback>
                                                {{ errors[0] }} 
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </ValidationProvider>
                                  
                                </b-card-body>
                            </b-collapse>
                        </b-card>    
                    </div>
                    <b-row class="mb-2">                        
                        <b-col class="col-md-12">                                                                             
                            <b-alert show variant="info">
                                <label for="divisaSelect"></label>
                                        <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3">Currency</span>
                                        </div>
                                        <b-form-select 
                                                id="divisaSelect"   
                                                @change="calcularImportes"
                                                v-model="cliente.currency">                                                                                       
                                                <option v-for="cur in currencies" :key="cur.id" :value="cur">{{cur.code}}</option>
                                            </b-form-select> 
                                        </div>
                                        <strong>Subtotal: </strong> 
                                        ${{( (Math.round( (parseFloat(totalDiscountByProductsGetter) + parseFloat(totalBreakdown.total)) * 100) / 100).toFixed(2) )}}                                 
                                        <br>
                                        <strong>Discount: </strong> ${{totalDiscountByProductsGetter}} 
                                        <br> 
                                        <strong>Total: </strong> ${{( (Math.round( (totalBreakdown.total ) * 100) / 100).toFixed(2) )}}
                                    <hr>  
                                    <strong>TC: </strong>  ${{ ( (Math.round( (cliente.currency.value) * 100) / 100).toFixed(2) )}} <br>                                                                                                  
                                    <strong>Total Currency: </strong>  ${{divisaTotal}}
                            </b-alert>
                        </b-col>
                    </b-row> 
                    <b-row>
                        <b-col class="col-md-6">
                            <b-button block variant="danger" :disabled="invalid" v-if="orderCreated" @click="_cancelOrder"><b-icon icon="x-circle-fill"></b-icon> Cancel</b-button>
                        </b-col>
                        <b-col :class="orderCreated ? 'col-md-6' : 'col-md-12'">
                            <b-button block type="submit" variant="success" :disabled="invalid" v-if="orderCreated"> <b-icon icon="credit-card" aria-hidden="true"></b-icon> Retry Checkout</b-button>
                            <b-button block type="submit" variant="success" :disabled="invalid" v-else> <b-icon icon="credit-card" aria-hidden="true"></b-icon> Checkout</b-button>
                        </b-col>
                    </b-row>  
                    
                </b-form>        
            </ValidationObserver>
        </b-col>                    
    </b-row>   
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';   
import { mapGetters, mapMutations, mapActions, mapState} from 'vuex'
import "vue-select/dist/vue-select.css" //estilos para el vselect


export default {        
    components: {
        ValidationObserver,
        ValidationProvider
    },
    mounted(){
        this.calcularImportes()
    },
    data(){
        return{
            client: this.cliente,
            divisaTotal: '0.00',
            colMd12: this.orderCreated ? 'col-md-6' : 'col-md-12'          
        }
    }, 
    props:{
        cliente: {
            type: Object,
            required: true
        },
        totalBreakdown:{
            type: Object,
            required: true
        }
    },
    computed:{
        ...mapGetters('cart',['totalDiscountByProductsGetter']),
        ...mapState('cart',['orderCreated','currencies'])  ,          
        ...mapState('init',['paymentMethods','hotels'])            

    },
    methods: {
        ...mapMutations('cart',['unSetEmailChecked','setHotelCliente','setCurrency']),
        ...mapActions('cart', ['cancelOrder','fetchCurrencies']),
        setEmailChecked(){
            this.unSetEmailChecked()
        },
        _setHotelCliente(hotel){
            this.setHotelCliente(hotel)
        },
        calcularImportes(){            
            this.divisaTotal = ( (Math.round( ( parseFloat(this.totalBreakdown.total) *  parseFloat(this.cliente.currency.value) ) * 100) / 100).toFixed(2) )             
            this.setCurrency(this.cliente.currency)
        },
        async _cancelOrder(){
            await this.cancelOrder(this.orderCreated)
            await this.fetchCurrencies()
        }
    }   
}
</script>

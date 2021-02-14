<template>
    <div v-if="cart.length" class="mb-3 sticky-top">

        <b-alert
            variant="danger"
            dismissible
            fade
            :show="cartError"
            @dismissed="closeDismissibleAlert"
        >     
            <div v-html="errorMessageApi"></div>
        </b-alert>     

        <b-card  tag="article" class="mb-2 bg-light rounded-0">
            

            <!-- Products -->
            
            <table class="table table-hover table-striped"> 
                <thead>
                    <tr>
                        <th colspan="3" scope="col"><h6 class="mb-0">Products added({{ cart.length }})</h6></th>                        
                    </tr>
                </thead>           
                <tbody>
                    <tr
                        v-for="item in cart"
                        :key="item.folio"
                    >               
                        <td class="text-small-cart">
                            {{item.detailDesc}} <br>
                            <span class="text-muted"> Descuento: {{item.discountApplied}}% </span> <br>
                            <span class="text-small-cart">
                                {{item.qty}} x {{ (item.discountApplied > 0 ) ? item.salepriceWithDiscount : item.saleprice }} =
                                ${{(Math.round( item.qty * ((item.discountApplied > 0 ) ? item.salepriceWithDiscount : item.saleprice)* 100) / 100).toFixed(2)}}
                            </span>
                            
                        </td>
                        <td>
                            <div >
                                <b-button size="sm" variant="danger" class="mr-1 mb-1"
                                    @click.stop="removeProductFromCart(item)"
                                >
                                    <b-icon icon="x"></b-icon>
                                </b-button>                       
                                <b-button size="sm" variant="info" class="mr-1 mb-1"
                                    @click="showModal(item, $event.target)"
                                >
                                    <b-icon icon="pencil-fill" ></b-icon>
                                </b-button>                                
                            </div>
                        </td> 
                        <td>
                            <div>                               
                                <b-button size="sm" variant="warning" class="mr-1 mb-1"
                                    @click.stop="decrementQtyProduct(item)"
                                >
                                    <b-icon icon="dash"></b-icon>
                                </b-button>

                                <b-button size="sm" variant="success" class="mr-1 mb-1"
                                    @click.stop="incrementQtyProduct(item)"
                                >
                                        <b-icon icon="plus"></b-icon>
                                </b-button>
                            </div>
                        </td>                   
                        <InfoItemInCart :idModal="item.folio"/>
                    </tr>                                
                </tbody>
            </table>
        <!-- Product end -->
        </b-card>               
        <InfoCliente        
            :cliente="cliente"
            :totalBreakdown="totalBreakdown"
            @set-name-client="setNameClient"
            @set-lastname-client="setLastNameClient"
            @set-email-client="checkIfExists"
            @set-phone-client="setPhoneCliente"
            @set-payment-method-client="setPaymentMethodClient"
            @set-reference-client="setReferenceClient"
            @set-payment-link-client="setPaymentLinkClient"
            @set-discount-applied="setDiscountApplied"
            @send-info-client="submitClient"
        ></InfoCliente> 

        <IframePayment :idModal="'iframe-payment'"/>

    </div>

    <b-alert show variant="info" v-else >
        There are no products in the cart
    </b-alert>
</template>

<script> 
    import { mapGetters, mapMutations, mapState, mapActions} from 'vuex'
    import InfoCliente from './InfoCliente.vue'
    import InfoItemInCart from './InfoItemInCart.vue'
    import IframePayment from './IframePayment.vue'

    export default {
        
        components:{
            InfoCliente,
            InfoItemInCart,
            IframePayment
        },
        data(){
            return{
                fields: ['x','name','sTotal','actions'], //para la tabla propia de bootstrapvue
                // emailCliente: this.cliente.email,           
            }
        },       
        computed:{
            ...mapState('cart',['cart','cliente','totalBreakdown','cartError','errorMessageApi']),
            ...mapGetters('auth',['userInfoGetter']),        
        },
        methods:{
            ...mapMutations('cart',[
                'removeProductFromCart',
                'incrementQtyProduct',
                'decrementQtyProduct',
                'setNameClient',
                'setLastNameClient',
                'setPhoneCliente',
                'setPaymentMethodClient',
                'setReferenceClient',
                'setPaymentLinkClient',
                'setDiscountApplied',
                'setInfoItemCartInCart',
                'setProductInCart',
                'unsetProductInCart',
                'unSetCartError'            
            ]),
            ...mapActions('cart', ['sendInfoClient','checkIfClientExists','fetchCurrencies']),
            //al abrir el modal, ejecuto la mutacion setProductInCart para poner el producto en el estado selectedProductInCart
            closeDismissibleAlert(){
                this.unSetCartError()
            },      
            showModal(item, button){  
               const modalId = item.folio
                this.setProductInCart(item)
                this.$root.$emit('bv::show::modal', modalId, button)
            },
            showModal2(){                
                this.$root.$emit('bv::show::modal', "iframe-payment")                                     
            },
            closeModal(product){
                this.showItemCart = false
                this.showIframePayment = false
                this.unsetProductInCart()                                                    
            },
            closeModalPayment(product){
                this.showIframePayment = false
            },

            async checkIfExists(){
                const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i                                
                if( emailRegex.test( this.cliente.email ) ){                    
                    await this.checkIfClientExists(this.cliente)
                }                
            },
            async submitClient(){                  
                await this.sendInfoClient(this.cliente)
                await this.fetchCurrencies()                                                    
            }
        }
    }
</script>
<style lang="stylus">
    .text-small-cart {        
        text-align: left !important;
        font-size: .90rem!important;  
    }
</style>
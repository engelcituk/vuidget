<template>
    <div>
     <b-row>
         <b-col class="col-md-12">
            <h5 class="card-title">{{product.name}}</h5><br>           
        </b-col>
     </b-row>
     <b-row>
         <b-col class="col-md-12">
            <v-select :options="options" label="detailDesc" v-model="selected" class="mb-3"></v-select>            
        </b-col>
     </b-row>
     <b-row>
         <b-col class="col-md-8">
            <strong>Price:</strong> 
            <b-badge variant="warning" v-if="selected.saleprice">${{ selected.saleprice  }} </b-badge>
            <b-badge variant="warning" v-else>${{ precio  }} </b-badge>
        </b-col>
        <b-col class="col-md-4 float-left">
            <div v-if="selected.saleprice" >
                <b-button 
                    class="float-right"                  
                    variant="info"
                    @click="addProductToCart(product, selected.saleprice, selected.detailDesc, selected.id)"
                    >
                    <b-icon-cart-plus-fill>
                    </b-icon-cart-plus-fill>
                </b-button>                        
            </div>
                <div  v-else>
                <b-button 
                    class="float-right"                  
                    variant="info"
                    @click="addProductToCart(product, product.detail[0].saleprice, product.detail[0].detailDesc, product.detail[0].id)"
                    >
                    <b-icon-cart-plus-fill>
                    </b-icon-cart-plus-fill>
                </b-button>                        
            </div>
        </b-col>
     </b-row>
    </div>     
</template>
<script>
    import "vue-select/dist/vue-select.css";
    import { mapMutations } from 'vuex'    
    
    export default { 
        data () {
            return {               
                options: this.product.detail,
                selected: this.product.detail[0].detailDesc,//obtengo el precio de los detalles
                precio: this.product.detail[0].saleprice,                               
            }
        },               
        props:{
            product: {
                type: Object,
                required: true
            }
        },
        methods:{            
            ...mapMutations('cart',['addProductInCart']), 
            addProductToCart(product, precio, selected, idDetail){ 
                console.log('precio:',precio, 'descripcion: ',selected, 'idDetail', idDetail);
                product.saleprice = precio
                product.detailDesc = selected   
                product.detailId = idDetail

                this.addProductInCart(product) //llamo al mutation addProductInCart del modulo cart
            }
        }
    }
</script>

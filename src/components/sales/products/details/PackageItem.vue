<template>
    <div>
        <h5 class="card-title">{{product.name}}</h5><br>
        <b-row>
            <b-col class="col-md-6">
                <strong>Price:</strong> <b-badge variant="warning">${{product.saleprice}} </b-badge>
            </b-col>
            <b-col class="col-md-6 float-left">
                <b-button 
                    class="float-right"                  
                    variant="info"
                    @click="addProductToCart(product, product.saleprice, product.name, product.id)">
                    <b-icon-cart-plus-fill>
                    </b-icon-cart-plus-fill>
                </b-button> 
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex'    
    export default {                
        props:{
            product: {
                type: Object,
                required: true
            }
        },
        methods:{            
            ...mapMutations('cart',['addProductInCart']), 
            addProductToCart(product, precio, selected, idDetail){ 
                console.log('precio:',precio, 'descripcion: ', selected, 'idDetail ', idDetail);
                product.saleprice = precio
                product.detailDesc = selected                
                product.detailId = idDetail

                
                this.addProductInCart(product) //llamo al mutation addProductInCart del modulo cart
            }
        }
    }
</script>

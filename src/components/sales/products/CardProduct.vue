<template>
  <div>
    <div class="card">
      <div class="card-body">
        <b-row>
            <div class="col-sm-6 text-center"> 

                <img :src="imgUrl + product.coverImage" class="img-fluid mb-2">

                <div v-if="product.modelType == 'product'">                    
                    <b-button class="btn-info-card mt-2" @click="showModal(product, $event.target, 'products')">
                        Details
                    </b-button>                     
                </div>

                <div v-if="product.modelType == 'event'">                    
                    <b-button class="btn-info-card mt-2" @click="showModal(product, $event.target, 'events')">
                        Details
                    </b-button>
                </div> 

                <div v-if="product.modelType == 'package'">
                    <b-button class="btn-info-card mt-2" @click="showModal(product, $event.target, 'packages')">
                        Details
                    </b-button>
                </div> 
                    
            </div>
            <div class="col-sm-6"> 
                
                <div v-if="product.modelType == 'product'">
                    <ProductItemDetail :product="product"></ProductItemDetail>
                </div>

                <div v-if="product.modelType == 'event'">
                    <EventItemDetail :product="product"></EventItemDetail>
                </div>

                <div v-if="product.modelType == 'package'">
                    <PackageItemDetail :product="product"></PackageItemDetail>
                </div>
                
            </div>
        </b-row>       
      </div>
    </div>    
    <!-- modales para cargar detalles del producto -->    
    <ModalProduct  :idModal="idModalProducts"/>
    <ModalPackage  :idModal="idModalPackages"/>
    <ModalEvent  :idModal="idModalEvents"/>

  </div>   
</template>

<script>
    import { mapActions } from 'vuex'

    import ProductItemDetail from './details/ProductItem'
    import PackageItemDetail from './details/PackageItem'
    import EventItemDetail from './details/EventItem'

    import ModalProduct from './modalsDetails/ModalProduct'
    import ModalPackage from './modalsDetails/ModalPackage'
    import ModalEvent from './modalsDetails/ModalEvent'

    export default {
        components: {
            ProductItemDetail,
            PackageItemDetail,
            EventItemDetail,
            ModalProduct, //modal para información a detalle del producto, desc, imgs etc.
            ModalPackage,
            ModalEvent,            
        },
        data () {
            return {
                //tomado desde los variables de entorno en el archivo .env
                imgUrl: process.env.VUE_APP_IMG_SRC_API,  
                idModalProducts: 'products' + this.product.id,
                idModalEvents: 'events' + this.product.id,
                idModalPackages: 'packages' + this.product.id                              
            }
        },
        props:{
            product: {
                type: Object,
                required: true
            }
        },
        methods: {
            ...mapActions('products',['fetchProductExtraInfo']),                      
            async showModal(item, button, endpoint){
               const payload = { idProducto: item.id, endPoint : endpoint }
               const modalId = endpoint + item.id
               //espero que se termine la petición para poder mostrar el modal
                await this.fetchProductExtraInfo( payload )

                if(this.product.modelType == 'product'){                    
                    this.$root.$emit('bv::show::modal', modalId, button)
                }  
                if(this.product.modelType == 'package'){                    
                    this.$root.$emit('bv::show::modal', modalId, button)
                }
                if(this.product.modelType == 'event'){                    
                    this.$root.$emit('bv::show::modal', modalId, button)
                }
                            
            }
        }
    }
</script>
<style lang="stylus">
    .card-title {
        font-size: 1em;
    }
    
</style>
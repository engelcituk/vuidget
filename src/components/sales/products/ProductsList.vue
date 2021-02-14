<template>
   <div v-if="filteredProducts.length">                           
       <paginate
            class="ul-pagination"
            name="filteredProducts"
            :list="filteredProducts"
            :per="perPage"
       >      
           <CardProduct 
                v-for="product in paginated('filteredProducts')"
                :key="product.id"
                :product="product"
            >
            </CardProduct>              
       </paginate>

       <paginate-links
            
            for="filteredProducts"
            :classes="{
                'ul':'pagination',
                'li':'page-item',
                'li > a': 'page-link'
            }"
       >
       </paginate-links>
    </div>
    <b-alert show variant="info" v-else>
        There are no products
    </b-alert> 
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import CardProduct from './CardProduct.vue'

    export default {        
        async mounted(){
            await this.fetchProducts()
        },
        components:{
            CardProduct,
        },
        data(){
            return {
                paginate: ['filteredProducts'],
                perPage: 10
            }
        },
        computed:{            
            ...mapGetters('products',['filteredProducts']), 
        },
        methods:{
            ...mapActions('products',['fetchProducts']),
        }
    }
</script>

<style lang="stylus" scoped>
.ul-pagination {
    padding: 0;
    list-style-type: none;
}
</style>
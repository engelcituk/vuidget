<template>
    <div v-if="categories.length">
        <carousel :perPage="5"  :paginationEnabled="false" :navigationEnabled="true" >
            <slide class="p-2">
                <b-list-group-item
                    style="cursor:pointer"
                    class="mr-2"
                    @click="getProductsBestSeller"
                    variant="success"
                >
                <b-icon icon="star-fill" font-scale="1" animation="fade"></b-icon> Best Seller            
                </b-list-group-item>
            </slide>
            <slide class="p-2">
                <b-list-group-item
                    style="cursor:pointer"
                    class="mr-2"
                    @click="getPackages"
                    variant="info"
                >
                <b-icon icon="box" font-scale="1" animation=""></b-icon> Packages           
                </b-list-group-item>
            </slide> 
            <slide class="p-2">
                <b-list-group-item
                    style="cursor:pointer"
                    class="mr-2"
                    @click="getEvents"
                    variant="warning"
                >
                <b-icon icon="calendar2-event" font-scale="1" animation=""></b-icon> Events            
                </b-list-group-item>
            </slide>          
        </carousel>
        <carousel :perPage="5"  :paginationEnabled="false" :navigationEnabled="true">
            <slide class="p-2"
                    v-for="category in categories"
                    :key="category.id"
                >
                <category-item 
                    :category="category" 
                    @get-products-best-seller="getProductsBestSeller"     
                    @get-products-by-category="getProductsInCategory"     
                    @get-packages="getPackages"     
                    @get-events="getEvents"    
                >
                </category-item>
            </slide>          
        </carousel>
    </div>    
    <b-alert show variant="info" v-else>
        There are no categories
    </b-alert>

</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex'
    import CategoryItem from './CategoryItem.vue'

    export default {
        async mounted(){
            await this.fetchCategories()
        },
        components:{
            CategoryItem
        },
        computed:{
            ...mapState('categories',['categories'])            
        },
        methods:{
            ...mapActions('categories',['fetchCategories']),            
            ...mapActions('products',['fetchProducts','fetchProductsByCategories','fetchPackages','fetchEvents']),            
            getProductsInCategory(category){                                
                this.fetchProductsByCategories(category);
            },
            getProductsBestSeller(){
                this.fetchProducts();
            },
            getPackages(){
                this.fetchPackages();
            },
            getEvents(){
                this.fetchEvents();
            }
        }
    }
</script>
<style lang="stylus" scoped>

</style>
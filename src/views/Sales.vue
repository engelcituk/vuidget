<template>    
    <b-container class="mt-2 mb-5">
        <b-row>
            <b-col class="col-md-12">
                <h6> Selected category: <strong> {{selectedCategory}}</strong> </h6>
            </b-col>                                                                        
        </b-row>
        <b-row>
            <b-col class="col-md-12">
                <CategoriesList></CategoriesList>
            </b-col>                                  
        </b-row>
        <b-row>
            <b-col class="col-md-6">
                <SearchForm class="mb-3"></SearchForm>               
                <ProductsList class="mb-3"></ProductsList>               
            </b-col>
            <b-col class="col-md-6">
                <Cart ></Cart>               
            </b-col>
        </b-row>                                                     
    </b-container>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import { ValidationObserver, ValidationProvider } from 'vee-validate';

    import SearchForm from '@/components/sales/search/SearchForm' 
    import CategoriesList from '@/components/sales/categories/CategoriesList'
    import ProductsList from '@/components/sales/products/ProductsList' 
    import Cart from '@/components/sales/cart/Cart' 
    import { sessionHasExpired, currentDateSecondsAndExpires} from '@/helpers/helpers' 


    export default {
       async mounted(){
           await this.fetchExtraFields()
           await this.fetchPaymentMethods()  
           await this.fetchDiscounts()  
           await this.fetchCurrencies()  
           await this.fetchHotels()  
           this.checkSesionExpire()
        },        
        components: {            
            SearchForm,
            CategoriesList,
            ProductsList,
            Cart,
            ValidationObserver,
            ValidationProvider
        },
        computed:{
            ...mapState('categories',['selectedCategory']), 
            ...mapState('products',['filter'])  ,       
            ...mapState('auth',['user'])         
        },
        methods:{
            ...mapActions('cart',['fetchCurrencies']),
            ...mapActions('init',['fetchPaymentMethods','fetchDiscounts','fetchExtraFields','fetchHotels']),
            ...mapMutations('auth',['updateExpiresTime'])       ,

            checkSesionExpire(){
                console.log(this.user.expiresTime)
                console.log( sessionHasExpired( this.user.expiresTime ))

                const { currenTime } = currentDateSecondsAndExpires()                 
                if( !sessionHasExpired( this.user.expiresTime ) ){
                    this.updateExpiresTime( currenTime )
                }
                console.log(this.user.expiresTime)
            }
        }
    }
</script>




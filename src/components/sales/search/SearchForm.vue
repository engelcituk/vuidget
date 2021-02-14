<template>
    <ValidationObserver ref="observer">                      
        <ValidationProvider rules="min:2" name="buscador">
            <b-form-group slot-scope="{ valid, errors }" >
                <b-form-input
                type="email"
                v-model="filter.query"
                :state="errors[0] ? false : (valid ? true : null)"
                placeholder="Type to search for products in the list">
                </b-form-input>
                <b-form-invalid-feedback>
                {{ errors[0] }}
                </b-form-invalid-feedback>
            </b-form-group>
        </ValidationProvider>                        
    </ValidationObserver>
</template>


<script>
    import {mapState} from 'vuex'
    import { ValidationObserver, ValidationProvider } from 'vee-validate';

    export default {
        components: {
            ValidationObserver,
            ValidationProvider
        },
        computed:{
            ...mapState('categories',['selectedCategory']), 
            ...mapState('products',['filter']),
        },
    }
</script>




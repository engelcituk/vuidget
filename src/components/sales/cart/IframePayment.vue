<template>
<b-modal
      id="iframe-payment"
      title="Pago"
      ok-only 
      hide="resetInfoModal"      
      size="lg"
      no-close-on-backdrop  
      
    >    
        <b-container>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea facilis adipisci tempora, eum numquam sapiente quos ex atque saepe, provident sed blanditiis enim molestias, perspiciatis hic magni nobis? Incidunt, at!         
        </b-container>      
    </b-modal>

        
</template>

<script>
    import { mapState, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                               
            }
        },
        props:{
                                 
        }, 
        computed:{            
            // ...mapState('cart',['urlIframe','loadIframe','paymentSuccess']),
        },  
        methods: {
        }
    }
</script>

   
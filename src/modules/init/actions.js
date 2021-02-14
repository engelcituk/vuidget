import Vue from 'vue'
import { find } from 'lodash'


export async function fetchPaymentMethods(context){  
    const  { group } = context.rootState.auth.user 
  
    try {
        const response = await Vue.axios({
            url:'/catalogs/paymentmethod/'
        })
        const payload = response && response.data
        
        // if( group == 'Affiliate'){
        //     const currency = find(payload, { name: 'Credit Card' })
        //     context.commit('setPaymentMethods', [currency])
        // } else {
        //     context.commit('setPaymentMethods', payload)
        // }

        context.commit('setPaymentMethods', payload)

                
    } catch (error) {        
        context.commit('initError', error.message)
    } finally {
        console.log('La petición para obtener las formas de pago se ha terminado')
    }
}

export async function fetchDiscounts(context){    
    try {
        const response = await Vue.axios({ 
            url:'/catalogs/discounts/' 
        })
        const payload = response && response.data
        
        context.commit('setDiscounts', payload)
        
    } catch (error) {        
        context.commit('initError', error.message)
    } finally {
        console.log('La petición para obtener la lista de descuentos se ha terminado')
    }
}

export async function fetchHotels(context) {
    
    try {
        const response = await Vue.axios({
            url:'/catalogs/hotels/'
        })
        const payload = response && response.data
       
        context.commit('setHotels', payload )    
        
    } catch (error) {        
        context.commit('initError', error.message)
    } finally {
        console.log('La petición para obtener los hoteles se ha terminado')
    }
}


export async function fetchExtraFields(context) {
    
    try {
        const response = await Vue.axios({
            url:'/catalogs/extrafields/'
        })
        const payload = response && response.data

        payload.forEach( (extrafield) => {            
            extrafield.value = extrafield.id,
            extrafield.text = extrafield.name
            delete extrafield.id  
            delete extrafield.name  
        })

        context.commit('setExtraFieldsTypes', payload)    
        
    } catch (error) {        
        context.commit('initError', error.message)
    } finally {
        console.log('La petición para obtener los tipos de campos extras se ha terminado')
    }
}

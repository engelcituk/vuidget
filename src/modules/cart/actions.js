import Vue from 'vue'
import { handlerErrors } from './../../helpers/helpers'
import { find } from 'lodash'

export async function fetchCurrencies({commit, state}) {
    
    try {
        const response = await Vue.axios({
            url:'/catalogs/currency/'
        })
        const payload = response && response.data
        //sino hay un currency se setea uno por default para el cliente
        if(!state.cliente.currency){
            const currency = find(payload, { code: 'USD' })
            commit('cart/setCurrency', currency, { root:true } )    
        }
        commit('cart/setCurrencies', payload, { root:true } )    
        
    } catch (error) { 
        const errorMsg = handlerErrors( error.message, error.response )
        commit('cartError', errorMsg)
    } finally {
        console.log('La petición para obtener los currencies se ha terminado')
    }
}

export async function checkIfClientExists({commit}, cliente) {

    const client = JSON.parse(JSON.stringify(cliente)) 
           
    try {       

        const response = await Vue.axios({            
            url:`/customers/?email=${client.email}`,            
        })            
                    
        const clientData = response && response.data 
        const id = clientData.id || false 

        if(id){           
            Vue.swal({
                title: `<p style="font-size:.7em;">Este correo ya existe para el cliente: <br> ${clientData.name} ${clientData.lastname} </p>`,
                text: `¿Desea ocupar la información del cliente existente?`,
                icon: 'warning',                
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '!Sí, ocuparlo!'
            }).then((result) => {
                if (result.value) {

                    commit('cart/setInfoClient', clientData, { root:true } )  

                    Vue.$toast.open({
                        message: `!Los datos del cliente han sido actualizados!`,
                        type: 'success',
                        position:'top-right'
                    });                    

                } else {
                    commit('cart/unsetEmailCliente', '', { root:true } ) 
                }
            })
        } 

    } catch (error) { 
        console.log(error)       
        commit('cartError', error.message)
    } finally {
        console.log('La petición para verificar si el cliente se ha terminado')
    }
}

export async function sendInfoClient({commit,  state, getters}, cliente) {
    
    const client = JSON.parse(JSON.stringify(cliente)) 
    // const currency = 1 
    const currency = state.cliente.currency.currencyid  
     
    const orderCreated = state.orderCreated || false
    //recupero el método de pago, referencia, paymentlink del cliente con desestructuración, para usar despues
    const { paymentmethod, paymentreference, paymentlink, idUser, hotel } = client     
    
    try {
        
        commit('setLoading', true, { root: true} )

        const response = await Vue.axios({
            method:'POST',            
            url:'/customers/', 
            data: client
        })        
            
        const clientData = response && response.data          
        //id del cliente(desestructuracion), respuesta desde la api 
        console.log(clientData)
        const { id } = clientData          
        //uso los getters para calculo de los totales
        const grossSale = String( ((Math.round( (parseFloat(getters.totalDiscountGetter)+parseFloat(getters.totalBreakdownGetter)) * 100) / 100).toFixed(2) ))
    
        const discount = getters.totalDiscountGetter
        const totalSale = getters.totalBreakdownGetter  
        //armo el array details con los datos solicitados
        const detail = []
        let detailitinerary 
        state.cart.forEach( (prod) => {
            const precio = ( parseInt(prod.discountApplied) > 0 )  ? prod.salepriceWithDiscount : prod.originalSalePrice             
            const unitPrice = String( ((Math.round( precio * 100) / 100).toFixed(2)) ) 
            const qty = prod.qty
            const operationdate = prod.operationdate || ''
            const discount = String( ((Math.round( prod.discountApplied * 100) / 100).toFixed(2)) )
            const total = String( ((Math.round( (parseFloat(precio) * parseFloat(prod.qty)) * 100) / 100).toFixed(2)) )
            const note = prod.note.substring(0,254) //tomo los 255 caracteres
            const orderextraFields = prod.orderextraFields ? JSON.parse(JSON.stringify( prod.orderextraFields )) : []    
            const modelType = typeModel(prod.id, prod.modelType, prod.detailId)
            const product = modelType.products
            const pack = modelType.package
            const event = modelType.event
            //details id
            const productDetail = modelType.productDetail
            const packageDetail = modelType.packageDetail
            const eventDetail = modelType.eventDetail           

            if(prod.itinerario){
                const flight = prod.itinerario.flight || ''
                const flighttime = prod.itinerario.flighttime || ''
                const ifrom = prod.itinerario.ifrom || ''
                const ito = prod.itinerario.ito || ''
                const pax = prod.itinerario.pax || ''
                const pickup = prod.itinerario.pickup || ''
                const trip = prod.itinerario.trip || ''               
                detailitinerary = {flight, flighttime, ifrom, ito, pax, pickup, trip }
            } else {
                detailitinerary = {}
            }

            
            //si fecha operacion viene nulo no se pone en el detalle
            if(prod.operationdate){
                detail.push({
                    unitPrice,
                    qty,
                    discount,
                    total,
                    note,
                    operationdate,
                    orderextraFields,
                    product,
                    package:pack,
                    event,
                    productDetail,
                    packageDetail,
                    eventDetail,
                    detailitinerary
                })
            } else {
                detail.push({
                    unitPrice,
                    qty,
                    discount,
                    total,
                    note,                    
                    orderextraFields,
                    product,
                    package:pack,
                    event,
                    productDetail,
                    packageDetail,
                    eventDetail,
                    detailitinerary
                })
            }

        })        
        //objeto con los datos del client y detalles con los valores del cart (payload)
        const payload = {
            grossSale,
            tax: "0.00",
            discount,
            totalSale, 
            customer: id, 
            paymentmethod, 
            currency,
            paymentreference,
            paymentlink,
            saleUser: idUser,
            hotel,
            orderStatus: 1,
            detail
        }   
        
        console.log(payload)
        
        if(orderCreated){
            const order = { order : orderCreated}
            await retryPayment({commit}, order) 
        } else {
            await sendCartItems({commit}, payload) 
        }     
        
    } catch (error) {        
        commit('cartError', error.message)
    } finally {
        console.log('La petición para enviar los datos del cliente se ha terminado')
        commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader        
    }
}

export async function sendCartItems({commit,state}, payload) {    
    try { 
        
        const response = await Vue.axios({
            method:'POST',            
            url:'/orders/', 
            data: payload
        })  
             
        const respuesta = response && response.data  
        const { payment, order, invoice} = respuesta

        if(order){ //si hay orden creada seteo el valor            
            commit('cart/setOrderCreated', order, { root:true } ) 
        }

        if(payment){
            const { error, url } = payment
            //sino hay error true y url viene, se redirecciona a formulario de pago
            if( !error && url !='') {
                window.location = url
            }
        } else {
            commit('cart/setEmptyCart', [], { root:true } ) // [] cart se vacía, se resetean los datos del cliente
            commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader 
            Vue.swal.fire('OK', `Order completed: ${invoice}!`, 'success' )                
        }        

    } catch (error) {
        commit('cartError', error.message)
    } finally {        
        console.log('La petición para el envío de los detalles de la compra finalizó')
    }
}

export async function retryPayment({commit}, idOrder) {
    
    try { 
        
        const response = await Vue.axios({
            method:'POST',            
            url:'/paymentretry/', 
            data: idOrder
        })  

        const respuesta = response && response.data  
        const { payment, order, invoice} = respuesta

        if(order){ //si hay orden creada seteo el valor            
            commit('cart/setOrderCreated', order, { root:true } ) 
        }

        if(payment){
            const { error, url } = payment
            //sino hay error true y url viene, se redirecciona a formulario de pago
            if( !error && url !='') {
                window.location = url
            }
        } else {
            commit('cart/setEmptyCart', [], { root:true } ) // [] cart se vacía, se resetean los datos del cliente
            commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader        
            Vue.swal.fire('OK', `Order completed: ${invoice}!`, 'success' );
        }

    } catch (error) {
        commit('cartError', error.message)
    } finally {        
        console.log('La petición para voler a realizar el pago finalizó')
    }
}

export async function cancelOrder({commit}, idOrder) {
    
    try { 

        /*commit('setLoading', true, { root: true} ) //start loader        
        
        const response = await Vue.axios({
            method:'POST',            
            url:'/paymentretry/', 
            data: idOrder
        })  

        const respuesta = response && response.data  */

        commit('cart/setEmptyCart', [], { root:true } ) // [] cart se vacía,      
        Vue.swal.fire('OK', `Order canceled:: ${idOrder}!`, 'success' );
        
    } catch (error) {
        commit('cartError', error.message)
    } finally {  
        commit('setLoading', false, { root: true} ) //end loader        
        console.log('La petición para cancelar la orden finalizó')
    }
}

export function typeModel(id, type, detailId) {
    if( type == "product" ){
        return { 
                    products: id,
                    package: null,
                    event: null,
                    productDetail: detailId,
                    packageDetail: null, 
                    eventDetail: null
            }        
    } else if( type == "package" ) {
        return { 
                    products: null,
                    package: id,
                    event: null,
                    productDetail: null,
                    packageDetail: detailId, 
                    eventDetail: null
            }        
    } else if ( type == "event" ){
        return {
                    products: null,
                    package: null,
                    event: id,
                    productDetail: null,
                    packageDetail: null, 
                    eventDetail: detailId
        }        
    }
}

import Vue from 'vue'

//peticiones para obtener lista de ordenes por usuario
export async function fetchOrdersByUser(context, fechas) {    
    const {inicio, fin} = fechas
    //uso el contexto para acceder a los datos del usuario conectado (modulo auth)
    const  {idUser, name, lastname } = context.rootState.auth.user

    try {
        context.commit('setLoading', true, { root: true} )
        const response = await Vue.axios({
            url:`/orders/?`, 
            params: {
                idu: idUser,
                fini: inicio,
                ffin: fin
              }
        })
        const payload = response && response.data
        let ordersItems  = []
        
        for (let i = 0; i < payload.length; i++) {
            payload[i].orderDate = payload[i].orderDate.split('T')[0]
            payload[i].customername = payload[i].customer.name+' '+payload[i].customer.lastname
            payload[i].vendedor = name +' '+ lastname

            const invoice = payload[i].invoice
            const cliente = payload[i].customername
            const vendedor = name +' '+ lastname
            const fecha = payload[i].orderDate 
            const operationdate = payload[i].operationdate 
            
            const metodoPago = payload[i].paymentmethod_name
            const referencia = payload[i].paymentreference
            const vBruto = payload[i].grossSale
            const vDescuento = payload[i].discount
            const vTotal = payload[i].totalSale
            const estado = payload[i].orderstatusname

            let detalle = payload[i].detail
            for (let j = 0; j < detalle.length; j++) {
             ordersItems.push({
                 key: Math.random().toString(36).substring(2,9),
                 invoice,
                 sku: detalle[j].productSKU,
                 productoDetalle: detalle[j].itemsold,
                 cliente,
                 vendedor,
                 numeroCupon: detalle[j].coupon,
                 fecha,
                 operationdate,                 
                 metodoPago,
                 referencia,
                 qty: detalle[j].qty,              
                 unitPrice: detalle[j].unitPrice,              
                 vDescuento: (Math.round( detalle[j].discount * 100) / 100).toFixed(2),
                 vTotal: (Math.round( detalle[j].total * 100) / 100).toFixed(2),
                 estado
                })
            }
        }
        
        context.commit('dashboard/setOrders', payload, { root:true } )
        context.commit('dashboard/setOrdersItems', ordersItems, { root:true } )

    } catch (error) {
        context.commit('setErrorDashboard', error.message)
    } finally {
        context.commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader        

        console.log('La petición para obtener las ordenes se ha terminado')
    }
}

export async function fetchOrderDetail({commit}, payload) {  

    const { idOrder, endPoint } = payload

    try {
        commit('setLoading', true, { root: true} )
        const response = await Vue.axios({            
            url:`/${endPoint}/?`,
            params: {
                ido: idOrder
            }
        })
        const payload = response && response.data    

        payload.forEach( (item) => {            
            item.key = Math.random().toString(36).substring(2,9) 
        })
        commit('dashboard/setDetailOrder', payload, { root:true } )

    } catch (error) {
        commit('dashboard/setErrorDashboard', error.message)
    } finally {
        commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader
        console.log('La petición para obtener los detalles de la orden se ha terminado')
    }
}

export async function updateOperationDate({commit}, payload) {
    const { orderdetail } = payload

    try { 
        commit('setLoading', true, { root: true} )        
        const response = await Vue.axios({
            method:'POST',            
            url:'/ordersdetail/?', 
            params: {
                ido: orderdetail
            },
            data: payload
        })  
        // console.log(response)      
        const respuesta = response && response.data            
        // console.log(respuesta) 
        commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader        
        // Vue.swal.fire('OK', 'operationdate actualizada !', 'success' )
        Vue.$toast.open({
            message: `!operationdate actualizada !`,
            type: 'success',
            position:'top-right'
        }); 

    } catch (error) {
        commit('setErrorDashboard', error.message)
    } finally {        
        console.log('La petición para la actualización del operationdate finalizó')
    }
}

export async function updateItineraryDetail({commit}, payload) {
    
    try { 
        commit('setLoading', true, { root: true} )        
        const response = await Vue.axios({
            method:'POST',            
            url:'/ordersdetailitinerary/',             
            data: payload
        })  
        const respuesta = response && response.data                    
        commit('setLoading', false, { root: true} ) 
        Vue.$toast.open({
            message: `!Datos de itineario actualizado !`,
            type: 'success',
            position:'top-right'
        }); 

    } catch (error) {
        commit('setErrorDashboard', error.message)
    } finally {        
        console.log('La petición para la actualización del itinerario finalizó')
    }
}
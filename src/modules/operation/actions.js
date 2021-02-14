import Vue from 'vue'

//peticiones para obtener lista de ordenes por usuario
export async function fetchOrdersOperation(context, payload) {    
    //uso el contexto para acceder a los datos del usuario conectado (modulo auth)
    // const  {idUser} = context.rootState.auth.user
    try {
        context.commit('setLoading', true, { root: true} )
        
        const response = await getDataOperations( payload )
        
        const orders = response && response.data
                        
        context.commit('operation/setOrdersOperation', orders, { root:true } )

    } catch (error) {
        context.commit('setErrorDashboardOperation', error.message)
    } finally {
        context.commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader        

        console.log('La petición para obtener las ordenesOperation se ha terminado')
    }
}

async function getDataOperations( payload ) {
    const {fechaInicio, fechaFin, hotel, categoria, tipo} = payload
    let response = []
        
    if( categoria == "" && tipo == "" && hotel == ""){
        response = await Vue.axios({
            url:`/ordersoperation/?`, 
            params: {
                fini: fechaInicio,
                ffin: fechaFin
            }
        })
        return response
    }

    if( categoria != "" && tipo == "" && hotel == ""){
        response = await Vue.axios({
            url:`/ordersoperation/?`, 
            params: {                    
                fini: fechaInicio,
                ffin: fechaFin,
                idcat: categoria
            }
        })
        return response
    }

    if( categoria == "" && tipo != "" && hotel == ""){
        response = await Vue.axios({
            url:`/ordersoperation/?`, 
            params: {                    
                fini: fechaInicio,
                ffin: fechaFin,
                tipo: true
            }
        })
        return response
    }

    if( categoria != "" && hotel != "" && tipo == "" ){
        response = await Vue.axios({
            url:`/ordersoperation/?`, 
            params: {                    
                fini: fechaInicio,
                ffin: fechaFin,
                idhotel: hotel,
                idcat: categoria
            }
        })
        return response
    }

    if( categoria != "" && tipo != "" && hotel != ""){
        response = await Vue.axios({
            url:`/ordersoperation/?`, 
            params: {                    
                fini: fechaInicio,
                ffin: fechaFin,
                idcat: categoria,
                idhotel: hotel,
                tipo: true
            }
        })
        return response
    }
    
    if( hotel != "" && tipo == "" && categoria == ""){
        response = await Vue.axios({
            url:`/ordersoperation/?`, 
            params: {                    
                fini: fechaInicio,
                ffin: fechaFin,                
                idhotel: hotel                
            }
        })
        return response
    }
}

export async function updateOrderOperation({commit}, payload) { 

    const {tipo} = payload    
    try {
        if(tipo != 'referencia'){
            commit('setLoading', true, { root: true} )
        }
        
        const response = await updateDataOperation( payload ) 
        const respuesta = response && response.data 
        const { status } = respuesta            

        commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader        

        if( status ){            
            Vue.$toast.open({
                message: `!${ await responseMsgUpdate( tipo )}!`,
                type: 'success',
                position:'top-right'
            })             
        } else {
            Vue.$toast.open({
                message: `Ocurrió un error con la actualización`,
                type: 'danger',
                position:'top-right'
            }) 
        }

    } catch (error) {
        commit('setErrorOrdersOperation', error.message)
    } finally {
        commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader        

        console.log('La petición para actualizar el estado del order se ha terminado')
    }
}

async function responseMsgUpdate( tipo ) {
    switch (tipo) {
        case 'operar':                        
            return 'Estado se ha marcado como Operado'
        case 'noShow':                        
            return 'Estado se ha marcado como No show'
        case 'referencia':                        
            return 'Se ha actualizado la referencia'
        default:
            console.log('Lo lamentamos');
    } 
}

async function updateDataOperation( payload ) {

    const {tipo, order, status, reference } = payload
    let response = { status: false }

    //status = 4
    if( tipo == 'operar'  ){
        response = await Vue.axios({
            method:'POST',            
            url:`/ordersoperation/`, 
            data: {
                orderdetail: order,
                status
            }                
        })
        return response
    }
    //status = 6
    if( tipo == 'noShow'  ){
        response = await Vue.axios({
            method:'POST',            
            url:`/ordersoperation/`, 
            data: {
                orderdetail: order,
                status
            }               
        })
        return response
    }
    //referencia = 'sdasdasdasd'
    if( tipo == 'referencia'  ){
        response = await Vue.axios({
            method:'POST',            
            url:`/ordersoperation/`, 
            data: {
                orderdetail: order,
                reference 
            }                
        })        
        return response
    }
       
     
}
import Vue from 'vue'
//para peticiones asyncronas para obtener lista de productos best seller
export async function fetchProducts(context) {
    const  {idUser} = context.rootState.auth.user 

    context.commit('categories/setCategory', 'Best Seller', { root:true } )
    context.commit('cart/setidUserClient', idUser, { root:true } )
    
    try {
        context.commit('setLoading', true, { root: true} )
        const response = await Vue.axios({            
            url:`/products/`, 
            params: {
                bs: 1
              }
        })
        const payload = response && response.data
        //le agrego el tipo (productos, eventos, paquetes)
        payload.forEach( (product) => {
            product.modelType = 'product'
            product.categoryName =  product.category.name || ''
            delete product.gallery         
            delete product.videolink         
            delete product.weblink         
            delete product.type         
            delete product.category   
            delete product.productinfo                     
        })
       
        context.commit('products/setProducts', payload, { root:true } )

    } catch (error) {
        context.commit('setProductsError', error.message)
    } finally {
        context.commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader
        console.log('La petición para obtener los productos se ha terminado')
    }
}

//peticiones para obtener lista de productos por categorias
export async function fetchProductsByCategories({commit}, category) {  
    const {id, name} = category    

    commit('categories/setCategory', name, { root:true } )

    try {
        commit('setLoading', true, { root: true} )
        const response = await Vue.axios({
            url:`/products/`, 
            params: {
                idcat: id
              }
        })
        const payload = response && response.data
        //le agrego el tipo (productos, eventos, paquetes)
        payload.forEach( (product) => {
            product.modelType = 'product' 
            product.categoryName =  product.category.name || ''
            delete product.gallery         
            delete product.videolink         
            delete product.weblink         
            delete product.type         
            delete product.category 
            delete product.productinfo 
        })       
        commit('products/setProducts', payload, { root:true } )

    } catch (error) {
        commit('products/setProductsError', error.message)
    } finally {
        commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader
        console.log('La petición para obtener los productos se ha terminado')
    }
}

//peticiones para obtener lista de paquetes
export async function fetchPackages({commit}) {

    commit('categories/setCategory', 'Packages', { root:true } ) //set en el estado la categoría seleccionada

    try {
        commit('setLoading', true, { root: true} )
        const response = await Vue.axios({            
            url:`/packages/`        
        })
        const payload = response && response.data
        //le agrego el tipo (productos, eventos, paquetes)
        payload.forEach( (product) => {
            product.modelType = 'package' 
            product.categoryName = 'Packages'
            delete product.products  
            delete product.gallery 
            delete product.videolink         
            delete product.weblink 
            delete product.category 
            delete product.productinfo 

        })
        // console.log(payload)
        commit('products/setProducts', payload, { root:true } )

    } catch (error) {
        commit('products/setProductsError', error.message)
    } finally {
        commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader
        console.log('La petición para obtener los paquetes se ha terminado')
    }
}

//peticiones para obtener lista de eventos
export async function fetchEvents({commit}) {

    commit('categories/setCategory', 'Events', { root:true } ) //set en el estado la categoría seleccionada

    try {
        commit('setLoading', true, { root: true} )
        const response = await Vue.axios({            
            url:`/events/`
        })
        const payload = response && response.data
        //le agrego el tipo (productos, eventos, paquetes) y otras keys para tener algo generico similar a packages
        payload.forEach( (product) => {
            product.modelType = 'event'
            product.categoryName = 'Events'
            product.detail = product.eventdetail 
            delete product.eventdetail  
            delete product.gallery  
            delete product.category 
            delete product.productinfo                     
        })
        commit('products/setProducts', payload, { root:true } )

    } catch (error) {
        commit('setProductsError', error.message)
    } finally {
        commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader
        console.log('La petición para obtener los eventos se ha terminado')
    }
}

export async function fetchProductExtraInfo({commit}, payload) {  

    const { idProducto,  endPoint} = payload

    try {
        commit('setLoading', true, { root: true} )
        const response = await Vue.axios({            
            url:`/${endPoint}/`,
            params: {
                id: idProducto
            }
        })
        const payload = response && response.data                

        payload[0].detail =  payload[0].eventdetail  

        delete payload[0].type   
        delete payload[0].category   
        delete payload[0].active   
        delete payload[0].eventdetail                
        //le agrego un key a la imagen, para recorrer en la vista
        if(payload[0].gallery){
            payload[0].gallery.forEach( (item) => {
                item.key = Math.random().toString(36).substring(2,9)            
            })
        }
        //si arrar viene con productos, le agrego un key a cada producto del paquete
        if(payload[0].products){
             payload[0].products.forEach( (item) => {
                item.keyItem = Math.random().toString(36).substring(2,9)            
             })
        }
        // console.log(payload)

        commit('products/setDetailInfoProduct', payload, { root:true } )

    } catch (error) {        
        commit('products/setProductsError', error.message)
    } finally {
        commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader
        console.log('La petición para obtener los datos extras del producto se ha terminado')
    }
}
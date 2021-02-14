import Vue from 'vue'

export async function fetchCategories({commit}) {
    
    try {
        const response = await Vue.axios({
            url:'/catalogs/category/'
        })
        const payload = response && response.data

        payload.forEach( (category) => {            
            category.variant='default',
            category.icon= 'list-check',
            category.animation='',
            category.fontScale='1',
            category.click= 'get-products-by-category'        
        })

        /*un push al principio del array, para agregar categorias hardcoding
        payload.unshift(
            {
                id: Math.random().toString(36).substring(2,9),
                name: 'Best Seller',
                variant:'primary',
                icon: 'star-fill',
                animation:'fade',
                fontScale:'1',
                click: 'get-products-best-seller'
            },
            {   id: Math.random().toString(36).substring(2,9),
                name: 'Packages',
                variant:'info',
                icon: 'box',
                fontScale:'1',
                animation:'',
                click: 'get-packages'                
            },
            {
                id: Math.random().toString(36).substring(2,9),
                name: 'Events',
                variant:'warning',
                icon: 'calendar2-event',
                fontScale:'1',
                animation:'',
                click: 'get-events'
            }
        )*/
        
        commit('categories/setCategories', payload, { root:true } )    
        
    } catch (error) {
        commit('categories/setCategoriesError', error.message)
    } finally {
        console.log('La petición para obtener las categorías se ha terminado')
    }
}

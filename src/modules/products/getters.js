export function filteredProducts( state ) {
    let products = state.products
    //con esto filtro los resultado por el name del producto, no es case sensitive
    if( state.filter.query.length > 1 ){
        products = products.filter( product => product.name.toLowerCase().includes( state.filter.query.toLowerCase() ) )
    }
    return products;
}
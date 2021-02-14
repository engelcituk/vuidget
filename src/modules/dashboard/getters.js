export function filteredOrders( state ) {
    let orders = state.orders
    //con esto filtro los resultado por el name del order, no es case sensitive
    if( state.filterO.query.length > 1 ){
        orders = orders.filter( order => order.name.toLowerCase().includes( state.filter.query.toLowerCase() ) )
    }
    return orders;
}

export function filteredOrdersItems( state ) {    
    return state.ordersItems;
}

export function detailOrderGetter( state ) {    
    return state.detailOrder;
}
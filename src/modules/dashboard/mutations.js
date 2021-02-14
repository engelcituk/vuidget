//para altera el estado, setear ordenes
export function setOrders( state, orders) {
    state.orders = orders;
}
export function setOrdersItems( state, orders) {
    state.ordersItems = orders;
}

export function setErrorDashboard(state, errorMessage){
    state.errorDashboard = true;
    state.errorMessageApiDashboard = errorMessage;
}

export function setDetailOrder( state, details) {
    state.detailOrder = details;
}
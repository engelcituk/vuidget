//para altera el estado, setear ordenes
export function setOrdersOperation( state, ordersOperation) {
    state.ordersOperation = ordersOperation;
}

export function setErrorOrdersOperation(state, errorMessage){
    state.errorOrdersOperation = true;
    state.errorMessageApiOrdersOperation = errorMessage;
}

export function setOrderOperationSelected(state, orderselected){
    state.selectedOrderOperation = orderselected;    
}
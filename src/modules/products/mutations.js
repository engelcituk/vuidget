//para altera el estado 
export function setProducts( state, products) {
    state.products = products;
}

export function setProduct(state, product){
    state.selectedProduct = product;
}

export function setProductsError(state, errorMessage){
    state.errorProducts = true;
    state.errorMessageProducts = errorMessage;
    state.products =  [];
}

export function setFilter(state, data){
    state.filter[data['filter']] = data.value
}

export function setDetailInfoProduct( state, detail) {
    state.infoExtraProduct = detail;
}
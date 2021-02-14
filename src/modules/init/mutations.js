//pongo en el estado la lista de metodo de pago proveidos desde la api
export function setPaymentMethods(state, paymentMethods) {
    state.paymentMethods = paymentMethods;
}
//pongo en el estado la lista de descuentos que se admitiran obtenidos desde la api
export function setDiscounts(state, discounts) {
    state.discounts = discounts;
}

//pongo en el estado la lista de currencies que se admitiran obtenidos desde la api
export function setHotels(state, hotels) {
    state.hotels = hotels;
}


//pongo en el estado la lista de tipos de campos extra
export function setExtraFieldsTypes(state, extraFieldsTypes) {
    state.extraFieldsTypes = extraFieldsTypes;
}

export function initError(state, error){
    state.initError = true
    state.errorMessageApi = error  
}
  
export function unSetInittError(state){
    state.initError = false
    state.errorMessageApi = ''  
}
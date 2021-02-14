import {find, filter} from 'lodash'

export function addProductInCart (state, product) {
  // con lodash busco si en el cart no se repite en base a su detailId y tipo
  const productInCart = find(state.cart, { detailId: product.detailId, modelType: product.modelType })
  const productClone = Object.assign({}, product)

  if ( !productInCart ) {
    removeKeysProduct(productClone)
    setPropertiesProduct(productClone)
    state.cart.push(productClone)
  }  

  if( productInCart ){    
      productInCart.qty += 1            
  }
  
  calculateTotal(state);
}
export function removeKeysProduct(product) {
  //remuevo keys que no requiero del producto {category, la imagen, detail, type}
  delete product.category
  delete product.coverImage
  delete product.detail
  delete product.type
  delete product.gallery
  delete product.videolink
  delete product.weblink
  delete product.productinfo
}

export function setPropertiesProduct(product) {
  product.folio = Math.random().toString(36).substring(2,9) //les genero string aleatorios
  product.salepriceWithDiscount = product.saleprice
  product.originalSalePrice = product.saleprice
  product.qty = 1    
  product.cost = product.cost || "0.00"  
  product.itinerario = {}   
  product.discountApplied = 0 
  product.operationdate = null   
  product.note = '' 
  product.orderextraFields = [] 

  if(product.categoryName == "Transfer"){
    product.itinerario.trip = 'One-way'   
  }

}


//pongo en el estado la lista de currencies que se admitiran obtenidos desde la api
export function setCurrencies(state, currencies) {
  state.currencies = currencies;
}

//pongo el currency default para el client
export function setCurrency(state, currency) {
  state.cliente.currency = currency
}

export function setExtraField(state, extraField){
  state.selectedProductInCart.orderextraFields.push(extraField) 
}

export function calculateTotal(state) {

  let sum = 0;
  const decimalDiscount = parseFloat( state.totalBreakdown.discountApplied ) / 100;  
  state.cart.forEach( (product) => {
    let precio = (product.discountApplied > 0 ) ? product.salepriceWithDiscount : product.saleprice 
     sum += (parseFloat(precio) * parseFloat(product.qty));
  });
  const descuento = sum * decimalDiscount;
  state.totalBreakdown.total = ( (Math.round( sum * 100) / 100).toFixed(2) ) - descuento;
}

export function removeProductFromCart (state, product) {
  if(state.cart.length === 1){
    state.totalBreakdown.discountApplied = 0
  }
  state.cart = filter(state.cart, ({folio}) => folio !== product.folio)
  calculateTotal(state);
}

export function incrementQtyProduct(state, product) {
    product.qty += 1 
    calculateTotal(state);
}

export function decrementQtyProduct(state, product) {

  if(state.cart.length == 1){
    state.totalBreakdown.discountApplied = 0
  }

  if(product.qty == 1 ){
    removeProductFromCart (state, product)
  }
  
  product.qty -= 1
  calculateTotal(state);
}

//para guardar el nombre del cliente del cart
export function setInfoClient(state, clientData) {  
  state.cliente.name = clientData.name.trim()
  state.cliente.lastname = clientData.lastname.trim()
  state.cliente.email = clientData.email.trim()
  state.cliente.phone = clientData.phone.trim()
}

//para guardar el nombre del cliente del cart
export function setidUserClient(state, idCliente) {
  state.cliente.idUser = idCliente
}

//para indicar el hotel del cliente
export function setHotelCliente( state, hotel) {
  state.cliente.hotel = hotel;
}

//para guardar el nombre del cliente del cart
export function setNameClient( state, nameCliente) {
  state.cliente.name = nameCliente.trim()
}
//para guardar los apellidos del cliente del cart
export function setLastNameClient( state, lastNameCliente) {
  state.cliente.lastname = lastNameCliente;
}
//para guardar el email del cliente del cart
export function setEmailCliente( state, emailCliente) {
  state.cliente.email = emailCliente.trim()
}
//para guardar el email del cliente del cart
export function unsetEmailCliente( state, emailCliente) {
  state.cliente.email = emailCliente
}

//para guardar el telefono del cliente del cart
export function setPhoneCliente(state, phoneCliente) {
  state.cliente.phone = phoneCliente.trim()
}
//para guardar la forma de pago del cliente en el cart
export function setPaymentMethodClient(state, paymentMethodyCliente) {
  state.cliente.paymentMethod = paymentMethodyCliente
}
export function setReferenceClient(state, referenceCliente) {
  state.cliente.paymentreference = referenceCliente.trim()
}

export function setPaymentLinkClient(state, paymentLinkCliente) {
  state.cliente.paymentlink = paymentLinkCliente.trim()
}

//para aplicar el descuento al total del la cuenta del cliente en el cart
export function setDiscountApplied(state, discount) {
  state.totalBreakdown.discountApplied = parseInt(discount);
  calculateTotal(state)
}
//para aplicar el descuento al total del la cuenta del cliente en el cart
export function setSalepriceProduct(state, saleprice) {
  state.selectedProductInCart.saleprice = saleprice;
  state.selectedProductInCart.originalSalePrice = saleprice;

  calculateTotal(state)
}

//para seleccionar en el estado un producto del cart, ocupado para cuando hay que agregarle notas o descuentos al item desde un modal
export function setProductInCart(state, product){
  state.selectedProductInCart = product;
}

//para poner valor en la propiedad orderCreated del estado
export function setOrderCreated(state, invoice){
  state.orderCreated = invoice;  
}

//para volver null el estado de selectedProductInCart
export function unsetProductInCart(state){
  state.selectedProductInCart = null;
}

export function cartError(state, error){
  state.cartError = true
  state.errorMessageApi = error  
}

export function unSetCartError(state){
  state.cartError = false
  state.errorMessageApi = ''  
}


export function setEmptyCart(state) {
  state.cart = []
  state.cliente.name = ''
  state.cliente.lastname = ''
  state.cliente.email = ''
  state.cliente.phone = ''
  state.cliente.paymentmethod = ''
  state.cliente.paymentreference = ''
  state.cliente.paymentlink = '';
  state.totalBreakdown.total = 0.00
  state.totalBreakdown.discountApplied = 0
  state.cartError = false
  state.errorMessageApi = ''
  delete state.orderCreated 
  delete state.cliente.currency 
  delete state.cliente.hotel 
}

export function deleteExtraFieldInProduct(state, fieldToDelete){
  state.selectedProductInCart.orderextraFields = filter( state.selectedProductInCart.orderextraFields, ({key}) => key !== fieldToDelete.key)
}

export function setItinerary(state, itinerario) {
  state.selectedProductInCart.itinerario = itinerario
}



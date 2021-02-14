//si el estado contiene los datos, las mutaciones alteran los datos, el papel de los datos es filtrar esos datos o hacer calculos 

export function totalDiscountGetter(state) {
  
  let sum = 0;
  const decimalDiscount = parseFloat( state.totalBreakdown.discountApplied ) / 100;  
  state.cart.forEach( (product) => {
     sum += (parseFloat(product.saleprice) * parseFloat(product.qty));
  });
  return (Math.round( sum * decimalDiscount * 100) / 100).toFixed(2);
}

export function totalDiscountByProductsGetter(state) {
  
  let desc = 0
  state.cart.forEach( (product) => {
    const decimalDiscount = parseFloat(product.discountApplied ) / 100;
    desc+=  (parseFloat(product.saleprice) * parseFloat(decimalDiscount) * parseFloat(product.qty))
  });
  return (Math.round( desc * 100) / 100).toFixed(2);
}

//para obtener el total de la cuenta desde el estado
export function totalBreakdownGetter(state) {  
  return (Math.round( state.totalBreakdown.total * 100) / 100).toFixed(2);
}

//retorno todos los items del cart
export function cartGetter(state) {
  
  state.cart.forEach( (product) => {
    const precio = (product.discountApplied > 0 ) ? product.salepriceWithDiscount : product.saleprice 
    product.saleprice = precio
  });

  return state.cart;
}


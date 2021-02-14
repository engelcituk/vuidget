export default {
    cart: [],
    cliente: {        
        idUser:'',        
        name: '',
        lastname: '',
        email:'',
        phone:'',
        paymentmethod:'',        
        paymentreference: '',
        paymentlink: ''

    },
    totalBreakdown: {
        total: 0.00,        
        discountApplied: 0
    },
    currencies:[],
    selectedProductInCart: null,  
    cartError: false,
    errorMessageApi: '',
}
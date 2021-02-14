const handlerErrors = ( errorMessage, errorResponse ) => {
    
    let stringError = ''
    const responseStatus =  errorResponse.status || false 
    const responseStatusText = errorResponse.statusText || false 
    const responseStatusDataDetail = errorResponse.data.detail || false 

    stringError += '<strong>Error message:</strong> ' + errorMessage + '<br>'

    if( responseStatus ){
        stringError += '<strong>Error code:</strong> ' +responseStatus +'<br>'
    }

    if( responseStatusText ){
        stringError += '<strong>Status text:</strong> ' +responseStatusText +'<br>'
    }

    if( responseStatusDataDetail ){
        stringError += '<strong>Detail:</strong> ' +responseStatusDataDetail +'<br>'
    }

    return stringError
}

const currentDate = () => {
    let date = new Date();
    // adjust 0 before single digit date
    let day = ("0" + date.getDate()).slice(-2);
    // current month
    let month = ("0" + (date.getMonth() + 1)).slice(-2)
    // current year
    let year = date.getFullYear()
   
    return year + "-" + month + "-" + day
}

const formatDate = (fecha, locale) => {

    const date = new Date(fecha+'T00:00:00')

    const mesesSpanish =  [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre" , "Diciembre" ]

    const mesesIngles =  [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November" , "December" ]
   
    const dia = date.getDate()
    const mes = date.getMonth()
    const yyy = date.getFullYear()

    const stringEs = dia + '  ' + mesesSpanish[mes] + ' ' + yyy
    const stringEn = mesesIngles[mes]+' '+ dia +', '+ yyy

    const stringDate = locale == "es" ? stringEs : stringEn

    return stringDate       
}


const currentDateSecondsAndExpires = () => {
    const date = new Date()
    const seconds = date.getTime() / 1000

    return { currenTime: Math.trunc(seconds), expiresIn: Math.trunc(seconds) + 120 }
}

const sessionHasExpired = ( expiration ) => {
    const date = new Date()
    const currentSeconds = Math.trunc(date.getTime() / 1000)

    return currentSeconds > expiration ?  true : false
}

export { handlerErrors, currentDate, formatDate, currentDateSecondsAndExpires, sessionHasExpired}


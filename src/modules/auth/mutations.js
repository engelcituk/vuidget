export function setUser(state, user){ //se ejecuta una vez el usaurio haga login
    state.user = user
    state.isLogged = true    
    state.error = false
    state.errorMessage = ''    
}

export function logout(state){
    state.user = null
    state.isLogged = false    
}

export function authError(state, error){
    state.error = true
    state.errorMessage = error
    state.user = null
    state.isLogged = false
}

export function unsetError(state){
    state.error = false
    state.errorMessage = ''  
}

export function updateExpiresTime(state, time ){    
    state.user.expiresTime = time + 60  
}
  
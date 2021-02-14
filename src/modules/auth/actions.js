import Vue from 'vue'
import { handlerErrors, currentDateSecondsAndExpires } from './../../helpers/helpers'

export async function signIn(context, user){
    try {
        context.commit('setLoading', true, { root: true} )
        const response =  await Vue.axios({
            method: 'POST',
            url:'/login/',
            data: user
        })
        const { expiresIn } =  currentDateSecondsAndExpires()
        //desestructuración de lo que me regresa en el respose payload      
        const {id, name, lastname, group} = response && response.data

        user.idUser = id
        user.name = name
        user.lastname = lastname
        user.group = group || ''
        user.expiresTime = expiresIn
        
        delete user.password //del user elimino el password, para guardarlo en el state

        context.commit('setUser', user)
    } catch (error) {
        console.log(error.response)
        const errorMsg = handlerErrors( error.message, error.response )        
        context.commit('authError', errorMsg)

    } finally {
        context.commit('setLoading', false, { root: true} ) //se terminar de mostrar el loader
    }
}
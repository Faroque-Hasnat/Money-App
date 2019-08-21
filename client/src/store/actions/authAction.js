import * as Types from './types'
import jwtDecode from 'jwt-decode'
import Axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const register = (user, history) => dispatch => {
   Axios.post('/api/users/register', user)
         .then(res => {
            let token = res.data.token
            localStorage.setItem('auth_token', token)
            setAuthToken(token)
            let decode = jwtDecode(token)

            dispatch({
               type: Types.SET_USER,
               payload:{
                  message: res.data.message,
                  user: decode
               }
            })
            history.push('/')
         })
         .catch(error => {
            dispatch({
               type: Types.USER_ERROR,
               payload: {
                  error: error.response.data
               }
            })
         })
}

export const login = (user, history) => dispatch => {
   Axios.post('/api/users/login', user)
         .then(res => {
            let token = res.data.token
            localStorage.setItem('auth_token', token)
            setAuthToken(token)
            let decode = jwtDecode(token)

            dispatch({
               type: Types.SET_USER,
               payload:{
                  message: res.data.message,
                  user: decode
               }
            })
            history.push('/')
         })
         .catch(error => {
            dispatch({
               type: Types.USER_ERROR,
               payload: {
                  error: error.response.data
               }
            })
         })
}

export const logout = (history) => {
   localStorage.removeItem('auth_token')
   history.push('/login')
   return ({
      type: Types.SET_USER,
      payload: {
         user: {}
      }
   })
}
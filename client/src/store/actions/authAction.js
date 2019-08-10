import * as Types from './types'
import Axios from 'axios'

export const register = (user) => dispatch => {
   Axios.post('/api/users/register', user)
         .then(res => {
            dispatch({
               type: Types.USER_ERROR,
               payload: {
                  error: {}
               }
            })
            console.log('requist successfull')
         })
         .catch(error => {
            dispatch({
               type: Types.USER_ERROR,
               payload: {
                  error: error.response.data
               }
            })
            console.log('create error')
         })
}
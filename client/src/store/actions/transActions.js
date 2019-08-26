import * as Types from './types'
import Axios from 'axios'

export const addNewTransaction = (transaction) => dispatch => {
   Axios.post('/api/transactions', transaction)
         .then(response => {
            dispatch({
               type: Types.CREATE_TRANSACTION,
               payload: {
                  transaction: response.data.transaction,
                  user: response.data.user
               }
            })
         })
         .catch(error => {
            console.log(error)
         })
}

export const loadTransactions = () => dispatch => {
   Axios.get('/api/transactions')
         .then(response => {
            dispatch({
               type: Types.LOAD_TRANSACTION,
               payload: {
                  transactions: response.data.transactions,
                  balance: response.data.balance
               }
            })
         })
         .catch(error => {
            console.log(error)
         })
}

export const deleteTransaction = id => dispatch => {
   Axios.delete(`/api/transactions/${id}`)
         .then(response => {
            dispatch({
               type: Types.REMOVE_TRANSACTION,
               payload: {
                  message: response.data.message,
                  transactions: response.data.transactions,
                  balance: response.data.balance
               }
            })
         })
         .catch(error => {
            console.log(error)
            console.log('faroque Hasnat')
         })
}

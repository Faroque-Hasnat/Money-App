import * as Types from '../actions/types'

const init = {
   transactions: [],
   balance: 0
}

const transactionReducer = (state=init, action) => {
   switch(action.type) {
      case Types.LOAD_TRANSACTION: {
         return {
            transactions : action.payload.transactions.reverse(),
            balance: action.payload.balance
         }
      }
      case Types.CREATE_TRANSACTION: {
         let transactions = [...state.transactions]
         transactions.unshift(action.payload.transaction)
         return {
            transactions,
            balance: action.payload.user.balance
         }
      }
      case Types.REMOVE_TRANSACTION: {
         return {
            transactions : action.payload.transactions,
            balance: action.payload.balance,
            message: action.payload.message,
         }
      }
      default: return state
   }
}

export default transactionReducer
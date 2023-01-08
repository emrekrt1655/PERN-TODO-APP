import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { alertReducer } from './alertReducer'
import { todoReducer } from './todoReducer'

export default combineReducers({
    authReducer,
    alertReducer,
    todoReducer
})

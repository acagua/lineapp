import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { linesReducer } from './linesReducer'
import { uiReducer } from './uiReducer'

export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    lines: linesReducer
})
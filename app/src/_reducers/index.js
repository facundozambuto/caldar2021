import {combineReducers} from 'redux';
import {technicianReducer} from './technicians.reducer';
import {authReducer} from './auth.reducer';

export const rootReducer = combineReducers({
    technicianReducer,
    authReducer
});
import { accordionActionsClasses } from '@mui/material';
import {createStore} from 'redux'

const initialState={
    user:{login:false},
    admin:{login:false},
    refresh:true
}
function reducer(state=initialState,action){
    switch(action.type){
        case 'user':return {...state,user:action.payload};
    case 'admin':return {...state,admin:action.payload}
        case 'refresh':return {...state,refresh:!state.refresh}
        default:return state
    }
}export default createStore(reducer)
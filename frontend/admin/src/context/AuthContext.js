import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

const { REACT_APP_API_ROOT } = process.env;

export const authReducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN' :
            return { ...state, user: action.payload }
        case 'EDIT_PROFILE' :
            return { ...state, user: action.payload}
        case 'LOGOUT' :
            return { ...state, user: null }
        case 'IS_READY': 
            return { ...state, user: action.payload, isReady: true}
        default: return state
    }
}

export const AuthProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(authReducer, { 
        user: null, 
        isReady: false
    })

    useEffect(() => {
        axios.get(`${REACT_APP_API_ROOT}/pages/auth`, {withCredentials: true})
            .then(response => {
                dispatch({ type: 'IS_READY', payload: response.data })
                // console.log(response.data)
            })
            .catch(error => {console.log(error)})
    }, [])

    return <AuthContext.Provider value={{ ...state, dispatch }} >
        { children }
    </AuthContext.Provider>

}
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {

    const context = useContext(AuthContext)

    if (!context) {
        throw Error('There was an error');
    }

    return context;
}
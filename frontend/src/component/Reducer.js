import { useHistory } from 'react-router-dom';

export const initialState = {
    isAuth: localStorage.getItem('isAuth') || false,
    id: null,
    name: '',
    email: '',
    username: '',
    posts: [],
    error: false,
    errorMessage: '',
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POST':
        case 'DELETE_POST':
        case 'SET_POST':
            return { ...state, posts: [...action.payload] };

        case 'SET_USER':
        case 'LOGIN':
        case 'SIGNUP':
            localStorage.setItem('isAuth', true);

            return { ...state, ...action.payload, isAuth: true };

        case 'LOADING':
            return { ...state, loading: !state.loading };

        case 'LOGOUT':
        case 'AUTH_ERROR':
            localStorage.clear();
            return { ...initialState };

        case 'ERROR':
            return { ...state, error: true, errorMessage: action.payload };

        case 'REMOVE_ERROR':
            return { ...state, error: false, errorMessage: null };

        default:
            return state;
    }
};

export default reducer;

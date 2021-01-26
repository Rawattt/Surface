export const initialState = {
    isAuth: localStorage.getItem('isAuth') || false,
    id: localStorage.getItem('id') || null,
    name: '',
    email: '',
    username: '',
    posts: [],
    error: false,
    errorMessage: '',
    loading: false,
    profile: {},
    fullPost: {},
    comments: [],
    totalPosts: 10
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POST':
        case 'DELETE_POST':
        case 'SET_POST':
            return { ...state, posts: [...action.payload] };

        case 'LENGTH':
            return { ...state, totalPosts: parseInt(action.payload) };

        case 'SET_USER':
        case 'LOGIN':
        case 'SIGNUP':
            localStorage.setItem('isAuth', true);

            return { ...state, ...action.payload, isAuth: true };

        case 'LOADING':
            return { ...state, loading: true };
        case 'STOP_LOADING':
            return { ...state, loading: false };

        case 'LOGOUT':
        case 'AUTH_ERROR':
            localStorage.clear();
            return { ...initialState };

        case 'ERROR':
            return { ...state, error: true, errorMessage: action.payload };

        case 'REMOVE_ERROR':
            return { ...state, error: false, errorMessage: null };

        case 'SET_PROFILE':
            return {
                ...state,
                profile: { ...state.profile, ...action.payload }
            };

        case 'FULL_POST':
            console.log('Dispatching full post', action.payload);
            return {
                ...state,
                fullPost: { ...action.payload }
            };
        case 'COMMENTS':
            console.log('Dispatching full post', action.payload);
            return {
                ...state,
                comments: [...action.payload]
            };

        default:
            return state;
    }
};

export default reducer;

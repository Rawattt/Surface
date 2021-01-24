import { Redirect } from 'react-router-dom';

const authError = async (dispatch) => {
    localStorage.clear();
    dispatch({ type: 'AUTH_ERROR' });
    Redirect('/');
    // <Redirect to='/'/>
};

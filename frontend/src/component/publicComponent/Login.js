import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StateContext } from '../StateProvider';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [user, dispatch] = useContext(StateContext);

    const history = useHistory();

    const [formData, setFormData] = useState({ email: '', password: '' });

    const inputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const body = JSON.stringify(formData);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        dispatch({ type: 'LOADING' });
        const res = await axios.post('/api/v1/auth/signin', body, config);
        dispatch({ type: 'STOP_LOADING' });

        console.log(res);

        if (res.data.error === false) {
            console.log(res.data);
            const { _id, username, name } = res.data.payload;
            dispatch({
                type: 'LOGIN',
                payload: { id: _id, username, name }
            });
            localStorage.setItem('username', username);
            localStorage.setItem('id', true);
            return history.push('/dashboard');
        } else {
            dispatch({ type: 'ERROR', payload: res.data.errorMessage });
            setTimeout(() => dispatch({ type: 'REMOVE_ERROR' }), 2000);
        }
    };

    return (
        <div>
            <form className='my-2' onSubmit={(e) => submitHandler(e)}>
                <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Email address</label>
                    <input
                        type='email'
                        name='email'
                        className='form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                        placeholder='Enter email'
                        value={formData.email}
                        onChange={(e) => inputHandler(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputPassword1'>Password</label>
                    <input
                        name='password'
                        type='password'
                        className='form-control'
                        id='exampleInputPassword1'
                        placeholder='Password'
                        value={formData.password}
                        onChange={(e) => inputHandler(e)}
                        required
                    />
                </div>
                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;

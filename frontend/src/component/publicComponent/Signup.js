import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StateContext } from '../StateProvider';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [user, dispatch] = useContext(StateContext);
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    const inputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            const body = JSON.stringify(formData);
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            dispatch({ type: 'LOADING' });

            const res = await axios.post('/api/v1/auth/signup', body, config);

            dispatch({ type: 'STOP_LOADING' });
            if (res.data.error) {
                dispatch({ type: 'ERROR', payload: res.data.errorMessage });
            } else {
                const { _id, username, name } = res.data.payload;
                dispatch({
                    type: 'SIGNUP',
                    payload: { id: _id, username, name }
                });
                history.push('/dashboard/1');
            }
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
        }
    };

    return (
        <div>
            <form onSubmit={(e) => submitHandler(e)}>
                <div className='mb-3'>
                    <label>Name</label>
                    <input
                        type='text'
                        name='name'
                        className='form-control'
                        placeholder='Enter name'
                        value={formData.name}
                        onChange={(e) => inputHandler(e)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label>username</label>
                    <input
                        type='test'
                        name='username'
                        className='form-control'
                        placeholder='Enter username'
                        value={formData.username}
                        onChange={(e) => inputHandler(e)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label>Email address</label>
                    <input
                        type='email'
                        name='email'
                        className='form-control'
                        placeholder='Enter email'
                        value={formData.email}
                        onChange={(e) => inputHandler(e)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label>Password</label>
                    <input
                        name='password'
                        type='password'
                        className='form-control'
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

export default Signup;

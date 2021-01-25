import axios from 'axios';
import React, { useContext, useState } from 'react';
import { StateContext } from '../StateProvider';

const AddPost = () => {
    const [user, dispatch] = useContext(StateContext);

    const [formData, setFormData] = useState({ title: '', body: '' });

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
            const { data } = await axios.post(
                '/api/v1/post/create',
                body,
                config
            );

            dispatch({ type: 'STOP_LOADING' });

            if (data.error) {
                dispatch({ type: 'ERROR', payload: data.errorMessage });
                setTimeout(() => {
                    dispatch({ type: 'REMOVE_ERROR' });
                }, 2000);
            } else {
                dispatch({ type: 'SET_POST', payload: data.payload.posts });
            }
            console.log(data);
            setFormData({ title: '', body: '' });
        } catch (error) {
            setFormData({ title: '', body: '' });
            dispatch({ type: 'ERROR', payload: error.message });
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ERROR' });
            }, 2000);
        }
    };

    return (
        <div>
            <form className='my-2' onSubmit={(e) => submitHandler(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        name='title'
                        className='form-control'
                        placeholder='Title'
                        value={formData.title}
                        onChange={(e) => inputHandler(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        name='body'
                        type='text'
                        className='form-control'
                        placeholder='Body'
                        value={formData.body}
                        onChange={(e) => inputHandler(e)}
                        required
                    />
                </div>
                <button type='submit' className='btn btn-primary'>
                    Add post
                </button>
            </form>
        </div>
    );
};

export default AddPost;

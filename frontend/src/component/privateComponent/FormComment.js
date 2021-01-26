import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StateContext } from '../StateProvider';

const FormComment = ({ id }) => {
    const [formData, setFormData] = useState({ body: '' });
    const history = useHistory();
    const inputHandler = (e) => {
        setFormData({ body: e.target.value });
    };

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            let body = JSON.stringify(formData);
            const res = await axios.post(`/api/v1/post/comment/${id}`, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            history.push(`/post/${id}`);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <form className='my-2' onSubmit={(e) => submitHandler(e)}>
            <div className='mb-3'>
                <input
                    type='text'
                    name='body'
                    className='form-control'
                    placeholder='Add comment'
                    value={formData.email}
                    onChange={(e) => inputHandler(e)}
                    required
                />
            </div>
            <button type='submit' className='btn btn-primary'>
                Add comment
            </button>
        </form>
    );
};

export default FormComment;

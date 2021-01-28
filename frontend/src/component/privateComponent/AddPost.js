import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { storage } from '../../utils/firebase';
import { StateContext } from '../StateProvider';

const AddPost = () => {
    const [user, dispatch] = useContext(StateContext);
    const [progress, setProgress] = useState(0);

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        imageUrl: ''
    });

    const [image, setImage] = useState(null);

    const inputHandler = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const imageChange = (e) => setImage(e.target.files[0]);

    const handleUpload = () => {
        const imageName = `${user.id}-${Date.now()}-${image.name}`;
        const uploadTask = storage.ref(`images/${imageName}`).put(image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                let progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (err) => {
                console.log('Error during upload', err);
            },
            () => {
                storage
                    .ref('images')
                    .child(imageName)
                    .getDownloadURL()
                    .then((imageUrl) => {
                        console.log(imageUrl);
                        setFormData({ ...formData, imageUrl });
                    });
            }
        );
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
            setImage(null);
            setProgress(0);
        } catch (error) {
            dispatch({ type: 'STOP_LOADING' });
            setFormData({ title: '', body: '' });
            setImage(null);
            setProgress(0);
            dispatch({ type: 'ERROR', payload: error.message });
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ERROR' });
            }, 2000);
        }
    };

    return (
        <div>
            <form className='my-2' onSubmit={(e) => submitHandler(e)}>
                <div className='mb-3'>
                    <input
                        name='imgage'
                        type='file'
                        accept='image/*'
                        className='form-control'
                        placeholder='Image'
                        onChange={imageChange}
                        required
                    />
                </div>
                <button
                    type='button'
                    className='btn btn-primary my-2'
                    onClick={handleUpload}
                >
                    Upload Image
                </button>
                {progress > 0 ? (
                    <div className='progress my-2'>
                        <div
                            className='progress-bar'
                            role='progressbar'
                            style={{ width: `${progress}%` }}
                            aria-valuenow='25'
                            aria-valuemin='0'
                            aria-valuemax='100'
                        ></div>
                    </div>
                ) : null}

                <div className='mb-3'>
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
                <div className='mb-3'>
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

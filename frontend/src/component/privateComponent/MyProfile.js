import React, { useContext, useEffect } from 'react';
import { StateContext } from '../StateProvider';
import axios from 'axios';

const getProfile = async () => {
    const res = await axios.get('/user/profile/me');
    return res.data;
};

const MyProfile = () => {
    const [user, setUser] = useContext(StateContext);
    useEffect(() => {
        setUser({ ...user, loading: true });
        let data = getProfile();
        setUser({ ...user, loading: false });
        console.log(data);
    });
    return (
        <>
            <div>Profile</div>
        </>
    );
};

export default MyProfile;

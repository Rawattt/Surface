import React, { useContext, useEffect } from 'react';
import { StateContext } from '../StateProvider';

const Profile = (props) => {
    const [user, dispatch] = useContext(StateContext);

    useEffect(() => {
        console.log(props.location);
    });

    return <div>profile</div>;
};

export default Profile;

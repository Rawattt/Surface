import React, { Fragment, useContext } from 'react';
import { StateContext } from '../component/StateProvider';
import spinner from './spinner.gif';

const Spinner = () => {
    const [user] = useContext(StateContext);
    let loading = user.loading;
    return loading ? (
        <Fragment>
            <div className='spinner'>
                <img
                    src={spinner}
                    alt='Loading...'
                    style={{
                        width: '50px',
                        margin: 'auto',
                        display: 'block',
                        position: 'absolute',
                        top: '40vh',
                        left: '50vw'
                    }}
                />
            </div>
        </Fragment>
    ) : null;
};

export default Spinner;

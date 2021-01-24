import React, { createContext, useReducer, useState } from 'react';
import reducer, { initialState } from './Reducer';

export const StateContext = createContext();

export const StateProvider = (props) => {
    // let id = localStorage.getItem('id');
    // let username = localStorage.getItem('username');
    let isAuth = false;
    // if (id && username) isAuth = true;

    const [user, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={[user, dispatch]}>
            {props.children}
        </StateContext.Provider>
    );
};

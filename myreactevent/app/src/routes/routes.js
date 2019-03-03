import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';
// import HomeSystem from '../components/HomeSystem';


let routers = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/home',
        component: Home,
    },
]

function render(arr) {
    return arr.map((e, i) => {
        if (e.path === '/home') {
            return (
                <Route
                    key={i}
                    path={e.path}
                    component={e.component}
                />
            )
        } else {
            return (
                <Route
                    key={i}
                    exact
                    path={e.path}
                    component={e.component}
                />
            )
        }

    })
}

export default render(routers);
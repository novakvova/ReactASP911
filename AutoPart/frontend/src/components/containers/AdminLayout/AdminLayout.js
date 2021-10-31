import React, { Component, Suspense } from 'react';
import {Redirect, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import AdmintRoutes from '../../../routes/AdminRoutes';
import { useSelector, useDispatch } from 'react-redux';

const AdminLayout = () => {

    const dispatch = useDispatch();

    const {isAuth, username} = useSelector(redux => redux.auth);

    return (
        isAuth ?
        <Layout>
            <Suspense fallback={<div>Загрузка ...</div>}>
                <Switch>
                    {AdmintRoutes.map((route, index) => {
                        return route.component ? (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={props => (
                                    <route.component {...props} />
                                )}
                            />
                        ) : (null);
                    })}
                </Switch>
            </Suspense>
        </Layout>
        : <Redirect to='/login'/>
    );
}


export default AdminLayout;
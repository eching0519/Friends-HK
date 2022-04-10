import React, { Component,Suspense, lazy, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

// import Settings from './user-panel/settings';

const Userinfo = lazy(() => import('./dashboard/Userinfo'));
// const Changepassword = lazy(() => import('./dashboard/Chagepassword'));
// const Blockuser = lazy(() => import('./dashboard/Blockuser'));
const Userlist = lazy(() => import('./dashboard/Userlist'));

const Buttons = lazy(() => import('./_sample/basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./_sample/basic-ui/Dropdowns'));
const Typography = lazy(() => import('./_sample/basic-ui/Typography'));


const BasicElements = lazy(() => import('./_sample/form-elements/BasicElements'));

const BasicTable = lazy(() => import('./_sample/tables/BasicTable'));



const Mdi = lazy(() => import('./_sample/icons/Mdi'));


const ChartJs = lazy(() => import('./_sample/charts/ChartJs'));

const Error404 = lazy(() => import('./_sample/error-pages/Error404'));
const Error500 = lazy(() => import('./_sample/error-pages/Error500'));
const Lockscreen = lazy(() => import('./_sample/user-pages/Lockscreen'));

const BlankPage = lazy(() => import('./_sample/general-pages/BlankPage'));

// Our page
const Login = lazy(() => import('./user-pages/Login'));
const Register = lazy(() => import('./user-pages/Register'));
const Verify = lazy(() => import('./user-pages/Verify'))

const Home = lazy(() => import('./user-panel/home'));
const Settings = lazy(() => import('./user-panel/settings'));
const UserProfile = lazy(() => import('./user-panel/userProfile'));
const FriendList = lazy(() => import('./user-panel/friendList'));

// Admin
const AdminLogin = lazy(() => import('./admin-pages/AdminLogin'));
const AdminHome = lazy(() => import('./admin-pages/AdminHome'));


const AppRoutes = (props) => {
  
  return (
    <Suspense fallback={<Spinner/>}>
      <Switch>
        
        <Route path="/basic-ui/buttons" component={ Buttons } />
        <Route path="/basic-ui/dropdowns" component={ Dropdowns } />
        <Route path="/basic-ui/typography" component={ Typography } />


        <Route path="/form-Elements/basic-elements" component={ BasicElements } />

        <Route path="/tables/basic-table" component={ BasicTable } />


        <Route path="/icons/mdi" component={ Mdi } />


        <Route path="/charts/chart-js" component={ ChartJs } />

        <Route path="/user-pages/lockscreen" component={ Lockscreen } />

        <Route path="/error-pages/error-404" component={ Error404 } />
        <Route path="/error-pages/error-500" component={ Error500 } />

        <Route path="/general-pages/blank-page" component={ BlankPage } />

        {/* Our UI */}
        <Route path="/home"><Home currentPage={props.homepageState} setCurrentPage={props.setHomepageState} user={props.user} /></Route>
        <Route path="/settings"><Settings user={props.user} setUser={props.setUser} /></Route>
        <Route path="/userProfile"><UserProfile user={props.user} /></Route>
        <Route path="/friend"><FriendList user={props.user} /></Route>

        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/verify" component={ Verify } />

        {/* Admin page */}
        <Route path="/admin/login" component={ AdminLogin } />
        
{/* Once the API success we have to change this */}
        {/* <Route exact path="/admin/changepassword" component={ Changepassword } /> */}
        {/* <Route exact path="/admin/blockuser" component={ Blockuser } /> */}
        <Route path="/admin/userlist" component={ Userlist } />
        
        <Route path="/admin/userinfo/:userId" component={ Userinfo } />
        <Route path="/admin" component={ AdminHome } /> {/*/admin to /admin/home */}
        
        {/* <Route exact path="/admin/userinfo/ + userId"  /> */}
        {/* Root page */}
        <Redirect to="/home" /> {/*/admin to /admin/home */}
      </Switch>
    </Suspense>
  );
}

export default AppRoutes;
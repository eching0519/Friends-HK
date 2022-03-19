import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));



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



class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />


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
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/verify" component={ Verify } />


          {/* Root page */}
          <Redirect to="/login" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
import React from 'react';
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import './App.css'
import background from '../../background.jpg'
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (

  <Router>
    <div style={{
      backgroundImage: `url(${background})`, height: "1000px", width: "100%"
    }}>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    </div>
  </Router >
);

export default withAuthentication(App);

import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
          <NavigationNonAuth />
        )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <Menu inverted color="red" celled horizontal size="massive">
    <Menu.Item as='a' href={ROUTES.HOME}>
      Home
    </Menu.Item>
    <Menu.Item as='a' href={ROUTES.ACCOUNT}>
      Account
    </Menu.Item>
    <Menu.Item as='a'>
      <SignOutButton />
    </Menu.Item>
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu color="red" inverted celled horizontal size="massive">
    <Menu.Item href={ROUTES.SIGN_IN} as='a'>
      Sign In
    </Menu.Item>
  </Menu>
);

export default Navigation;

import React from 'react';
import { Button } from 'semantic-ui-react'

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Button type="Button" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);

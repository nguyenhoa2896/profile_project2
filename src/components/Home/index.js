import React from 'react';
import { Header, Segment, Image } from 'semantic-ui-react'
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
const HomePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Segment>
        <Header as="h1">Hello, {authUser.username}</Header>
        <Image src={authUser.photo} style={{ "image-orientation": "from-image" }} size='small' avatar bordered></Image>

        <Header as="h3">Date Of Birth: {authUser.dateOfBirth}</Header>
        <Header as="h3">Phone Number: {authUser.phoneNumber}</Header>
        <Header as="h3">Email: {authUser.email}</Header>
        <Header as="h3">Address: {authUser.address}</Header>
      </Segment>

    )}
  </AuthUserContext.Consumer >
);


const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);

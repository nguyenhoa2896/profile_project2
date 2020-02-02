import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose';
import { UserItem } from '../Users';
import { Form, Segment, Button } from 'semantic-ui-react'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import * as ROUTES from '../../constants/routes'

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Segment color="red" inverted>
        <PasswordForgetForm />
        <PasswordChangeForm />
        <AccountChangeForm authUser={authUser} />
      </Segment>
    )}
  </AuthUserContext.Consumer>
);


class AccountChangeFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      phoneNumber: 0,
      address: "",
      dateOfBirth: null,

      ...props.authUser
    };
  }


  onSubmit = event => {
    const {
      username,
      phoneNumber,
      address,
      dateOfBirth,
      uid,
    } = this.state;
    this.props.firebase
      .update(this.state.uid, { username, phoneNumber, address, dateOfBirth })
      .then(() => {
        this.setState({});
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      phoneNumber,
      username,
      address,
      dateOfBirth,
    } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Segment color="0a0707" inverted>
          <Form.Group widths="equal">
            <Form.Input label="User Name"
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
            />
            <Form.Input
              label="Phone Number"
              width="5"
              name="phoneNumber"
              value={phoneNumber}
              onChange={this.onChange}
              type="number"

            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label="Address"
              width="10"
              name="address"
              value={address}
              onChange={this.onChange}
              type="text"

            />

            <Form.Input
              width="2"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={this.onChange}
              type="date"
              label="Date Of Birth"

            />
          </Form.Group>
          <Button id="SubmitFormButton" type="submit">
            Update
        </Button>
        </Segment>
      </Form>
    )
  }

}


const AccountChangeForm = compose(withRouter, withFirebase)(AccountChangeFormBase)
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);

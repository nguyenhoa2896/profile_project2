import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Segment, Input, Button, Form, Container } from 'semantic-ui-react';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div >
    <Segment color="red" inverted>

      <h1>SignIn</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </Segment>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};



class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Segment inverted color="yellow">
          <Form.Group widths="equal">

            <Form.Input

              label="Email"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <Form.Input

              label="Password"

              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button disabled={isInvalid} type="submit">
            Sign In
        </Button>

          {error && <p>{error.message}</p>}
        </Segment>
      </Form>
    );
  }
}




const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);



export default SignInPage;

export { SignInForm };

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { List, Form, Input, Header, Button } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Divider, Grid, Image, Segment } from 'semantic-ui-react'
const INITIAL_STATE = {
  phoneNumber: '',
  username: '',
  email: '',
  question1: '',
  answer1: '',
  question2: '',
  answer2: '',
  question3: '',
  answer3: '',
  address: '',
  photo: null,
  dateOfBirth: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);
const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onClick = () => {
    const url = this.props.firebase.upload(this.state.email, this.state.photo).then(snapshot => { return snapshot.ref.getDownloadURL().then(url => (url)) });
    url.then(url => { this.setState({ photo: url }) });
  }


  onSubmit = event => {
    const { username, email, passwordOne, } = this.state;
    const {
      question1,
      answer1,
      question2,
      answer2,
      question3,
      answer3,
      phoneNumber,
      address,
      dateOfBirth,
      photo,
    } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          username,
          question1,
          answer1,
          question2,
          answer2,
          question3,
          answer3,
          phoneNumber,
          address,
          email,
          dateOfBirth,
          photo,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onFileChange = event => {
    this.setState({ photo: event.target.files[0] })
  }

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      question1,
      answer1,
      question2,
      answer2,
      question3,
      answer3,
      phoneNumber,
      address,
      email,
      dateOfBirth,
      passwordOne,
      passwordTwo,
      photo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      photo === '' ||
      username === '';


    return (
      <Form onSubmit={this.onSubmit}>
        <Segment color="8a0707" inverted>
          <Form.Group widths="equal">


            <Form.Input

              label="User Name"
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Full Name"
            />
            <Form.Input
              label="Email"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />

          </Form.Group>
          <Form.Group widths="equal">

            <Form.Input

              label="Password"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <Form.Input
              label="Confrim Password"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Form.Input
            label="Phone Number"
            width="5"
            name="phoneNumber"
            value={phoneNumber}
            onChange={this.onChange}
            type="number"
            placeholder="Phone Number"

          />
          <Form.Input


            width="2"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={this.onChange}
            type="date"
            label="Date Of Birth"

          />
          <Form.Input
            label="Photo"
            name="photo"
            onChange={this.onFileChange}
            type="file"
            accept="image/*"
          />
          <Button id="UploadImage" type="Button" onClick={this.onClick}>Upload Photo</Button>
          <Form.Group widths="equal">

            <Form.Input
              label="Question 1"
              name="question1"
              value={question1}
              onChange={this.onChange}
              type="text"
              placeholder="Question 1"

            />
            <Form.Input
              label="Answer 1"
              name="answer1"
              value={answer1}
              onChange={this.onChange}
              type="text"
              placeholder="Answer 1"

            />
            <Form.Input
              label="Question 2"
              name="question2"
              value={question2}
              onChange={this.onChange}
              type="text"
              placeholder="Question 2"

            />
            <Form.Input
              label="Answer 2"
              name="answer2"
              value={answer2}
              onChange={this.onChange}
              type="text"
              placeholder="Answer 2"

            />
            <Form.Input

              label="Question 3"
              name="question3"
              value={question3}
              onChange={this.onChange}
              type="text"
              placeholder="Question 3"

            />
            <Form.Input
              label="Answer 3"
              name="answer3"
              value={answer3}
              onChange={this.onChange}
              type="text"
              placeholder="Answer 3"

            />
          </Form.Group>
          <Form.Input

            label="Address"
            width="5"
            name="address"
            value={address}
            onChange={this.onChange}
            type="text"
            placeholder="Address"

          />
          <Button id="SubmitFormButton" disabled={isInvalid} type="submit">
            Sign Up
        </Button>


          {error && <p>{error.message}</p>}
        </Segment>
      </Form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <List as="a" bold href={ROUTES.SIGN_UP}>Sign Up</List>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };

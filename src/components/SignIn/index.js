import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';

const SignInPage = () => (
  <>
    <SignInForm />
  </>
);
const INITIAL_STATE = {
  error: null,
};
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <Button variant="contained" color="primary" type="submit">
          Sign in with Google
        </Button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const SignInForm = withFirebase(SignInFormBase);
export default SignInPage;
export { SignInForm };

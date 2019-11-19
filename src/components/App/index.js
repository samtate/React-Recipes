import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import HomePage from '../Home';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { AuthUserContext } from '../Session';

const App = ({ firebase }) => (
      <Router>
        <Navigation />
        <CssBaseline />
        <Container maxWidth="md">
          <AuthUserContext.Consumer>
            {(authUser) => {
                return <Route exact path={ROUTES.LANDING} render={(props) => <LandingPage {...props} authUser={authUser} firebase={firebase}/>} />
              }
            }
          </AuthUserContext.Consumer>
          <Route path={ROUTES.HOME} component={HomePage} />
        </Container>
      </Router>
  );

export default withAuthentication(App);

import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavBar } from './NavBar/NavBar';
import { Home } from './Home/Home';
import { Calendar } from './Calendar/Calendar';
import { Programs } from './Programs/component';
import { Workout } from './Workouts/Workout';
import './app.css';
import { store } from './store'
import { Provider } from 'react-redux'
import { SignIn } from './Auth/SignIn/component';
import { SignUp } from './Auth/SignUp/component';
import { EnterConfirmationCode } from './Auth/EnterConfirmationCode/component';
import { checkExistingUserSession } from './Auth/actions';
import { SetMyProfileAction } from './Profile/action-symbols';
import { selectMyProfile } from './Profile/selectors';
import { fetchMyProfile } from './Profile/actions';
import { loadMockSbsRtf } from './Programs/actions';

// login();

function App() {
  useEffect(() => {
    checkExistingUserSession()
      .then(loadMockSbsRtf)
      .then(fetchMyProfile);
  }, []);
  return (
    <div>
      <Provider store={store}>
        <Router >
          <NavBar />
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/enter-confirmation-code">
              <EnterConfirmationCode />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/calendar">
              <Calendar />
            </Route>
            <Route path="/programs">
              <Programs />
            </Route>
            <Route path="/workout">
              <Workout />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

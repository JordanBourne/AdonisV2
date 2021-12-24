import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavBar } from './NavBar/NavBar';
import { Home } from './Home/Home';
import { Calendar } from './Calendar/Calendar';
import { Programs } from './Programs/component';
import { Workout } from './Workouts/Workout';
import { fetchSetsForDay } from './Sets/dynamo';
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
  const profile = useSelector(selectMyProfile);
  useEffect(() => {
    checkExistingUserSession()
      .then(loadMockSbsRtf)
      .then(fetchMyProfile)
      .then(() => {
        const profile = selectMyProfile(store.getState());
        console.log(profile);
        if (profile
          && profile?.programRegistrationId
          && profile?.week
          && profile?.day) {
            console.log('exists!');
          fetchSetsForDay({
            programRegistrationId: profile.programRegistrationId,
            week: profile.week,
            day: profile.day
          });
        }
      })
  }, []);
  return (
    <div>
      <Provider store={store}>
        <Router >
          <NavBar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/enter-confirmation-code" element={<EnterConfirmationCode />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

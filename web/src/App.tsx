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
import { fetchLatestOrms } from './Orms/actions';
import { fetchProgramRegistration } from './ProgramRegistrations/actions';
import { loadMockSbsRtf } from './Programs/actions';
import { ProfileDb } from './Profile/types';
import { fetchAllAutoregulationSchemes } from './AutoregulationSchemes/actions';

// login();

function App() {
  const profile = useSelector(selectMyProfile);
  useEffect(() => {
    checkExistingUserSession()
      .then(loadMockSbsRtf)
      .then(fetchAllAutoregulationSchemes)
      .then(fetchMyProfile)
      .then((myProfile: ProfileDb|null) => {
        if (myProfile?.programRegistrationId) {
          return fetchProgramRegistration(myProfile.programRegistrationId);
        }
      })
      .then(() => fetchLatestOrms())
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

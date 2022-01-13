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
import { checkAndFetchMyProfile, fetchMyProfile } from './Profile/actions';
import { fetchLatestOrms } from './Orms/actions';
import { fetchProgramRegistration } from './ProgramRegistrations/actions';
import { loadMockSbsRtf } from './Programs/actions';
import { ProfileDb } from './Profile/types';
import { fetchAllAutoregulationSchemes } from './AutoregulationSchemes/actions';
import { getCredentialsAndId } from './Auth/util';
import { selectPreviousDay, selectProgramRegistration } from './ProgramRegistrations/selectors';
import { Dev } from './Dev/dev';

// login();

function App() {
  const profile = useSelector(selectMyProfile);
  const programRegistration = useSelector(selectProgramRegistration);
  const week: number | null = profile?.week ?? null;
  const day: number | null = profile?.day ?? null;
  const programRegistrationId: string | null = profile?.programRegistrationId ?? null;
  const { week: previousWeek, day: previousDay } = selectPreviousDay(profile?.programRegistrationId as string, profile?.week as number, profile?.day as number )(store.getState());
  useEffect(() => {
    checkExistingUserSession()
      .then(loadMockSbsRtf)
      .then(fetchAllAutoregulationSchemes)
      .then(getCredentialsAndId)
      .then((output) => {
        if (output === null) return;
        return fetchMyProfile()
          .then((myProfile: ProfileDb | null) => {
            if (myProfile?.programRegistrationId) {
              return fetchProgramRegistration(myProfile.programRegistrationId);
            }
            return null;
          })
          .then(() => fetchLatestOrms())
          .then(() => {
            if (profile?.programRegistrationId && profile?.week && profile?.day) {
              fetchSetsForDay({
                programRegistrationId: profile?.programRegistrationId as string,
                week: profile?.week as number,
                day: profile?.day as number,
              });
            }
          });
      })
  }, [ profile?.cognitoIdentityId ]);
  useEffect(() => {
    if (programRegistrationId && week && day) {
      fetchSetsForDay({
        programRegistrationId,
        week,
        day,
      });
    }
  }, [programRegistrationId, week, day]);
  useEffect(() => {
    if (programRegistrationId && previousWeek && previousDay) {
      fetchSetsForDay({
        programRegistrationId,
        week: previousWeek,
        day: previousDay,
      });
    }
  }, [programRegistrationId, previousWeek, previousDay]);
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
            <Route path="/dev" element={<Dev />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

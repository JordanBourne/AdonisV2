import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { NavBar } from './NavBar/NavBar';
import { Home } from './Home/Home';
import { Calendar } from './Calendar/Calendar';
import { Programs } from './Programs/Programs';
import { Workout } from './Workout/Workout';
import './app.css';
import { store } from './store'
import { Provider } from 'react-redux'
import { login } from './login';

// login();

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router >
          <NavBar />
          <Switch>
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

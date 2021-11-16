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

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;

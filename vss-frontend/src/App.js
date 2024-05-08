import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="sidebar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

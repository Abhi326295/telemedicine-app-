// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import MedicalRecords from './pages/MedicalRecords';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/appointments" component={Appointments} />
          <Route exact path="/medical-records" component={MedicalRecords} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

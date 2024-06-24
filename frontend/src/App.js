// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Appointments from './pages/Appointments';
import MedicalRecords from './pages/MedicalRecords';
import NotFound from './pages/NotFound';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/appointments" component={Appointments} />
            <Route exact path="/medical-records" component={MedicalRecords} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

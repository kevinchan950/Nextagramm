import './App.css';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage'
import UploadPage from './pages/UploadPage'
import {Route} from 'react-router-dom';
import React from 'react';
import NavBar from './containers/NavBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className="Body">
      <ToastContainer />
      <NavBar />
      <Route exact path="/">
        <HomePage />
      </Route>

      <Route exact path="/profile">
        <ProfilePage />
      </Route>

      <Route exact path="/profile/upload">
        <UploadPage />
      </Route>
    </div>
  );
}

export default App;

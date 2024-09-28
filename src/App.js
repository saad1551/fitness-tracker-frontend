import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';
import Register from './Pages/Register';
import Home from './Pages/Home';
import VerifyEmail from './Components/VerifyEmail';
import CompleteRegistration from './Pages/CompleteRegistration';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import axios from 'axios';
import ResetPassword from './Pages/ResetPassword';
import { useEffect } from 'react';
import Dashboard from './Pages/Dashboard';
import LandingPage from './Pages/LandingPage';

// Set default Axios config globally
axios.defaults.withCredentials = true;

function App() {
  useEffect(() => {
    const getLoginStatus = async() => {
      const backendUrl = "http://localhost:5000";

      const response = await axios.get(`${backendUrl}/api/users/loggedin`);

      if (response.data.loggedIn === true) {
        localStorage.setItem('user', response.data.user);
        console.log("Logged in");
      }

      else {
        console.log("Not logged in");
      }
    };

    getLoginStatus();
  });
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={localStorage.getItem('user') ? <Dashboard /> : <LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
          <Route path="/verifyEmail/:verificationToken" element={<VerifyEmail />} />
          <Route path="/completeregistraion" element={<CompleteRegistration />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

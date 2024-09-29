import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';
import Register from './Pages/Register';
import VerifyEmail from './Components/VerifyEmail';
import CompleteRegistration from './Pages/CompleteRegistration';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import axios from 'axios';
import ResetPassword from './Pages/ResetPassword';
import { useEffect } from 'react';
import Home from './Pages/Home';
import Signout from './Components/Signout';


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

    const getWorkoutStatus = async() => {
      const backendUrl = "http://localhost:5000";

        try {
            const response = await axios.get(`${backendUrl}/api/workouts/workoutstatus`);

            if (response.status === 200) {
                localStorage.setItem('workoutOngoing', response.data.workoutOngoing);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (localStorage.getItem('user')) {
      getWorkoutStatus();
    }
  });
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signout" element={<Signout />} />
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

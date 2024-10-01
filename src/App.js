import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
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
import { fetchLoginStatus } from './slices/userSlice';  // Import actions
import { fetchWorkoutStatus } from './slices/workoutSlice'; // Import actions
import { useDispatch, useSelector } from 'react-redux';



// Set default Axios config globally
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn); // Use the logged-in state

  useEffect(() => {
    dispatch(fetchLoginStatus());  // Fetch login status
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchWorkoutStatus()); // Fetch workout status only if user is logged in
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const checkNotifications = async () => {
      try {
        const backendUrl = "localhost:5000";
        const response = await axios.get(`${backendUrl}/api/users/notifications`);
        if (response.data) {
          toast.info(response.data.message); // Show the notification using toast
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Check if user is logged in
    if (isLoggedIn) {
      checkNotifications(); // Fetch notifications if logged in
    }
  },); // Run once on mount
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

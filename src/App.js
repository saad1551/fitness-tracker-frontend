import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';
import Register from './Pages/Register';
import Home from './Pages/Home';
import VerifyEmail from './Components/VerifyEmail';
import CompleteRegistration from './Pages/CompleteRegistration';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyEmail/:verificationToken" element={<VerifyEmail />} />
          <Route path="/completeregistraion" element={<CompleteRegistration />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

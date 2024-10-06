import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignOutPage.css'; // Import CSS for styling

const SignOutPage = ({ handleCancel }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Redirect to signout page
    navigate('/signout');
  };

  // const handleCancel = () => {
  //   // Redirect to home or another safe page
  //   navigate('/');
  // };

  return (
    <div className="signout-container">
      <div className="signout-box">
        <h2>Are you sure you want to sign out?</h2>
        <p>Your session will end and you will be logged out of the app.</p>
        <div className="button-group">
          <button className="confirm-button" onClick={handleSignOut}>
            Yes, Sign Out
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutPage;

import React, { useState,useEffect } from 'react';
import { useUserContext } from '../common/UserProvider';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ApplicantAPIService, { apiUrl } from '../../services/ApplicantAPIService';
import { Link } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { useNavigate } from "react-router-dom";
import Snackbar from '../common/Snackbar';

function ApplicantChangePassword() {
  const { user } = useUserContext();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmedPassword: '',
  });
  const validateForm = () => {
    let isValid = true;
    const errors = {};
    if (!oldPassword.trim()) {
      errors.oldPassword = 'Old password is required.';
      isValid = false;
    } else {
      errors.oldPassword = '';
    }
    if (!newPassword.trim()) {
      errors.newPassword = 'New password is required.';
      isValid = false;
    } else if (!isValidPassword(newPassword)) {
      errors.newPassword =
        'New password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, one number, one special character, and no spaces.';
      isValid = false;
    } else {
      errors.newPassword = '';
    }
    if (!confirmedPassword.trim()) {
      errors.confirmedPassword = 'Confirm password is required.';
      isValid = false;
    } else if (newPassword !== confirmedPassword) {
      errors.confirmedPassword = 'Passwords do not match.';
      isValid = false;
    } else {
      errors.confirmedPassword = '';
    }
    setFormErrors(errors);
    return isValid;
  };
  const handleTogglePassword = (type) => {
    switch (type) {
      case 'old':
        setShowOldPassword(!showOldPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirmed':
        setShowConfirmedPassword(!showConfirmedPassword);
        break;
      default:
        break;
    }
  };


  const handleChangePassword = async (e) => {
    e.preventDefault();
 
    if (!validateForm()) {
      return;
    }
    const formData = {
      oldPassword,
      newPassword,
      confirmedPassword,
    };
    try {
      const response = await axios.post(`${apiUrl}/applicant/authenticateUsers/${user.id}`, formData);
      if (response.data === 'Password updated and stored') {
      
       setSnackbar({ open: true, message: 'Password changed successfully', type: 'success' });
      }else if(response.data==='your new password should not be same as old password'){

        setSnackbar({ open: true, message: 'New password should not be same as old password.', type: 'error' });
      } else {
       
        setSnackbar({ open: true, message: 'Password change failed. Old password is wrong.', type: 'error' });
      
      }
    } 
  catch (error) {
      console.error('Password change failed. Old password is wrong.:', error);
    
      setSnackbar({ open: true, message: 'Password change failed. Old password is wrong.', type: 'error' });
    }
  };
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', type: '' });
  };

  return (
    <div>
      <>
        <div class="dashboard__content">
        <section className="page-title-dashboard">
      <div className="themes-container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="title-dashboard">            
               
              <div className="title-dash flex2">Change Password</div>
            </div>
          </div>
        </div>
      </div>
    </section>
          <section className="flat-dashboard-password">
            <div className="themes-container">
              <div className="row">
                <div className="col-lg-12 col-md-12 ">
                  <div className="change-password bg-white">
                   
                    <form action="#">
                      <div className="form-password">
                        <div className="inner info-wd">
                          <label className="title-url fs-16">
                            Old Password<span className="color-red">*</span>
                          </label>                          
<div className="inputs-group auth-pass-inputgroup relative flex2">
        <input
          type={showOldPassword ? 'text' : 'password'}
          className="input-form password-input"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          onBlur={() => validateForm()}
          required=""
        />
        <div className="password-toggle-icon" onClick={() => handleTogglePassword('old')} id="password-addon">
          {showOldPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      </div>
                          {formErrors.oldPassword && (
                            <div className="error-message">{formErrors.oldPassword}</div>
                          )}
                        </div>
                        {/* New Password */}
                        <div className="inner info-wd">
                          <label className="title-url fs-16">
                            New Password <span className="color-red">*</span>
                          </label>
                         
                          <div className="inputs-group auth-pass-inputgroup relative flex2">
        <input
          type={showNewPassword ? 'text' : 'password'}
          className="input-form"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onBlur={() => validateForm()}
          required=""
        />
        <div className="password-toggle-icon" onClick={() => handleTogglePassword('new')} id="password-addon">
          {showNewPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      </div>
                          {formErrors.newPassword && (
                            <div className="error-message">{formErrors.newPassword}</div>
                          )}
                        </div>
                        {/* Confirm Password */}
                        <div className="inner info-wd">
                          <label className="title-url fs-16">
                            Confirm Password<span className="color-red">*</span>
                          </label>
                         
                          <div className="inputs-group auth-pass-inputgroup relative flex2">
        <input
          type={showConfirmedPassword ? 'text' : 'password'}
          className="input-form password-input"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          onBlur={() => validateForm()}
          required=""
        />
        <div className="password-toggle-icon" onClick={() => handleTogglePassword('confirmed')} id="password-addon">
          {showConfirmedPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      </div>
                          {formErrors.confirmedPassword && (
                            <div className="error-message">{formErrors.confirmedPassword}</div>
                          )}
                        </div>
                        <div className="tt-button submit">
                          <button type="button" class="button-status" onClick={handleChangePassword}>
                            {/* Update Password */}
                            Change Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <br></br>
        </div>
      </>
      {snackbar.open && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={handleCloseSnackbar}
          link={snackbar.link}
          linkText={snackbar.linkText}
        />
      )}
    </div>
  );
}
export default ApplicantChangePassword;
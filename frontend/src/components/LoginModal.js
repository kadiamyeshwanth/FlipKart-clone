import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    let result;
    if (isLoginView) {
      result = await login(email, password);
    } else {
      result = await register(name, email, password);
    }

    if (result && result.success) {
      onClose();
    } else {
      setError(result?.message || (isLoginView ? 'Invalid email or password' : 'Error creating account'));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-left">
          <h2>{isLoginView ? 'Login' : 'Looks like you\'re new here!'}</h2>
          <p>{isLoginView ? 'Get access to your Orders, Wishlist and Recommendations' : 'Sign up with your details to get started'}</p>
          <div className="modal-left-img">
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="Login Banner" />
          </div>
        </div>

        <div className="modal-right">
          <form onSubmit={handleSubmit} className="modal-form">
            {!isLoginView && (
              <div className="form-group">
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" " 
                />
                <label>Enter Name</label>
              </div>
            )}
            
            <div className="form-group">
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" " 
              />
              <label>Enter Email</label>
            </div>

            <div className="form-group">
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" " 
              />
              <label>Enter Password</label>
            </div>

            {error && <div className="error-text">{error}</div>}

            <p className="terms-text">
              By continuing, you agree to Flipkart's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
            </p>

            <button type="submit" className="btn-solid">
              {isLoginView ? 'Login' : 'Continue'}
            </button>

            {isLoginView && <div className="or-text">OR</div>}
            
            {isLoginView && (
              <button type="button" className="btn-outline">
                Request OTP
              </button>
            )}
          </form>

          <div className="modal-footer">
            {isLoginView ? (
              <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginView(false); }}>
                New to Flipkart? Create an account
              </a>
            ) : (
              <button type="button" className="btn-solid btn-switch" onClick={() => setIsLoginView(true)}>
                Existing User? Log in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

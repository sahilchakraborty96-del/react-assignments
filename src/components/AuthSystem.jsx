import { useState, useEffect } from 'react';

export default function AuthSystem() {
  const [isLogin, setIsLogin] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student'
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Check persistent session on mount
  useEffect(() => {
    const session = localStorage.getItem('auth_active_user');
    if (session) {
      setCurrentUser(JSON.parse(session));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('auth_registered_users') || '[]');

    if (isLogin) {
      // Login validation
      const existingUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password
      );

      if (existingUser) {
        localStorage.setItem('auth_active_user', JSON.stringify(existingUser));
        setCurrentUser(existingUser);
        setErrors({});
      } else {
        setErrors({ general: 'Invalid email credentials or password' });
      }
    } else {
      // Registration validation
      const emailExists = registeredUsers.some(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (emailExists) {
        setErrors({ email: 'An account with this email already exists' });
        return;
      }

      const newUser = {
        id: Date.now(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        registeredAt: new Date().toLocaleDateString()
      };

      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem('auth_registered_users', JSON.stringify(updatedUsers));
      localStorage.setItem('auth_active_user', JSON.stringify(newUser));

      setCurrentUser(newUser);
      setSuccessMessage('Account registered and logged in successfully!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_active_user');
    setCurrentUser(null);
    setFormData({ name: '', email: '', password: '', confirmPassword: '', role: 'Student' });
    setErrors({});
    setSuccessMessage('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="assignment-container">
      {currentUser ? (
        <div className="auth-profile-card">
          <div className="profile-banner">
            <div className="profile-avatar">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h2>Welcome back, {currentUser.name || 'User'}!</h2>
            <span className="profile-role-badge">{currentUser.role}</span>
          </div>

          <div className="profile-details-grid">
            <div className="profile-field">
              <span className="field-label">Account Email</span>
              <span className="field-val">{currentUser.email}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">Authentication Status</span>
              <span className="field-val" style={{ color: '#16a34a', fontWeight: 'bold' }}>
                ● Active (Session Stored in LocalStorage)
              </span>
            </div>
            <div className="profile-field">
              <span className="field-label">Member Since</span>
              <span className="field-val">{currentUser.registeredAt || 'Active Session'}</span>
            </div>
          </div>

          <button onClick={handleLogout} className="btn btn-secondary logout-btn">
            Log Out
          </button>
        </div>
      ) : (
        <div className="auth-card">
          <div className="auth-tabs">
            <button
              className={`auth-tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(true); setErrors({}); }}
            >
              Sign In
            </button>
            <button
              className={`auth-tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(false); setErrors({}); }}
            >
              Create Account
            </button>
          </div>

          {errors.general && <div className="auth-error-alert">{errors.general}</div>}
          {successMessage && <div className="auth-success-alert">{successMessage}</div>}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {!isLogin && (
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Sahil Chakraborty"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
            )}

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {!isLogin && (
              <>
                <div className="input-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'input-error' : ''}
                  />
                  {errors.confirmPassword && (
                    <span className="error-text">{errors.confirmPassword}</span>
                  )}
                </div>

                <div className="input-group">
                  <label>User Role</label>
                  <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>
              </>
            )}

            <button type="submit" className="btn auth-submit-btn">
              {isLogin ? 'Sign In' : 'Register Account'}
            </button>
          </form>

          <p className="auth-switch-text">
            {isLogin ? "Don't have an account yet?" : 'Already registered?'}
            <button type="button" onClick={switchMode} className="auth-toggle-link">
              {isLogin ? 'Create an account' : 'Sign in here'}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
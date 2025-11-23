// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     const result = await login(formData.email, formData.password);

//     if (result.success) {
//       navigate('/dashboard');
//     } else {
//       setError(result.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={styles.container}>
//       {/* Animated Background Elements */}
//       <div style={styles.circle1}></div>
//       <div style={styles.circle2}></div>
//       <div style={styles.circle3}></div>
      
//       <div style={styles.card}>
//         {/* Gradient Top Bar */}
//         <div style={styles.gradientBar}></div>
        
//         {/* Compact Header Section */}
//         <div style={styles.header}>
//           <div style={styles.logo}>
//             <div style={styles.logoIcon}>EMS</div>
//           </div>
//           <h2 style={styles.title}>Welcome Back</h2>
//           <p style={styles.subtitle}>Sign in to your EMS account</p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div style={styles.error}>
//             <span style={styles.errorIcon}>⚠</span>
//             {error}
//           </div>
//         )}

//         {/* Compact Form Section */}
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>
//               <span style={styles.labelIcon}>✉</span>
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               onFocus={() => setFocusedField('email')}
//               onBlur={() => setFocusedField(null)}
//               required
//               style={{
//                 ...styles.input,
//                 ...(focusedField === 'email' ? styles.inputFocus : {})
//               }}
//               placeholder="Enter your email"
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <div style={styles.labelContainer}>
//               <label style={styles.label}>
//                 <span style={styles.labelIcon}>🔒</span>
//                 Password
//               </label>
//               <Link to="/forgot-password" style={styles.forgotLink}>
//                 Forgot password?
//               </Link>
//             </div>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               onFocus={() => setFocusedField('password')}
//               onBlur={() => setFocusedField(null)}
//               required
//               style={{
//                 ...styles.input,
//                 ...(focusedField === 'password' ? styles.inputFocus : {})
//               }}
//               placeholder="Enter your password"
//             />
//           </div>

//           <button 
//             type="submit"
//             style={{
//               ...styles.button,
//               ...(loading ? styles.buttonDisabled : {})
//             }}
//             disabled={loading}
//           >
//             {loading ? (
//               <div style={styles.buttonContent}>
//                 <div style={styles.spinner}></div>
//                 Signing in...
//               </div>
//             ) : (
//               <div style={styles.buttonContent}>
//                 Sign In
//                 <span style={styles.buttonArrow}>→</span>
//               </div>
//             )}
//           </button>
//         </form>

//         {/* Compact Footer Section */}
//         <div style={styles.footer}>
//           <p style={styles.footerText}>
//             Don't have an account?{' '}
//             <Link to="/register" style={styles.registerLink}>
//               Create account
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Add CSS directly */}
//       <style>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }
//         body, html, #root {
//           height: 100%;
//           overflow: hidden;
//           background: #0f172a;
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0) scale(1); }
//           50% { transform: translateY(-10px) scale(1.02); }
//         }
//         @keyframes pulse {
//           0% { opacity: 0.3; }
//           100% { opacity: 0.6; }
//         }
        
//         button:hover:not(:disabled) .buttonArrow {
//           transform: translateX(3px);
//         }
        
//         button:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 12px 30px rgba(59,130,246,0.15);
//         }
//       `}</style>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     height: '100vh',
//     width: '100vw',
//     background: 'transparent',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '20px',
//     fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     overflow: 'hidden',
//     backgroundColor: '#0f172a',
//   },
//   circle1: {
//     position: 'absolute',
//     width: '300px',
//     height: '300px',
//     background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
//     borderRadius: '50%',
//     top: '10%',
//     left: '10%',
//     animation: 'float 8s ease-in-out infinite, pulse 4s ease-in-out infinite alternate',
//   },
//   circle2: {
//     position: 'absolute',
//     width: '250px',
//     height: '250px',
//     background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
//     borderRadius: '50%',
//     bottom: '15%',
//     right: '15%',
//     animation: 'float 6s ease-in-out infinite reverse, pulse 3s ease-in-out infinite alternate',
//   },
//   circle3: {
//     position: 'absolute',
//     width: '200px',
//     height: '200px',
//     background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
//     borderRadius: '50%',
//     top: '60%',
//     left: '70%',
//     animation: 'float 7s ease-in-out infinite, pulse 5s ease-in-out infinite alternate',
//   },
//   card: {
//     background: 'rgba(15, 23, 42, 0.7)',
//     backdropFilter: 'blur(16px)',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     padding: '30px',
//     borderRadius: '20px',
//     boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
//     width: '400px',
//     maxWidth: '90vw',
//     maxHeight: '90vh',
//     display: 'flex',
//     flexDirection: 'column',
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   gradientBar: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: '4px',
//     background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
//   },
//   header: {
//     textAlign: 'center',
//     marginBottom: '24px',
//   },
//   logo: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginBottom: '16px',
//   },
//   logoIcon: {
//     width: '56px',
//     height: '56px',
//     background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
//     borderRadius: '14px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: 'white',
//     fontSize: '18px',
//     fontWeight: 'bold',
//     boxShadow: '0 8px 20px rgba(59,130,246,0.2)',
//   },
//   title: {
//     fontSize: '24px',
//     fontWeight: '700',
//     background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
//     backgroundClip: 'text',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     margin: '0 0 6px 0',
//   },
//   subtitle: {
//     fontSize: '14px',
//     color: '#94a3b8',
//     margin: 0,
//     fontWeight: '400',
//   },
//   form: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px',
//     minHeight: '0',
//   },
//   formGroup: {
//     position: 'relative',
//   },
//   labelContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '8px',
//   },
//   label: {
//     fontSize: '13px',
//     fontWeight: '600',
//     color: '#e2e8f0',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '6px',
//   },
//   labelIcon: {
//     fontSize: '14px',
//   },
//   input: {
//     width: '100%',
//     padding: '14px 16px',
//     border: '1px solid #334155',
//     borderRadius: '10px',
//     fontSize: '14px',
//     transition: 'all 0.3s ease',
//     backgroundColor: 'rgba(30, 41, 59, 0.5)',
//     color: '#f1f5f9',
//     boxSizing: 'border-box',
//     fontFamily: 'inherit',
//   },
//   inputFocus: {
//     borderColor: '#3b82f6',
//     backgroundColor: 'rgba(30, 41, 59, 0.8)',
//     boxShadow: '0 6px 20px rgba(59,130,246,0.1)',
//     outline: 'none',
//     transform: 'translateY(-1px)',
//   },
//   button: {
//     width: '100%',
//     padding: '14px',
//     background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '10px',
//     fontSize: '15px',
//     fontWeight: '700',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     marginTop: '8px',
//     boxShadow: '0 10px 30px rgba(59,130,246,0.15)',
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//     cursor: 'not-allowed',
//     transform: 'none',
//   },
//   buttonContent: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '8px',
//   },
//   buttonArrow: {
//     fontSize: '16px',
//     transition: 'transform 0.2s ease',
//   },
//   spinner: {
//     width: '16px',
//     height: '16px',
//     border: '2px solid transparent',
//     borderTop: '2px solid white',
//     borderRadius: '50%',
//     animation: 'spin 1s linear infinite',
//   },
//   error: {
//     color: '#f87171',
//     backgroundColor: 'rgba(239, 68, 68, 0.1)',
//     border: '1px solid rgba(239, 68, 68, 0.2)',
//     padding: '12px 14px',
//     borderRadius: '10px',
//     marginBottom: '16px',
//     fontSize: '13px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//   },
//   errorIcon: {
//     fontSize: '14px',
//   },
//   forgotLink: {
//     fontSize: '12px',
//     color: '#3b82f6',
//     textDecoration: 'none',
//     fontWeight: '600',
//   },
//   footer: {
//     textAlign: 'center',
//     marginTop: '20px',
//     paddingTop: '20px',
//     borderTop: '1px solid rgba(255, 255, 255, 0.1)',
//   },
//   footerText: {
//     fontSize: '13px',
//     color: '#94a3b8',
//     margin: 0,
//   },
//   registerLink: {
//     color: '#3b82f6',
//     textDecoration: 'none',
//     fontWeight: '700',
//   },
// };

// export default Login;



import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnimatedBackground from '../components/AnimatedBackground';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(''); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <AnimatedBackground variant="login" />
      
      <div className="auth-card">
        <div className="gradient-bar"></div>
        
        <div className="logo-container">
          <div className="auth-logo">EMS</div>
        </div>
        
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue to your dashboard</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <svg className="alert-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">
              <svg className="label-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="name@company.com"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label className="form-label">
                <svg className="label-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
                Password
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot?</Link>
            </div>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className={`submit-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <svg className="button-arrow" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="footer-text">
            Don't have an account?{' '}
            <Link to="/register" className="footer-link">Create one now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
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

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    <div style={styles.container}>
      {/* Enhanced Animated Background Elements */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>
      <div style={styles.circle3}></div>
      <div style={styles.circle4}></div>
      <div style={styles.floatingParticles}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={styles.particle(i)}></div>
        ))}
      </div>
      
      <div style={styles.card}>
        {/* Animated Gradient Top Bar */}
        <div style={styles.gradientBar}></div>
        
        {/* Enhanced Header Section - Logo Removed */}
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to your EMS account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.error}>
            <span style={styles.errorIcon}>⚠</span>
            {error}
          </div>
        )}

        {/* Enhanced Form Section */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>✉</span>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              style={{
                ...styles.input,
                ...(focusedField === 'email' ? styles.inputFocus : {})
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.formGroup}>
            <div style={styles.labelContainer}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>🔒</span>
                Password
              </label>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              required
              style={{
                ...styles.input,
                ...(focusedField === 'password' ? styles.inputFocus : {})
              }}
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            disabled={loading}
          >
            {loading ? (
              <div style={styles.buttonContent}>
                <div style={styles.spinner}></div>
                Signing in...
              </div>
            ) : (
              <div style={styles.buttonContent}>
                Sign In
                <span style={styles.buttonArrow}>→</span>
              </div>
            )}
          </button>
        </form>

        {/* Enhanced Footer Section */}
        <div style={styles.footer}>
          <div style={styles.divider}>
            <span style={styles.dividerText}>New to EMS?</span>
          </div>
          <p style={styles.footerText}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.registerLink}>
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* Enhanced CSS */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body, html, #root {
          height: 100%;
          overflow: hidden;
          background: #0f172a;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.7; }
          33% { transform: translateY(-30px) translateX(10px) rotate(120deg); opacity: 0.4; }
          66% { transform: translateY(20px) translateX(-15px) rotate(240deg); opacity: 0.8; }
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        button:hover:not(:disabled) .buttonArrow {
          transform: translateX(3px);
        }
        
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(59,130,246,0.25);
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(-45deg, #0f172a, #1e293b, #334155, #475569)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 15s ease infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  // Enhanced background elements
  circle1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '5%',
    left: '5%',
    animation: 'float 8s ease-in-out infinite, pulse 6s ease-in-out infinite alternate',
    filter: 'blur(20px)',
  },
  circle2: {
    position: 'absolute',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '10%',
    right: '10%',
    animation: 'float 10s ease-in-out infinite reverse, pulse 4s ease-in-out infinite alternate',
    filter: 'blur(25px)',
  },
  circle3: {
    position: 'absolute',
    width: '250px',
    height: '250px',
    background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '60%',
    left: '75%',
    animation: 'float 12s ease-in-out infinite, pulse 5s ease-in-out infinite alternate',
    filter: 'blur(15px)',
  },
  circle4: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '20%',
    right: '20%',
    animation: 'float 9s ease-in-out infinite reverse, pulse 7s ease-in-out infinite alternate',
    filter: 'blur(20px)',
  },
  floatingParticles: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  particle: (i) => ({
    position: 'absolute',
    width: `${Math.random() * 6 + 2}px`,
    height: `${Math.random() * 6 + 2}px`,
    background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.3 + 0.2})`,
    borderRadius: '50%',
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animation: `particleFloat ${Math.random() * 20 + 10}s ease-in-out infinite`,
    animationDelay: `${i * 0.5}s`,
  }),
  card: {
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    width: '440px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideIn 0.8s ease-out',
    transition: 'all 0.3s ease',
  },
  gradientBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea, #764ba2, #667eea)',
    backgroundSize: '200% 100%',
    animation: 'gradientShift 3s ease infinite',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
    paddingTop: '10px', // Added padding to compensate for removed logo
  },
  title: {
    fontSize: '32px', // Slightly larger to compensate for removed logo
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 12px 0',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#94a3b8',
    margin: 0,
    fontWeight: '400',
    letterSpacing: '0.2px',
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    minHeight: '0',
  },
  formGroup: {
    position: 'relative',
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    letterSpacing: '0.3px',
  },
  labelIcon: {
    fontSize: '16px',
    opacity: 0.8,
  },
  input: {
    width: '100%',
    padding: '16px 18px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '14px',
    fontSize: '15px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    color: '#f1f5f9',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    backdropFilter: 'blur(10px)',
  },
  inputFocus: {
    borderColor: '#667eea',
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
    outline: 'none',
    transform: 'translateY(-2px)',
  },
  button: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginTop: '12px',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
    letterSpacing: '0.5px',
    position: 'relative',
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
    transform: 'none',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    position: 'relative',
    zIndex: 2,
  },
  buttonArrow: {
    fontSize: '18px',
    transition: 'transform 0.3s ease',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  error: {
    color: '#f87171',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    padding: '14px 16px',
    borderRadius: '12px',
    marginBottom: '20px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backdropFilter: 'blur(10px)',
    animation: 'slideIn 0.4s ease-out',
  },
  errorIcon: {
    fontSize: '16px',
  },
  forgotLink: {
    fontSize: '13px',
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  footer: {
    textAlign: 'center',
    marginTop: '28px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  divider: {
    position: 'relative',
    marginBottom: '20px',
  },
  dividerText: {
    display: 'inline-block',
    padding: '0 16px',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    color: '#94a3b8',
    fontSize: '13px',
    fontWeight: '500',
    letterSpacing: '0.5px',
  },
  footerText: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
    letterSpacing: '0.2px',
  },
  registerLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
};

// Add hover effects
const styleElement = document.createElement('style');
styleElement.textContent = `
  .card-hover {
    transition: all 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 35px 60px rgba(0, 0, 0, 0.3);
  }
  
  button:hover:not(:disabled)::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  button:hover:not(:disabled)::before {
    left: 100%;
  }
  
  .forgot-link:hover, .register-link:hover {
    color: #a855f7;
    transform: translateY(-1px);
  }
`;
document.head.appendChild(styleElement);

export default Login;
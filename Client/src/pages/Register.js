
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Employee',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { register } = useAuth();
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

    const result = await register(formData);

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
        {/* Fixed Gradient Top Bar with Curved Edges */}
        <div style={styles.gradientBar}></div>
        
        {/* Enhanced Header Section */}
        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join EMS to get started</p>
        </div>
        

        {/* Error Message */}
        {error && (
          <div style={styles.error}>
            <span style={styles.errorIcon}>⚠</span>
            {error}
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>👤</span>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              required
              style={{
                ...styles.input,
                ...(focusedField === 'name' ? styles.inputFocus : {})
              }}
              placeholder="Enter your full name"
            />
          </div>

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
            <label style={styles.label}>
              <span style={styles.labelIcon}>🔒</span>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              required
              minLength="6"
              style={{
                ...styles.input,
                ...(focusedField === 'password' ? styles.inputFocus : {})
              }}
              placeholder="Create a password (min 6 characters)"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>🏢</span>
              Account Type
            </label>
            <div style={styles.selectContainer}>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                onFocus={() => setFocusedField('role')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...styles.select,
                  ...(focusedField === 'role' ? styles.inputFocus : {})
                }}
              >
                <option value="Employee">Employee</option>
                <option value="Admin">Administrator</option>
              </select>
              <div style={styles.selectArrow}>▼</div>
            </div>
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
                Creating Account...
              </div>
            ) : (
              <div style={styles.buttonContent}>
                Create Account
                <span style={styles.buttonArrow}>→</span>
              </div>
            )}
          </button>
        </form>

        {/* Enhanced Footer Section */}
        <div style={styles.footer}>
          <div style={styles.divider}>
            <span style={styles.dividerText}>Already have an account?</span>
          </div>
          <p style={styles.footerText}>
            <Link to="/login" style={styles.loginLink}>
              Sign in to your account
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

        /* Remove any default borders that might be causing straight edges */
        .card-container {
          border-radius: 24px !important;
          overflow: hidden !important;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    background: 'linear-gradient(-45deg, #0f172a, #1e293b, #334155, #475569)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 15s ease infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  // Enhanced background elements
  circle1: {
    position: 'fixed',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '5%',
    left: '5%',
    animation: 'float 8s ease-in-out infinite, pulse 6s ease-in-out infinite alternate',
    filter: 'blur(20px)',
    zIndex: 1,
  },
  circle2: {
    position: 'fixed',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '10%',
    right: '10%',
    animation: 'float 10s ease-in-out infinite reverse, pulse 4s ease-in-out infinite alternate',
    filter: 'blur(25px)',
    zIndex: 1,
  },
  circle3: {
    position: 'fixed',
    width: '250px',
    height: '250px',
    background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '60%',
    left: '75%',
    animation: 'float 12s ease-in-out infinite, pulse 5s ease-in-out infinite alternate',
    filter: 'blur(15px)',
    zIndex: 1,
  },
  circle4: {
    position: 'fixed',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '20%',
    right: '20%',
    animation: 'float 9s ease-in-out infinite reverse, pulse 7s ease-in-out infinite alternate',
    filter: 'blur(20px)',
    zIndex: 1,
  },
  floatingParticles: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
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
    borderRadius: '24px', // This ensures all corners are rounded
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    width: '440px',
    maxWidth: '90vw',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    animation: 'slideIn 0.8s ease-out',
    transition: 'all 0.3s ease',
    zIndex: 2,
    margin: '40px 0',
    overflow: 'hidden', // This ensures child elements respect the border radius
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
    borderTopLeftRadius: '24px', // Add curved edges to top bar
    borderTopRightRadius: '24px', // Add curved edges to top bar
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
    paddingTop: '10px',
  },
  title: {
    fontSize: '32px',
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
    gap: '20px',
  },
  formGroup: {
    position: 'relative',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
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
  selectContainer: {
    position: 'relative',
  },
  select: {
    width: '100%',
    padding: '16px 18px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '14px',
    fontSize: '15px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    color: '#f1f5f9',
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontFamily: 'inherit',
    appearance: 'none',
    backdropFilter: 'blur(10px)',
  },
  selectArrow: {
    position: 'absolute',
    right: '18px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#667eea',
    fontSize: '12px',
    pointerEvents: 'none',
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
  footer: {
    textAlign: 'center',
    marginTop: '28px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  divider: {
    position: 'relative',
    marginBottom: '16px',
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
  loginLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    fontSize: '15px',
  },
};

export default Register;
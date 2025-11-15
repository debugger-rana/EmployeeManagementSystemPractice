import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

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
      {/* Animated Background Circles */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>
      <div style={styles.circle3}></div>
      
      <div style={styles.card}>
        {/* Gradient Top Bar */}
        <div style={styles.gradientBar}></div>
        
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>HR</div>
          </div>
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
        <div onSubmit={handleSubmit} style={styles.form}>
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
            <div style={{
              ...styles.underline,
              ...(focusedField === 'name' ? styles.underlineFocus : {})
            }}></div>
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
            <div style={{
              ...styles.underline,
              ...(focusedField === 'email' ? styles.underlineFocus : {})
            }}></div>
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
            <div style={{
              ...styles.underline,
              ...(focusedField === 'password' ? styles.underlineFocus : {})
            }}></div>
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
            <div style={{
              ...styles.underline,
              ...(focusedField === 'role' ? styles.underlineFocus : {})
            }}></div>
          </div>

          <button 
            type="submit" 
            onClick={handleSubmit}
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
        </div>

        {/* Footer Section */}
        <div style={styles.footer}>
          <div style={styles.divider}>
            <span style={styles.dividerText}>or</span>
          </div>
          <p style={styles.footerText}>
            Already have an account?{' '}
            <Link to="/login" style={styles.registerLink}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '10%',
    left: '10%',
    animation: 'float 8s ease-in-out infinite, pulse 4s ease-in-out infinite alternate',
  },
  circle2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '15%',
    right: '15%',
    animation: 'float 6s ease-in-out infinite reverse, pulse 3s ease-in-out infinite alternate',
  },
  circle3: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '60%',
    left: '70%',
    animation: 'float 7s ease-in-out infinite, pulse 5s ease-in-out infinite alternate',
  },
  card: {
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(16px)',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: 'var(--glass-shadow)',
    width: '420px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideIn 0.6s ease-out',
  },
  gradientBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'var(--gradient-primary)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  logoIcon: {
    width: '64px',
    height: '64px',
    background: 'var(--gradient-primary)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    boxShadow: '0 8px 20px rgba(59,130,246,0.18)',
    transform: 'rotate(-5deg)',
    position: 'relative',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    background: 'var(--gradient-primary)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 8px 0',
    letterSpacing: '-0.8px',
  },
  subtitle: {
    fontSize: '15px',
    color: 'var(--text-tertiary)',
    margin: 0,
    fontWeight: '400',
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '28px',
    position: 'relative',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  labelIcon: {
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '16px 18px',
    border: '1px solid var(--border-medium)',
    borderRadius: '12px',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  inputFocus: {
    borderColor: 'var(--primary-color)',
    backgroundColor: 'var(--bg-surface)',
    boxShadow: '0 6px 20px rgba(59,130,246,0.08)',
    outline: 'none',
    transform: 'translateY(-1px)',
  },
  selectContainer: {
    position: 'relative',
  },
  select: {
    width: '100%',
    padding: '16px 18px',
    border: '1px solid var(--border-medium)',
    borderRadius: '12px',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    backgroundColor: 'var(--bg-surface)',
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontFamily: 'inherit',
    appearance: 'none',
  },
  selectArrow: {
    position: 'absolute',
    right: '18px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--primary-color)',
    fontSize: '12px',
    pointerEvents: 'none',
  },
  underline: {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    width: '0%',
    height: '2px',
    background: 'var(--gradient-primary)',
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
  },
  underlineFocus: {
    width: '100%',
  },
  button: {
    width: '100%',
    padding: '16px',
    background: 'var(--gradient-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: 'auto',
    boxShadow: '0 10px 30px rgba(59,130,246,0.12)',
    letterSpacing: '0.3px',
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
    gap: '8px',
  },
  buttonArrow: {
    fontSize: '18px',
    transition: 'transform 0.2s ease',
  },
  spinner: {
    width: '18px',
    height: '18px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  error: {
    color: 'var(--error)',
    backgroundColor: 'var(--error-bg)',
    border: '1px solid rgba(239, 68, 68, 0.18)',
    padding: '14px 18px',
    borderRadius: '12px',
    marginBottom: '24px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    animation: 'slideIn 0.3s ease-out',
  },
  errorIcon: {
    fontSize: '16px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid var(--border-light)',
  },
  divider: {
    position: 'relative',
    marginBottom: '20px',
  },
  dividerText: {
    backgroundColor: 'transparent',
    padding: '0 12px',
    color: 'var(--text-tertiary)',
    fontSize: '13px',
    position: 'relative',
    zIndex: 1,
  },
  footerText: {
    fontSize: '14px',
    color: 'var(--text-tertiary)',
    margin: 0,
  },
  registerLink: {
    color: 'var(--primary-color)',
    textDecoration: 'none',
    fontWeight: '700',
  },
};

// Add CSS for animations
const styleElement = document.createElement('style');
styleElement.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-20px) scale(1.05); }
  }
  
  @keyframes pulse {
    0% { opacity: 0.4; }
    100% { opacity: 0.8; }
  }
  
  @keyframes slideIn {
    0% { 
      opacity: 0;
      transform: translateY(30px);
    }
    100% { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  button:hover:not(:disabled) .buttonArrow {
    transform: translateX(3px);
  }
  
  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(59,130,246,0.12);
  }
  
  input:focus, select:focus {
    outline: none;
    box-shadow: 0 6px 20px rgba(59,130,246,0.06);
  }
`;
document.head.appendChild(styleElement);

export default Register
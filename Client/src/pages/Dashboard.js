import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import AdminOnly from '../components/AdminOnly';
import AnimatedBackground from '../components/AnimatedBackground';
import AnimatedIllustration from '../components/AnimatedIllustration';
import '../components/dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faBuilding,
  faCalendarCheck,
  faUserCheck,
  faPlus,
  faEye,
  faCog,
  faBell,
  faClock,
  faCheckCircle,
  faExclamationTriangle,
  faChartLine,
  faUserPlus,
  faCalendarAlt,
  faArrowRight,
  faArrowTrendUp,
  faWandMagicSparkles
} from '@fortawesome/free-solid-svg-icons';

// Custom hook for number counter animation
const useCountUp = (end, duration = 2000, shouldStart = true) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!shouldStart || end === null || end === undefined) {
      setCount(end);
      return;
    }

    const animate = (currentTime) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime;
      const progress = Math.min((currentTime - startTimeRef.current) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      countRef.current = Math.floor(easeOutQuart * end);
      setCount(countRef.current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);

  return count;
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendance, setAttendance] = useState({ present: null, time: null });
  const [totalEmployees, setTotalEmployees] = useState(null);
  const [totalAttendance, setTotalAttendance] = useState(null);
  const [totalDepartments, setTotalDepartments] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    // Simulate loading time for better UX with staggered animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setAnimateCards(true), 100);
    }, 800);

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  useEffect(() => {
    // Fetch current user's attendance (so employees see it on dashboard)
    let mounted = true;
    const fetchAttendance = async () => {
      try {
        const res = await axios.get('/api/attendance/me');
        if (!mounted) return;
        const r = res.data.data || {};
        setAttendance({ present: typeof r.present === 'boolean' ? r.present : false, time: r.time || null });
      } catch (err) {
        // ignore silently — attendance will show as '-'
      }
    };
    fetchAttendance();
    return () => { mounted = false };
  }, []);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    const fetchTotals = async () => {
      try {
        // Admins can request full data; non-admins get best-effort values.
        if ((user.role || '').toLowerCase() === 'admin') {
          const [usersRes, attendanceRes, depsRes] = await Promise.all([
            axios.get('/api/auth/users'),
            axios.get('/api/attendance'),
            axios.get('/api/departments')
          ]);
          if (!mounted) return;
          const users = usersRes.data.data || usersRes.data || [];
          const employeesCount = users.filter(u => (u.role || '').toLowerCase() !== 'admin').length;
          const attendanceList = attendanceRes.data.data || attendanceRes.data || [];
          const presentCount = attendanceList.filter(a => a.present === true).length;
          setTotalEmployees(employeesCount);
          setTotalAttendance(presentCount);
          const deps = depsRes.data.data || depsRes.data || [];
          setTotalDepartments(Array.isArray(deps) ? deps.length : (deps.total || null));
        } else {
          // Non-admin: try to get users count (may be forbidden) and use /me for attendance
          try {
            const usersRes = await axios.get('/api/auth/users');
            if (!mounted) return;
            const users = usersRes.data.data || usersRes.data || [];
            setTotalEmployees(users.filter(u => (u.role || '').toLowerCase() !== 'admin').length);
          } catch (e) {
            setTotalEmployees(null);
          }

          try {
            const meRes = await axios.get('/api/attendance/me');
            if (!mounted) return;
            const r = meRes.data.data || {};
            setTotalAttendance(r.present === true ? 1 : 0);
          } catch (e) {
            setTotalAttendance(null);
          }

          // Try to fetch departments count for non-admins if allowed
          try {
            const depsRes = await axios.get('/api/departments');
            if (!mounted) return;
            const deps = depsRes.data.data || depsRes.data || [];
            setTotalDepartments(Array.isArray(deps) ? deps.length : (deps.total || null));
          } catch (e) {
            setTotalDepartments(null);
          }
        }
      } catch (err) {
        setTotalEmployees(null);
        setTotalAttendance(null);
      }
    };
    fetchTotals();
    return () => { mounted = false };
  }, [user]);

  // Animated counter values
  const animatedEmployees = useCountUp(totalEmployees, 2000, animateCards && totalEmployees !== null);
  const animatedAttendance = useCountUp(totalAttendance, 2000, animateCards && totalAttendance !== null);
  const animatedDepartments = useCountUp(totalDepartments, 2000, animateCards && totalDepartments !== null);

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="loading-skeleton">
          <div className="skeleton-header shimmer"></div>
          <div className="skeleton-grid">
            <div className="skeleton-card shimmer"></div>
            <div className="skeleton-card shimmer" style={{ animationDelay: '0.1s' }}></div>
            <div className="skeleton-card shimmer" style={{ animationDelay: '0.2s' }}></div>
            <div className="skeleton-card shimmer" style={{ animationDelay: '0.3s' }}></div>
          </div>
          <div className="skeleton-content shimmer"></div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-screen">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <p className="loading-text">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      icon: <FontAwesomeIcon icon={faUserPlus} />,
      title: 'Add Employee',
      description: 'Quickly register a new team member — name, role, and department.',
      color: 'var(--gradient-primary)',
      action: () => navigate('/employees', { state: { openAdd: true } })
    },
    {
      icon: <FontAwesomeIcon icon={faCalendarAlt} />,
      title: 'Mark Attendance',
      description: 'Tap here to mark your check-in/check-out for the day.',
      color: 'var(--gradient-secondary)',
      action: () => navigate('/attendance')
    },
    {
      icon: <FontAwesomeIcon icon={faEye} />,
      title: 'View Reports',
      description: 'Open simple, honest reports — no fluff, just the numbers.',
      color: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
      action: () => console.log('View Reports')
    },
    {
      icon: <FontAwesomeIcon icon={faCog} />,
      title: 'Settings',
      description: 'Adjust notifications, appearance, and account preferences.',
      color: 'linear-gradient(135deg, #a8edea, #fed6e3)',
      action: () => console.log('Settings')
    }
  ];

  const recentActivities = [
    {
      icon: <FontAwesomeIcon icon={faCheckCircle} />,
      title: 'Attendance marked',
      description: 'John Doe checked in at 9:00 AM',
      time: '2 hours ago',
      type: 'success'
    },
    {
      icon: <FontAwesomeIcon icon={faUserPlus} />,
      title: 'New employee added',
      description: 'Sarah Wilson joined Marketing department',
      time: '4 hours ago',
      type: 'info'
    },
    {
      icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
      title: 'System maintenance',
      description: 'Scheduled maintenance completed successfully',
      time: '1 day ago',
      type: 'warning'
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Animated Background */}
      <AnimatedBackground variant="dashboard" />

      {/* Header Section */}
      <div className="dashboard-header fade-in-up">
        <div className="header-content">
          <div className="welcome-section">
            <div className="welcome-bubble">
              <div className="welcome-icon-badge">
                <FontAwesomeIcon icon={faWandMagicSparkles} className="sparkle-icon" />
              </div>
              <h1 className="welcome-title gradient-text">
                Hey {user.name} 👋
              </h1>
              <p className="welcome-subtitle">
                <FontAwesomeIcon icon={faClock} className="time-icon" />
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="welcome-note">Your personalized workspace — track progress, take action, and stay informed.</p>
            </div>
            <svg className="decorative-blob floating" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'rgba(124,58,237,0.15)', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'rgba(6,182,212,0.15)', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path fill="url(#blobGradient)" d="M40.5,-60.4C52.1,-52.4,60.9,-41.1,66.8,-27.1C72.7,-13,75.7,2.8,72.7,17.6C69.8,32.4,60.9,46.1,48.1,52.3C35.3,58.6,18.6,57.3,3.4,53.3C-11.8,49.3,-23.6,42.6,-35.8,34.9C-48,27.3,-60.6,18.7,-66.4,6.9C-72.3,-4.8,-71.5,-19.9,-63.7,-31.1C-55.9,-42.3,-41.2,-49.6,-26,-57.8C-10.9,-66,4.9,-75.1,18.5,-73.2C32.1,-71.3,52.8,-68.3,40.5,-60.4Z" transform="translate(100 100)"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {/* Attendance progress — small handcrafted metric */}
      <div className="attendance-progress fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="progress-info">
          <FontAwesomeIcon icon={faArrowTrendUp} className="progress-icon pulse" />
          <div>
            <strong>Office Presence</strong>
            <span className="progress-sub">Live snapshot of today's presence</span>
          </div>
        </div>
        <div className="progress-container">
          {totalEmployees && totalAttendance !== null ? (
            (() => {
              const percent = Math.round((totalAttendance / Math.max(1, totalEmployees)) * 100);
              return (
                <>
                  <div className="progress-bar" aria-hidden="true">
                    <div className="progress-fill animated-progress" style={{ '--progress-width': `${percent}%` }}></div>
                    <div className="progress-glow"></div>
                  </div>
                  <div className="progress-text">
                    <span className="progress-percentage gradient-text">{percent}%</span> present 
                    <span className="progress-detail">({animatedAttendance}/{animatedEmployees})</span>
                  </div>
                </>
              );
            })()
          ) : (
            <div className="progress-bar empty">— no live data</div>
          )}
        </div>
      </div>

      <div className="dashboard-grid">
        <div className={`stat-card card-hover ${animateCards ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
          <div className="stat-card-glow"></div>
          <div className="stat-icon gradient-bg-primary pulse-soft">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="stat-title">Total Employees</div>
          <div className="stat-value gradient-text counter">
            {totalEmployees !== null ? animatedEmployees : '-'}
          </div>
          <div className="stat-change positive">
            <FontAwesomeIcon icon={faArrowTrendUp} />
            <span>↑ 12%</span> vs last month
          </div>
        </div>

        <div className={`stat-card card-hover ${animateCards ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.3s' }}>
          <div className="stat-card-glow"></div>
          <div className="stat-icon gradient-bg-secondary pulse-soft">
            <FontAwesomeIcon icon={faBuilding} />
          </div>
          <div className="stat-title">Departments</div>
          <div className="stat-value gradient-text counter">
            {totalDepartments !== null ? animatedDepartments : '-'}
          </div>
          <div className="stat-change">
            <span>Active Units</span>
          </div>
        </div>

        <div className={`stat-card card-hover ${animateCards ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.4s' }}>
          <div className="stat-card-glow"></div>
          <div className="stat-icon gradient-bg-success pulse-soft">
            <FontAwesomeIcon icon={faCalendarCheck} />
          </div>
          <div className="stat-title">Today's Attendance</div>
          <div className="stat-value gradient-text counter">
            {totalAttendance !== null ? animatedAttendance : '-'}
          </div>
          <div className="stat-change positive">
            <FontAwesomeIcon icon={faCheckCircle} />
            <span>Present Today</span>
          </div>
        </div>

        <div className={`stat-card card-hover ${animateCards ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.5s' }}>
          <div className="stat-card-glow"></div>
          <div className="stat-icon gradient-bg-accent pulse-soft">
            <FontAwesomeIcon icon={faUserCheck} />
          </div>
          <div className="stat-title">Your Role</div>
          <div className="stat-value role-badge-large">{user.role}</div>
          <div className="stat-change">
            <span>Access Level</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`quick-actions-section ${animateCards ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.6s' }}>
        <div className="section-header">
          <h3 className="section-title">
            <FontAwesomeIcon icon={faWandMagicSparkles} className="section-icon" />
            Quick Actions
          </h3>
          <p className="section-subtitle">Jump into your most common tasks</p>
        </div>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => {
            // Treat Add Employee and Settings as admin-only CRUD actions
            const isCrud = action.title === 'Add Employee' || action.title === 'Settings';
            const card = (
              <button
                key={index}
                className="quick-action-card magnetic-btn"
                onClick={action.action}
                style={{ 
                  '--action-color': action.color,
                  animationDelay: `${0.7 + index * 0.1}s`
                }}
              >
                <div className="action-glow"></div>
                <div className="action-icon pulse-soft" style={{ background: action.color }}>
                  {action.icon}
                </div>
                <div className="action-content">
                  <h4 className="action-title">{action.title}</h4>
                  <p className="action-description">{action.description}</p>
                </div>
                <div className="action-arrow bounce-horizontal">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </button>
            );

            return isCrud ? (
              <AdminOnly key={index} fallback={null}>
                {card}
              </AdminOnly>
            ) : (
              card
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* User Information */}
        <div className={`chart-card user-info-card glass-card ${animateCards ? 'fade-in-up' : ''}`} style={{ animationDelay: '1.1s' }}>
          <div className="card-glow"></div>
          <div className="card-header">
            <h3 className="chart-title">
              <FontAwesomeIcon icon={faUserCheck} className="title-icon" />
              Profile Information
            </h3>
            <AdminOnly>
              <button className="edit-btn btn-hover-effect">
                <FontAwesomeIcon icon={faCog} /> Edit
              </button>
            </AdminOnly>
          </div>
          <div className="timeline">
            <div className="timeline-item slide-in-left" style={{ animationDelay: '1.2s' }}>
              <div className="timeline-dot"></div>
              <div className="timeline-time">Name</div>
              <div className="timeline-content">{user.name}</div>
            </div>
            <div className="timeline-item slide-in-left" style={{ animationDelay: '1.3s' }}>
              <div className="timeline-dot"></div>
              <div className="timeline-time">Email</div>
              <div className="timeline-content">{user.email}</div>
            </div>
            <div className="timeline-item slide-in-left" style={{ animationDelay: '1.4s' }}>
              <div className="timeline-dot"></div>
              <div className="timeline-time">Role</div>
              <div className="timeline-content">
                <span className="role-badge pulse-soft">{user.role}</span>
              </div>
            </div>
            <div className="timeline-item slide-in-left" style={{ animationDelay: '1.5s' }}>
              <div className="timeline-dot"></div>
              <div className="timeline-time">Today's Attendance</div>
              <div className="timeline-content">
                <span className={`role-badge ${attendance.present ? 'badge-success' : ''}`}>
                  {attendance.present ? '✓ Present' : '— Not marked'}{attendance.time ? ` • ${attendance.time}` : ''}
                </span>
              </div>
            </div>
            <div className="timeline-item slide-in-left" style={{ animationDelay: '1.6s' }}>
              <div className="timeline-dot"></div>
              <div className="timeline-time">Join Date</div>
              <div className="timeline-content">
                {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className={`chart-card activities-card glass-card ${animateCards ? 'fade-in-up' : ''}`} style={{ animationDelay: '1.2s' }}>
          <div className="card-glow"></div>
          <div className="card-header">
            <h3 className="chart-title">
              <FontAwesomeIcon icon={faBell} className="title-icon pulse" />
              Recent Activities
            </h3>
            <button className="view-all-btn btn-hover-effect">
              <FontAwesomeIcon icon={faEye} /> View All
            </button>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div 
                key={index} 
                className={`activity-item slide-in-right ${animateCards ? 'animated' : ''}`}
                style={{ animationDelay: `${1.3 + index * 0.1}s` }}
              >
                <div className={`activity-icon ${activity.type} pulse-soft`}>
                  {activity.icon}
                </div>
                <div className="activity-content">
                  <h4 className="activity-title">{activity.title}</h4>
                  <p className="activity-description">{activity.description}</p>
                  <span className="activity-time">
                    <FontAwesomeIcon icon={faClock} /> {activity.time}
                  </span>
                </div>
                <div className="activity-badge">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role-based Content */}
      {user.role === 'Admin' && (
        <div className={`chart-card admin-card glass-card ${animateCards ? 'fade-in-up' : ''}`} style={{ animationDelay: '1.7s' }}>
          <div className="card-glow admin-glow"></div>
          <h3 className="chart-title">
            <FontAwesomeIcon icon={faCog} className="title-icon spin-slow" />
            Admin Privileges
          </h3>
          <div className="privileges-grid">
            <div className="privilege-item card-hover" style={{ animationDelay: '1.8s' }}>
              <FontAwesomeIcon icon={faUsers} className="privilege-icon gradient-text" />
              <span>Manage all employees and their records</span>
            </div>
            <div className="privilege-item card-hover" style={{ animationDelay: '1.9s' }}>
              <FontAwesomeIcon icon={faBuilding} className="privilege-icon gradient-text" />
              <span>Create and manage departments</span>
            </div>
            <div className="privilege-item card-hover" style={{ animationDelay: '2.0s' }}>
              <FontAwesomeIcon icon={faChartLine} className="privilege-icon gradient-text" />
              <span>View and manage attendance reports</span>
            </div>
            <div className="privilege-item card-hover" style={{ animationDelay: '2.1s' }}>
              <FontAwesomeIcon icon={faCog} className="privilege-icon gradient-text" />
              <span>Configure system settings and permissions</span>
            </div>
          </div>
        </div>
      )}

      {user.role === 'Employee' && (
        <div className={`chart-card employee-card glass-card ${animateCards ? 'fade-in-up' : ''}`} style={{ animationDelay: '1.7s' }}>
          <div className="card-glow employee-glow"></div>
          <h3 className="chart-title">
            <FontAwesomeIcon icon={faUserCheck} className="title-icon pulse" />
            Employee Dashboard
          </h3>
          <div className="privileges-grid">
            <div className="privilege-item card-hover" style={{ animationDelay: '1.8s' }}>
              <FontAwesomeIcon icon={faUserCheck} className="privilege-icon gradient-text" />
              <span>View and update your personal information</span>
            </div>
            <div className="privilege-item card-hover" style={{ animationDelay: '1.9s' }}>
              <FontAwesomeIcon icon={faCalendarCheck} className="privilege-icon gradient-text" />
              <span>Check your attendance records and history</span>
            </div>
            <div className="privilege-item card-hover" style={{ animationDelay: '2.0s' }}>
              <FontAwesomeIcon icon={faBell} className="privilege-icon gradient-text" />
              <span>View department updates and announcements</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
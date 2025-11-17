import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import AdminOnly from '../components/AdminOnly';
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
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendance, setAttendance] = useState({ present: null, time: null });
  const [totalEmployees, setTotalEmployees] = useState(null);
  const [totalAttendance, setTotalAttendance] = useState(null);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 1500);

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
          const [usersRes, attendanceRes] = await Promise.all([
            axios.get('/api/auth/users'),
            axios.get('/api/attendance')
          ]);
          if (!mounted) return;
          const users = usersRes.data.data || usersRes.data || [];
          const employeesCount = users.filter(u => (u.role || '').toLowerCase() !== 'admin').length;
          const attendanceList = attendanceRes.data.data || attendanceRes.data || [];
          const presentCount = attendanceList.filter(a => a.present === true).length;
          setTotalEmployees(employeesCount);
          setTotalAttendance(presentCount);
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
        }
      } catch (err) {
        setTotalEmployees(null);
        setTotalAttendance(null);
      }
    };
    fetchTotals();
    return () => { mounted = false };
  }, [user]);

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="loading-skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-grid">
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </div>
          <div className="skeleton-content"></div>
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
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <div className="welcome-bubble">
              <h1 className="welcome-title">
                Hey {user.name} — nice to see you 
              </h1>
              <p className="welcome-subtitle">
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="welcome-note">A compact view of what matters today — action items and quick insights.</p>
            </div>
            <svg className="decorative-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path fill="rgba(108,92,231,0.08)" d="M40.5,-60.4C52.1,-52.4,60.9,-41.1,66.8,-27.1C72.7,-13,75.7,2.8,72.7,17.6C69.8,32.4,60.9,46.1,48.1,52.3C35.3,58.6,18.6,57.3,3.4,53.3C-11.8,49.3,-23.6,42.6,-35.8,34.9C-48,27.3,-60.6,18.7,-66.4,6.9C-72.3,-4.8,-71.5,-19.9,-63.7,-31.1C-55.9,-42.3,-41.2,-49.6,-26,-57.8C-10.9,-66,4.9,-75.1,18.5,-73.2C32.1,-71.3,52.8,-68.3,40.5,-60.4Z" transform="translate(100 100)"/>
            </svg>
          </div>
          {/* header actions removed: notifications and avatar intentionally hidden */}
        </div>
      </div>

      {/* Stats Grid */}
      {/* Attendance progress — small handcrafted metric */}
      <div className="attendance-progress">
        <div className="progress-info">
          <strong>Office Presence</strong>
          <span className="progress-sub">Live snapshot of today's presence</span>
        </div>
        <div className="progress-container">
          {totalEmployees && totalAttendance !== null ? (
            (() => {
              const percent = Math.round((totalAttendance / Math.max(1, totalEmployees)) * 100);
              return (
                <>
                  <div className="progress-bar" aria-hidden>
                    <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                  </div>
                  <div className="progress-text">{percent}% present ({totalAttendance}/{totalEmployees})</div>
                </>
              );
            })()
          ) : (
            <div className="progress-bar empty">— no live data</div>
          )}
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="stat-title">Total Employees</div>
          <div className="stat-value">{totalEmployees !== null ? totalEmployees : '-'}</div>
          <div className="stat-change positive">
            <span>↑ 12%</span> vs last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faBuilding} />
          </div>
          <div className="stat-title">Departments</div>
          <div className="stat-value">0</div>
          <div className="stat-change">
            <span>Total Count</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faCalendarCheck} />
          </div>
          <div className="stat-title">Today's Attendance</div>
          <div className="stat-value">{totalAttendance !== null ? totalAttendance : '-'}</div>
          <div className="stat-change">
            <span>Present Today</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faUserCheck} />
          </div>
          <div className="stat-title">Your Role</div>
          <div className="stat-value">{user.role}</div>
          <div className="stat-change">
            <span>Access Level</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => {
            // Treat Add Employee and Settings as admin-only CRUD actions
            const isCrud = action.title === 'Add Employee' || action.title === 'Settings';
            const card = (
              <button
                key={index}
                className="quick-action-card"
                onClick={action.action}
                style={{ '--action-color': action.color }}
              >
                <div className="action-icon" style={{ background: action.color }}>
                  {action.icon}
                </div>
                <div className="action-content">
                  <h4 className="action-title">{action.title}</h4>
                  <p className="action-description">{action.description}</p>
                </div>
                <div className="action-arrow">
                  <FontAwesomeIcon icon={faPlus} />
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
        <div className="chart-card user-info-card">
          <div className="card-header">
            <h3 className="chart-title">Profile Information</h3>
            <AdminOnly>
              <button className="edit-btn">
                <FontAwesomeIcon icon={faCog} /> Edit
              </button>
            </AdminOnly>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-time">Name</div>
              <div className="timeline-content">{user.name}</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">Email</div>
              <div className="timeline-content">{user.email}</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">Role</div>
              <div className="timeline-content">
                <span className="role-badge">{user.role}</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">Today's Attendance</div>
              <div className="timeline-content">
                <span className={`role-badge`} style={{ background: attendance.status === 'present' ? 'rgba(16,185,129,0.12)' : 'transparent', color: attendance.status === 'present' ? 'var(--success)' : 'var(--text-secondary)' }}>
                  {attendance.status}{attendance.time ? ` — ${attendance.time}` : ''}
                </span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">Join Date</div>
              <div className="timeline-content">
                {new Date(user.joinDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="chart-card activities-card">
          <div className="card-header">
            <h3 className="chart-title">Recent Activities</h3>
            <button className="view-all-btn">
              <FontAwesomeIcon icon={faEye} /> View All
            </button>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.icon}
                </div>
                <div className="activity-content">
                  <h4 className="activity-title">{activity.title}</h4>
                  <p className="activity-description">{activity.description}</p>
                  <span className="activity-time">
                    <FontAwesomeIcon icon={faClock} /> {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role-based Content */}
      {user.role === 'Admin' && (
        <div className="chart-card admin-card">
          <h3 className="chart-title">Admin Privileges</h3>
          <div className="privileges-grid">
            <div className="privilege-item">
              <FontAwesomeIcon icon={faUsers} className="privilege-icon" />
              <span>Manage all employees and their records</span>
            </div>
            <div className="privilege-item">
              <FontAwesomeIcon icon={faBuilding} className="privilege-icon" />
              <span>Create and manage departments</span>
            </div>
            <div className="privilege-item">
              <FontAwesomeIcon icon={faChartLine} className="privilege-icon" />
              <span>View and manage attendance reports</span>
            </div>
            <div className="privilege-item">
              <FontAwesomeIcon icon={faCog} className="privilege-icon" />
              <span>Configure system settings and permissions</span>
            </div>
          </div>
        </div>
      )}

      {user.role === 'Employee' && (
        <div className="chart-card employee-card">
          <h3 className="chart-title">Employee Dashboard</h3>
          <div className="privileges-grid">
            <div className="privilege-item">
              <FontAwesomeIcon icon={faUserCheck} className="privilege-icon" />
              <span>View and update your personal information</span>
            </div>
            <div className="privilege-item">
              <FontAwesomeIcon icon={faCalendarCheck} className="privilege-icon" />
              <span>Check your attendance records and history</span>
            </div>
            <div className="privilege-item">
              <FontAwesomeIcon icon={faBell} className="privilege-icon" />
              <span>View department updates and announcements</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
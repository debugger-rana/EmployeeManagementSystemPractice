import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import AdminOnly from '../components/AdminOnly';
import '../components/dashboard.css';
import {
  FaUsers,
  FaBuilding,
  FaCalendarCheck,
  FaUserCheck,
  FaPlus,
  FaEye,
  FaCog,
  FaBell,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartLine,
  FaUserPlus,
  FaCalendarAlt
} from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendance, setAttendance] = useState({ status: '-', time: null });
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
        setAttendance({ status: r.status || 'absent', time: r.time || null });
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
          const presentCount = attendanceList.filter(a => (a.status || '').toLowerCase() === 'present').length;
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
            setTotalAttendance((r.status || '').toLowerCase() === 'present' ? 1 : 0);
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
      icon: <FaUserPlus />,
      title: 'Add Employee',
      description: 'Register new team member',
      color: 'var(--gradient-primary)',
      action: () => navigate('/employees', { state: { openAdd: true } })
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Mark Attendance',
      description: 'Record daily attendance',
      color: 'var(--gradient-secondary)',
      action: () => navigate('/attendance')
    },
    {
      icon: <FaEye />,
      title: 'View Reports',
      description: 'Check analytics & insights',
      color: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
      action: () => console.log('View Reports')
    },
    {
      icon: <FaCog />,
      title: 'Settings',
      description: 'Configure preferences',
      color: 'linear-gradient(135deg, #a8edea, #fed6e3)',
      action: () => console.log('Settings')
    }
  ];

  const recentActivities = [
    {
      icon: <FaCheckCircle />,
      title: 'Attendance marked',
      description: 'John Doe checked in at 9:00 AM',
      time: '2 hours ago',
      type: 'success'
    },
    {
      icon: <FaUserPlus />,
      title: 'New employee added',
      description: 'Sarah Wilson joined Marketing department',
      time: '4 hours ago',
      type: 'info'
    },
    {
      icon: <FaExclamationTriangle />,
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
            <h1 className="welcome-title">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="welcome-subtitle">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          {/* header actions removed: notifications and avatar intentionally hidden */}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-title">Total Employees</div>
          <div className="stat-value">{totalEmployees !== null ? totalEmployees : '-'}</div>
          <div className="stat-change positive">
            <span>↑ 12%</span> vs last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaBuilding />
          </div>
          <div className="stat-title">Departments</div>
          <div className="stat-value">0</div>
          <div className="stat-change">
            <span>Total Count</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarCheck />
          </div>
          <div className="stat-title">Today's Attendance</div>
          <div className="stat-value">{totalAttendance !== null ? totalAttendance : '-'}</div>
          <div className="stat-change">
            <span>Present Today</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaUserCheck />
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
                  <FaPlus />
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
                <FaCog /> Edit
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
              <FaEye /> View All
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
                    <FaClock /> {activity.time}
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
              <FaUsers className="privilege-icon" />
              <span>Manage all employees and their records</span>
            </div>
            <div className="privilege-item">
              <FaBuilding className="privilege-icon" />
              <span>Create and manage departments</span>
            </div>
            <div className="privilege-item">
              <FaChartLine className="privilege-icon" />
              <span>View and manage attendance reports</span>
            </div>
            <div className="privilege-item">
              <FaCog className="privilege-icon" />
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
              <FaUserCheck className="privilege-icon" />
              <span>View and update your personal information</span>
            </div>
            <div className="privilege-item">
              <FaCalendarCheck className="privilege-icon" />
              <span>Check your attendance records and history</span>
            </div>
            <div className="privilege-item">
              <FaBell className="privilege-icon" />
              <span>View department updates and announcements</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
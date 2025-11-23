import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import AddEmployeeModal from '../components/AddEmployeeModal';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPlus, faSearch, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import AnimatedBackground from '../components/AnimatedBackground';
import AnimatedIllustration from '../components/AnimatedIllustration';
import './Employees.css';

const Employees = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (location.state && location.state.openAdd) setOpen(true);
  }, [location]);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/auth/users');
      setList(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleCreated = (u) => {
    setList((s) => [u, ...s]);
  };

  const filteredList = list.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="employees-page">
      {/* Animated Background */}
      <AnimatedBackground variant="employees" />

      {/* Header Section with Illustration */}
      <div className="employees-header">
        <div>
          <h1>Employee Management</h1>
          <p>Manage your organization's employees efficiently</p>
        </div>
        <div style={{ maxWidth: '300px', opacity: 0.6 }}>
          <AnimatedIllustration type="employees" />
        </div>
      </div>

      {/* Main Card */}
      <div className="employees-card">
        {/* Card Header */}
        <div className="employees-card-header">
          <h2 className="employees-card-title">
            <span className="employees-card-title-icon">
              <FontAwesomeIcon icon={faUsers} />
            </span>
            Employee List
          </h2>
          <button onClick={() => setOpen(true)} className="employees-add-btn">
            <FontAwesomeIcon icon={faPlus} className="employees-add-icon" />
            Add Employee
          </button>
        </div>

        {/* Search Bar */}
        <div className="employees-controls">
          <div className="employees-search-wrapper">
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="employees-search"
            />
            <FontAwesomeIcon icon={faSearch} className="employees-search-icon" />
          </div>
        </div>

        {/* Table or Loading State */}
        {loading ? (
          <div className="employees-loading">
            <div className="employees-loading-spinner"></div>
            <p>Loading employees...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="employees-empty">
            <div className="employees-empty-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <h3>No Employees Found</h3>
            <p>{searchQuery ? 'Try adjusting your search' : 'Start by adding your first employee'}</p>
          </div>
        ) : (
          <div className="employees-table-wrapper">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((u, index) => (
                  <tr key={u.id} style={{ '--row-index': index }}>
                    <td>
                      <div className="employee-info">
                        <div className="employee-avatar">
                          {getInitials(u.name)}
                        </div>
                        <span className="employee-name">{u.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="employee-email">
                        <FontAwesomeIcon icon={faEnvelope} className="employee-email-icon" />
                        {u.email}
                      </div>
                    </td>
                    <td>
                      <span className={`employee-role-badge ${u.role.toLowerCase()}`}>
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <AddEmployeeModal open={open} onClose={() => setOpen(false)} onCreated={handleCreated} />
      </div>
    </div>
  );
};

export default Employees;
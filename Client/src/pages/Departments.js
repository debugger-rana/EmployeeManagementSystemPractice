import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminOnly from '../components/AdminOnly';
import AddDepartmentModal from '../components/AddDepartmentModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faPlus, faEdit, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import AnimatedBackground from '../components/AnimatedBackground';
import AnimatedIllustration from '../components/AnimatedIllustration';
import './Departments.css';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/departments');
      setDepartments(res.data.data || res.data || []);
    } catch (err) {
      console.error('Failed to fetch departments', err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleCreated = (d) => setDepartments(s => [d, ...s]);
  const handleUpdated = (d) => setDepartments(s => s.map(x => x.id === d.id ? d : x));
  const handleDeleted = (id) => setDepartments(s => s.filter(x => x.id !== id));

  const remove = async (id) => {
    if (!window.confirm('Delete this department?')) return;
    try {
      await axios.delete(`/api/departments/${id}`);
      handleDeleted(id);
    } catch (err) {
      console.error('Failed to delete', err);
      alert(err.response?.data?.message || 'Failed to delete department');
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="departments-page">
      {/* Animated Background */}
      <AnimatedBackground variant="departments" />

      {/* Header Section with Illustration */}
      <div className="departments-header">
        <div>
          <h1>Departments</h1>
          <p>Organize and manage company departments efficiently</p>
        </div>
        <div style={{ maxWidth: '280px', opacity: 0.5, marginTop: '20px' }}>
          <AnimatedIllustration type="departments" />
        </div>
      </div>

      {/* Main Card */}
      <div className="departments-card">
        {/* Card Header */}
        <div className="departments-card-header">
          <h2 className="departments-card-title">
            <span className="departments-card-title-icon">
              <FontAwesomeIcon icon={faBuilding} />
            </span>
            Department List
          </h2>
          <AdminOnly>
            <button 
              onClick={() => { setEditing(null); setOpen(true); }} 
              className="departments-add-btn"
            >
              <FontAwesomeIcon icon={faPlus} className="departments-add-icon" />
              New Department
            </button>
          </AdminOnly>
        </div>

        {/* Table or Loading State */}
        {loading ? (
          <div className="departments-loading">
            <div className="departments-loading-spinner"></div>
            <p>Loading departments...</p>
          </div>
        ) : departments.length === 0 ? (
          <div className="departments-empty">
            <div className="departments-empty-icon">
              <FontAwesomeIcon icon={faBuilding} />
            </div>
            <h3>No Departments Yet</h3>
            <p>Start by creating your first department</p>
          </div>
        ) : (
          <div className="departments-table-wrapper">
            <table className="departments-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Code</th>
                  <th>Head</th>
                  <th>Employees</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d, index) => (
                  <tr key={d.id} style={{ '--row-index': index }}>
                    <td>
                      <div className="department-name-cell">
                        <div className="department-icon">
                          {getInitials(d.name)}
                        </div>
                        <span className="department-name-text">{d.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="department-code">{d.code || '—'}</span>
                    </td>
                    <td>{d.headName || '—'}</td>
                    <td>
                      <div className="department-count">
                        <FontAwesomeIcon icon={faUsers} className="department-count-icon" />
                        {d.count || 0}
                      </div>
                    </td>
                    <td>
                      <div className="department-actions">
                        <AdminOnly disable>
                          <button 
                            onClick={() => { setEditing(d); setOpen(true); }} 
                            className="department-action-btn edit"
                          >
                            <FontAwesomeIcon icon={faEdit} className="department-action-icon" />
                            Edit
                          </button>
                        </AdminOnly>
                        <AdminOnly>
                          <button 
                            onClick={() => remove(d.id)} 
                            className="department-action-btn delete"
                          >
                            <FontAwesomeIcon icon={faTrash} className="department-action-icon" />
                            Delete
                          </button>
                        </AdminOnly>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <AddDepartmentModal 
          open={open} 
          onClose={() => setOpen(false)} 
          onCreated={handleCreated} 
          onUpdated={handleUpdated} 
          editing={editing} 
        />
      </div>
    </div>
  );
};

export default Departments;
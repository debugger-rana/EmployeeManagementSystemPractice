import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminOnly from '../components/AdminOnly';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserCheck, faUserXmark, faSearch, faClock, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import AnimatedBackground from '../components/AnimatedBackground';
import AnimatedIllustration from '../components/AnimatedIllustration';
import './Attendance.css';

const Attendance = () => {
  const { user, isAdmin } = useAuth();
  const [query, setQuery] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        if (isAdmin) {
          const res = await axios.get('/api/attendance');
          // Helpful debug — inspect shape returned by the server
          console.debug('GET /api/attendance ->', res.data);

          // res.data.data expected to be array of objects. Be defensive with field names.
          const list = (res.data.data || []).map((r) => {
            const uid = r.userId ?? r.user_id ?? (r.user && r.user.id) ?? r.id;
            const name = r.name ?? r.Name ?? r.fullName ?? (r.user && r.user.name) ?? r.email ?? `User ${uid}`;
            return {
              id: uid,
              name,
              department: r.department ?? '-',
              present: r.present === true || r.present === 1,
              time: r.time ?? null,
            };
          });
          if (mounted) setRecords(list);
        } else {
          const res = await axios.get('/api/attendance/me');
          console.debug('GET /api/attendance/me ->', res.data);
          const r = res.data.data || {};
          const uid = r.userId ?? r.user_id ?? (r.user && r.user.id) ?? r.id;
          const name = user?.name ?? user?.email ?? r.name ?? r.email ?? `User ${uid}`;
          const item = {
            id: uid,
            name,
            department: r.department ?? '-',
            present: r.present === true || r.present === 1,
            time: r.time ?? null,
          };
          if (mounted) setRecords([item]);
        }
      } catch (err) {
        console.error('Failed to load attendance', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false };
  }, [isAdmin, user]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return records;
    return records.filter(
      (r) => r.name.toLowerCase().includes(q) || r.department.toLowerCase().includes(q)
    );
  }, [query, records]);

  const togglePresent = async (id) => {
    if (!isAdmin) return;
    try {
      const target = records.find((x) => x.id === id);
      const newPresent = !(target?.present === true);
      const res = await axios.patch(`/api/attendance/${id}`, { present: newPresent });
      const updated = res.data.data;
      setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, present: Boolean(updated.present), time: updated.time } : r)));
    } catch (err) {
      console.error('Failed to update attendance', err);
    }
  };

  const summary = useMemo(() => {
    const total = records.length;
    const present = records.filter((r) => r.present === true).length;
    const absent = total - present;
    return { total, present, absent };
  }, [records]);

  return (
    <div className="attendance-page">
      {/* Animated Background */}
      <AnimatedBackground variant="attendance" />

      {/* Header Section with Illustration */}
      <header className="attendance-header">
        <div className="attendance-header-content">
          <h1>Attendance Tracking</h1>
          <p>Track check-ins, check-outs and daily presence</p>
          <div style={{ maxWidth: '250px', marginTop: '20px', opacity: 0.5 }}>
            <AnimatedIllustration type="attendance" />
          </div>
        </div>
        <div className="attendance-meta">
          <div className="attendance-meta-item">
            <div className="attendance-meta-label">
              <FontAwesomeIcon icon={faCalendarDay} /> Date
            </div>
            <div className="attendance-meta-value">{new Date().toLocaleDateString()}</div>
          </div>
          <div className="attendance-meta-item">
            <div className="attendance-meta-label">You</div>
            <div className="attendance-meta-value">{user?.name}</div>
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="attendance-summary">
        <div className="attendance-stat-card total" style={{ '--card-index': 0 }}>
          <div className="attendance-stat-label">
            <FontAwesomeIcon icon={faUsers} className="attendance-stat-icon" />
            Total Employees
          </div>
          <div className="attendance-stat-value">{summary.total}</div>
        </div>
        <div className="attendance-stat-card present" style={{ '--card-index': 1 }}>
          <div className="attendance-stat-label">
            <FontAwesomeIcon icon={faUserCheck} className="attendance-stat-icon" />
            Present Today
          </div>
          <div className="attendance-stat-value present-value">{summary.present}</div>
        </div>
        <div className="attendance-stat-card absent" style={{ '--card-index': 2 }}>
          <div className="attendance-stat-label">
            <FontAwesomeIcon icon={faUserXmark} className="attendance-stat-icon" />
            Absent Today
          </div>
          <div className="attendance-stat-value">{summary.absent}</div>
        </div>
      </section>

      {/* Search Controls */}
      <section className="attendance-controls">
        <div className="attendance-search-wrapper">
          <input
            aria-label="Search employees"
            placeholder="Search by name or department..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="attendance-search"
          />
          <FontAwesomeIcon icon={faSearch} className="attendance-search-icon" />
        </div>
      </section>

      {/* Attendance Table */}
      <section className="attendance-table-card">
        {loading ? (
          <div className="attendance-loading">
            <div className="attendance-loading-spinner"></div>
            <p>Loading attendance records...</p>
          </div>
        ) : (
          <div className="attendance-table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, index) => (
                  <tr key={r.id} style={{ '--row-index': index }}>
                    <td>{r.name}</td>
                    <td>{r.department}</td>
                    <td>
                      <span className={`attendance-status-badge ${r.present === true ? 'present' : 'absent'}`}>
                        {r.present === true ? 'Present' : 'Absent'}
                      </span>
                    </td>
                    <td>
                      <div className="attendance-time">
                        <FontAwesomeIcon icon={faClock} className="attendance-time-icon" />
                        {r.time || '-'}
                      </div>
                    </td>
                    <td>
                      <AdminOnly disable>
                        <button
                          onClick={() => togglePresent(r.id)}
                          className="attendance-toggle-btn"
                          aria-pressed={r.present === true}
                        >
                          {r.present === true ? 'Unmark' : 'Mark Present'}
                        </button>
                      </AdminOnly>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Attendance;
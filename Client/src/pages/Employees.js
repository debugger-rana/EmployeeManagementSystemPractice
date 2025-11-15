import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import AddEmployeeModal from '../components/AddEmployeeModal';
import { useLocation } from 'react-router-dom';

const Employees = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

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

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Employee Management</h1>
        <p>Manage your organization's employees</p>
      </div>

      <div style={styles.card}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <h2>Employee List</h2>
          <div>
            <button onClick={() => setOpen(true)} style={addBtn}>➕ Add Employee</button>
          </div>
        </div>

        {loading ? (
          <div>Loading…</div>
        ) : (
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Role</th>
              </tr>
            </thead>
            <tbody>
              {list.map(u => (
                <tr key={u.id}>
                  <td style={td}>{u.name}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <AddEmployeeModal open={open} onClose={() => setOpen(false)} onCreated={handleCreated} />
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
  header: { marginBottom: '30px' },
  card: { background: 'var(--glass-bg)', padding: '24px', borderRadius: '12px', boxShadow: 'var(--glass-shadow)' },
};

const addBtn = { padding: '8px 12px', borderRadius:8, border:'none', background:'var(--gradient-primary)', color:'white', cursor:'pointer' };
const th = { textAlign:'left', padding:12, color:'var(--text-secondary)' };
const td = { padding:12, borderTop:'1px solid var(--border-light)' };

export default Employees;
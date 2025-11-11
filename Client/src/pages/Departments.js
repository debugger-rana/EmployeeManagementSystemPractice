import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminOnly from '../components/AdminOnly';
import AddDepartmentModal from '../components/AddDepartmentModal';

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

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Departments</h1>
        <p>Organize and manage company departments.</p>
      </div>

      <div style={styles.card}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <h2 style={{margin:0}}>Department List</h2>
          <AdminOnly>
            <button onClick={() => { setEditing(null); setOpen(true); }} style={addBtn}>➕ New Department</button>
          </AdminOnly>
        </div>

        {loading ? (
          <div>Loading…</div>
        ) : (
          <div style={{overflowX:'auto'}}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Name</th>
                  <th style={th}>Code</th>
                  <th style={th}>Head</th>
                  <th style={th}>Employees</th>
                  <th style={th} aria-hidden>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.length === 0 && (
                  <tr><td colSpan={5} style={{padding:20,textAlign:'center',color:'var(--text-secondary)'}}>No departments yet</td></tr>
                )}
                {departments.map(d => (
                  <tr key={d.id}>
                    <td style={td}>{d.name}</td>
                    <td style={td}>{d.code || '—'}</td>
                    <td style={td}>{d.headName || '—'}</td>
                    <td style={td}>{d.count || 0}</td>
                    <td style={td}>
                      <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
                        <AdminOnly disable>
                          <button onClick={() => { setEditing(d); setOpen(true); }} style={actionBtn}>Edit</button>
                        </AdminOnly>
                        <AdminOnly>
                          <button onClick={() => remove(d.id)} style={delBtn}>Delete</button>
                        </AdminOnly>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <AddDepartmentModal open={open} onClose={() => setOpen(false)} onCreated={handleCreated} onUpdated={handleUpdated} editing={editing} />
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
const actionBtn = { padding:'6px 10px', borderRadius:6, border:'1px solid var(--border-medium)', background:'transparent', cursor:'pointer' };
const delBtn = { ...actionBtn, color:'#ff6b6b', borderColor:'rgba(255,107,107,0.14)' };
const table = { width:'100%', borderCollapse:'collapse' };
const th = { textAlign:'left', padding:12, color:'var(--text-secondary)', fontSize:13, borderBottom:'1px solid var(--border-light)' };
const td = { padding:12, borderTop:'1px solid var(--border-light)', verticalAlign:'middle' };

export default Departments;
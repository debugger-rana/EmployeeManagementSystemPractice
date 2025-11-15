import React, { useState } from 'react';
import axios from 'axios';

const AddEmployeeModal = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Employee' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/admin/create', form);
      onCreated && onCreated(res.data.data);
      onClose && onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={backdrop} role="dialog" aria-modal="true">
      <div style={modal}>
        <h3 style={{marginTop:0}}>Add Employee</h3>
        {error && <div style={{color:'#ff6666',marginBottom:8}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={row}>
            <label style={label}>Full name</label>
            <input name="name" value={form.name} onChange={handleChange} required style={input} />
          </div>
          <div style={row}>
            <label style={label}>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required style={input} />
          </div>
          <div style={row}>
            <label style={label}>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} style={input} />
          </div>
          <div style={row}>
            <label style={label}>Role</label>
            <select name="role" value={form.role} onChange={handleChange} style={input}>
              <option>Employee</option>
              <option>Admin</option>
            </select>
          </div>
          <div style={{display:'flex',gap:10,justifyContent:'flex-end',marginTop:12}}>
            <button type="button" onClick={onClose} style={btnSecondary}>Cancel</button>
            <button type="submit" disabled={loading} style={btnPrimary}>{loading? 'Creating...' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const backdrop = {
  position: 'fixed', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000
};
const modal = { background:'var(--bg-elevated)', padding:20, borderRadius:12, width:420, boxShadow:'0 10px 30px rgba(0,0,0,0.6)', color:'var(--text-primary)'};
const row = { marginBottom:10, display:'flex', flexDirection:'column' };
const label = { fontSize:13, marginBottom:6, color:'var(--text-secondary)' };
const input = { padding:'10px 12px', borderRadius:8, border:'1px solid var(--border-medium)', background:'var(--bg-surface)', color:'var(--text-primary)' };
const btnPrimary = { background:'var(--gradient-primary)', color:'white', border:'none', padding:'8px 14px', borderRadius:8, cursor:'pointer' };
const btnSecondary = { background:'transparent', color:'var(--text-secondary)', border:'1px solid var(--border-medium)', padding:'8px 14px', borderRadius:8, cursor:'pointer' };

export default AddEmployeeModal;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddDepartmentModal = ({ open, onClose, onCreated, onUpdated, editing }) => {
  const [form, setForm] = useState({ name: '', code: '', headId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editing) setForm({ name: editing.name || '', code: editing.code || '', headId: editing.headId || '' });
    else setForm({ name: '', code: '', headId: '' });
  }, [editing, open]);

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (editing) {
        const res = await axios.patch(`/api/departments/${editing.id}`, form);
        onUpdated && onUpdated(res.data.data || res.data);
      } else {
        const res = await axios.post('/api/departments', form);
        onCreated && onCreated(res.data.data || res.data);
      }
      onClose && onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to save department');
    } finally { setLoading(false); }
  };

  return (
    <div style={backdrop} role="dialog" aria-modal="true">
      <div style={modal}>
        <h3 style={{marginTop:0}}>{editing ? 'Edit Department' : 'Create Department'}</h3>
        {error && <div style={{color:'#ff6666',marginBottom:8}}>{error}</div>}
        <form onSubmit={submit}>
          <div style={row}>
            <label style={label}>Department name</label>
            <input name="name" value={form.name} onChange={handleChange} required style={input} />
          </div>
          <div style={row}>
            <label style={label}>Code (optional)</label>
            <input name="code" value={form.code} onChange={handleChange} style={input} />
          </div>
          <div style={row}>
            <label style={label}>Department head (user id)</label>
            <input name="headId" value={form.headId} onChange={handleChange} style={input} />
          </div>

          <div style={{display:'flex',gap:10,justifyContent:'flex-end',marginTop:12}}>
            <button type="button" onClick={onClose} style={btnSecondary}>Cancel</button>
            <button type="submit" disabled={loading} style={btnPrimary}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const backdrop = { position: 'fixed', inset:0, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 };
const modal = { background:'var(--bg-elevated)', padding:20, borderRadius:12, width:480, boxShadow:'0 10px 30px rgba(0,0,0,0.6)', color:'var(--text-primary)'};
const row = { marginBottom:10, display:'flex', flexDirection:'column' };
const label = { fontSize:13, marginBottom:6, color:'var(--text-secondary)' };
const input = { padding:'10px 12px', borderRadius:8, border:'1px solid var(--border-medium)', background:'var(--bg-surface)', color:'var(--text-primary)' };
const btnPrimary = { background:'var(--gradient-primary)', color:'white', border:'none', padding:'8px 14px', borderRadius:8, cursor:'pointer' };
const btnSecondary = { background:'transparent', color:'var(--text-secondary)', border:'1px solid var(--border-medium)', padding:'8px 14px', borderRadius:8, cursor:'pointer' };

export default AddDepartmentModal;

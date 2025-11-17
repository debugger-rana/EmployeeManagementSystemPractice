import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminOnly from '../components/AdminOnly';
import axios from 'axios';

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
    <main style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Attendance</h1>
          <p style={styles.subtitle}>Track check-ins, check-outs and daily presence</p>
        </div>
        <div style={styles.meta}>
          <div style={styles.metaItem}>
            <div style={styles.metaLabel}>Date</div>
            <div style={styles.metaValue}>{new Date().toLocaleDateString()}</div>
          </div>
          <div style={styles.metaItem}>
            <div style={styles.metaLabel}>You</div>
            <div style={styles.metaValue}>{user?.name}</div>
          </div>
        </div>
      </header>

      <section style={styles.summaryRow} aria-hidden>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total</div>
          <div style={styles.statValue}>{summary.total}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Present</div>
          <div style={styles.statValuePresent}>{summary.present}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Absent</div>
          <div style={styles.statValue}>{summary.absent}</div>
        </div>
      </section>

      <section style={styles.controls}>
        <input
          aria-label="Search employees"
          placeholder="Search by name or department"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.search}
        />
      </section>

      <section style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} style={styles.tr}>
                <td style={styles.td}>{r.name}</td>
                <td style={styles.td}>{r.department}</td>
                <td style={styles.td}>
                  <span style={r.present === true ? styles.badgePresent : styles.badgeAbsent}>
                    {r.present === true ? 'Present' : 'Absent'}
                  </span>
                </td>
                <td style={styles.td}>{r.time || '-'}</td>
                <td style={styles.td}>
                  <AdminOnly disable>
                    <button
                      onClick={() => togglePresent(r.id)}
                      style={r.present === true ? styles.unmarkBtn : styles.markBtn}
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
                <td style={styles.empty} colSpan={5}>
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'var(--space-8) var(--space-6)',
    color: 'var(--text-primary)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--space-6)',
  },
  title: {
    fontSize: 'var(--font-size-2xl)',
    margin: 0,
  },
  subtitle: {
    color: 'var(--text-secondary)',
    marginTop: 'var(--space-2)',
    fontSize: 'var(--font-size-sm)'
  },
  meta: {
    display: 'flex',
    gap: 'var(--space-4)',
    alignItems: 'flex-end',
  },
  metaItem: {
    textAlign: 'right'
  },
  metaLabel: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--text-tertiary)'
  },
  metaValue: {
    fontSize: 'var(--font-size-sm)'
  },
  summaryRow: {
    display: 'flex',
    gap: 'var(--space-4)',
    marginBottom: 'var(--space-6)'
  },
  statCard: {
    flex: '1',
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    padding: 'var(--space-4)',
    borderRadius: 'var(--radius-lg)'
  },
  statLabel: { color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' },
  statValue: { fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' },
  statValuePresent: { fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--success)' },
  controls: { display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-4)' },
  search: {
    padding: 'var(--space-3) var(--space-4)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-medium)',
    background: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    outline: 'none',
    width: '320px'
  },
  tableCard: {
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--radius-2xl)',
    padding: 'var(--space-4)'
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: 'var(--space-3) var(--space-4)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' },
  tr: { borderBottom: '1px solid var(--border-light)' },
  td: { padding: 'var(--space-3) var(--space-4)', verticalAlign: 'middle' },
  badgePresent: { padding: '4px 8px', borderRadius: '9999px', background: 'rgba(16,185,129,0.12)', color: 'var(--success)', textTransform: 'capitalize' },
  badgeAbsent: { padding: '4px 8px', borderRadius: '9999px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', textTransform: 'capitalize' },
  markBtn: { padding: '8px 12px', background: 'var(--gradient-primary)', color: 'var(--text-primary)', border: 'none', borderRadius: 'var(--radius-lg)', cursor: 'pointer' },
  unmarkBtn: { padding: '8px 12px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-lg)', cursor: 'pointer' },
  empty: { textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text-secondary)' }
};

export default Attendance;
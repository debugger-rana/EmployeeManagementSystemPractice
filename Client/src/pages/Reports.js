// Reports.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // yyyy-mm (input type="month")
  const now = new Date();
  const defaultMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const [month, setMonth] = useState(defaultMonth);

  const fetchMonthly = async (year, monthNum) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/reports/monthly', {
        params: { year, month: monthNum }
      });
      setData(res.data.data || []);
    } catch (err) {
      console.error('fetchMonthly error', err);
      setError('Failed to load monthly report');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // parse month value like "2025-11"
    const [y, m] = month.split('-').map((v) => parseInt(v, 10));
    fetchMonthly(y, m);
  }, [month]);

  const handleMonthChange = (e) => setMonth(e.target.value);

  return (
    <div style={{ padding: 20 }}>
      <h2>Monthly Attendance Report</h2>

      <div style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <label htmlFor="month">Select month</label>
        <input id="month" type="month" value={month} onChange={handleMonthChange} />
      </div>

      {loading && <p>Loading report...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Name</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Total Recorded</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}>No data for selected month</td>
              </tr>
            ) : (
              data.map((r) => (
                <tr key={r.userId}>
                  <td>{r.name}</td>
                  <td style={{ textAlign: 'center' }}>{r.present}</td>
                  <td style={{ textAlign: 'center' }}>{r.absent}</td>
                  <td style={{ textAlign: 'center' }}>{r.present + r.absent}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;

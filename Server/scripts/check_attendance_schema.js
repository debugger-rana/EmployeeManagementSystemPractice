const { sequelize } = require('../config/database');

(async () => {
  try {
    await sequelize.authenticate();
    const [att] = await sequelize.query("PRAGMA table_info('attendance');");
    const [hist] = await sequelize.query("PRAGMA table_info('attendance_history');");
    console.log('attendance columns:');
    console.table(att.map(r => ({ cid: r.cid, name: r.name, type: r.type, dflt_value: r.dflt_value })));
    console.log('\nattendance_history columns:');
    console.table(hist.map(r => ({ cid: r.cid, name: r.name, type: r.type, dflt_value: r.dflt_value })));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

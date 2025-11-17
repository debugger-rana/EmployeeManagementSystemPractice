const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('Starting attendance -> present migration...');
    await sequelize.authenticate();

    // Add present columns (as INTEGER 0/1) if not exists
    console.log('Adding `present` column to attendance if missing...');
    try {
      await sequelize.query("ALTER TABLE attendance ADD COLUMN present INTEGER DEFAULT 0;");
    } catch (e) {
      console.log(' - Could not add column to `attendance` (may already exist):', e.message);
    }

    console.log('Adding `present` column to attendance_history if missing...');
    try {
      await sequelize.query("ALTER TABLE attendance_history ADD COLUMN present INTEGER DEFAULT 0;");
    } catch (e) {
      console.log(' - Could not add column to `attendance_history` (may already exist):', e.message);
    }

    // Migrate data from status -> present
    console.log("Copying values where status='present' -> present=1");
    try {
      await sequelize.query("UPDATE attendance SET present = 1 WHERE status = 'present';");
    } catch (e) {
      console.log(' - Update attendance present failed (maybe no status column):', e.message);
    }

    try {
      await sequelize.query("UPDATE attendance_history SET present = 1 WHERE status = 'present';");
    } catch (e) {
      console.log(' - Update attendance_history present failed (maybe no status column):', e.message);
    }

    // Attempt to drop old status columns (SQLite may not support DROP COLUMN)
    console.log('Attempting to drop old `status` columns (may fail on older SQLite)');
    try {
      await sequelize.query('ALTER TABLE attendance DROP COLUMN status;');
      console.log(' - Dropped `attendance.status`');
    } catch (e) {
      console.log(' - Could not drop `attendance.status` (SQLite may not support DROP COLUMN). Leaving it in place.');
    }

    try {
      await sequelize.query('ALTER TABLE attendance_history DROP COLUMN status;');
      console.log(' - Dropped `attendance_history.status`');
    } catch (e) {
      console.log(' - Could not drop `attendance_history.status` (SQLite may not support DROP COLUMN). Leaving it in place.');
    }

    console.log('Migration complete.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
})();

const express = require('express');
const Department = require('../models/Department');

const router = express.Router();

// GET /api/departments - list all departments
router.get('/', async (req, res) => {
  try {
    const deps = await Department.findAll({ order: [['id', 'DESC']] });
    res.json({ success: true, data: deps });
  } catch (err) {
    console.error('GET /api/departments error', err);
    res.status(500).json({ success: false, message: 'Failed to fetch departments' });
  }
});

// POST /api/departments - create
router.post('/', async (req, res) => {
  try {
    const { name, code, headId } = req.body;
    if (!name || !name.toString().trim()) return res.status(400).json({ success: false, message: 'Department name is required' });
    const dep = await Department.create({ name: name.toString().trim(), code: code || null, headId: headId || null });
    res.status(201).json({ success: true, data: dep });
  } catch (err) {
    console.error('POST /api/departments error', err);
    res.status(500).json({ success: false, message: 'Failed to create department' });
  }
});

// PATCH /api/departments/:id - update
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dep = await Department.findByPk(id);
    if (!dep) return res.status(404).json({ success: false, message: 'Department not found' });
    const { name, code, headId } = req.body;
    dep.name = name !== undefined ? name : dep.name;
    dep.code = code !== undefined ? code : dep.code;
    dep.headId = headId !== undefined ? headId : dep.headId;
    await dep.save();
    res.json({ success: true, data: dep });
  } catch (err) {
    console.error('PATCH /api/departments/:id error', err);
    res.status(500).json({ success: false, message: 'Failed to update department' });
  }
});

// DELETE /api/departments/:id - delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dep = await Department.findByPk(id);
    if (!dep) return res.status(404).json({ success: false, message: 'Department not found' });
    await dep.destroy();
    res.json({ success: true, message: 'Department deleted' });
  } catch (err) {
    console.error('DELETE /api/departments/:id error', err);
    res.status(500).json({ success: false, message: 'Failed to delete department' });
  }
});

module.exports = router;

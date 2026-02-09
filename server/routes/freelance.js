const express = require('express');
const router = express.Router();
const Freelance = require('../models/Freelance');

// Get all freelance projects
router.get('/', async (req, res) => {
    try {
        const items = await Freelance.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create freelance project
router.post('/', async (req, res) => {
    const item = new Freelance({
        title: req.body.title,
        status: req.body.status || 'PENDING',
        description: req.body.description,
        deadline: req.body.deadline
    });
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update freelance project
router.patch('/:id', async (req, res) => {
    try {
        const item = await Freelance.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (req.body.title) item.title = req.body.title;
        if (req.body.status) item.status = req.body.status;
        if (req.body.description) item.description = req.body.description;
        if (req.body.deadline) item.deadline = req.body.deadline;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete freelance project
router.delete('/:id', async (req, res) => {
    try {
        const item = await Freelance.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await item.deleteOne();
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

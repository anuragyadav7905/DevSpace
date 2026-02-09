const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

const requireLogin = require('../middlewares/requireLogin');

// Get all jobs
router.get('/', requireLogin, async (req, res) => {
    try {
        const jobs = await Job.find({ _user: req.user.id }).sort({ appliedAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create job application
router.post('/', requireLogin, async (req, res) => {
    const job = new Job({
        company: req.body.company,
        role: req.body.role,
        status: req.body.status || 'Applied',
        lastFollowUp: req.body.lastFollowUp,
        link: req.body.link,
        _user: req.user.id
    });
    try {
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update job application
router.patch('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (req.body.company) job.company = req.body.company;
        if (req.body.role) job.role = req.body.role;
        if (req.body.status) job.status = req.body.status;
        if (req.body.lastFollowUp) job.lastFollowUp = req.body.lastFollowUp;
        if (req.body.link !== undefined) job.link = req.body.link;

        const updatedJob = await job.save();
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete job application
router.delete('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        await job.deleteOne();
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

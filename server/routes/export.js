const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Freelance = require('../models/Freelance');
const Job = require('../models/Job');
const requireLogin = require('../middlewares/requireLogin');

router.get('/', requireLogin, async (req, res) => {
    try {
        const projects = await Project.find({ _user: req.user.id });
        const freelance = await Freelance.find({ _user: req.user.id });
        const jobs = await Job.find({ _user: req.user.id });

        const backup = {
            user: {
                displayName: req.user.displayName,
                email: req.user.email
            },
            exportDate: new Date(),
            data: {
                projects,
                freelance,
                jobs
            }
        };

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=devspace_backup.json');
        res.json(backup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating backup' });
    }
});

module.exports = router;

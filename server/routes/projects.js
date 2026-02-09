const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

const requireLogin = require('../middlewares/requireLogin');

/* 
 * GET /api/projects
 * Fetch all projects
 */
router.get('/', requireLogin, async (req, res) => {
    try {
        const projects = await Project.find({ _user: req.user.id }).sort({ updatedAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* 
 * POST /api/projects
 * Create a new project
 */
router.post('/', requireLogin, async (req, res) => {
    const project = new Project({
        title: req.body.title,
        status: req.body.status || 'BACKLOG',
        link: req.body.link,
        _user: req.user.id
    });
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/* 
 * PATCH /api/projects/:id
 * Update project details
 */
router.patch('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        if (req.body.title) project.title = req.body.title;
        if (req.body.status) project.status = req.body.status;
        if (req.body.link !== undefined) project.link = req.body.link;
        project.updatedAt = Date.now();

        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/* 
 * DELETE /api/projects/:id
 * Delete a project
 */
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        await project.deleteOne();
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

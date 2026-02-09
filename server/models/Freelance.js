const mongoose = require('mongoose');

const FreelanceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String, // Simplified status for Kanban columns: APPLIED, PENDING, ACTIVE, COMPLETED
        default: 'PENDING'
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: String // or Date
    }
});

module.exports = mongoose.model('Freelance', FreelanceSchema);

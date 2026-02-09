const mongoose = require('mongoose');
require('dotenv').config();
require('./models/User'); // Register models
require('./models/Project');
require('./models/Freelance');
require('./models/Job');

const User = mongoose.model('users'); // Use registered model name
const Project = mongoose.model('Project');
const Freelance = mongoose.model('Freelance');
const Job = mongoose.model('Job');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        const user = await User.findOne({});

        if (!user) {
            console.log("No users found. Please login via Google OAuth at least once to create a user.");
            process.exit(1);
        }

        console.log(`Seeding data for user: ${user.displayName} (${user._id})`);

        // Clear existing data for this user (Optional - be careful!)
        // await Project.deleteMany({ _user: user._id });
        // await Freelance.deleteMany({ _user: user._id });
        // await Job.deleteMany({ _user: user._id });

        // Projects
        const projects = [
            { title: 'Portfolio Website', status: 'COMPLETED', _user: user._id },
            { title: 'E-commerce API', status: 'ACTIVE', _user: user._id },
            { title: 'Chat Application', status: 'IN PROGRESS', _user: user._id },
            { title: 'Blog Platform', status: 'BACKLOG', _user: user._id },
            { title: 'Weather App', status: 'ACTIVE', _user: user._id },
            { title: 'Task Manager', status: 'ACTIVE', _user: user._id },
        ];

        // Use create instead of insertMany to trigger schema validation if needed, or simple insertMany
        await Project.insertMany(projects);
        console.log('Projects seeded');

        // Freelance
        const freelance = [
            { title: 'Client Website Redesign', status: 'ACTIVE', description: 'Redesign corp site', _user: user._id },
            { title: 'Shopify Store Setup', status: 'ACTIVE', description: 'Setup new store', _user: user._id },
            { title: 'React Component Lib', status: 'PENDING', description: 'Build UI kit', _user: user._id },
            { title: 'Bug Fixes for App', status: 'PENDING', description: 'Fix login bugs', _user: user._id }, // Status must match enum or be accepted string. Freelance model has no enum yet but good to be consistent
        ];
        await Freelance.insertMany(freelance);
        console.log('Freelance seeded');

        // Jobs
        const jobs = [
            { company: 'Google', role: 'Frontend Engineer', status: 'Interview', _user: user._id },
            { company: 'Meta', role: 'UI Developer', status: 'Applied', _user: user._id },
            { company: 'Amazon', role: 'SDE I', status: 'Rejected', _user: user._id },
            { company: 'Startup Inc', role: 'Full Stack Dev', status: 'Offer', _user: user._id },
            { company: 'Another Corp', role: 'React Dev', status: 'Applied', _user: user._id },
            { company: 'Tech Solutions', role: 'Web Dev', status: 'Interview', _user: user._id },
            { company: 'Innovate', role: 'Software Engineer', status: 'Offer', _user: user._id },
            { company: 'Future Systems', role: 'Frontend Dev', status: 'Offer', _user: user._id },
            { company: 'Alpha', role: 'Dev', status: 'Applied', _user: user._id },
            { company: 'Beta', role: 'Dev', status: 'Applied', _user: user._id },
            { company: 'Gamma', role: 'Dev', status: 'Applied', _user: user._id },
            { company: 'Delta', role: 'Dev', status: 'Applied', _user: user._id },
            { company: 'Epsilon', role: 'Dev', status: 'Applied', _user: user._id },
            { company: 'Zeta', role: 'Dev', status: 'Interview', _user: user._id },
            { company: 'Eta', role: 'Dev', status: 'Interview', _user: user._id },
        ];

        // Ensure status matches schema enum: 'Applied', 'Interview', 'Offer', 'Rejected'
        await Job.insertMany(jobs);
        console.log('Jobs seeded');

        console.log('Seeding Complete!');
        mongoose.connection.close(); // Close the connection gracefully
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();

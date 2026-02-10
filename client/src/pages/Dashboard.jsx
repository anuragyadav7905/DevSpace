import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        projects: { total: 0, byStatus: {} },
        freelance: { total: 0, byStatus: {} },
        jobs: { total: 0, byStatus: {} }
    });
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Initialize notes from user when available
    useEffect(() => {
        if (user && user.notes !== undefined) {
            setNotes(user.notes);
        }
    }, [user]);

    // Auto-save notes
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (user && notes !== user.notes) {
                setIsSaving(true);
                try {
                    await axios.put('/api/notes', { notes });
                } catch (err) {
                    console.error("Failed to save notes", err);
                } finally {
                    setIsSaving(false);
                }
            }
        }, 1000); // Debounce 1s

        return () => clearTimeout(timeoutId);
    }, [notes, user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, freelanceRes, jobsRes] = await Promise.all([
                    axios.get('/api/projects'),
                    axios.get('/api/freelance'),
                    axios.get('/api/jobs')
                ]);

                // Helper to count by status
                const countByStatus = (items, statusKey = 'status') => {
                    return items.reduce((acc, item) => {
                        const status = item[statusKey];
                        acc[status] = (acc[status] || 0) + 1;
                        return acc;
                    }, {});
                };

                setStats({
                    projects: {
                        total: projectsRes.data.length,
                        byStatus: countByStatus(projectsRes.data)
                    },
                    freelance: {
                        total: freelanceRes.data.length,
                        byStatus: countByStatus(freelanceRes.data)
                    },
                    jobs: {
                        total: jobsRes.data.length,
                        byStatus: countByStatus(jobsRes.data)
                    }
                });
            } catch (err) {
                console.error("Error fetching dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper to verify status count safely
    const getCount = (category, status) => {
        return stats[category].byStatus[status] || 0;
    };

    if (loading) return <div className="h-screen w-full flex items-center justify-center bg-[#0f172a] text-white">Loading Dashboard...</div>;

    return (
        <Layout>
            <Header title="Dashboard" rightElement={<div />} />
            <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
                <header className="mb-12">
                    <h2 className="text-2xl font-bold tracking-tight">Personal Workspace Overview</h2>
                    <p className="text-slate-400 dark:text-slate-600 text-sm mt-1 uppercase tracking-widest text-[10px]">Status Console • Read-only</p>
                </header>

                <div className="space-y-12">
                    {/* PROJECTS SECTION */}
                    <div
                        onClick={() => navigate('/projects')}
                        className="group cursor-pointer bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-8 rounded-xl hover:border-primary/40 transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">Projects</h3>
                            <div className="text-4xl font-light text-slate-300 dark:text-slate-700 tracking-tighter">{stats.projects.total.toString().padStart(2, '0')}</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-[10px] font-bold border border-primary/20 bg-primary/5 text-primary rounded uppercase">Active: {getCount('projects', 'ACTIVE')}</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">In Progress: {getCount('projects', 'IN PROGRESS')}</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Backlog: {getCount('projects', 'BACKLOG')}</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Completed: {getCount('projects', 'COMPLETED')}</span>
                        </div>
                    </div>

                    {/* FREELANCE SECTION */}
                    <div
                        onClick={() => navigate('/freelance')}
                        className="group cursor-pointer bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-8 rounded-xl hover:border-primary/40 transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">Freelance</h3>
                            <div className="text-4xl font-light text-slate-300 dark:text-slate-700 tracking-tighter">{stats.freelance.total.toString().padStart(2, '0')}</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Applied: {getCount('freelance', 'APPLIED')}</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Pending: {getCount('freelance', 'PENDING')}</span>
                            <span className="px-2 py-1 text-[10px] font-bold border border-primary/20 bg-primary/5 text-primary rounded uppercase">Active: {getCount('freelance', 'ACTIVE')}</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Completed: {getCount('freelance', 'COMPLETED')}</span>
                        </div>
                    </div>

                    {/* JOBS SECTION */}
                    <div
                        onClick={() => navigate('/jobs')}
                        className="group cursor-pointer bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-8 rounded-xl hover:border-primary/40 transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">Jobs</h3>
                            <div className="text-4xl font-light text-slate-300 dark:text-slate-700 tracking-tighter">{stats.jobs.total.toString().padStart(2, '0')}</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Applied: {getCount('jobs', 'Applied')}</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Interview: {getCount('jobs', 'Interview')}</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Offer: {getCount('jobs', 'Offer')}</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Rejected: {getCount('jobs', 'Rejected')}</span>
                        </div>
                    </div>

                    {/* NOTES SECTION */}
                    <div className="group bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-8 rounded-xl hover:border-primary/40 transition-all shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">Notes</h3>
                                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Quick personal notes</p>
                            </div>
                            {isSaving && <span className="text-[10px] text-primary animate-pulse uppercase tracking-widest">Saving...</span>}
                        </div>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Write your thoughts, todos, ideas..."
                            className="w-full h-40 bg-transparent resize-none outline-none text-slate-600 dark:text-slate-300 placeholder-slate-400 font-mono text-sm leading-relaxed"
                            spellCheck="false"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Modal from '../components/Modal';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [formData, setFormData] = useState({ company: '', role: '', status: 'Applied', lastFollowUp: '', link: '' });

    const fetchJobs = async () => {
        try {
            const res = await axios.get('/api/jobs');
            setJobs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleOpenCreate = () => {
        setEditingJob(null);
        setFormData({ company: '', role: '', status: 'Applied', lastFollowUp: '', link: '' });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (job) => {
        setEditingJob(job);
        setFormData({
            company: job.company,
            role: job.role,
            status: job.status,
            lastFollowUp: job.lastFollowUp || '',
            link: job.link || ''
        });
        setIsModalOpen(true);
    };

    const handleSaveJob = async (e) => {
        e.preventDefault();
        try {
            if (editingJob) {
                await axios.patch(`/api/jobs/${editingJob._id}`, formData);
            } else {
                await axios.post('/api/jobs', formData);
            }
            setIsModalOpen(false);
            setEditingJob(null);
            setFormData({ company: '', role: '', status: 'Applied', lastFollowUp: '', link: '' });
            fetchJobs();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteJob = async (id) => {
        if (window.confirm('Are you sure you want to delete this job application?')) {
            try {
                await axios.delete(`/api/jobs/${id}`);
                setIsModalOpen(false);
                fetchJobs();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleCardClick = (link) => {
        if (link) {
            window.open(link, '_blank');
        }
    };

    // Helper to get status counts
    const getCount = (status) => jobs.filter(j => j.status === status).length;

    const stats = [
        { label: 'Applied', val: getCount('Applied') },
        { label: 'Interview', val: getCount('Interview') },
        { label: 'Offer', val: getCount('Offer') },
        { label: 'Rejected', val: getCount('Rejected') }
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Interview': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Offer': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
            case 'Rejected': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
        }
    };

    if (loading) return (
        <Layout>
            <div className="flex h-screen items-center justify-center">
                <p className="text-slate-400">Loading Job Applications...</p>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <Header
                title="Job Applications"
                rightElement={
                    <button
                        onClick={handleOpenCreate}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-colors"
                    >
                        <span className="material-symbols-outlined text-base">add</span>
                        <span>Add Job</span>
                    </button>
                }
            />
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map(stat => (
                        <div key={stat.label} className="p-5 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-lg shadow-sm">
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.val}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Company</th>
                                    <th className="px-6 py-4 font-semibold">Role</th>
                                    <th className="px-6 py-4 font-semibold">Link</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {jobs.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-sm text-slate-500 italic">No job applications yet.</td>
                                    </tr>
                                ) : (
                                    jobs.map((row) => (
                                        <tr
                                            key={row._id}
                                            className={`group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${row.status === 'Rejected' ? 'opacity-60 grayscale-[0.5]' : ''}`}
                                        >
                                            <td className="px-6 py-3 flex items-center gap-3">
                                                <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 text-xs">
                                                    {row.company.substring(0, 2).toUpperCase()}
                                                </div>
                                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{row.company}</span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="text-sm text-slate-700 dark:text-slate-200 font-medium">{row.role}</div>
                                                {row.lastFollowUp && <div className="text-[9px] text-slate-500 uppercase tracking-tighter">Last follow-up: {row.lastFollowUp}</div>}
                                            </td>
                                            <td className="px-6 py-3">
                                                {row.link ? (
                                                    <a
                                                        href={row.link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="flex items-center gap-1 text-primary hover:text-primary/80 text-xs font-medium"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                        Link
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-400 text-xs">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-3">
                                                <span className={`px-2.5 py-1 text-[10px] font-black rounded uppercase tracking-widest ${getStatusStyle(row.status)}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleOpenEdit(row); }}
                                                        className="text-slate-400 hover:text-blue-500 p-1"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">edit</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingJob ? "Edit Job Application" : "Add Job Application"}
            >
                <form onSubmit={handleSaveJob} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g., Google"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            placeholder="e.g., Frontend Engineer"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Link (Optional)</label>
                        <input
                            type="url"
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                        <select
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Follow-Up (Optional)</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.lastFollowUp}
                            onChange={(e) => setFormData({ ...formData, lastFollowUp: e.target.value })}
                            placeholder="e.g., 2 days ago"
                        />
                    </div>
                    <div className="pt-4 flex items-center justify-between">
                        {editingJob && (
                            <button
                                type="button"
                                onClick={() => handleDeleteJob(editingJob._id)}
                                className="px-4 py-2 text-sm font-medium text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-md transition-colors"
                            >
                                Delete
                            </button>
                        )}
                        <div className="flex gap-2 ml-auto">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                            >
                                {editingJob ? "Save Changes" : "Add Job"}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};
export default Jobs;

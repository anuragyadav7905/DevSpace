import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Modal from '../components/Modal';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({ title: '', status: 'ACTIVE', link: '' });

    const fetchProjects = async () => {
        try {
            const res = await axios.get('/api/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleOpenCreate = () => {
        setEditingProject(null);
        setFormData({ title: '', status: 'ACTIVE', link: '' });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (project) => {
        setEditingProject(project);
        setFormData({ title: project.title, status: project.status, link: project.link || '' });
        setIsModalOpen(true);
    };

    const handleSaveProject = async (e) => {
        e.preventDefault();
        try {
            if (editingProject) {
                await axios.patch(`/api/projects/${editingProject._id}`, formData);
            } else {
                await axios.post('/api/projects', formData);
            }
            setIsModalOpen(false);
            setEditingProject(null);
            setFormData({ title: '', status: 'ACTIVE', link: '' });
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`/api/projects/${id}`);
                setIsModalOpen(false);
                fetchProjects();
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

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.status === filter.toUpperCase());

    if (loading) return (
        <Layout>
            <div className="flex h-screen items-center justify-center">
                <p className="text-slate-400">Loading Projects...</p>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <Header
                title="My Projects"
                rightElement={
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
                        {['All', 'Active', 'Completed', 'Backlog'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-md transition-colors ${filter === f ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                }
            />
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((p) => (
                            <div
                                key={p._id}
                                onClick={() => handleCardClick(p.link)}
                                className={`group bg-white dark:bg-card-dark border rounded-lg p-8 hover:border-primary/50 transition-all shadow-sm relative ${p.status === 'ACTIVE' ? 'border-primary/30 ring-1 ring-primary/5' : 'border-slate-200 dark:border-border-dark'} ${p.link ? 'cursor-pointer' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{p.title}</h3>
                                    <div className="flex gap-2 z-10">
                                        <button
                                            title="Edit"
                                            onClick={(e) => { e.stopPropagation(); handleOpenEdit(p); }}
                                            className="text-slate-400 hover:text-blue-500 transition-colors p-1"
                                        >
                                            <span className="material-symbols-outlined text-lg">edit</span>
                                        </button>
                                    </div>
                                </div>
                                {p.link && (
                                    <div className="mb-4 text-xs text-slate-400 truncate flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">link</span>
                                        <span className="truncate">{p.link}</span>
                                    </div>
                                )}
                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-border-dark flex items-center justify-between">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${p.status === 'ACTIVE' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>{p.status}</span>
                                    <span className="text-[10px] text-slate-400 opacity-60">
                                        {new Date(p.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}

                        <div
                            onClick={handleOpenCreate}
                            className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center group cursor-pointer hover:border-primary/50 transition-colors min-h-[160px]"
                        >
                            <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary mb-4">
                                <span className="material-symbols-outlined text-3xl">add</span>
                            </div>
                            <span className="text-sm font-semibold text-slate-500 group-hover:text-primary">Create New Project</span>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingProject ? "Edit Project" : "Create New Project"}
            >
                <form onSubmit={handleSaveProject} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Portfolio Redesign"
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
                            <option value="ACTIVE">Active</option>
                            <option value="IN PROGRESS">In Progress</option>
                            <option value="BACKLOG">Backlog</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                    <div className="pt-4 flex items-center justify-between">
                        {editingProject && (
                            <button
                                type="button"
                                onClick={() => handleDeleteProject(editingProject._id)}
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
                                {editingProject ? "Save Changes" : "Create Project"}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};
export default Projects;

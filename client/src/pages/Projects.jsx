import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
// import axios from 'axios';

const Projects = () => {
    const [filter, setFilter] = useState('All');

    // Dummy Data
    const [projects, setProjects] = useState([
        { title: 'Portfolio Redesign', status: 'ACTIVE', updated: '2h ago' },
        { title: 'E-commerce Backend', status: 'COMPLETED', updated: 'Oct 24' },
        { title: 'Fitness Tracker App', status: 'BACKLOG', updated: '2 days ago' },
        { title: 'AI Content Generator', status: 'IN PROGRESS', updated: '5h ago' },
        { title: 'System Monitor', status: 'ACTIVE', updated: '1h ago' },
        { title: 'Cloud Sync Tool', status: 'BACKLOG', updated: '4 days ago' }
    ]);

    // Sample Fetch Call (Phase 2)
    /*
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('/api/projects');
                // setProjects(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProjects();
    }, []);
    */

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.status === filter.toUpperCase());

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
                        {filteredProjects.map((p, i) => (
                            <div key={i} className={`group bg-white dark:bg-slate-900 border rounded-lg p-8 hover:border-primary/50 transition-all shadow-sm relative ${p.status === 'ACTIVE' ? 'border-primary/30 ring-1 ring-primary/5' : 'border-slate-200 dark:border-slate-800'}`}>
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{p.title}</h3>
                                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${p.status === 'ACTIVE' ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>{p.status}</span>
                                    <span className="text-[10px] text-slate-400 opacity-60 absolute bottom-4 right-8">{p.updated}</span>
                                </div>
                            </div>
                        ))}
                        {filter === 'All' && (
                            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center group cursor-pointer hover:border-primary/50 transition-colors">
                                <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary mb-4">
                                    <span className="material-symbols-outlined text-3xl">add</span>
                                </div>
                                <span className="text-sm font-semibold text-slate-500 group-hover:text-primary">Create New Project</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Projects;

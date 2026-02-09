import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Header from '../components/Header';

const Dashboard = () => {
    const navigate = useNavigate();

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
                            <div className="text-4xl font-light text-slate-300 dark:text-slate-700 tracking-tighter">06</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-[10px] font-bold border border-primary/20 bg-primary/5 text-primary rounded uppercase">Active: 3</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">In Progress: 1</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Backlog: 1</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Completed: 1</span>
                        </div>
                    </div>

                    {/* FREELANCE SECTION */}
                    <div
                        onClick={() => navigate('/freelance')}
                        className="group cursor-pointer bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-8 rounded-xl hover:border-primary/40 transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">Freelance</h3>
                            <div className="text-4xl font-light text-slate-300 dark:text-slate-700 tracking-tighter">04</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Applied: 1</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Pending: 1</span>
                            <span className="px-2 py-1 text-[10px] font-bold border border-primary/20 bg-primary/5 text-primary rounded uppercase">Active: 2</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Completed: 0</span>
                        </div>
                    </div>

                    {/* JOBS SECTION */}
                    <div
                        onClick={() => navigate('/jobs')}
                        className="group cursor-pointer bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-8 rounded-xl hover:border-primary/40 transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">Jobs</h3>
                            <div className="text-4xl font-light text-slate-300 dark:text-slate-700 tracking-tighter">15</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Applied: 8</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Interview: 4</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Offer: 3</span>
                            <span className="px-2 py-1 text-[10px] font-medium border border-slate-200 dark:border-slate-800 text-slate-500 rounded uppercase">Rejected: 0</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

import Layout from '../components/Layout';
import Header from '../components/Header';

const Jobs = () => {
    // Dummy Data
    const applications = [
        { comp: 'Stripe', role: 'Senior Frontend Engineer', status: 'status-interview', label: 'Interview', followUp: '2 days ago' },
        { comp: 'Vercel', role: 'Product Designer', status: 'status-offer', label: 'Offer', followUp: 'Today' },
        { comp: 'Google', role: 'Staff Software Engineer', status: 'status-applied', label: 'Applied', followUp: '5 days ago' },
        { comp: 'Meta', role: 'Full Stack Developer', status: 'status-rejected', label: 'Rejected', followUp: '-' }
    ];

    const stats = [
        { label: 'Applied', val: '48' },
        { label: 'Interview', val: '12' },
        { label: 'Offer', val: '3' }
    ];

    return (
        <Layout>
            <Header title="Job Applications" />
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map(stat => (
                        <div key={stat.label} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <span className="text-2xl font-bold">{stat.val}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Company</th>
                                    <th className="px-6 py-4 font-semibold">Role</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {applications.map((row, i) => (
                                    <tr key={i} className={`group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${row.label === 'Rejected' ? 'opacity-40 grayscale-[0.5]' : ''}`}>
                                        <td className="px-6 py-3 flex items-center gap-3"><div className="size-8 rounded bg-slate-100 dark:bg-slate-800"></div><span className="text-sm font-semibold">{row.comp}</span></td>
                                        <td className="px-6 py-3">
                                            <div className="text-sm">{row.role}</div>
                                            {row.followUp !== '-' && <div className="text-[9px] text-slate-500 uppercase tracking-tighter">Last follow-up: {row.followUp}</div>}
                                        </td>
                                        <td className="px-6 py-3"><span className={`px-2.5 py-1 text-[10px] font-black rounded ${row.status} uppercase tracking-widest`}>{row.label}</span></td>
                                        <td className="px-6 py-3 text-right"><span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer text-base">more_vert</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Jobs;

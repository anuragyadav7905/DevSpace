import Layout from '../components/Layout';
import Header from '../components/Header';

const Freelance = () => {
    // Dummy Data
    const columns = [
        {
            title: 'Applied', cards: [
                { title: 'E-commerce Backend Rewrite', desc: 'Shopify Integration, Node.js', time: '2d ago' }
            ]
        },
        {
            title: 'Pending', cards: [
                { title: 'AI Content Generator Tool', desc: 'OpenAI API, Next.js 14', time: 'Yesterday' }
            ]
        },
        {
            title: 'Active', cards: [
                { title: 'Web3 Wallet Integration', desc: 'Metamask, Wagmi, React', time: 'Ends in 2d', priority: true }
            ]
        },
        { title: 'Completed', cards: [] }
    ];

    return (
        <Layout>
            <Header title="Freelance Work" />
            <div className="flex-1 overflow-x-auto pb-8">
                <div className="flex h-full px-8 py-6 gap-2 items-start justify-start">
                    {columns.map((col, idx) => (
                        <div key={idx} className="kanban-column flex flex-col h-full mx-1">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">{col.title}</h3>
                            </div>
                            <div className="flex-1 space-y-3 overflow-y-auto px-2 flex flex-col">
                                {col.cards.length === 0 ? (
                                    <div className="flex-1 flex items-center justify-center">
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest italic">No items</p>
                                    </div>
                                ) : (
                                    col.cards.map((card, i) => (
                                        <div key={i} className={`bg-white dark:bg-[#1a202c] p-5 rounded-lg border shadow-sm ${card.priority ? 'border-primary/50' : 'border-slate-200 dark:border-border-dark'}`}>
                                            <h4 className="text-sm font-bold mb-1 leading-snug">{card.title}</h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{card.desc}</p>
                                            <span className={`text-[10px] uppercase tracking-wider ${card.priority ? 'text-blue-400 font-black' : 'text-slate-400'}`}>{card.time}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Freelance;

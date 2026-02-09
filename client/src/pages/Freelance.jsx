import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Modal from '../components/Modal';

const Freelance = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ title: '', status: 'PENDING', description: '', deadline: '', link: '' });

    const fetchItems = async () => {
        try {
            const res = await axios.get('/api/freelance');
            setItems(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleOpenCreate = () => {
        setEditingItem(null);
        setFormData({ title: '', status: 'PENDING', description: '', deadline: '', link: '' });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            status: item.status,
            description: item.description || '',
            deadline: item.deadline || '',
            link: item.link || ''
        });
        setIsModalOpen(true);
    };

    const handleSaveItem = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await axios.patch(`/api/freelance/${editingItem._id}`, formData);
            } else {
                await axios.post('/api/freelance', formData);
            }
            setIsModalOpen(false);
            setEditingItem(null);
            setFormData({ title: '', status: 'PENDING', description: '', deadline: '', link: '' });
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteItem = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`/api/freelance/${id}`);
                setIsModalOpen(false);
                fetchItems();
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

    const getColumnItems = (status) => items.filter(i => i.status === status);

    const columns = [
        { title: 'Applied', status: 'APPLIED', items: getColumnItems('APPLIED') },
        { title: 'Pending', status: 'PENDING', items: getColumnItems('PENDING') },
        { title: 'Active', status: 'ACTIVE', items: getColumnItems('ACTIVE') },
        { title: 'Completed', status: 'COMPLETED', items: getColumnItems('COMPLETED') }
    ];

    if (loading) return (
        <Layout>
            <div className="flex h-screen items-center justify-center">
                <p className="text-slate-400">Loading Freelance Board...</p>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <Header
                title="Freelance Work"
                rightElement={
                    <button
                        onClick={handleOpenCreate}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-colors"
                    >
                        <span className="material-symbols-outlined text-base">add</span>
                        <span>New Task</span>
                    </button>
                }
            />
            <div className="flex-1 overflow-x-auto pb-8">
                <div className="flex h-full px-8 py-6 gap-2 items-start justify-start min-w-[1000px]">
                    {columns.map((col, idx) => (
                        <div key={idx} className="kanban-column flex flex-col h-full mx-1 w-[280px]">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">{col.title} ({col.items.length})</h3>
                            </div>
                            <div className="flex-1 space-y-3 overflow-y-auto px-2 flex flex-col">
                                {col.items.length === 0 ? (
                                    <div className="flex-1 flex items-center justify-center min-h-[100px] border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest italic">No items</p>
                                    </div>
                                ) : (
                                    col.items.map((card) => (
                                        <div
                                            key={card._id}
                                            onClick={() => handleCardClick(card.link)}
                                            className={`group relative bg-white dark:bg-card-dark p-5 rounded-lg border shadow-sm ${col.status === 'ACTIVE' ? 'border-primary/50' : 'border-slate-200 dark:border-border-dark'} ${card.link ? 'cursor-pointer hover:shadow-md' : ''}`}
                                        >
                                            <div className="absolute top-2 right-2 flex gap-1 z-10">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleOpenEdit(card); }}
                                                    className="text-slate-400 hover:text-blue-500 text-[10px] p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <span className="material-symbols-outlined text-sm">edit</span>
                                                </button>
                                            </div>
                                            <h4 className="text-sm font-bold mb-1 leading-snug pr-6">{card.title}</h4>
                                            {card.link && (
                                                <div className="flex items-center gap-1 text-[10px] text-primary mb-2 opacity-80">
                                                    <span className="material-symbols-outlined text-[12px]">link</span>
                                                    <span className="truncate max-w-[200px]">{card.link}</span>
                                                </div>
                                            )}
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{card.description}</p>
                                            {card.deadline && <span className={`text-[10px] uppercase tracking-wider ${col.status === 'ACTIVE' ? 'text-blue-400 font-black' : 'text-slate-400'}`}>{card.deadline}</span>}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingItem ? "Edit Task" : "Add Freelance Task"}
            >
                <form onSubmit={handleSaveItem} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Client Website"
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
                            <option value="APPLIED">Applied</option>
                            <option value="PENDING">Pending</option>
                            <option value="ACTIVE">Active</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                        <textarea
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            rows="3"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Brief details..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Deadline / Time</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.deadline}
                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                            placeholder="e.g., 2 weeks"
                        />
                    </div>
                    <div className="pt-4 flex items-center justify-between">
                        {editingItem && (
                            <button
                                type="button"
                                onClick={() => handleDeleteItem(editingItem._id)}
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
                                {editingItem ? "Save Changes" : "Add Task"}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};
export default Freelance;

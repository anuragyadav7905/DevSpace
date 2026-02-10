import { useState, useContext } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
    const { user } = useContext(AuthContext);
    const [confirmDelete, setConfirmDelete] = useState(true);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        try {
            const response = await axios.get('/api/export', {
                responseType: 'blob', // Important for handling binary/text files
            });

            // Create a blob URL and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `devspace_backup_${new Date().toISOString().split('T')[0]}.json`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            console.error("Error downloading backup:", err);
            alert("Failed to download backup. Please try again.");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <Layout>
            <Header title="Settings" rightElement={<div />} />
            <div className="flex-1 overflow-y-auto p-8 max-w-2xl">
                <div className="space-y-8">
                    <section>
                        <h3 className="text-lg font-bold mb-4">Account</h3>
                        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-4">
                            <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                                <img
                                    className="w-full h-full object-cover"
                                    src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=random"}
                                    alt="User profile"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{user?.displayName || "User"}</p>
                                <p className="text-xs text-slate-500">{user?.email || "No email"}</p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h3 className="text-lg font-bold mb-4">Preferences</h3>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="confirmDelete"
                                checked={confirmDelete}
                                onChange={() => setConfirmDelete(!confirmDelete)}
                                className="rounded border-slate-300 text-primary focus:ring-primary size-4"
                            />
                            <label htmlFor="confirmDelete" className="text-sm font-medium">Confirm before delete</label>
                        </div>
                    </section>
                    <section>
                        <h3 className="text-lg font-bold mb-4">Export Workspace</h3>
                        <button
                            onClick={handleDownload}
                            disabled={downloading}
                            className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {downloading ? (
                                <>
                                    <span className="size-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
                                    <span>Downloading...</span>
                                </>
                            ) : (
                                "Download JSON Backup"
                            )}
                        </button>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;

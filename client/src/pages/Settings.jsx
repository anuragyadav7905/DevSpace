import { useState } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';

const Settings = () => {
    const [confirmDelete, setConfirmDelete] = useState(true);

    return (
        <Layout>
            <Header title="Settings" rightElement={<div />} />
            <div className="flex-1 overflow-y-auto p-8 max-w-2xl">
                <div className="space-y-8">
                    <section>
                        <h3 className="text-lg font-bold mb-4">Account</h3>
                        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                            <p className="text-sm font-semibold">Alex Rivera</p>
                            <p className="text-xs text-slate-500">Private Workspace Owner</p>
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
                        <button className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Download JSON Backup</button>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;

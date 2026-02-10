import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Header = ({ title, rightElement }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-4 flex-1">
                <h2 className="text-lg font-bold">{title || 'Workspace'}</h2>
            </div>
            <div className="flex items-center gap-4">
                {rightElement || (
                    <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-opacity">
                        <span className="material-symbols-outlined text-lg">add</span>
                        Add Entry
                    </button>
                )}
                {user && (
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-sm font-medium"
                    >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        <span>Logout</span>
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Header = ({ title, rightElement }) => {
    const { user } = useContext(AuthContext);

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
                    <div className="flex items-center gap-3 pl-4 border-l border-slate-700/50">
                        <div className="text-right hidden md:block">
                            <div className="text-sm font-medium text-white">{user.displayName}</div>
                            <div className="text-xs text-slate-400">Developer</div>
                        </div>
                        <img src={user.avatar} alt={user.displayName} className="w-9 h-9 rounded-full border border-slate-600" />
                        <a href="/api/logout" className="text-xs text-red-400 hover:text-red-300 ml-2">Logout</a>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

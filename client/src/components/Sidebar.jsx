import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', label: 'Dashboard', icon: 'dashboard' },
        { path: '/projects', label: 'Projects', icon: 'grid_view' },
        { path: '/freelance', label: 'Freelance', icon: 'view_kanban' },
        { path: '/jobs', label: 'Jobs', icon: 'work_history' },
        { path: '/settings', label: 'Settings', icon: 'settings' }
    ];

    return (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col shrink-0 h-full">
            <div className="p-6 flex items-center gap-3">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">terminal</span>
                </div>
                <h1 className="font-bold text-lg tracking-tight">DevSpace</h1>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                {navItems.map(item => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer text-sm font-medium ${isActive(item.path)
                            ? 'bg-primary/10 text-primary'
                            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-3 px-3 py-4">
                    <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=random"}
                            alt="User profile"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold truncate max-w-[140px]">{user?.displayName || "Loading..."}</span>
                        <span className="text-xs text-slate-500">Workspace Owner</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

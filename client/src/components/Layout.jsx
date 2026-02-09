import Sidebar from './Sidebar';

const Layout = ({ children, noSidebar = false }) => {
    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            {!noSidebar && <Sidebar />}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {children}
            </main>
        </div>
    );
};

export default Layout;

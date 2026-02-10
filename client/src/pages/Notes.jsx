import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import { Bold, Italic, List, Code, Link, Image, Monitor, FileText, Check } from 'lucide-react';

const Notes = () => {
    const { user } = useContext(AuthContext);
    const [notes, setNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const textareaRef = useRef(null);

    // Initialize notes from user when available
    useEffect(() => {
        if (user && user.notes !== undefined) {
            setNotes(user.notes);
        }
    }, [user]);

    // Update word count
    useEffect(() => {
        const words = notes.trim().split(/\s+/).filter(word => word.length > 0).length;
        setWordCount(words);
    }, [notes]);

    // Auto-save notes logic
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (user && notes !== user.notes) {
                setIsSaving(true);
                try {
                    await axios.put('/api/notes', { notes });
                    // Optimistically update the user object in context if possible, 
                    // or just rely on the component state which is the source of truth here.
                } catch (err) {
                    console.error("Failed to save notes", err);
                } finally {
                    setIsSaving(false);
                }
            }
        }, 1000); // Debounce 1s

        return () => clearTimeout(timeoutId);
    }, [notes, user]);

    // Basic editor toolbar actions (insert text)
    const insertText = (before, after = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = notes.substring(start, end);

        const newText = notes.substring(0, start) + before + selectedText + after + notes.substring(end);
        setNotes(newText);

        // Restore focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 0);
    };

    return (
        <Layout>
            <Header
                title={
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Notes</span>
                        <span className="text-slate-300">/</span>
                        <span className="font-semibold text-slate-900 dark:text-white">Personal Notes</span>
                    </div>
                }
                rightElement={
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                            {isSaving ? 'SAVING...' : 'AUTOSAVED'}
                        </span>
                    </div>
                }
            />

            <div className="flex-1 flex flex-col h-full bg-[#1e1e1e] relative">
                {/* Toolbar */}
                <div className="h-12 border-b border-[#2d2d2d] bg-[#1a1a1a] flex items-center justify-center gap-1 px-4 shrink-0">
                    <button onClick={() => insertText('**', '**')} className="p-2 text-slate-400 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors" title="Bold">
                        <Bold size={16} />
                    </button>
                    <button onClick={() => insertText('*', '*')} className="p-2 text-slate-400 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors" title="Italic">
                        <Italic size={16} />
                    </button>
                    <div className="w-px h-4 bg-[#2d2d2d] mx-2" />
                    <button onClick={() => insertText('- ')} className="p-2 text-slate-400 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors" title="List">
                        <List size={16} />
                    </button>
                    <button onClick={() => insertText('```\n', '\n```')} className="p-2 text-slate-400 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors" title="Code Block">
                        <Code size={16} />
                    </button>
                    <div className="w-px h-4 bg-[#2d2d2d] mx-2" />
                    <button onClick={() => insertText('[', '](url)')} className="p-2 text-slate-400 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors" title="Link">
                        <Link size={16} />
                    </button>
                    <button onClick={() => insertText('![alt](', ')')} className="p-2 text-slate-400 hover:text-white hover:bg-[#2d2d2d] rounded transition-colors" title="Image">
                        <Image size={16} />
                    </button>
                </div>

                {/* Editor Area */}
                <div className="flex-1 overflow-hidden relative group">
                    <textarea
                        ref={textareaRef}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Start typing your notes here..."
                        className="w-full h-full bg-[#0d1117] text-slate-300 p-8 resize-none outline-none font-mono text-sm leading-relaxed"
                        style={{ fontFamily: '"Fira Code", monospace' }}
                        spellCheck="false"
                    />
                </div>

                {/* Footer */}
                <div className="h-8 border-t border-[#2d2d2d] bg-[#1a1a1a] flex items-center justify-between px-4 text-[10px] text-slate-500 shrink-0 select-none">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 hover:text-slate-300 cursor-pointer">
                            <FileText size={12} />
                            <span>Markdown</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Check size={12} />
                            <span>{wordCount} words</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 hover:text-slate-300 cursor-pointer">
                            <Monitor size={12} />
                            <span>Preview</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Notes;

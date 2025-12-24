import { Download, Upload, Trash2 } from 'lucide-react';

export function StorageControls() {
    const handleExport = () => {
        const data: Record<string, string> = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith('action-') || key.startsWith('struggle-'))) {
                data[key] = localStorage.getItem(key) || '';
            }
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `execution-plan-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string);
                Object.entries(data).forEach(([key, value]) => {
                    localStorage.setItem(key, value as string);
                });
                window.location.reload();
            } catch (err) {
                alert('Invalid backup file');
            }
        };
        reader.readAsText(file);
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && (key.startsWith('action-') || key.startsWith('struggle-'))) {
                    localStorage.removeItem(key);
                }
            }
            window.location.reload();
        }
    };

    return (
        <div className="flex items-center gap-1 md:gap-2">
            <button
                onClick={handleExport}
                className="flex items-center gap-2 px-2 md:px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-700 transition-colors text-xs font-bold shadow-sm"
                title="Backup Progress"
            >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Backup</span>
            </button>

            <label className="flex items-center gap-2 px-2 md:px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-700 transition-colors text-xs font-bold cursor-pointer shadow-sm" title="Restore Progress">
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Restore</span>
                <input type="file" className="hidden" accept=".json" onChange={handleImport} />
            </label>

            <button
                onClick={handleReset}
                className="flex items-center justify-center p-1.5 md:p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md border border-red-200 dark:border-red-500/20 transition-colors"
                title="Reset Progress"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}

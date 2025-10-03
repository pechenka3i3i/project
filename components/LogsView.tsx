
import React, { useState, useMemo } from 'react';
import type { LogEntry } from '../types';
import { LogLevel } from '../types';

const mockLogs: LogEntry[] = [
    { id: 1, timestamp: '2023-10-26 10:05:15', level: LogLevel.Info, message: 'User admin@caseflow.com logged in successfully.', context: 'Auth' },
    { id: 2, timestamp: '2023-10-26 10:04:30', level: LogLevel.Debug, message: 'Running cron job for nightly backups.', context: 'System' },
    { id: 3, timestamp: '2023-10-26 10:02:01', level: LogLevel.Warning, message: 'Database connection pool nearing limit.', context: 'Database' },
    { id: 4, timestamp: '2023-10-26 09:58:45', level: LogLevel.Error, message: 'Failed to process questionnaire CFA-003: Missing document field.', context: 'Processor' },
    { id: 5, timestamp: '2023-10-26 09:45:10', level: LogLevel.Info, message: 'Questionnaire CFA-005 status updated to Approved.', context: 'Application' },
    { id: 6, timestamp: '2023-10-26 09:30:00', level: LogLevel.Info, message: 'User alice.j@caseflow.com logged in successfully.', context: 'Auth' },
];

const getLevelColor = (level: LogLevel) => {
    switch (level) {
        case LogLevel.Error: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        case LogLevel.Warning: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case LogLevel.Info: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case LogLevel.Debug: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        default: return '';
    }
};

const LogsView: React.FC = () => {
    const [levelFilter, setLevelFilter] = useState<LogLevel | 'all'>('all');

    const filteredLogs = useMemo(() => {
        if (levelFilter === 'all') return mockLogs;
        return mockLogs.filter(log => log.level === levelFilter);
    }, [levelFilter]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">System Logs</h2>
                <select 
                    value={levelFilter} 
                    onChange={e => setLevelFilter(e.target.value as LogLevel | 'all')}
                    className="py-2 px-4 text-gray-700 bg-gray-100 border border-transparent rounded-md dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="all">All Levels</option>
                    {Object.values(LogLevel).map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Timestamp</th>
                            <th scope="col" className="px-6 py-3">Level</th>
                            <th scope="col" className="px-6 py-3">Context</th>
                            <th scope="col" className="px-6 py-3">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.map(log => (
                            <tr key={log.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 whitespace-nowrap">{log.timestamp}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(log.level)}`}>{log.level}</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs">{log.context}</td>
                                <td className="px-6 py-4 font-mono text-xs">{log.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LogsView;

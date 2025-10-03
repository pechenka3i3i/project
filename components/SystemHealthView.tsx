
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const latencyData = [
  { time: '10:00', latency: 25 },
  { time: '10:05', latency: 30 },
  { time: '10:10', latency: 22 },
  { time: '10:15', latency: 45 },
  { time: '10:20', latency: 35 },
  { time: '10:25', latency: 28 },
];

const HealthMetric: React.FC<{ label: string, value: number, unit: string, color: string }> = ({ label, value, unit, color }) => {
    const width = `${value}%`;
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-base font-medium text-gray-700 dark:text-gray-300">{label}</span>
                <span className={`text-sm font-semibold ${color}`}>{value}{unit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width }}></div>
            </div>
        </div>
    );
};

const SystemHealthView: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">System Health Monitoring</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Live Metrics</h3>
                    <HealthMetric label="CPU Usage" value={34} unit="%" color="text-green-500" />
                    <HealthMetric label="Memory Usage" value={58} unit="%" color="text-yellow-500" />
                    <HealthMetric label="Disk Usage" value={76} unit="%" color="text-red-500" />
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md col-span-1 lg:col-span-2">
                     <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">API Latency (last 30 mins)</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={latencyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.2)" />
                            <XAxis dataKey="time" tick={{ fill: '#9ca3af' }}/>
                            <YAxis unit="ms" tick={{ fill: '#9ca3af' }}/>
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                    borderColor: '#4b5563',
                                    color: '#ffffff',
                                }}
                            />
                            <Line type="monotone" dataKey="latency" stroke="#8884d8" strokeWidth={2} dot={false} name="Latency (ms)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Service Status</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Telegram Bot API</span>
                        <span className="text-sm font-semibold text-green-500">Operational</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Admin Panel</span>
                        <span className="text-sm font-semibold text-green-500">Operational</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Database Connection</span>
                        <span className="text-sm font-semibold text-green-500">Healthy</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Logging Service</span>
                        <span className="text-sm font-semibold text-yellow-500">Degraded Performance</span>
                    </div>
                </div>
             </div>
        </div>
    );
};

export default SystemHealthView;

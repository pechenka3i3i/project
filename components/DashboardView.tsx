
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Card from './Card';
import { QuestionnaireIcon } from './icons/QuestionnaireIcon';
import { UsersIcon } from './icons/UsersIcon';
import { LogsIcon } from './icons/LogsIcon';

const questionnaireData = [
  { name: 'Jan', new: 40, approved: 24, rejected: 5 },
  { name: 'Feb', new: 30, approved: 13, rejected: 3 },
  { name: 'Mar', new: 50, approved: 38, rejected: 8 },
  { name: 'Apr', new: 27, approved: 29, rejected: 4 },
  { name: 'May', new: 48, approved: 30, rejected: 6 },
  { name: 'Jun', new: 34, approved: 23, rejected: 2 },
];

const processingTimeData = [
    { name: 'Day 1', time: 4.2 },
    { name: 'Day 2', time: 3.1 },
    { name: 'Day 3', time: 5.5 },
    { name: 'Day 4', time: 4.8 },
    { name: 'Day 5', time: 4.1 },
    { name: 'Day 6', time: 6.2 },
    { name: 'Day 7', time: 5.3 },
];

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="New Questionnaires (Month)" value="152" change="+12.5%" changeType="increase" icon={<QuestionnaireIcon className="text-blue-500" />} />
        <Card title="Active Users" value="89" change="-1.2%" changeType="decrease" icon={<UsersIcon className="text-blue-500" />} />
        <Card title="System Errors (24h)" value="3" change="+2" changeType="increase" icon={<LogsIcon className="text-blue-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Questionnaire Submissions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={questionnaireData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.2)" />
              <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
              <YAxis tick={{ fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  borderColor: '#4b5563',
                  color: '#ffffff',
                }}
              />
              <Legend />
              <Bar dataKey="new" fill="#3b82f6" name="New" />
              <Bar dataKey="approved" fill="#10b981" name="Approved" />
              <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Average Processing Time (Hours)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={processingTimeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis dataKey="name" tick={{ fill: '#9ca3af' }}/>
                <YAxis tick={{ fill: '#9ca3af' }}/>
                <Tooltip 
                 contentStyle={{
                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                    borderColor: '#4b5563',
                    color: '#ffffff',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="time" stroke="#8884d8" strokeWidth={2} name="Avg Time (h)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

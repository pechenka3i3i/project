
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, change, changeType, icon }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-4 transition-transform transform hover:scale-105">
      <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {change && (
          <p className={`text-xs ${changeColor}`}>
            {changeType === 'increase' ? '▲' : '▼'} {change}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;

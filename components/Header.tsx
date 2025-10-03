
import React from 'react';
import { LogoutIcon } from './icons/LogoutIcon';
import { SearchIcon } from './icons/SearchIcon';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
         <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard Overview</h1>
      </div>
      <div className="flex items-center">
        <div className="relative mr-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
            </span>
            <input 
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
            />
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://picsum.photos/100"
            alt="User Avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800 dark:text-white">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">admin@caseflow.com</p>
          </div>
          <button className="ml-6 p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
            <LogoutIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

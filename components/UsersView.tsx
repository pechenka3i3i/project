
import React from 'react';
import type { User } from '../types';

const mockUsers: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@caseflow.com', role: 'Admin', lastLogin: '2023-10-26 10:00 AM', avatarUrl: 'https://picsum.photos/id/1005/100' },
  { id: 2, name: 'Alice Johnson', email: 'alice.j@caseflow.com', role: 'Manager', lastLogin: '2023-10-26 09:30 AM', avatarUrl: 'https://picsum.photos/id/1011/100' },
  { id: 3, name: 'Bob Williams', email: 'bob.w@caseflow.com', role: 'Manager', lastLogin: '2023-10-25 04:15 PM', avatarUrl: 'https://picsum.photos/id/1012/100' },
  { id: 4, name: 'Charlie Brown', email: 'charlie.b@caseflow.com', role: 'User', lastLogin: '2023-10-24 11:00 AM', avatarUrl: 'https://picsum.photos/id/1013/100' },
];


const UsersView: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">User Management</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add User</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">User</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Last Login</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockUsers.map(user => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <img className="w-10 h-10 rounded-full" src={user.avatarUrl} alt={user.name} />
                                        <div className="pl-3">
                                            <div className="text-base font-semibold text-gray-900 dark:text-white">{user.name}</div>
                                            <div className="font-normal text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">{user.lastLogin}</td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    <a href="#" className="ml-4 font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersView;

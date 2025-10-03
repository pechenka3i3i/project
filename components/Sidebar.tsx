
import React from 'react';
import type { View } from '../types';
import { DashboardIcon } from './icons/DashboardIcon';
import { QuestionnaireIcon } from './icons/QuestionnaireIcon';
import { UsersIcon } from './icons/UsersIcon';
import { LogsIcon } from './icons/LogsIcon';
import { HealthIcon } from './icons/HealthIcon';
import { SettingsIcon } from './icons/SettingsIcon';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  viewName: View;
  label: string;
  currentView: View;
  setCurrentView: (view: View) => void;
  children: React.ReactNode;
}> = ({ viewName, label, currentView, setCurrentView, children }) => {
  const isActive = currentView === viewName;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setCurrentView(viewName);
      }}
      className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-blue-600 text-white' : ''
      }`}
    >
      {children}
      <span className="mx-4 font-medium">{label}</span>
    </a>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white h-full shadow-lg">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">CaseFlow</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <NavItem viewName="dashboard" label="Dashboard" currentView={currentView} setCurrentView={setCurrentView}>
          <DashboardIcon />
        </NavItem>
        <NavItem viewName="questionnaires" label="Questionnaires" currentView={currentView} setCurrentView={setCurrentView}>
          <QuestionnaireIcon />
        </NavItem>
        <NavItem viewName="users" label="Users" currentView={currentView} setCurrentView={setCurrentView}>
          <UsersIcon />
        </NavItem>
        <NavItem viewName="logs" label="System Logs" currentView={currentView} setCurrentView={setCurrentView}>
          <LogsIcon />
        </NavItem>
        <NavItem viewName="health" label="System Health" currentView={currentView} setCurrentView={setCurrentView}>
          <HealthIcon />
        </NavItem>
        <div className="border-t border-gray-700 my-4"></div>
        <NavItem viewName="settings" label="Settings" currentView={currentView} setCurrentView={setCurrentView}>
            <SettingsIcon />
        </NavItem>
      </nav>
    </div>
  );
};

export default Sidebar;

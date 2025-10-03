
export type View = 'dashboard' | 'questionnaires' | 'users' | 'logs' | 'health' | 'settings';

export enum QuestionnaireStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  InReview = 'In Review',
}

export interface Questionnaire {
  id: string;
  fullName: string;
  submissionDate: string;
  status: QuestionnaireStatus;
  caseManager: string;
  summary: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'User';
  lastLogin: string;
  avatarUrl: string;
}

export enum LogLevel {
    Info = 'INFO',
    Warning = 'WARNING',
    Error = 'ERROR',
    Debug = 'DEBUG',
}

export interface LogEntry {
    id: number;
    timestamp: string;
    level: LogLevel;
    message: string;
    context: string;
}

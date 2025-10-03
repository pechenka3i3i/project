
import React, { useState, useMemo } from 'react';
import type { Questionnaire } from '../types';
import { QuestionnaireStatus } from '../types';
import { analyzeQuestionnaireWithGemini } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { SearchIcon } from './icons/SearchIcon';

const mockQuestionnaires: Questionnaire[] = [
  { id: 'CFA-001', fullName: 'John Doe', submissionDate: '2023-10-26', status: QuestionnaireStatus.Approved, caseManager: 'Alice Johnson', summary: 'Standard personal bankruptcy case. Assets include a primary residence and two vehicles. Liabilities consist of credit card debt and a personal loan.' },
  { id: 'CFA-002', fullName: 'Jane Smith', submissionDate: '2023-10-25', status: QuestionnaireStatus.InReview, caseManager: 'Bob Williams', summary: 'Complex business bankruptcy involving multiple creditors and international assets. Requires detailed review of financial statements.' },
  { id: 'CFA-003', fullName: 'Peter Jones', submissionDate: '2023-10-24', status: QuestionnaireStatus.Rejected, caseManager: 'Alice Johnson', summary: 'Application rejected due to incomplete documentation and missing asset declarations. Applicant has been notified to resubmit.' },
  { id: 'CFA-004', fullName: 'Mary Miller', submissionDate: '2023-10-23', status: QuestionnaireStatus.Pending, caseManager: 'Unassigned', summary: 'New submission pending initial review and assignment to a case manager. Appears to be a straightforward Chapter 7 filing.' },
  { id: 'CFA-005', fullName: 'David Wilson', submissionDate: '2023-10-22', status: QuestionnaireStatus.Approved, caseManager: 'Charlie Brown', summary: 'Successfully discharged. Case involved wage garnishment which has now ceased. All creditor claims have been settled.' },
];

const getStatusColor = (status: QuestionnaireStatus) => {
  switch (status) {
    case QuestionnaireStatus.Approved: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case QuestionnaireStatus.InReview: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case QuestionnaireStatus.Rejected: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case QuestionnaireStatus.Pending: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    default: return 'bg-gray-200 text-gray-800';
  }
};

const AIAnalysisModal: React.FC<{
    analysisResult: string;
    isLoading: boolean;
    onClose: () => void;
}> = ({ analysisResult, isLoading, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                        <SparklesIcon className="text-blue-500 mr-2" />
                        AI Analysis Result
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">&times;</button>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-mono text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                        {analysisResult}
                    </div>
                )}
                 <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Close</button>
                </div>
            </div>
        </div>
    );
};

const QuestionnairesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<QuestionnaireStatus | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  const filteredQuestionnaires = useMemo(() => {
    return mockQuestionnaires
      .filter(q => statusFilter === 'all' || q.status === statusFilter)
      .filter(q =>
        q.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.caseManager.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, statusFilter]);
  
  const handleAnalyze = async (questionnaire: Questionnaire) => {
    setIsModalOpen(true);
    setIsLoadingAnalysis(true);
    setAnalysisResult('');
    const result = await analyzeQuestionnaireWithGemini(questionnaire);
    setAnalysisResult(result);
    setIsLoadingAnalysis(false);
  };


  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Questionnaires</h2>
      
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-1/3">
           <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
            </span>
          <input
            type="text"
            placeholder="Search by name, ID, or manager..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-md dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as QuestionnaireStatus | 'all')}
          className="py-2 px-4 text-gray-700 bg-gray-100 border border-transparent rounded-md dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          {Object.values(QuestionnaireStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Case ID</th>
              <th scope="col" className="px-6 py-3">Full Name</th>
              <th scope="col" className="px-6 py-3">Submission Date</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Case Manager</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestionnaires.map(q => (
              <tr key={q.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{q.id}</td>
                <td className="px-6 py-4">{q.fullName}</td>
                <td className="px-6 py-4">{q.submissionDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(q.status)}`}>
                    {q.status}
                  </span>
                </td>
                <td className="px-6 py-4">{q.caseManager}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleAnalyze(q)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"
                  >
                    <SparklesIcon className="mr-1" />
                    AI Analyze
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <AIAnalysisModal analysisResult={analysisResult} isLoading={isLoadingAnalysis} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default QuestionnairesView;

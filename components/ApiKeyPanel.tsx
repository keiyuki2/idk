
import React from 'react';
import { Settings } from '../types';
import { KeyIcon } from './icons';

interface ProcessingPanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  onClose: () => void;
}

const ProcessingPanel: React.FC<ProcessingPanelProps> = ({ settings, setSettings, onClose }) => {
  
  const handleValueChange = <K extends keyof Settings,>(key: K, value: Settings[K]) => {
     setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg flex flex-col h-full shadow-xl">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Processing Settings</h2>
      </div>

      <div className="p-6 space-y-6 flex-grow overflow-y-auto">
        <div>
          <label htmlFor="processingMode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Processing Mode</label>
          <select id="processingMode" value={settings.processingMode} onChange={(e) => handleValueChange('processingMode', e.target.value as Settings['processingMode'])} className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 p-2">
            <option value="api">High-Accuracy (API)</option>
            <option value="local" disabled>Private (Local - Coming Soon)</option>
            <option value="realtime" disabled>Real-time (Live - Coming Soon)</option>
          </select>
        </div>

        {settings.processingMode === 'api' && (
          <div className="space-y-6">
            <div>
              <label htmlFor="apiProvider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">API Provider</label>
              <select id="apiProvider" value={settings.apiProvider} onChange={(e) => handleValueChange('apiProvider', e.target.value as Settings['apiProvider'])} className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 p-2">
                <option value="google">Google Gemini</option>
                <option value="openai" disabled>OpenAI Whisper (Coming Soon)</option>
                <option value="assemblyai" disabled>AssemblyAI (Coming Soon)</option>
              </select>
            </div>
            
            <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">API Key ({settings.apiProvider})</label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <KeyIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="password"
                        id="apiKey"
                        value={settings.apiKey}
                        onChange={(e) => handleValueChange('apiKey', e.target.value)}
                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 p-2 pl-10"
                        placeholder="Enter your API Key"
                    />
                </div>
            </div>
          </div>
        )}

        <div>
            <label htmlFor="sourceLanguage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source Language</label>
            <select id="sourceLanguage" value={settings.sourceLanguage} onChange={(e) => handleValueChange('sourceLanguage', e.target.value)} className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 p-2">
                <option value="en-US">English</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                <option value="ja-JP">Japanese</option>
                <option value="mn-MN">Mongolian</option>
            </select>
        </div>

      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center">
        <button onClick={onClose} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors w-full">Done</button>
      </div>
    </div>
  );
};

export default ProcessingPanel;

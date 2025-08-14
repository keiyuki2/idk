
import React from 'react';
import { Settings } from '../types';
import ToggleSwitch from './ToggleSwitch';

interface TranslationPanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  onClose: () => void;
}

const TranslationPanel: React.FC<TranslationPanelProps> = ({ settings, setSettings, onClose }) => {
  
  const handleValueChange = <K extends keyof Settings,>(key: K, value: Settings[K]) => {
     setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg flex flex-col h-full shadow-xl">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Translation Settings</h2>
      </div>

      <div className="p-6 space-y-6 flex-grow overflow-y-auto">
        <div className="flex justify-between items-center">
            <label htmlFor="translationEnabled" className="block text-sm font-medium text-gray-700 dark:text-gray-300 m-0">Enable Translation</label>
            <ToggleSwitch
                isToggled={settings.translationEnabled}
                onToggle={() => handleValueChange('translationEnabled', !settings.translationEnabled)}
            />
        </div>

        {settings.translationEnabled && (
          <div className="space-y-6">
            <div>
              <label htmlFor="translationLanguage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Translate To</label>
              <select id="translationLanguage" value={settings.translationLanguage} onChange={(e) => handleValueChange('translationLanguage', e.target.value)} className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 p-2">
                <option value="mn">Mongolian</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
                <option value="ru">Russian</option>
                <option value="zh">Chinese</option>
                <option value="en">English</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="translationProvider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Translation Service</label>
              <select id="translationProvider" value={settings.translationProvider} onChange={(e) => handleValueChange('translationProvider', e.target.value as Settings['translationProvider'])} className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 p-2">
                <option value="google">Google Translate (via Gemini)</option>
                <option value="deepl" disabled>DeepL (Coming Soon)</option>
              </select>
            </div>
          </div>
        )}
        
        {!settings.translationEnabled && (
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-8">
                <p>Translation is currently turned off.</p>
                <p>Enable it to translate subtitles into your chosen language.</p>
            </div>
        )}

      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center">
        <button onClick={onClose} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors w-full">Done</button>
      </div>
    </div>
  );
};

export default TranslationPanel;

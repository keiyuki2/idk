
import React from 'react';
import { Settings } from '../types';
import ToggleSwitch from './ToggleSwitch';
import { BoldIcon, ItalicIcon } from './icons';

interface AppearancePanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  onClose: () => void;
}

const AppearancePanel: React.FC<AppearancePanelProps> = ({ settings, setSettings, onClose }) => {
  
  const handleValueChange = <K extends keyof Settings,>(key: K, value: Settings[K]) => {
     setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const toggleTheme = () => handleValueChange('isDarkMode', !settings.isDarkMode);

  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg flex flex-col h-full shadow-xl">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Appearance</h2>
        <ToggleSwitch isToggled={settings.isDarkMode} onToggle={toggleTheme} />
      </div>

      <div className="p-6 space-y-6 flex-grow overflow-y-auto">
        {/* Font Family */}
        <div>
          <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Family</label>
          <select id="fontFamily" value={settings.fontFamily} onChange={(e) => handleValueChange('fontFamily', e.target.value as Settings['fontFamily'])} className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 p-2">
            <option value="sans">Sans-Serif (Default)</option>
            <option value="serif">Serif (Book-style)</option>
            <option value="mono">Monospace (Code-style)</option>
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Size</label>
          <div className="flex items-center gap-4">
              <input
                  type="range"
                  id="fontSize"
                  min="12" max="36" step="1"
                  value={settings.fontSize}
                  onChange={(e) => handleValueChange('fontSize', parseInt(e.target.value, 10))}
                  className="flex-grow"
              />
              <span className="font-semibold text-sm w-10 text-center">{settings.fontSize}px</span>
          </div>
        </div>
        
        {/* Font Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Style</label>
          <div className="flex items-center gap-2">
            <button onClick={() => handleValueChange('isBold', !settings.isBold)} className={`p-2 rounded-md transition-colors border ${settings.isBold ? 'bg-blue-500 text-white border-blue-500' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                <BoldIcon />
            </button>
            <button onClick={() => handleValueChange('isItalic', !settings.isItalic)} className={`p-2 rounded-md transition-colors border ${settings.isItalic ? 'bg-blue-500 text-white border-blue-500' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                <ItalicIcon />
            </button>
          </div>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Text Color</label>
          <label htmlFor="boxColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Box Color</label>
          <input type="color" id="textColor" value={settings.textColor} onChange={(e) => handleValueChange('textColor', e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600" />
          <input type="color" id="boxColor" value={settings.boxColor} onChange={(e) => handleValueChange('boxColor', e.target.value)} className="w-full h-10 p-1 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600" />
        </div>

        {/* Box Opacity */}
        <div>
          <label htmlFor="boxOpacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Box Opacity: <span className="font-bold">{Math.round(settings.boxOpacity * 100)}%</span></label>
          <input type="range" id="boxOpacity" min="0" max="1" step="0.05" value={settings.boxOpacity} onChange={(e) => handleValueChange('boxOpacity', parseFloat(e.target.value))} />
        </div>

        {/* Text Shadow */}
        <div>
          <label htmlFor="textShadow" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text Outline/Shadow</label>
          <select id="textShadow" value={settings.textShadow} onChange={(e) => handleValueChange('textShadow', e.target.value as Settings['textShadow'])} className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 p-2">
            <option value="none">None</option>
            <option value="subtle">Subtle Shadow</option>
            <option value="outline">Sharp Outline</option>
          </select>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center">
        <button onClick={onClose} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors w-full">Done</button>
      </div>
    </div>
  );
};

export default AppearancePanel;

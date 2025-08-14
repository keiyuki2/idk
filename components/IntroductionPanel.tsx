
import React from 'react';
import { CpuChipIcon, SettingsIcon, PlayCircleIcon, ArrowsPointingOutIcon, BookmarkIcon } from './icons';

const IntroductionPanel: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-center">User Guide</h3>
      </div>
      <div className="p-6 space-y-5 text-gray-700 dark:text-gray-300 text-sm flex-grow overflow-y-auto">
        
        <div>
            <h4 className="font-bold text-base text-gray-800 dark:text-gray-100 mb-2">Getting Started</h4>
            <ul className="list-none space-y-3 mt-3">
                <li className="flex items-start gap-3">
                    <CpuChipIcon className="w-6 h-6 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>Go to <strong>Processing</strong> and enter your Google Gemini API key to enable transcription.</span>
                </li>
                <li className="flex items-start gap-3">
                    <PlayCircleIcon className="w-6 h-6 mt-0.5 text-red-500 flex-shrink-0" />
                    <span>Click <strong>Start Live</strong> to begin real-time subtitles or <strong>Upload File</strong> to process a local file.</span>
                </li>
            </ul>
        </div>

        <div>
            <h4 className="font-bold text-base text-gray-800 dark:text-gray-100 mb-2">Pro-Tips</h4>
            <ul className="list-none space-y-3 mt-3">
                 <li className="flex items-start gap-3">
                    <SettingsIcon className="w-6 h-6 mt-0.5 text-purple-500 flex-shrink-0" />
                    <span>Customize subtitle style in <strong>Appearance</strong>, then save your look in <strong>Saved</strong> presets.</span>
                </li>
                <li className="flex items-start gap-3">
                    <ArrowsPointingOutIcon className="w-6 h-6 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Enter <strong>Position</strong> mode to drag and resize the subtitle box anywhere on the screen.</span>
                </li>
                 <li className="flex items-start gap-3">
                    <BookmarkIcon className="w-6 h-6 mt-0.5 text-yellow-500 flex-shrink-0" />
                    <span>After customizing a style you like, click the "Save Current Style" button to create a reusable preset.</span>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default IntroductionPanel;


import React from 'react';
import { SparklesIcon } from './icons';

const AboutMePanel: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-center">About the Creator</h3>
      </div>
      <div className="flex-grow flex flex-col justify-center items-center text-center p-6 space-y-4">
        <img src="https://avatar.iran.liara.run/public/boy?username=Tuvshinbold" alt="Avatar of Tuvshinbold" className="w-24 h-24 rounded-full border-4 border-blue-400/50 shadow-md" />
        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Presented by Tuvshinbold
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
            This extension was proudly developed by a 16-year-old with a passion for building helpful and creative tools for the web.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 pt-2">
            This project combines real-time AI transcription with a fully customizable UI to make web content more accessible for everyone.
        </p>
      </div>
    </div>
  );
};

export default AboutMePanel;

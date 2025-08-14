
import React from 'react';
import { DocumentTextIcon, ChatBubbleLeftRightIcon, ClockIcon } from './icons';

interface StatisticsPanelProps {
  text: string;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ text }) => {
  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = wordCount > 0 ? Math.max(1, Math.round(wordCount / 200)) : 0; // WPM, min 1 minute if words exist

  const statItems = [
    {
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-500" />,
      label: "Word Count",
      value: wordCount,
      unit: ""
    },
    {
      icon: <DocumentTextIcon className="w-8 h-8 text-green-500" />,
      label: "Character Count",
      value: charCount,
      unit: ""
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-purple-500" />,
      label: "Est. Reading Time",
      value: readingTime,
      unit: "min"
    }
  ];

  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-center">
          Text Statistics
        </h3>
      </div>
      <div className="flex-grow flex flex-col justify-center p-6 space-y-6">
        {statItems.map(item => (
          <div key={item.label} className="flex items-center gap-5 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">{item.label}</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {item.value}
                {item.unit && <span className="text-lg font-medium ml-1.5">{item.unit}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsPanel;


import React, { useState } from 'react';
import { SavedPreset, Settings } from '../types';
import { TrashIcon, ChevronDownIcon } from './icons';
import { PresetPreview, ExpandedDetails } from './PresetDetails';


const PresetItem: React.FC<{
    preset: SavedPreset;
    onUse: (preset: SavedPreset) => void;
    onDelete: (presetId: string) => void;
    isActive: boolean;
}> = ({ preset, onUse, onDelete, isActive }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
        <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg">
            <div className="p-3">
                <PresetPreview settings={preset.settings} />
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm truncate pr-2">{preset.name}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                            onClick={() => onDelete(preset.id)}
                            className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md transition-colors"
                            aria-label={`Delete preset ${preset.name}`}
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                        {isActive ? (
                            <button disabled className="bg-green-600 text-white font-semibold text-sm py-1 px-4 rounded-md cursor-default">
                                Equipped
                            </button>
                        ) : (
                            <button 
                                onClick={() => onUse(preset)} 
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-1 px-4 rounded-md transition-colors"
                            >
                                Use
                            </button>
                        )}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                            aria-label="Show details"
                        >
                            <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
             <div 
                className="overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
                style={{ maxHeight: isExpanded ? '300px' : '0px', opacity: isExpanded ? 1 : 0 }}
             >
                <ExpandedDetails settings={preset.settings} />
            </div>
        </div>
    );
};


interface SavedPresetsPanelProps {
  presets: SavedPreset[];
  onUse: (preset: SavedPreset) => void;
  onDelete: (presetId: string) => void;
  activePresetId: string | null;
  onClose: () => void;
}

const SavedPresetsPanel: React.FC<SavedPresetsPanelProps> = ({ presets, onUse, onDelete, activePresetId, onClose }) => {
  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg flex flex-col h-full shadow-xl">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Saved Presets</h2>
      </div>

      <div className="p-4 space-y-3 flex-grow overflow-y-auto">
        {presets.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            <p>You have no saved presets.</p>
            <p className="text-sm mt-2">Adjust your style and click the 'Save' button below to create one!</p>
          </div>
        ) : (
          presets.map((preset) => (
            <PresetItem
                key={preset.id}
                preset={preset}
                onUse={onUse}
                onDelete={onDelete}
                isActive={activePresetId === preset.id}
            />
          ))
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center gap-4">
        <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 font-semibold py-2 px-4 rounded-md transition-colors">Close</button>
      </div>
    </div>
  );
};

export default SavedPresetsPanel;

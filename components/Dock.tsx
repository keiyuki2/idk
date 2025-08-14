
import React, { forwardRef } from 'react';
import { UploadIcon, SparklesIcon, SettingsIcon, CpuChipIcon, LanguageIcon, BookmarkIcon, ArrowsPointingOutIcon, PlayCircleIcon, StopCircleIcon } from './icons';

interface DockProps {
  isGenerating: boolean;
  onGenerateClick: () => void;
  onProcessingClick: () => void;
  onTranslationClick: () => void;
  onAppearanceClick: () => void;
  onSavedClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPositioningClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onLiveClick: () => void;
  isLive: boolean;
  isPositioningMode: boolean;
  leftPanelVisible: boolean;

  processingButtonRef: React.RefObject<HTMLButtonElement>;
  translationButtonRef: React.RefObject<HTMLButtonElement>;
  appearanceButtonRef: React.RefObject<HTMLButtonElement>;
  savedButtonRef: React.RefObject<HTMLButtonElement>;
  positioningButtonRef: React.RefObject<HTMLButtonElement>;
  liveButtonRef: React.RefObject<HTMLButtonElement>;
}

const Dock = forwardRef<HTMLDivElement, DockProps>(({
  isGenerating,
  onGenerateClick,
  onProcessingClick,
  onTranslationClick,
  onAppearanceClick,
  onSavedClick,
  onPositioningClick,
  onLiveClick,
  isLive,
  isPositioningMode,
  leftPanelVisible,
  processingButtonRef,
  translationButtonRef,
  appearanceButtonRef,
  savedButtonRef,
  positioningButtonRef,
  liveButtonRef,
}, ref) => {
  const generateButton = {
    icon: isGenerating ? <SparklesIcon /> : <UploadIcon />,
    label: isGenerating ? "Generating..." : "Upload File",
    disabled: isGenerating || isLive || isPositioningMode || leftPanelVisible,
  };
  const liveButton = {
    icon: isLive ? <StopCircleIcon /> : <PlayCircleIcon />,
    label: isLive ? "Stop Live" : "Start Live",
    disabled: isGenerating || isPositioningMode || leftPanelVisible,
  };
  const settingsButtonsDisabled = isGenerating || isLive || isPositioningMode;
  const positioningButtonDisabled = isGenerating || isLive || leftPanelVisible;

  return (
    <div ref={ref} className="dock-panel">
      {/* Generate button */}
      <div className="group relative">
        <button
          onClick={onGenerateClick}
          disabled={generateButton.disabled}
          className="dock-item"
          aria-label={generateButton.label}
        >
          <div className="dock-icon">{generateButton.icon}</div>
        </button>
        <div className="dock-label opacity-0 group-hover:opacity-100 transition-opacity">
          {generateButton.label}
        </div>
      </div>
      
      {/* Processing button */}
      <div className="group relative">
        <button
          ref={processingButtonRef}
          onClick={onProcessingClick}
          disabled={settingsButtonsDisabled}
          className="dock-item"
          aria-label="Processing Settings"
        >
          <div className="dock-icon"><CpuChipIcon /></div>
        </button>
        <div className="dock-label opacity-0 group-hover:opacity-100 transition-opacity">
          Processing
        </div>
      </div>

      {/* Translation button */}
      <div className="group relative">
        <button
          ref={translationButtonRef}
          onClick={onTranslationClick}
          disabled={settingsButtonsDisabled}
          className="dock-item"
          aria-label="Translation Settings"
        >
          <div className="dock-icon"><LanguageIcon /></div>
        </button>
        <div className="dock-label opacity-0 group-hover:opacity-100 transition-opacity">
          Translation
        </div>
      </div>

      {/* Appearance button */}
      <div className="group relative">
        <button
          ref={appearanceButtonRef}
          onClick={onAppearanceClick}
          disabled={settingsButtonsDisabled}
          className="dock-item"
          aria-label="Appearance Settings"
        >
          <div className="dock-icon"><SettingsIcon /></div>
        </button>
        <div className="dock-label opacity-0 group-hover:opacity-100 transition-opacity">
          Appearance
        </div>
      </div>
      
      {/* Saved Presets button */}
      <div className="group relative">
        <button
          ref={savedButtonRef}
          onClick={onSavedClick}
          disabled={settingsButtonsDisabled}
          className="dock-item"
          aria-label="Saved Presets"
        >
          <div className="dock-icon"><BookmarkIcon /></div>
        </button>
        <div className="dock-label opacity-0 group-hover:opacity-100 transition-opacity">
          Saved
        </div>
      </div>
      
      <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 rounded-full mx-1"></div>

      {/* Positioning button */}
      <div className="group relative">
        <button
          ref={positioningButtonRef}
          onClick={onPositioningClick}
          disabled={positioningButtonDisabled}
          className={`dock-item ${isPositioningMode ? 'bg-blue-500/20' : ''}`}
          aria-label={isPositioningMode ? 'Finish Positioning' : 'Position Subtitles'}
        >
          <div className={`dock-icon ${isPositioningMode ? 'text-blue-400' : ''}`}><ArrowsPointingOutIcon /></div>
        </button>
        <div className="dock-label opacity-0 group-hover:opacity-100 transition-opacity">
          {isPositioningMode ? 'Done' : 'Position'}
        </div>
      </div>
      
      {/* Live Subtitle button */}
      <div className="group relative">
        <button
          ref={liveButtonRef}
          onClick={onLiveClick}
          disabled={liveButton.disabled}
          className="dock-item"
          aria-label={liveButton.label}
        >
          <div className={`dock-icon ${isLive ? 'text-red-500' : ''}`}>{liveButton.icon}</div>
        </button>
        <div className="dock-label opacity-0 group-hover:opacity-100 transition-opacity">
          {liveButton.label}
        </div>
      </div>
    </div>
  );
});

export default Dock;

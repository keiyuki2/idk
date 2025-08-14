
import React from 'react';
import { Settings, SavedPreset } from '../types';
import PreviewPanel from './PreviewPanel';
import IntroductionPanel from './IntroductionPanel';
import Dock from './Dock';
import AnimatedModalContainer from './AnimatedModalContainer';
import SettingsPanel from './SettingsPanel';
import ApiKeyPanel from './ApiKeyPanel';
import SettingsPopover from './SettingsPopover';
import SavedPresetsPanel from './SavedPresetsPanel';
import StatisticsPanel from './StatisticsPanel';
import AboutMePanel from './AboutMePanel';

interface ModalProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  isGenerating: boolean;
  generatedText: string;
  error: string | null;
  onGenerateClick: () => void;
  
  activeModal: 'none' | 'saved';
  originRect: DOMRect | null;
  onModalOpen: (modalType: 'saved', event: React.MouseEvent<HTMLButtonElement>) => void;
  onModalClose: () => void;

  leftPanelContent: 'about' | 'stats' | 'appearance' | 'translation' | 'processing';
  onSetLeftPanel: (contentType: 'appearance' | 'translation' | 'processing') => void;
  onCloseLeftPanel: () => void;

  savedPresets: SavedPreset[];
  onUsePreset: (preset: SavedPreset) => void;
  onDeletePreset: (presetId: string) => void;
  activePresetId: string | null;

  processingButtonRef: React.RefObject<HTMLButtonElement>;
  translationButtonRef: React.RefObject<HTMLButtonElement>;
  appearanceButtonRef: React.RefObject<HTMLButtonElement>;
  savedButtonRef: React.RefObject<HTMLButtonElement>;
  positioningButtonRef: React.RefObject<HTMLButtonElement>;
  liveButtonRef: React.RefObject<HTMLButtonElement>;

  onPositioningClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onLiveClick: () => void;
  isPositioningMode: boolean;
  isLive: boolean;

  leftPanelRef: React.RefObject<HTMLDivElement>;
  centerPanelRef: React.RefObject<HTMLDivElement>;
  rightPanelRef: React.RefObject<HTMLDivElement>;
  dockRef: React.RefObject<HTMLDivElement>;
}

const Modal: React.FC<ModalProps> = ({ 
  settings, 
  setSettings,
  isGenerating,
  generatedText,
  error,
  onGenerateClick,
  activeModal,
  originRect,
  onModalOpen,
  onModalClose,
  savedPresets,
  onUsePreset,
  onDeletePreset,
  activePresetId,
  processingButtonRef,
  translationButtonRef,
  appearanceButtonRef,
  savedButtonRef,
  positioningButtonRef,
  liveButtonRef,
  onPositioningClick,
  onLiveClick,
  isPositioningMode,
  isLive,
  leftPanelContent,
  onSetLeftPanel,
  onCloseLeftPanel,
  leftPanelRef,
  centerPanelRef,
  rightPanelRef,
  dockRef,
}) => {

  const renderLeftPanel = () => {
    switch (leftPanelContent) {
      case 'appearance':
        return <SettingsPanel settings={settings} setSettings={setSettings} onClose={onCloseLeftPanel} />;
      case 'translation':
        return <SettingsPopover settings={settings} setSettings={setSettings} onClose={onCloseLeftPanel} />;
      case 'processing':
        return <ApiKeyPanel settings={settings} setSettings={setSettings} onClose={onCloseLeftPanel} />;
      case 'stats':
        return <StatisticsPanel text={generatedText} />;
      case 'about':
      default:
        return <AboutMePanel />;
    }
  };
  
  const renderModalContent = () => {
    if (activeModal === 'saved') {
        return <SavedPresetsPanel 
            presets={savedPresets}
            onUse={onUsePreset}
            onDelete={onDeletePreset}
            activePresetId={activePresetId}
            onClose={onModalClose}
        />;
    }
    return null;
  }

  const mainContentVisible = !isPositioningMode;
  const isSettingsPanelOpen = ['appearance', 'translation', 'processing'].includes(leftPanelContent);

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <div className={`w-full transition-opacity duration-300 ${mainContentVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.75fr,1fr] items-center justify-center gap-6 w-full max-w-7xl mx-auto">
          <div ref={leftPanelRef} className="hidden lg:block">
            {renderLeftPanel()}
          </div>
          <div ref={centerPanelRef}>
            <PreviewPanel settings={settings} generatedText={generatedText} error={error}/>
          </div>
          <div ref={rightPanelRef} className="hidden lg:block">
            <IntroductionPanel />
          </div>
        </div>
      </div>
      
      {activeModal === 'saved' && originRect && (
        <AnimatedModalContainer originRect={originRect} onClose={onModalClose}>
          {renderModalContent()}
        </AnimatedModalContainer>
      )}

      <Dock 
        ref={dockRef}
        isGenerating={isGenerating} 
        onGenerateClick={onGenerateClick} 
        onSavedClick={(e) => onModalOpen('saved', e)}
        onProcessingClick={() => onSetLeftPanel('processing')}
        onTranslationClick={() => onSetLeftPanel('translation')}
        onAppearanceClick={() => onSetLeftPanel('appearance')}
        processingButtonRef={processingButtonRef}
        translationButtonRef={translationButtonRef}
        appearanceButtonRef={appearanceButtonRef}
        savedButtonRef={savedButtonRef}
        positioningButtonRef={positioningButtonRef}
        liveButtonRef={liveButtonRef}
        onPositioningClick={onPositioningClick}
        onLiveClick={onLiveClick}
        isPositioningMode={isPositioningMode}
        isLive={isLive}
        leftPanelVisible={isSettingsPanelOpen}
      />
    </div>
  );
};

export default Modal;

import React, { useState, useEffect, useRef } from 'react';
import { Settings, SavedPreset } from './types';
import Modal from './components/Modal';
import { GoogleSpeechToTextService } from './api/googleSpeechToText';
import { VoskSpeechToTextService } from './api/voskSpeechToText';
import { BookmarkIcon } from './components/icons';
import PositioningGuide from './components/PositioningGuide';
import LiveSubtitleBox from './components/LiveSubtitleBox';
import { PresetPreview, ExpandedDetails } from './components/PresetDetails';
import { gsap } from 'gsap';

// --- SavePresetConfirmationModal Component Definition ---
interface SavePresetConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  defaultName: string;
  settings: Settings;
}

const SavePresetConfirmationModal: React.FC<SavePresetConfirmationModalProps> = ({ isOpen, onClose, onSave, defaultName, settings }) => {
  const [name, setName] = useState(defaultName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(defaultName);
      setTimeout(() => inputRef.current?.select(), 100);
    }
  }, [isOpen, defaultName]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'Enter' && name.trim()) {
        handleSave();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, name]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 dark:bg-black/70 flex items-center justify-center z-[100]"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg m-4 overflow-hidden"
        style={{ animation: 'scaleIn 0.2s ease-out' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Save Current Style</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Review your style below. Give it a name to save it as a reusable preset.
            </p>
        </div>

        <div className="px-6 pb-4">
            <PresetPreview settings={settings} isLarge={true} />
        </div>
        
        <ExpandedDetails settings={settings} />

        <div className="p-6 space-y-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
            <div>
            <label htmlFor="presetNameConfirm" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Preset Name
            </label>
            <input
                ref={inputRef}
                type="text"
                id="presetNameConfirm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white dark:bg-gray-700 p-2 text-gray-900 dark:text-white"
                placeholder="e.g., 'Cinematic Style'"
            />
            </div>
            <div className="flex justify-end items-center gap-4">
            <button 
                onClick={onClose} 
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 font-semibold py-2 px-4 rounded-md transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={handleSave} 
                disabled={!name.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
                Save Preset
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};


// --- Notification Component Definition ---
interface NotificationProps {
  message: string;
  show: boolean;
  onDismiss: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, show, onDismiss }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  return (
    <div 
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ease-in-out ${
        show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-3 bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-3 border border-gray-200 dark:border-gray-700">
        <BookmarkIcon className="w-5 h-5 text-blue-500" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{message}</span>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    // Core
    apiKey: '',
    isDarkMode: false,
    
    // Processing
    processingMode: 'api',
    apiProvider: 'google',
    sourceLanguage: 'en-US',

    // Translation
    translationEnabled: false,
    translationLanguage: 'mn', // Mongolian
    translationProvider: 'google',

    // Appearance
    fontSize: 18,
    fontFamily: 'sans',
    isBold: false,
    isItalic: false,
    textColor: '#FFFFFF',
    boxColor: '#000000',
    boxOpacity: 0.8,
    textShadow: 'subtle',
    position: 'bottom',
    boxPosition: { top: 70, left: 10, width: 80, height: 20 },
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("This is what your subtitles will look like. Adjust the settings to see the changes live.");
  const [error, setError] = useState<string | null>(null);

  const [leftPanelContent, setLeftPanelContent] = useState<'about' | 'stats' | 'appearance' | 'translation' | 'processing'>('about');
  const [hasRunLive, setHasRunLive] = useState(false);
  
  const [activeModal, setActiveModal] = useState<'none' | 'saved'>('none');
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>([]);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  
  const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; show: boolean }>({
    message: '',
    show: false,
  });

  const [isPositioningMode, setIsPositioningMode] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [liveText, setLiveText] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const liveRequestInFlight = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const scriptProcessorNodeRef = useRef<ScriptProcessorNode | null>(null);

  useEffect(() => {
    const service = new VoskSpeechToTextService();
    setVoskService(service);
  }, []);

  const processingButtonRef = useRef<HTMLButtonElement>(null);
  const translationButtonRef = useRef<HTMLButtonElement>(null);
  const appearanceButtonRef = useRef<HTMLButtonElement>(null);
  const savedButtonRef = useRef<HTMLButtonElement>(null);
  const positioningButtonRef = useRef<HTMLButtonElement>(null);
  const liveButtonRef = useRef<HTMLButtonElement>(null);

  const leftPanelRef = useRef<HTMLDivElement>(null);
  const centerPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    try {
        const storedPresets = localStorage.getItem('subtitle-presets');
        if (storedPresets) {
            setSavedPresets(JSON.parse(storedPresets));
        }
    } catch (e) {
        console.error("Failed to load presets from local storage", e);
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setSettings(s => ({ ...s, isDarkMode: prefersDark }));
  }, []);

  useEffect(() => {
    if (settings.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.isDarkMode]);
  
  useEffect(() => {
    if (activePresetId) {
        const activePreset = savedPresets.find(p => p.id === activePresetId);
        if (activePreset && JSON.stringify(activePreset.settings) !== JSON.stringify(settings)) {
            setActivePresetId(null);
        }
    }
  }, [settings, savedPresets, activePresetId]);
  
  useEffect(() => {
    // Switch to stats view once the user has generated text for the first time
    if (hasRunLive && leftPanelContent === 'about') {
        setLeftPanelContent('stats');
    }
  }, [hasRunLive, leftPanelContent]);

  useEffect(() => {
    // Run animation only when not in positioning mode
    if (isPositioningMode) return;

    const leftPanel = leftPanelRef.current;
    const centerPanel = centerPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const dock = dockRef.current;

    if (leftPanel && centerPanel && rightPanel && dock) {
      // Set initial states for the animation
      gsap.set(centerPanel, { autoAlpha: 0, scale: 0.9 });
      gsap.set(leftPanel, { autoAlpha: 0, scale: 0, transformOrigin: 'right center' });
      gsap.set(rightPanel, { autoAlpha: 0, scale: 0, transformOrigin: 'left center' });
      gsap.set(dock, { autoAlpha: 0, y: '2rem' }); // Start from below

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onStart: () => {
            // Get positions after a tick to ensure layout is calculated
            const centerRect = centerPanel.getBoundingClientRect();
            const leftRect = leftPanel.getBoundingClientRect();
            const rightRect = rightPanel.getBoundingClientRect();

            if (centerRect.width === 0) return; // Panels are not visible (mobile view)

            // Calculate how much the side panels need to be shifted to start from the center panel's edges
            const leftInitialX = centerRect.left - leftRect.right;
            const rightInitialX = centerRect.right - rightRect.left;

            // Apply the initial horizontal translation
            gsap.set(leftPanel, { x: leftInitialX });
            gsap.set(rightPanel, { x: rightInitialX });
        }
      });

      tl.to(centerPanel, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.2,
      })
      .to([leftPanel, rightPanel], {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          duration: 0.8,
      }, '-=0.4')
      .to(dock, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.5');
    }
  }, [isPositioningMode]);

  useEffect(() => {
    if (isPositioningMode) {
      document.body.classList.add('positioning-active');
    } else {
      document.body.classList.remove('positioning-active');
    }
  }, [isPositioningMode]);


  const handleSetLeftPanel = (contentType: 'appearance' | 'translation' | 'processing') => {
    setLeftPanelContent(contentType);
  };
  
  const handleCloseLeftPanel = () => {
    setLeftPanelContent(hasRunLive ? 'stats' : 'about');
  };

  const handleModalOpen = (modalType: 'saved', event: React.MouseEvent<HTMLButtonElement>) => {
    setOriginRect(event.currentTarget.getBoundingClientRect());
    setActiveModal(modalType);
  };

  const handleModalClose = () => {
    setActiveModal('none');
  };
  
  const buildPrompt = (): string => {
    let prompt = `Transcribe the audio from this file (source language: ${settings.sourceLanguage}).`;
    if (settings.translationEnabled) {
      prompt += ` Then, translate the transcription into the language with this code: ${settings.translationLanguage}.`
      prompt += " Respond only with the final translated text."
    } else {
      prompt += " Respond only with the transcribed text."
    }
    return prompt;
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setError(null);
    setIsGenerating(true);
    setGeneratedText(`Processing "${file.name}"...`);
    setHasRunLive(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        
        try {
          if (settings.apiProvider !== 'google') {
            throw new Error(`The selected API Provider ('${settings.apiProvider}') is not implemented in this demo.`);
          }
          if (!settings.apiKey) {
            throw new Error("API Key is missing. Please add it in the Processing settings.");
          }

          const speechToTextService = new GoogleSpeechToTextService(settings.apiKey);
          const transcription = await speechToTextService.transcribeAudio(
            file,
            settings.sourceLanguage,
            settings.translationEnabled,
            settings.translationLanguage
          );
          setGeneratedText(transcription);
        } catch (err: any) {
          console.error("Error generating subtitles:", err);
          const errorMessage = err.message || "Sorry, subtitle generation failed. Please check the console for details.";
          setError(errorMessage);
          setGeneratedText("This is what your subtitles will look like. Adjust the settings to see the changes live.");
        } finally {
          setIsGenerating(false);
        }
    };
    reader.onerror = () => {
      console.error("Error reading file.");
      setError("Failed to read the selected file.");
      setGeneratedText("This is what your subtitles will look like. Adjust the settings to see the changes live.");
      setIsGenerating(false);
    };
  };

  const handleGenerateClick = async () => {
    if (isGenerating) return;

    if (settings.processingMode === 'api') {
      if (!settings.apiKey) {
        alert("Please enter your API Key in the Processing settings.");
        setLeftPanelContent("processing");
        return;
      }
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "audio/*,video/*";
      input.onchange = (e) => handleFileSelect(e as unknown as React.ChangeEvent<HTMLInputElement>);
      input.click();
    } else if (settings.processingMode === 'private') {
      if (isLive) {
        stopLiveTranscription();
      } else {
        startLiveTranscription();
      }
    } else if (settings.processingMode === 'realtime') {
      // This mode will use the Web Speech API directly, which is handled in LiveSubtitleBox.tsx
      // For now, we'll just toggle the isLive state.
      setIsLive(prev => !prev);
      setHasRunLive(true);
      setLiveText("Listening...");
    }
  };

  const handleSavePreset = () => {
    setIsSaveConfirmationOpen(true);
  };
  
  const handleConfirmSavePreset = (name: string) => {
    const newPreset: SavedPreset = {
        id: `preset_${Date.now()}`,
        name,
        settings: { ...settings }
    };
    const updatedPresets = [...savedPresets, newPreset];
    setSavedPresets(updatedPresets);
    localStorage.setItem('subtitle-presets', JSON.stringify(updatedPresets));
    setIsSaveConfirmationOpen(false);
    setNotification({ message: `Preset "${name}" saved!`, show: true });
  };

  const handleUsePreset = (preset: SavedPreset) => {
    setSettings(preset.settings);
    setActivePresetId(preset.id);
  };
  
  const handleDeletePreset = (presetId: string) => {
    if (window.confirm("Are you sure you want to delete this preset? This action cannot be undone.")) {
        const updatedPresets = savedPresets.filter(p => p.id !== presetId);
        setSavedPresets(updatedPresets);
        localStorage.setItem('subtitle-presets', JSON.stringify(updatedPresets));
        if (activePresetId === presetId) {
            setActivePresetId(null);
        }
    }
  };
  
  const handleNotificationDismiss = () => {
    setNotification({ message: '', show: false });
  };

  const handlePositioningClick = () => {
    setIsPositioningMode(prev => {
        if (!prev) { // Entering positioning mode
            setSettings(s => ({ ...s, position: 'custom' }));
        }
        return !prev;
    });
  };
  const startLiveTranscription = async () => {
    if (isLive) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

      source.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);

      scriptProcessor.onaudioprocess = (event) => {
        if (voskService) {
          voskService.acceptAudio(event.inputBuffer.getChannelData(0));
        }
      };

      voskService?.start((text) => {
        setLiveText(text);
      });

      audioContextRef.current = audioContext;
      analyserNodeRef.current = analyser;
      scriptProcessorNodeRef.current = scriptProcessor;

      setIsLive(true);
      setHasRunLive(true);
      setLiveText("Listening...");
    } catch (error) {
      console.error("Error starting live transcription:", error);
      setError("Could not start microphone. Please check permissions.");
    }
  };

  const stopLiveTranscription = () => {
    if (voskService) {
      voskService.stop();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (scriptProcessorNodeRef.current) {
      scriptProcessorNodeRef.current.disconnect();
    }
    setIsLive(false);
    setLiveText("");
  };

  const handleLiveClick = async () => {
    if (isLive) {
      handleStopLive();
      return;
    }

    if (!settings.apiKey) {
        alert("Please enter your API Key in the Processing settings before starting live subtitles.");
        setLeftPanelContent('processing');
        return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsLive(true);
        setHasRunLive(true);
        setSettings(s => ({ ...s, position: 'custom' }));
        setLiveText("Listening...");

        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];
        
        recorder.ondataavailable = async (event) => {
            if (event.data.size > 0) {
              audioChunksRef.current.push(event.data);
            }

            if (liveRequestInFlight.current || audioChunksRef.current.length === 0) return;

            liveRequestInFlight.current = true;
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            audioChunksRef.current = [];

            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
                const base64Data = (reader.result as string).split(',')[1];
                try {
                    const ai = new GoogleGenAI({ apiKey: settings.apiKey });
                    const response = await ai.models.generateContent({
                        model: 'gemini-2.5-flash',
                        contents: { parts: [{ text: "Transcribe this audio. Be concise." }, { inlineData: { mimeType: 'audio/webm', data: base64Data } }] }
                    });
                    if (response.text) {
                        setLiveText(prev => `${prev} ${response.text}`.trim());
                    }
                } catch (err) {
                    console.error("Live transcription error:", err);
                    setLiveText("Error during transcription. Please try again.");
                } finally {
                    liveRequestInFlight.current = false;
                }
            };
        };

        recorder.onstop = () => {
            stream.getTracks().forEach(track => track.stop());
        };

        recorder.start(5000); // Collect 5 seconds of audio at a time

    } catch (err) {
        console.error("Error accessing microphone:", err);
        alert("Could not access the microphone. Please check your browser permissions.");
        setIsLive(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300">
      {!isLive && !isPositioningMode && (
        <div className="flex flex-col items-center justify-center gap-8">
            <Modal 
              settings={settings} 
              setSettings={setSettings}
              isGenerating={isGenerating}
              generatedText={generatedText}
              error={error}
              onGenerateClick={handleGenerateClick}
              activeModal={activeModal}
              originRect={originRect}
              onModalOpen={handleModalOpen}
              onModalClose={handleModalClose}
              savedPresets={savedPresets}
              onUsePreset={handleUsePreset}
              onDeletePreset={handleDeletePreset}
              activePresetId={activePresetId}
              processingButtonRef={processingButtonRef}
              translationButtonRef={translationButtonRef}
              appearanceButtonRef={appearanceButtonRef}
              savedButtonRef={savedButtonRef}
              positioningButtonRef={positioningButtonRef}
              liveButtonRef={liveButtonRef}
              onPositioningClick={handlePositioningClick}
              onLiveClick={handleLiveClick}
              isPositioningMode={isPositioningMode}
              isLive={isLive}
              leftPanelContent={leftPanelContent}
              onSetLeftPanel={handleSetLeftPanel}
              onCloseLeftPanel={handleCloseLeftPanel}
              leftPanelRef={leftPanelRef}
              centerPanelRef={centerPanelRef}
              rightPanelRef={rightPanelRef}
              dockRef={dockRef}
            />
            <div className={`transition-opacity duration-300 ${(leftPanelContent !== 'stats' && leftPanelContent !== 'about') ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <button
                    onClick={handleSavePreset}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105"
                >
                    Save Current Style as a Preset
                </button>
            </div>
        </div>
      )}
      {isPositioningMode && <PositioningGuide settings={settings} setSettings={setSettings} onClose={() => setIsPositioningMode(false)} />}
      {isLive && (
        <LiveSubtitleBox
          settings={settings}
          text={liveText}
          onStop={stopLiveTranscription}
        />
      )}

      <SavePresetConfirmationModal
        isOpen={isSaveConfirmationOpen}
        onClose={() => setIsSaveConfirmationOpen(false)}
        onSave={handleConfirmSavePreset}
        defaultName={`Style Preset ${savedPresets.length + 1}`}
        settings={settings}
      />
      <Notification
        message={notification.message}
        show={notification.show}
        onDismiss={handleNotificationDismiss}
      />
    </div>
  );
};

export default App;

export interface BoxPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Settings {
  apiKey: string;
  isDarkMode: boolean;
  
  // Processing Settings
  processingMode: 'api' | 'local' | 'realtime';
  apiProvider: 'google' | 'openai' | 'assemblyai';
  sourceLanguage: string;

  // Translation Settings
  translationEnabled: boolean;
  translationLanguage: string;
  translationProvider: 'google' | 'deepl';

  // Appearance Settings
  fontSize: number;
  fontFamily: 'sans' | 'serif' | 'mono';
  isBold: boolean;
  isItalic: boolean;
  textColor: string;
  boxColor: string;
  boxOpacity: number;
  textShadow: 'none' | 'subtle' | 'outline';
  position: 'bottom' | 'custom';
  boxPosition: BoxPosition;
}

export interface SavedPreset {
  id: string;
  name: string;
  settings: Settings;
}
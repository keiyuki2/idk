import React from 'react';
import { Settings } from '../types';
import SplitText from './SplitText';

interface PreviewPanelProps {
  settings: Settings;
  generatedText: string;
  error: string | null;
}

const hexToRgb = (hex: string): {r: number, g: number, b: number} | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const PreviewPanel: React.FC<PreviewPanelProps> = ({ settings, generatedText, error }) => {
  
  const rgb = hexToRgb(settings.boxColor);
  const backgroundColor = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${settings.boxOpacity})` : settings.boxColor;

  const fontFamilies = {
    sans: "'Inter', sans-serif",
    serif: 'serif',
    mono: 'monospace',
  };

  const textShadows = {
    none: 'none',
    subtle: '1px 1px 3px rgba(0, 0, 0, 0.6)',
    outline: 'rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) -1px 0px 1px, rgb(0, 0, 0) 0px -1px 1px',
  };

  const positionClass = 'items-center';

  const textStyles: React.CSSProperties = {
    fontSize: `${settings.fontSize}px`,
    fontFamily: fontFamilies[settings.fontFamily],
    fontWeight: settings.isBold ? 'bold' : 'normal',
    fontStyle: settings.isItalic ? 'italic' : 'normal',
  };

  return (
    <div className="w-full md:w-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-center">
          Preview
        </h3>
      </div>
      <div className={`flex-grow flex justify-center p-6 min-h-[300px] bg-gray-100 dark:bg-gray-900/50 ${positionClass}`}>
        <div
          className="w-full p-4 rounded-md flex justify-center items-center"
          style={{ 
            backgroundColor: backgroundColor,
            transition: 'background-color 0.3s ease',
          }}
        >
          {error ? (
            <p className="text-center break-words text-red-500 dark:text-red-400" style={textStyles}>
              {error}
            </p>
          ) : (
            <SplitText
              key={generatedText}
              text={generatedText}
              className="break-words"
              style={{
                ...textStyles,
                color: settings.textColor,
                textShadow: textShadows[settings.textShadow],
              }}
              delay={20}
              duration={0.4}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
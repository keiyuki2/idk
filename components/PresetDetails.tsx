
import React from 'react';
import { Settings } from '../types';

const hexToRgb = (hex: string): {r: number, g: number, b: number} | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const PresetPreview: React.FC<{ settings: Settings, isLarge?: boolean }> = ({ settings, isLarge = false }) => {
  const rgb = hexToRgb(settings.boxColor);
  const backgroundColor = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${settings.boxOpacity})` : settings.boxColor;

  const fontFamilies = {
    sans: "'Inter', sans-serif",
    serif: 'serif',
    mono: 'monospace',
  };

  const textShadows = {
    none: 'none',
    subtle: '1px 1px 2px rgba(0, 0, 0, 0.7)',
    outline: 'rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) -1px 0px 1px, rgb(0, 0, 0) 0px -1px 1px',
  };

  const textStyles: React.CSSProperties = {
    fontSize: isLarge ? `${settings.fontSize}px` : `${settings.fontSize * 0.75}px`, // Scaled down for preview
    fontFamily: fontFamilies[settings.fontFamily],
    fontWeight: settings.isBold ? 'bold' : 'normal',
    fontStyle: settings.isItalic ? 'italic' : 'normal',
    color: settings.textColor,
    textShadow: textShadows[settings.textShadow],
    lineHeight: 1.2,
  };
  
  const textContent = isLarge ? "Here's how your style looks." : "Aa";

  return (
    <div
      className={`w-full rounded-md flex justify-center items-center p-2 transition-colors duration-300 ${isLarge ? 'h-32 bg-gray-100 dark:bg-gray-900' : 'h-16 mb-2'}`}
      style={{ backgroundColor }}
    >
      <span className="text-center" style={textStyles}>{textContent}</span>
    </div>
  );
};

export const ExpandedDetails: React.FC<{ settings: Settings }> = ({ settings }) => (
    <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1.5 text-sm text-gray-600 dark:text-gray-400 p-4 bg-gray-100 dark:bg-gray-700/30 rounded-b-md border-t border-gray-200 dark:border-gray-700">
        <span className="font-medium text-gray-800 dark:text-gray-200">Font:</span><span className="text-right truncate">{settings.fontFamily}, {settings.fontSize}px</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">Style:</span><span className="text-right">{[settings.isBold && 'Bold', settings.isItalic && 'Italic'].filter(Boolean).join(', ') || 'Normal'}</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">Text Color:</span>
        <div className="flex justify-end items-center gap-2">
            <span className="font-mono">{settings.textColor}</span>
            <div className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600" style={{ backgroundColor: settings.textColor }} />
        </div>
        <span className="font-medium text-gray-800 dark:text-gray-200">Box Color:</span>
         <div className="flex justify-end items-center gap-2">
            <span className="font-mono">{settings.boxColor}</span>
            <div className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600" style={{ backgroundColor: settings.boxColor }} />
        </div>
        <span className="font-medium text-gray-800 dark:text-gray-200">Opacity:</span><span className="text-right">{Math.round(settings.boxOpacity * 100)}%</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">Shadow:</span><span className="text-right capitalize">{settings.textShadow}</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">Position:</span><span className="text-right">T: {Math.round(settings.boxPosition.top)}%, L: {Math.round(settings.boxPosition.left)}%</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">Size:</span><span className="text-right">W: {Math.round(settings.boxPosition.width)}%, H: {Math.round(settings.boxPosition.height)}%</span>
    </div>
);

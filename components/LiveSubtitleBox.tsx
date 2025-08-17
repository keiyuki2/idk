
import React, { useEffect, useState } from 'react';
import { Settings } from '../types';
import { StopCircleIcon } from './icons';
import { SpeechRecognitionService } from '../src/speechRecognition';

interface LiveSubtitleBoxProps {
    settings: Settings;
    text: string;
    onStop: () => void;
}

const hexToRgb = (hex: string): {r: number, g: number, b: number} | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const LiveSubtitleBox: React.FC<LiveSubtitleBoxProps> = ({ settings, text, onStop }) => {
  const [liveText, setLiveText] = useState("");
  const [speechService, setSpeechService] = useState<SpeechRecognitionService | null>(null);

  useEffect(() => {
    if (settings.processingMode === 'realtime') {
      const service = new SpeechRecognitionService();
      setSpeechService(service);

      if (service.recognition) {
        service.start(
          (transcript) => {
            setLiveText(transcript);
          },
          () => {
            console.log('Speech recognition ended.');
            // Optionally restart or handle end of speech
          }
        );
      }

      return () => {
        if (service) {
          service.stop();
        }
      };
    } else {
      setLiveText(text); // Use passed text for other modes
    }
  }, [settings.processingMode, text]);
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

    const subtitleBoxStyle: React.CSSProperties = {
        top: `${settings.boxPosition.top}%`,
        left: `${settings.boxPosition.left}%`,
        width: `${settings.boxPosition.width}%`,
        height: `${settings.boxPosition.height}%`,
        backgroundColor,
        color: settings.textColor,
        fontSize: `${settings.fontSize}px`,
        fontFamily: fontFamilies[settings.fontFamily],
        fontWeight: settings.isBold ? 'bold' : 'normal',
        fontStyle: settings.isItalic ? 'italic' : 'normal',
        textShadow: textShadows[settings.textShadow],
    };

    return (
        <div className="fixed inset-0 z-[60] bg-transparent pointer-events-none">
            <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            
            <button
                onClick={onStop}
                className="fixed bottom-4 right-4 z-[70] pointer-events-auto bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-2xl backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label="Stop Live Subtitles"
                style={{animation: 'fadeIn 0.3s ease 0.5s both'}}
            >
                <StopCircleIcon className="w-10 h-10 text-red-500" />
            </button>
            
            <div
                className="fixed p-4 rounded-md flex justify-center items-center text-center transition-all duration-300"
                style={{ ...subtitleBoxStyle, animation: 'fadeIn 0.3s ease' }}
            >
                <p className="break-words">{text}</p>
            </div>
        </div>
    );
};

export default LiveSubtitleBox;

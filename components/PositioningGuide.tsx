import React, { useState, useRef, useEffect } from 'react';
import { Settings } from '../types';
import { PinIcon } from './icons';

const hexToRgb = (hex: string): {r: number, g: number, b: number} | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
};

const PositioningToolbar: React.FC<{
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
    isPinned: boolean;
    onPinToggle: () => void;
}> = ({ settings, setSettings, isPinned, onPinToggle }) => {
    const handleValueChange = <K extends keyof Settings,>(key: K, value: Settings[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl p-2 flex items-center justify-center gap-2 text-xs"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex flex-col items-center px-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">Text</label>
                <input type="color" value={settings.textColor} onChange={(e) => handleValueChange('textColor', e.target.value)} className="w-7 h-7 p-0 bg-transparent border-none rounded cursor-pointer" />
            </div>
            <div className="flex flex-col items-center px-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">Box</label>
                <input type="color" value={settings.boxColor} onChange={(e) => handleValueChange('boxColor', e.target.value)} className="w-7 h-7 p-0 bg-transparent border-none rounded cursor-pointer" />
            </div>
            <div className="flex flex-col items-center w-24 px-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">Size ({settings.fontSize}px)</label>
                <input
                    type="range" min="12" max="36" step="1"
                    value={settings.fontSize}
                    onChange={(e) => handleValueChange('fontSize', parseInt(e.target.value, 10))}
                    className="h-1 w-full"
                />
            </div>
            <div className="flex flex-col items-center w-24 px-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium mb-1">Opacity ({Math.round(settings.boxOpacity * 100)}%)</label>
                 <input 
                    type="range" min="0" max="1" step="0.05"
                    value={settings.boxOpacity}
                    onChange={(e) => handleValueChange('boxOpacity', parseFloat(e.target.value))}
                    className="h-1 w-full"
                />
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-2"></div>
            <button
                onClick={onPinToggle}
                className={`p-2 rounded-lg transition-colors ${isPinned ? 'bg-blue-500/20 text-blue-500' : 'hover:bg-gray-500/10 text-gray-600 dark:text-gray-300'}`}
                title={isPinned ? 'Unpin toolbar' : 'Pin toolbar'}
            >
                <PinIcon className="w-5 h-5" />
            </button>
        </div>
    );
};


interface PositioningGuideProps {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
    onClose: () => void;
}

const PositioningGuide: React.FC<PositioningGuideProps> = ({ settings, setSettings, onClose }) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const [isToolbarPinned, setIsToolbarPinned] = useState(false);
    const [isMouseAtTop, setIsMouseAtTop] = useState(false);
    const interactionRef = useRef<{
        isDragging: boolean;
        isResizing: string | null;
        startX: number;
        startY: number;
        startWidth: number;
        startHeight: number;
        startLeft: number;
        startTop: number;
    }>({
        isDragging: false,
        isResizing: null,
        startX: 0,
        startY: 0,
        startWidth: 0,
        startHeight: 0,
        startLeft: 0,
        startTop: 0
    });

    const vh = window.innerHeight;
    const vw = window.innerWidth;
    
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, handle?: string) => {
        e.preventDefault();
        e.stopPropagation();
        
        interactionRef.current = {
            isDragging: !handle,
            isResizing: handle || null,
            startX: e.clientX,
            startY: e.clientY,
            startWidth: (settings.boxPosition.width / 100) * vw,
            startHeight: (settings.boxPosition.height / 100) * vh,
            startLeft: (settings.boxPosition.left / 100) * vw,
            startTop: (settings.boxPosition.top / 100) * vh,
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const { isDragging, isResizing, startX, startY, startWidth, startHeight, startLeft, startTop } = interactionRef.current;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newPos = { ...settings.boxPosition };

        if (isDragging) {
            newPos.left = ((startLeft + dx) / vw) * 100;
            newPos.top = ((startTop + dy) / vh) * 100;
        }

        if (isResizing) {
            if (isResizing.includes('right')) {
                newPos.width = ((startWidth + dx) / vw) * 100;
            }
            if (isResizing.includes('left')) {
                newPos.width = ((startWidth - dx) / vw) * 100;
                newPos.left = ((startLeft + dx) / vw) * 100;
            }
            if (isResizing.includes('bottom')) {
                newPos.height = ((startHeight + dy) / vh) * 100;
            }
            if (isResizing.includes('top')) {
                newPos.height = ((startHeight - dy) / vh) * 100;
                newPos.top = ((startTop + dy) / vh) * 100;
            }
        }
        
        // Clamp values
        newPos.width = Math.max(10, Math.min(100, newPos.width));
        newPos.height = Math.max(5, Math.min(100, newPos.height));
        newPos.left = Math.max(0, Math.min(100 - newPos.width, newPos.left));
        newPos.top = Math.max(0, Math.min(100 - newPos.height, newPos.top));

        setSettings(s => ({ ...s, boxPosition: newPos }));
    };

    const handleMouseUp = () => {
        interactionRef.current.isDragging = false;
        interactionRef.current.isResizing = null;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const rgb = hexToRgb(settings.boxColor);
    const backgroundColor = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${settings.boxOpacity})` : settings.boxColor;

    useEffect(() => {
        const mouseMoveHandler = (e: MouseEvent) => {
            if (isToolbarPinned) return;
            setIsMouseAtTop(e.clientY < 80);
        };
        window.addEventListener('mousemove', mouseMoveHandler);
        return () => window.removeEventListener('mousemove', mouseMoveHandler);
    }, [isToolbarPinned]);

    return (
        <div 
            className="fixed inset-0 z-50 bg-transparent"
        >
            <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[70] transition-all duration-300 ${isToolbarPinned || isMouseAtTop ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
                <PositioningToolbar settings={settings} setSettings={setSettings} isPinned={isToolbarPinned} onPinToggle={() => setIsToolbarPinned(!isToolbarPinned)} />
            </div>

            <div
                ref={boxRef}
                className="fixed border-2 border-dashed border-blue-400/80 rounded-lg shadow-2xl group"
                style={{
                    top: `${settings.boxPosition.top}%`,
                    left: `${settings.boxPosition.left}%`,
                    width: `${settings.boxPosition.width}%`,
                    height: `${settings.boxPosition.height}%`,
                    backgroundColor: backgroundColor,
                    cursor: 'move',
                    transition: 'background-color 0.2s ease',
                }}
                onMouseDown={(e) => handleMouseDown(e)}
            >
                <div 
                    className="absolute inset-0 p-2 flex items-center justify-center text-center select-none"
                    style={{
                        color: settings.textColor,
                        fontSize: `${settings.fontSize}px`,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        transition: 'color 0.2s ease, font-size 0.2s ease',
                    }}
                >
                    <p>This is a preview of your subtitle position and style. <br/> Drag the edges to resize or the body to move.</p>
                </div>

                {/* Resize Handles */}
                <div onMouseDown={(e) => handleMouseDown(e, 'top-left')} className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white rounded-full border-2 border-blue-500 cursor-nwse-resize"></div>
                <div onMouseDown={(e) => handleMouseDown(e, 'top-right')} className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white rounded-full border-2 border-blue-500 cursor-nesw-resize"></div>
                <div onMouseDown={(e) => handleMouseDown(e, 'bottom-left')} className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white rounded-full border-2 border-blue-500 cursor-nesw-resize"></div>
                <div onMouseDown={(e) => handleMouseDown(e, 'bottom-right')} className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white rounded-full border-2 border-blue-500 cursor-nwse-resize"></div>
                
                <div onMouseDown={(e) => handleMouseDown(e, 'top')} className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-white rounded-full border border-blue-500 cursor-n-resize group-hover:opacity-100 opacity-0 transition-opacity"></div>
                <div onMouseDown={(e) => handleMouseDown(e, 'bottom')} className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-white rounded-full border border-blue-500 cursor-s-resize group-hover:opacity-100 opacity-0 transition-opacity"></div>
                <div onMouseDown={(e) => handleMouseDown(e, 'left')} className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-white rounded-full border border-blue-500 cursor-w-resize group-hover:opacity-100 opacity-0 transition-opacity"></div>
                <div onMouseDown={(e) => handleMouseDown(e, 'right')} className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-white rounded-full border border-blue-500 cursor-e-resize group-hover:opacity-100 opacity-0 transition-opacity"></div>
                
            </div>
            
            <div 
                className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] transition-opacity duration-300"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default PositioningGuide;
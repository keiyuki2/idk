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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            onClose();
          }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

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

    const boxStyle: React.CSSProperties = {
        top: `${settings.boxPosition.top}%`,
        left: `${settings.boxPosition.left}%`,
        width: `${settings.boxPosition.width}%`,
        height: `${settings.boxPosition.height}%`,
        backgroundColor,
        outline: '2px dashed #3B82F6',
        outlineOffset: '2px',
        cursor: 'move',
        transition: 'background-color 0.3s ease, color 0.3s ease',
    };

    const textStyle: React.CSSProperties = {
        color: settings.textColor,
        fontSize: `${settings.fontSize}px`,
        fontFamily: fontFamilies[settings.fontFamily],
        fontWeight: settings.isBold ? 'bold' : 'normal',
        fontStyle: settings.isItalic ? 'italic' : 'normal',
        textShadow: textShadows[settings.textShadow],
        pointerEvents: 'none',
        userSelect: 'none'
    };
    
    const resizeHandles = ['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
    const handleClasses: {[key: string]: string} = {
        'top': 'cursor-ns-resize h-2 -top-1 left-0 w-full',
        'bottom': 'cursor-ns-resize h-2 -bottom-1 left-0 w-full',
        'left': 'cursor-ew-resize w-2 -left-1 top-0 h-full',
        'right': 'cursor-ew-resize w-2 -right-1 top-0 h-full',
        'top-left': 'cursor-nwse-resize w-4 h-4 -top-2 -left-2',
        'top-right': 'cursor-nesw-resize w-4 h-4 -top-2 -right-2',
        'bottom-left': 'cursor-nesw-resize w-4 h-4 -bottom-2 -left-2',
        'bottom-right': 'cursor-nwse-resize w-4 h-4 -bottom-2 -right-2',
    };

    const showToolbar = isToolbarPinned || isMouseAtTop;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" style={{animation: 'fadeIn 0.2s ease'}}>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
            
            <div 
                className="fixed top-0 left-0 right-0 h-16 z-[59] cursor-default"
                onMouseEnter={() => setIsMouseAtTop(true)}
                onMouseLeave={() => setIsMouseAtTop(false)}
            />
            
            <div
                className="w-full"
                style={{
                    position: 'fixed', top: 0, left: 0, zIndex: 60, display: 'flex', justifyContent: 'center',
                    transform: showToolbar ? 'translateY(0)' : 'translateY(-120%)',
                    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    pointerEvents: 'none'
                }}
                onMouseEnter={() => setIsMouseAtTop(true)}
                onMouseLeave={() => setIsMouseAtTop(false)}
            >
                <div style={{ pointerEvents: 'auto' }}>
                    <PositioningToolbar 
                       settings={settings}
                       setSettings={setSettings}
                       isPinned={isToolbarPinned}
                       onPinToggle={() => setIsToolbarPinned(p => !p)}
                    />
                </div>
            </div>
            
            <div
                ref={boxRef}
                style={boxStyle}
                className="fixed rounded-md"
                onMouseDown={(e) => handleMouseDown(e)}
            >
                <div className="w-full h-full flex items-center justify-center p-2">
                    <p style={textStyle} className="text-center">
                        Drag to move, or drag edges to resize.
                    </p>
                </div>

                {resizeHandles.map(handle => (
                    <div
                        key={handle}
                        className={`absolute z-10`}
                        style={{
                            ... (handle.includes('top') && { top: '-4px' }),
                            ... (handle.includes('bottom') && { bottom: '-4px' }),
                            ... (handle.includes('left') && { left: '-4px' }),
                            ... (handle.includes('right') && { right: '-4px' }),
                            ... (!handle.includes('top') && !handle.includes('bottom') && {top: 0, height: '100%'}),
                            ... (!handle.includes('left') && !handle.includes('right') && {left: 0, width: '100%'}),
                        }}
                    >
                         <div
                            className={`w-full h-full ${handleClasses[handle]}`}
                             onMouseDown={(e) => handleMouseDown(e, handle)}
                        />
                    </div>
                ))}
            </div>
            
            <button
                onClick={onClose}
                className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[60] bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition-transform hover:scale-105"
            >
                Done
            </button>
        </div>
    );
};

export default PositioningGuide;
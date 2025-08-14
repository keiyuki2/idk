import React, { useState, useEffect, useRef } from 'react';

interface AnimatedModalContainerProps {
  children: React.ReactNode;
  originRect: DOMRect;
  onClose: () => void;
}

const AnimatedModalContainer: React.FC<AnimatedModalContainerProps> = ({ children, originRect, onClose }) => {
  const [phase, setPhase] = useState<'opening' | 'open' | 'closing'>('opening');
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    // Prevent closing while it's still opening or already closing
    if (phase === 'open') {
        setPhase('closing');
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [phase]); // Re-bind to get the correct `phase` in `handleClose`

  useEffect(() => {
    const node = modalRef.current;
    if (!node) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      // Ensure we're listening for the transform property on the modal itself
      if (event.target === node && event.propertyName === 'transform' && phase === 'closing') {
        onClose();
      }
    };

    if (phase === 'opening') {
      // Use requestAnimationFrame to apply final styles in the next frame, triggering the transition
      requestAnimationFrame(() => {
        setPhase('open');
      });
    }
    
    node.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      node.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [phase, onClose]);
  
  const getModalStyle = (): React.CSSProperties => {
    const commonStyle: React.CSSProperties = {
        width: 'min(90vw, 420px)',
        height: 'min(80vh, 500px)',
        borderRadius: '0.5rem', // Match 'rounded-lg' from the panels
    };

    const initialStyle: React.CSSProperties = {
        ...commonStyle,
        top: `${originRect.top + originRect.height / 2}px`,
        left: `${originRect.left + originRect.width / 2}px`,
        transform: 'translate(-50%, -50%) scale(0.05)',
        transformOrigin: 'center',
    };

    const finalStyle: React.CSSProperties = {
        ...commonStyle,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(1)',
        transformOrigin: 'center',
    };

    if (phase === 'open') return finalStyle;
    return initialStyle;
  };

  return (
    <div
      ref={modalRef}
      className="fixed z-50"
      style={{
        ...getModalStyle(),
        // Using a spring-like easing function for a more fluid feel
        transition: 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), top 500ms cubic-bezier(0.34, 1.56, 0.64, 1), left 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className={`w-full h-full transition-opacity duration-200 ${phase === 'open' ? 'opacity-100 delay-200' : 'opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

export default AnimatedModalContainer;
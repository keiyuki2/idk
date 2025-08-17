// Ensure React and ReactDOM are available globally
(function() {
  // Wait for scripts to load and set up globals
  function waitForReact() {
    return new Promise((resolve) => {
      const checkReact = () => {
        if (window.React && window.ReactDOM) {
          console.log('React and ReactDOM are available');
          resolve();
        } else {
          console.log('Waiting for React and ReactDOM...');
          setTimeout(checkReact, 100);
        }
      };
      checkReact();
    });
  }

  // Initialize when React is ready
  window.initReactApp = async function() {
    await waitForReact();
    
    // Wait for fonts to load
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    
    // Signal that React is ready
    window.reactReady = true;
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('reactReady'));
  };

  // Start initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initReactApp);
  } else {
    window.initReactApp();
  }
})();


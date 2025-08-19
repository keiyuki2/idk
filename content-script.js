// Content script to inject the full-screen subtitle UI
(function() {
  'use strict';

  // Check if the overlay is already injected
  if (document.getElementById('subtitle-extension-overlay')) {
    return;
  }

  // Create the overlay container
  const overlay = document.createElement('div');
  overlay.id = 'subtitle-extension-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(20, 20, 20, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 2147483647;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
  `;

  // Create the main content container
  const contentContainer = document.createElement('div');
  contentContainer.id = 'subtitle-extension-content';
  contentContainer.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 40px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    position: relative;
  `;

  // Create close button
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '×';
  closeButton.style.cssText = `
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
    color: #666;
    line-height: 1;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  closeButton.addEventListener('click', function() {
    overlay.remove();
  });

  // Create the React root container
  const reactRoot = document.createElement('div');
  reactRoot.id = 'subtitle-extension-root';
  reactRoot.style.cssText = `
    min-height: 400px;
    min-width: 600px;
  `;

  // Add initial loading message
  reactRoot.innerHTML = `
    <div style="text-align: center; padding: 40px;">
      <h2 style="margin: 0 0 20px 0; color: #333;">Subtitle Settings</h2>
      <p style="color: #666;">Loading extension...</p>
    </div>
  `;

  // Assemble the overlay
  contentContainer.appendChild(closeButton);
  contentContainer.appendChild(reactRoot);
  overlay.appendChild(contentContainer);

  // Add to page
  document.body.appendChild(overlay);

  // Load the extension scripts
  loadExtensionScripts();

  function loadExtensionScripts() {
    const scripts = [
      chrome.runtime.getURL('public/js/tailwind.min.js'),
      chrome.runtime.getURL('public/js/tailwind-config.js'),
      chrome.runtime.getURL('public/js/global-vars.js'),
      chrome.runtime.getURL('public/js/react.production.min.js'),
      chrome.runtime.getURL('public/js/react-dom.production.min.js'),
      chrome.runtime.getURL('public/js/gsap.min.js'),
      chrome.runtime.getURL('public/js/react-globals.js')
    ];

    let loadedCount = 0;

    scripts.forEach((src, index) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = function() {
        loadedCount++;
        if (loadedCount === scripts.length) {
          // All scripts loaded, now load the main app
          loadMainApp();
        }
      };
      script.onerror = function() {
        console.error('Failed to load script:', src);
      };
      document.head.appendChild(script);
    });
  }

  function loadMainApp() {
    // Wait for React to be ready
    if (window.reactReady) {
      initializeReactApp();
    } else {
      window.addEventListener('reactReady', initializeReactApp, { once: true });
    }
  }

  function initializeReactApp() {
    const React = window.React;
    const ReactDOM = window.ReactDOM;

    if (!React || !ReactDOM) {
      reactRoot.innerHTML = `
        <div style="text-align: center; padding: 40px; color: red;">
          <h3>Error: React not loaded</h3>
          <p>Please check the console for errors.</p>
        </div>
      `;
      return;
    }

    // Load and render the main App component
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('App.js');
    script.onload = function() {
      if (window.App) {
        const root = ReactDOM.createRoot(reactRoot);
        root.render(React.createElement(window.App));
      } else {
        // Import the App component dynamically
        import(chrome.runtime.getURL('App.js')).then(module => {
          const App = module.default;
          const root = ReactDOM.createRoot(reactRoot);
          root.render(React.createElement(App));
        }).catch(() => {
          // Final fallback
          reactRoot.innerHTML = `
            <div style="text-align: center; padding: 40px;">
              <h2>Subtitle Extension</h2>
              <p>Extension loaded successfully!</p>
            </div>
          `;
        });
      }
    };
    script.onerror = function() {
      // Fallback if App.js doesn't load
      reactRoot.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <h2>Subtitle Extension</h2>
          <p>Extension loaded successfully!</p>
        </div>
      `;
    };
    document.head.appendChild(script);
  }

  // Handle ESC key to close overlay
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('subtitle-extension-overlay')) {
      overlay.remove();
    }
  });

})();


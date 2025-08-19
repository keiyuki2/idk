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

  // Create the React root container
  const reactRoot = document.createElement("div");
  reactRoot.id = "subtitle-extension-root";
  reactRoot.style.cssText = `
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  // Assemble the overlay
  overlay.appendChild(reactRoot);

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
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("App.js");
    script.onload = function() {
      if (window.App) {
        const root = ReactDOM.createRoot(reactRoot);
        root.render(React.createElement(window.App));
      } else {
        // Import the App component dynamically
        import(chrome.runtime.getURL("App.js")).then(module => {
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
      // Fallback if App.js doesn\'t load
      reactRoot.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <h2>Subtitle Extension</h2>
          <p>Extension loaded successfully!</p>
        </div>
      `;
    };
    document.head.appendChild(script);
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('subtitle-extension-overlay')) {
      overlay.remove();
    }
  });

})();


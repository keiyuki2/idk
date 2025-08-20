// Content script to inject the full-screen subtitle UI
(function() {
  'use strict';
  
  console.log('Subtitle extension content script loaded');
  
  // Keep track of UI state
  let isUIVisible = false;
  
  // Toggle the UI
  function toggleUI() {
    const overlay = document.getElementById('subtitle-extension-overlay');
    
    // Remove existing UI if it exists
    if (overlay) {
      overlay.remove();
      isUIVisible = false;
      return;
    }
    
    // Otherwise create the UI
    createUI();
    isUIVisible = true;
  }
  
  // Create the UI
  function createUI() {
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
  
    // Add a loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.style.cssText = `
      text-align: center;
      color: white;
      font-size: 18px;
    `;
    loadingIndicator.innerHTML = `
      <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.3); 
                  border-radius: 50%; border-top-color: white; margin: 0 auto 15px;
                  animation: spin 1s linear infinite;"></div>
      <p>Loading subtitle extension...</p>
    `;
    
    // Add the animation
    const style = document.createElement('style');
    style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
    
    reactRoot.appendChild(loadingIndicator);
  
    // Assemble the overlay
    overlay.appendChild(reactRoot);
  
    // Add to page
    document.body.appendChild(overlay);
  
    // Add keyboard escape handler
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.getElementById('subtitle-extension-overlay')) {
        toggleUI();
      }
    });
    
    // Load the extension scripts
    loadExtensionScripts();
  }
  
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
        console.log(`Loaded script ${loadedCount}/${scripts.length}: ${src}`);
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
    console.log('All dependencies loaded, initializing React app');
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
    const reactRoot = document.getElementById('subtitle-extension-root');
  
    if (!React || !ReactDOM || !reactRoot) {
      console.error('React, ReactDOM, or root element not found');
      if (reactRoot) {
        reactRoot.innerHTML = `
          <div style="text-align: center; padding: 40px; color: red;">
            <h3>Error: React not loaded</h3>
            <p>Please check the console for errors.</p>
          </div>
        `;
      }
      return;
    }
  
    console.log('Loading App.js');
    // First try SimpleApp.js which is simpler and might be more reliable for testing
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("SimpleApp.js");
    script.onload = function() {
      console.log('SimpleApp.js loaded, trying to render');
      if (window.SimpleApp) {
        try {
          const root = ReactDOM.createRoot(reactRoot);
          root.render(React.createElement(window.SimpleApp));
          console.log('SimpleApp rendered successfully');
        } catch (error) {
          console.error('Error rendering SimpleApp:', error);
          // Fallback to App.js
          loadAppJS();
        }
      } else {
        console.log('SimpleApp not found, trying App.js');
        loadAppJS();
      }
    };
    script.onerror = function() {
      console.error('Failed to load SimpleApp.js');
      loadAppJS();
    };
    document.head.appendChild(script);
  }
  
  function loadAppJS() {
    const reactRoot = document.getElementById('subtitle-extension-root');
    if (!reactRoot) return;
    
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("App.js");
    script.onload = function() {
      console.log('App.js loaded, rendering React component');
      if (window.App) {
        try {
          const root = ReactDOM.createRoot(reactRoot);
          root.render(React.createElement(window.App));
          console.log('App component rendered successfully');
        } catch (error) {
          console.error('Error rendering App component:', error);
          reactRoot.innerHTML = `
            <div style="text-align: center; padding: 40px; color: white;">
              <h2>Subtitle Extension</h2>
              <p style="color: red;">Error loading component: ${error.message}</p>
            </div>
          `;
        }
      } else {
        // Final fallback
        reactRoot.innerHTML = `
          <div style="text-align: center; padding: 40px; color: white;">
            <h2>Subtitle Extension</h2>
            <p>Extension loaded but couldn't find App component</p>
          </div>
        `;
      }
    };
    script.onerror = function() {
      if (reactRoot) {
        reactRoot.innerHTML = `
          <div style="text-align: center; padding: 40px; color: white;">
            <h2>Subtitle Extension</h2>
            <p>Extension loaded but couldn't find App.js</p>
          </div>
        `;
      }
    };
    document.head.appendChild(script);
  }
  
  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received in content script:', message);
    
    if (message.action === 'toggle_ui') {
      toggleUI();
      sendResponse({ status: 'UI toggled' });
    }
    
    return true; // Keep the message channel open for async response
  });
})();

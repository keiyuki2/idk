import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Or import SimpleApp from './SimpleApp'; depending on which one you want to use

// Keep track of whether our UI is currently shown
let isUIShown = false;
let rootElement: HTMLElement | null = null;
let reactRoot: ReactDOM.Root | null = null;

// Create the UI container elements
function createUIContainer() {
  // Create the overlay (blurry background)
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
    font-family: "Inter", sans-serif;
  `;

  // Create the white container
  const content = document.createElement('div');
  content.id = 'subtitle-extension-content';
  content.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 40px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    position: relative;
  `;

  // Create a close button
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
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

  // Create root element for React to render into
  const root = document.createElement('div');
  root.id = 'subtitle-extension-root';
  root.style.cssText = `
    min-height: 400px;
    min-width: 600px;
  `;

  // Add click handler to close button
  closeBtn.addEventListener('click', hideUI);

  // Assemble the DOM structure
  content.appendChild(closeBtn);
  content.appendChild(root);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  // Add keyboard escape handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isUIShown) {
      hideUI();
    }
  });

  return root;
}

// Show the UI
function showUI() {
  console.log('Showing UI');
  
  // Create container if it doesn't exist
  if (!rootElement) {
    rootElement = createUIContainer();
  } else {
    // If it exists but was hidden, show it
    const overlay = document.getElementById('subtitle-extension-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }

  // Render React component if not already rendered
  if (!reactRoot) {
    reactRoot = ReactDOM.createRoot(rootElement);
    reactRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  isUIShown = true;
}

// Hide the UI
function hideUI() {
  console.log('Hiding UI');
  const overlay = document.getElementById('subtitle-extension-overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
  isUIShown = false;
}

// Toggle the UI visibility
function toggleUI() {
  if (isUIShown) {
    hideUI();
  } else {
    showUI();
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);
  
  if (message.action === 'toggle_ui') {
    toggleUI();
    sendResponse({ status: 'UI toggled' });
  }
  
  return true; // Keeps the message channel open for async response
});

// Initialize when content script loads (optional)
console.log('Subtitle extension content script loaded');

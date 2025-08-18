import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';

const injectApp = () => {
  const existingContainer = document.getElementById('subtitle-extension-root');
  if (existingContainer) {
    // If container already exists, toggle its visibility
    existingContainer.style.display = existingContainer.style.display === 'none' ? 'block' : 'none';
    return;
  }

  const container = document.createElement('div');
  container.id = 'subtitle-extension-root';
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggleOverlay') {
    injectApp();
  }
});

// Initial injection when content script is loaded (optional, depends on desired behavior)
// injectApp();



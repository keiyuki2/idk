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
  const container = document.createElement('div');
  container.id = 'subtitle-extension-root';
  container.style.cssText = `
    min-height: 400px;
    min-width: 600px;
  `;

  // Assemble the overlay
  contentContainer.appendChild(closeButton);
  contentContainer.appendChild(container);
  overlay.appendChild(contentContainer);

  // Add to page
  document.body.appendChild(overlay);

  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Handle ESC key to close overlay
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('subtitle-extension-overlay')) {
      overlay.remove();
    }
  });
};

// Execute immediately when content script is loaded
injectApp();



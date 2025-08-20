// Simple content script with no React dependencies
(function() {
  'use strict';
  
  console.log('Subtitle extension content script loaded');

  // Create and show the UI
  function createAndShowUI() {
    // Check if the overlay is already injected
    if (document.getElementById('subtitle-extension-overlay')) {
      console.log('UI already exists, removing it');
      document.getElementById('subtitle-extension-overlay').remove();
      return;
    }
  
    console.log('Creating UI elements');
    
    // Create the overlay container with blurry backdrop
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
  
    // Create the white box content container
    const content = document.createElement('div');
    content.id = 'subtitle-extension-content';
    content.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 40px;
      max-width: 600px;
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

    // Add click handler to close button
    closeBtn.addEventListener('click', function() {
      overlay.remove();
    });

    // Create a subtitle interface
    const subtitleUI = document.createElement('div');
    subtitleUI.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 20px;
      min-width: 500px;
    `;
    
    // Add a header
    const header = document.createElement('div');
    header.innerHTML = `
      <h1 style="font-size: 24px; margin: 0 0 10px 0; color: #007bff;">🎙️ Subtitle Extension</h1>
      <p style="font-size: 16px; margin: 0; color: #666;">Real-time subtitle overlay</p>
    `;

    // Add a preview area
    const previewArea = document.createElement('div');
    previewArea.style.cssText = `
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;
      margin: 15px 0;
    `;
    previewArea.innerHTML = `
      <p style="font-size: 18px; margin: 0; color: #333;">
        This is what your subtitles will look like. Adjust the settings to see the changes live.
      </p>
    `;

    // Add a settings area
    const settings = document.createElement('div');
    settings.innerHTML = `
      <h2 style="font-size: 18px; margin: 0 0 15px 0;">Settings</h2>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: 500;">Background Color</label>
        <div style="display: flex; gap: 10px;">
          <button style="padding: 10px; background: #000; border: 2px solid #000; border-radius: 4px; cursor: pointer;"></button>
          <button style="padding: 10px; background: #333; border: 2px solid #ccc; border-radius: 4px; cursor: pointer;"></button>
          <button style="padding: 10px; background: #0057b7; border: 2px solid #ccc; border-radius: 4px; cursor: pointer;"></button>
        </div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: 500;">Text Color</label>
        <div style="display: flex; gap: 10px;">
          <button style="padding: 10px; background: #fff; border: 2px solid #000; border-radius: 4px; cursor: pointer;"></button>
          <button style="padding: 10px; background: #ffd700; border: 2px solid #ccc; border-radius: 4px; cursor: pointer;"></button>
          <button style="padding: 10px; background: #00ff00; border: 2px solid #ccc; border-radius: 4px; cursor: pointer;"></button>
        </div>
      </div>
    `;

    // Add a button
    const button = document.createElement('button');
    button.textContent = 'Start Live Subtitles';
    button.style.cssText = `
      padding: 12px 24px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      margin-top: 10px;
    `;
    button.addEventListener('mouseover', function() {
      this.style.backgroundColor = '#0069d9';
    });
    button.addEventListener('mouseout', function() {
      this.style.backgroundColor = '#007bff';
    });
    
    // Assemble the subtitle UI
    subtitleUI.appendChild(header);
    subtitleUI.appendChild(previewArea);
    subtitleUI.appendChild(settings);
    subtitleUI.appendChild(button);
    
    // Assemble the final DOM structure
    content.appendChild(closeBtn);
    content.appendChild(subtitleUI);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
  
    // Add keyboard escape handler
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.getElementById('subtitle-extension-overlay')) {
        overlay.remove();
      }
    });
    
    console.log('UI elements created and added to DOM');
  }
  
  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received in content script:', message);
    
    if (message.action === 'toggle_ui') {
      createAndShowUI();
      sendResponse({ status: 'UI toggled' });
    }
    
    return true; // Keep the message channel open for async response
  });

  console.log('Content script fully initialized, waiting for messages');
})();

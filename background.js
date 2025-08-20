// Simple background script
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    console.log('Extension icon clicked, sending message to tab:', tab.id);
    
    chrome.tabs.sendMessage(
      tab.id, 
      { action: 'toggle_ui' },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError);
          
          // Content script not loaded yet, inject it
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content-script.js']
          }).then(() => {
            console.log('Content script injected successfully');
            // Try again after injection
            setTimeout(() => {
              chrome.tabs.sendMessage(tab.id, { action: 'toggle_ui' });
            }, 100);
          }).catch(err => {
            console.error('Failed to inject content script:', err);
          });
        } else {
          console.log('Response from content script:', response);
        }
      }
    );
  }
});

chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    console.log('Extension icon clicked, sending message to tab:', tab.id);
    
    // Try sending a message to the content script first
    chrome.tabs.sendMessage(
      tab.id, 
      { action: 'toggle_ui' },
      (response) => {
        // If there's an error, the content script might not be loaded
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
          
          // Inject the content script dynamically
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content-script.js']
          }).then(() => {
            // Wait a moment for the script to initialize
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

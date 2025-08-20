// This script runs in the context of the web page
console.log("Extension content script loaded");

// Create and inject your UI
function createUI() {
  console.log("Creating UI elements");
  
  // Create the blur overlay
  const overlay = document.createElement('div');
  overlay.id = 'my-extension-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.backdropFilter = 'blur(5px)';
  overlay.style.zIndex = '9998';
  overlay.style.display = 'none';
  
  // Create your UI container
  const container = document.createElement('div');
  container.id = 'my-extension-ui';
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.backgroundColor = 'white';
  container.style.boxShadow = '0 -2px 10px rgba(0, 0, 0, 0.2)';
  container.style.zIndex = '9999';
  container.style.padding = '20px';
  container.style.borderTopLeftRadius = '15px';
  container.style.borderTopRightRadius = '15px';
  container.style.display = 'none';
  
  // Add your actual UI content
  container.innerHTML = `
    <div class="extension-content">
      <h2>My Extension</h2>
      <p>This is my extension UI content</p>
      <!-- Add your UI elements here -->
    </div>
  `;
  
  // Add to the page
  document.body.appendChild(overlay);
  document.body.appendChild(container);
  
  return { overlay, container };
}

// Handle showing/hiding the UI
function toggleUI() {
  console.log("Toggling UI");
  
  // Get or create UI elements
  let overlay = document.getElementById('my-extension-overlay');
  let container = document.getElementById('my-extension-ui');
  
  if (!overlay || !container) {
    const elements = createUI();
    overlay = elements.overlay;
    container = elements.container;
  }
  
  // Toggle visibility
  if (overlay.style.display === 'none') {
    overlay.style.display = 'block';
    container.style.display = 'block';
  } else {
    overlay.style.display = 'none';
    container.style.display = 'none';
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);
  
  if (message.action === 'toggle_ui') {
    toggleUI();
  }
  
  // Acknowledge receipt
  sendResponse({status: "received"});
});

// Initialize UI elements when the page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, creating initial UI elements");
  createUI();
});

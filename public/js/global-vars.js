// Global variables for the extension
let voskService = null;

function setVoskService(service) {
  voskService = service;
  window.voskService = service;
}

// Make them available globally
window.voskService = voskService;
window.setVoskService = setVoskService;

// Ensure the functions are available immediately
if (typeof window !== 'undefined') {
  window.voskService = voskService;
  window.setVoskService = setVoskService;
}


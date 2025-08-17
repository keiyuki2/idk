// Global variables for the extension
let voskService = null;

function setVoskService(service) {
  voskService = service;
}

// Make them available globally
window.voskService = voskService;
window.setVoskService = setVoskService;


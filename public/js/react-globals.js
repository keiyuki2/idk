// This script creates a global event to signal when React is ready
(function() {
  'use strict';
  
  console.log('React globals script loaded');
  
  // Check if both React and ReactDOM are loaded
  const checkReactReady = () => {
    if (window.React && window.ReactDOM) {
      console.log('React and ReactDOM are ready');
      
      // Create and dispatch the custom event
      const event = new CustomEvent('reactReady');
      window.reactReady = true;
      window.dispatchEvent(event);
    }
  };
  
  // Check immediately
  checkReactReady();
  
  // Also set up an interval to check repeatedly (in case scripts load out of order)
  const checkInterval = setInterval(() => {
    if (window.React && window.ReactDOM) {
      console.log('React and ReactDOM are now ready');
      window.reactReady = true;
      
      // Create and dispatch the custom event
      const event = new CustomEvent('reactReady');
      window.dispatchEvent(event);
      
      // Clear the interval
      clearInterval(checkInterval);
    }
  }, 100);
  
  // Stop checking after 5 seconds
  setTimeout(() => {
    clearInterval(checkInterval);
    if (!window.reactReady) {
      console.error('React or ReactDOM failed to load within 5 seconds');
    }
  }, 5000);
})();

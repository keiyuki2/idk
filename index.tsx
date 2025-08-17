
// Use global React and ReactDOM from UMD builds
const React = window.React || {};
const ReactDOM = window.ReactDOM || {};

// Wait for fonts to load before initializing React
async function initializeApp() {
  // Wait for fonts to load
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  
  // Ensure React is available
  if (!React.createElement || !ReactDOM.createRoot) {
    console.error('React or ReactDOM not available. Make sure scripts are loaded properly.');
    return;
  }

  const { default: App } = await import('./App');

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    React.createElement(React.StrictMode, null,
      React.createElement(App)
    )
  );
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

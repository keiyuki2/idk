
// Wait for React to be ready before initializing the app
async function initializeApp() {
  // Wait for React to be ready
  if (!window.reactReady) {
    await new Promise(resolve => {
      window.addEventListener('reactReady', resolve, { once: true });
    });
  }

  const React = window.React;
  const ReactDOM = window.ReactDOM;

  // Double-check React is available
  if (!React || !ReactDOM || !React.createElement || !ReactDOM.createRoot) {
    console.error('React or ReactDOM still not available after waiting.');
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

// Initialize the app
initializeApp().catch(console.error);

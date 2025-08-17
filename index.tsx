
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

  // Use simple app for testing
  const { default: SimpleApp } = await import('./SimpleApp');

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  console.log('Rendering SimpleApp...');
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    React.createElement(SimpleApp)
  );
}

// Initialize the app
initializeApp().catch(console.error);

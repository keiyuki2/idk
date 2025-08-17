
// Use global React and ReactDOM from UMD builds
const React = window.React;
const ReactDOM = window.ReactDOM;

import App from './App';

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

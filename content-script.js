// Content script to inject the full-screen subtitle UI
(function() {
  'use strict';
  
  console.log('Subtitle extension content script loaded');

  // Create and show the UI
  function createAndShowUI() {
    // Check if the overlay is already injected
    if (document.getElementById('subtitle-extension-overlay')) {
      console.log('UI already exists, removing it');
      document.getElementById('subtitle-extension-overlay').remove();
      return;
    }
  
    console.log('Creating UI elements');
    
    // Create the overlay container with blurry backdrop
    const overlay = document.createElement('div');
    overlay.id = 'subtitle-extension-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(20, 20, 20, 0.8);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
    `;
  
    // Create the React root container
    const reactRoot = document.createElement("div");
    reactRoot.id = "subtitle-extension-root";
    reactRoot.style.cssText = `
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Create a loading indicator to show while React loads
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'subtitle-extension-loading';
    loadingIndicator.style.cssText = `
      text-align: center;
      color: white;
      font-size: 18px;
    `;
    loadingIndicator.innerHTML = `
      <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.3); 
                  border-radius: 50%; border-top-color: white; margin: 0 auto 15px;
                  animation: spin 1s linear infinite;"></div>
      <p>Loading subtitle extension...</p>
    `;
    
    // Add the animation
    const style = document.createElement('style');
    style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
    
    // Add the loading indicator to the react root
    reactRoot.appendChild(loadingIndicator);
  
    // Assemble the overlay
    overlay.appendChild(reactRoot);
  
    // Add to page
    document.body.appendChild(overlay);
  
    // Add keyboard escape handler
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.getElementById('subtitle-extension-overlay')) {
        overlay.remove();
      }
    });
    
    // Load React and other dependencies
    loadDependencies();
  }
  
  function loadDependencies() {
    // List all required scripts in order they need to be loaded
    const scripts = [
      { name: 'React', url: 'https://unpkg.com/react@18/umd/react.production.min.js' },
      { name: 'ReactDOM', url: 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js' },
      { name: 'GSAP', url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js' },
      { name: 'App', url: chrome.runtime.getURL('App.js') }
    ];

    let loadedCount = 0;
    
    // Function to load scripts in sequence
    function loadScript(index) {
      if (index >= scripts.length) {
        // All scripts loaded, initialize the app
        initializeApp();
        return;
      }
      
      const script = document.createElement('script');
      script.src = scripts[index].url;
      
      script.onload = () => {
        console.log(`✓ Loaded ${scripts[index].name}`);
        loadedCount++;
        loadScript(index + 1); // Load the next script
      };
      
      script.onerror = (error) => {
        console.error(`✗ Failed to load ${scripts[index].name}`, error);
        // Try to continue anyway
        loadScript(index + 1);
      };
      
      document.head.appendChild(script);
    }
    
    // Start loading the first script
    loadScript(0);
  }
  
  function initializeApp() {
    console.log('All dependencies loaded, initializing app');
    
    const reactRoot = document.getElementById('subtitle-extension-root');
    const loadingIndicator = document.getElementById('subtitle-extension-loading');
    
    if (!reactRoot) {
      console.error('React root element not found');
      return;
    }

    // Remove loading indicator if it exists
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
    
    // Check if React and ReactDOM are available
    if (!window.React || !window.ReactDOM) {
      console.error('React or ReactDOM not found');
      reactRoot.innerHTML = `
        <div style="text-align: center; padding: 40px; background: white; border-radius: 12px;">
          <h2 style="color: #ff3333; margin-bottom: 15px;">Error Loading Extension</h2>
          <p style="color: #333;">React or ReactDOM libraries could not be loaded.</p>
        </div>
      `;
      return;
    }
    
    try {
      console.log('Checking for App component...');
      
      // Check if we have the App component (either global or in module)
      if (window.App) {
        console.log('Found global App component, rendering');
        const root = window.ReactDOM.createRoot(reactRoot);
        root.render(window.React.createElement(window.App));
      } else {
        console.error('App component not found');
        // Show a simplified UI as fallback
        renderSimplifiedUI(reactRoot);
      }
    } catch (error) {
      console.error('Error rendering App:', error);
      // Show a simplified UI as fallback
      renderSimplifiedUI(reactRoot);
    }
  }
  
  function renderSimplifiedUI(rootElement) {
    const React = window.React;
    const ReactDOM = window.ReactDOM;
    
    if (!React || !ReactDOM) return;
    
    // Simple component that mimics your UI from the screenshot
    const SimpleApp = () => {
      const [bgColor, setBgColor] = React.useState('#000000');
      const [textColor, setTextColor] = React.useState('#FFFFFF');
      
      return React.createElement('div', {
        style: {
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '500px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          position: 'relative'
        }
      }, [
        // Close button
        React.createElement('button', {
          style: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#999'
          },
          onClick: () => {
            document.getElementById('subtitle-extension-overlay').remove();
          }
        }, '×'),
        
        // Title
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px'
          }
        }, [
          React.createElement('span', {
            style: {
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#007BFF',
              marginRight: '10px'
            }
          }, '🎙️'),
          React.createElement('h1', {
            style: {
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#007BFF',
              margin: 0
            }
          }, 'Subtitle Extension')
        ]),
        
        React.createElement('p', {
          style: {
            color: '#666',
            marginBottom: '20px'
          }
        }, 'Real-time subtitle overlay'),
        
        // Preview box
        React.createElement('div', {
          style: {
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '6px',
            marginBottom: '20px'
          }
        }, React.createElement('p', {
          style: {
            margin: 0
          }
        }, 'This is what your subtitles will look like. Adjust the settings to see the changes live.')),
        
        // Settings section
        React.createElement('div', null, [
          React.createElement('h2', {
            style: {
              fontSize: '16px',
              marginBottom: '10px'
            }
          }, 'Settings'),
          
          // Background color
          React.createElement('div', {
            style: {
              marginBottom: '15px'
            }
          }, [
            React.createElement('label', {
              style: {
                display: 'block',
                marginBottom: '5px'
              }
            }, 'Background Color'),
            React.createElement('div', {
              style: {
                display: 'flex',
                gap: '10px'
              }
            }, [
              ['#000000', '#333333', '#0057b7'].map(color => 
                React.createElement('button', {
                  key: color,
                  style: {
                    width: '30px',
                    height: '30px',
                    background: color,
                    border: color === bgColor ? '2px solid #007BFF' : '2px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  },
                  onClick: () => setBgColor(color)
                })
              )
            ])
          ]),
          
          // Text color
          React.createElement('div', {
            style: {
              marginBottom: '20px'
            }
          }, [
            React.createElement('label', {
              style: {
                display: 'block',
                marginBottom: '5px'
              }
            }, 'Text Color'),
            React.createElement('div', {
              style: {
                display: 'flex',
                gap: '10px'
              }
            }, [
              ['#FFFFFF', '#FFFF00', '#00FF00'].map(color => 
                React.createElement('button', {
                  key: color,
                  style: {
                    width: '30px',
                    height: '30px',
                    background: color,
                    border: color === textColor ? '2px solid #007BFF' : '2px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  },
                  onClick: () => setTextColor(color)
                })
              )
            ])
          ])
        ]),
        
        // Start button
        React.createElement('button', {
          style: {
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            width: '100%',
            cursor: 'pointer'
          },
          onMouseOver: (e) => {
            e.currentTarget.style.backgroundColor = '#0069d9';
          },
          onMouseOut: (e) => {
            e.currentTarget.style.backgroundColor = '#007BFF';
          },
          onClick: () => {
            alert('This would start the live subtitles in the full version!');
          }
        }, 'Start Live Subtitles')
      ]);
    };
    
    try {
      const root = ReactDOM.createRoot(rootElement);
      root.render(React.createElement(SimpleApp));
    } catch (error) {
      console.error('Error rendering simplified UI:', error);
      rootElement.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 12px; text-align: center;">
          <h2>Subtitle Extension</h2>
          <p>Sorry, there was an error loading the UI. Please try again later.</p>
        </div>
      `;
    }
  }
  
  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received in content script:', message);
    
    if (message.action === 'toggle_ui') {
      createAndShowUI();
      sendResponse({ status: 'UI toggled' });
    }
    
    return true; // Keep the message channel open for async response
  });

  console.log('Content script fully initialized, waiting for messages');
})();

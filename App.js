// App.js - Modified to work directly in the content script environment
(function() {
  'use strict';
  
  // Use global React if available
  const React = window.React;
  if (!React) {
    console.error('React not available for App.js');
    return;
  }
  
  const { useState } = React;
  
  // Simple App component for the extension
  window.App = function App() {
    const [bgColor, setBgColor] = useState('#000000');
    const [textColor, setTextColor] = useState('#FFFFFF');
    const [showSettings, setShowSettings] = useState(true);
    
    // Function to handle the start button click
    const handleStart = () => {
      setShowSettings(false);
      // Here you would start your actual subtitle processing
      alert('Live subtitles would start here!');
    };
    
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
          backgroundColor: bgColor,
          padding: '15px',
          borderRadius: '6px',
          marginBottom: '20px'
        }
      }, React.createElement('p', {
        style: {
          margin: 0,
          color: textColor
        }
      }, 'This is what your subtitles will look like. Adjust the settings to see the changes live.')),
      
      // Settings section - shown conditionally
      showSettings && React.createElement('div', null, [
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
      
      // Start button or Stop button depending on state
      React.createElement('button', {
        style: {
          backgroundColor: showSettings ? '#007BFF' : '#dc3545',
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
          e.currentTarget.style.backgroundColor = showSettings ? '#0069d9' : '#c82333';
        },
        onMouseOut: (e) => {
          e.currentTarget.style.backgroundColor = showSettings ? '#007BFF' : '#dc3545';
        },
        onClick: () => {
          if (showSettings) {
            handleStart();
          } else {
            setShowSettings(true);
          }
        }
      }, showSettings ? 'Start Live Subtitles' : 'Stop Live Subtitles')
    ]);
  };
  
  console.log('App.js loaded successfully and window.App is available');
})();

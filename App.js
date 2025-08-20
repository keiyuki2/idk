// Simple App component for Chrome extension content script
(function() {
  'use strict';
  
  const React = window.React;
  
  if (!React) {
    console.error('React not available for App.js');
    return;
  }
  
  const { useState, useEffect } = React;
  
  // Simple UI component that will be visible on the blurry background
  window.App = function App() {
    const [count, setCount] = useState ? useState(0) : [0, () => {}];
    const [showAdvanced, setShowAdvanced] = useState ? useState(false) : [false, () => {}];
    
    if (!React.createElement) {
      return React.createElement("div", {
        style: {
          color: "red",
          fontSize: "24px",
          fontWeight: "bold",
          padding: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          border: "2px solid red",
          borderRadius: "8px",
          textAlign: "center"
        }
      }, "React createElement not available");
    }
    
    return React.createElement("div", {
      style: {
        padding: "30px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        border: "2px solid #007bff",
        borderRadius: "12px",
        maxWidth: "600px",
        maxHeight: "80vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
        color: "#333",
        fontFamily: "'Inter', sans-serif"
      }
    },
      // Header
      React.createElement("div", {
        style: {
          textAlign: "center",
          marginBottom: "20px"
        }
      },
        React.createElement("h1", { 
          style: { 
            color: "#007bff", 
            fontSize: "28px",
            margin: "0 0 10px 0",
            fontWeight: "600"
          } 
        }, "🎙️ Subtitle Extension"),
        React.createElement("p", { 
          style: { 
            fontSize: "16px",
            color: "#666",
            margin: "0"
          } 
        }, "Real-time subtitle overlay")
      ),
      
      // Main content area
      React.createElement("div", {
        style: {
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }
      },
        // Counter demo
        React.createElement("div", {
          style: {
            padding: "20px",
            backgroundColor: "rgba(240, 248, 255, 0.8)",
            borderRadius: "8px",
            textAlign: "center",
            border: "1px solid #cce7ff"
          }
        },
          React.createElement("p", { 
            style: { 
              fontSize: "18px",
              color: "#333",
              margin: "0 0 15px 0",
              fontWeight: "500"
            } 
          }, `Demo Counter: ${count}`),
          React.createElement("button", {
            onClick: () => setCount(count + 1),
            style: {
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              transition: "background-color 0.2s"
            },
            onMouseOver: function(e) { e.target.style.backgroundColor = "#0056b3"; },
            onMouseOut: function(e) { e.target.style.backgroundColor = "#007bff"; }
          }, "Increment"),
        ),
        
        // Features list
        React.createElement("div", {
          style: {
            padding: "20px",
            backgroundColor: "rgba(248, 255, 248, 0.8)",
            borderRadius: "8px",
            border: "1px solid #ccffcc"
          }
        },
          React.createElement("h3", {
            style: {
              margin: "0 0 15px 0",
              color: "#28a745",
              fontSize: "18px"
            }
          }, "✨ Features"),
          React.createElement("ul", {
            style: {
              listStyle: "none",
              padding: "0",
              margin: "0",
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }
          },
            React.createElement("li", { style: { color: "#333", fontSize: "14px" } }, "🎯 Real-time subtitle generation"),
            React.createElement("li", { style: { color: "#333", fontSize: "14px" } }, "🎨 Customizable appearance"),
            React.createElement("li", { style: { color: "#333", fontSize: "14px" } }, "📱 Responsive design"),
            React.createElement("li", { style: { color: "#333", fontSize: "14px" } }, "⌨️ Keyboard shortcuts (ESC to close)")
          )
        ),
        
        // Toggle advanced settings
        React.createElement("button", {
          onClick: () => setShowAdvanced(!showAdvanced),
          style: {
            padding: "12px 24px",
            backgroundColor: showAdvanced ? "#6c757d" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
            transition: "all 0.2s"
          }
        }, showAdvanced ? "Hide Settings" : "Show Settings"),
        
        // Advanced settings (conditionally shown)
        showAdvanced && React.createElement("div", {
          style: {
            padding: "20px",
            backgroundColor: "rgba(255, 248, 240, 0.8)",
            borderRadius: "8px",
            border: "1px solid #ffeaa7",
            animation: "fadeIn 0.3s ease"
          }
        },
          React.createElement("h4", {
            style: {
              margin: "0 0 15px 0",
              color: "#e67e22",
              fontSize: "16px"
            }
          }, "⚙️ Settings Panel"),
          React.createElement("p", {
            style: {
              fontSize: "14px",
              color: "#666",
              margin: "0",
              lineHeight: "1.5"
            }
          }, "This is where subtitle customization options would appear. Features like font size, color, position, and speech recognition settings would be available here.")
        )
      ),
      
      // Footer
      React.createElement("div", {
        style: {
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "rgba(248, 249, 250, 0.8)",
          borderRadius: "8px",
          textAlign: "center",
          fontSize: "14px",
          color: "#666",
          border: "1px solid #e9ecef"
        }
      }, 
        React.createElement("strong", { style: { color: "#28a745" } }, "✅ Extension loaded successfully!"),
        React.createElement("br"),
        "Press ESC to close this overlay"
      )
    );
  };
  
  console.log('App.js loaded and window.App is available');
})();
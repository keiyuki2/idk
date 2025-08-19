chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        // This function will be executed as a content script
        const injectApp = () => {
          const existingContainer = document.getElementById("subtitle-extension-root");
          if (existingContainer) {
            existingContainer.style.display = existingContainer.style.display === "none" ? "block" : "none";
            return;
          }

          const overlay = document.createElement("div");
          overlay.id = "subtitle-extension-overlay";
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
            font-family: "Inter", sans-serif;
          `;

          const contentContainer = document.createElement("div");
          contentContainer.id = "subtitle-extension-content";
          contentContainer.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 40px;
            max-width: 90vw;
            max-height: 90vh;
            overflow: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            position: relative;
          `;

          const closeButton = document.createElement("button");
          closeButton.innerHTML = "×";
          closeButton.style.cssText = `
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 30px;
            cursor: pointer;
            color: #666;
            line-height: 1;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          `;

          closeButton.addEventListener("click", function() {
            overlay.remove();
          });

          const reactRoot = document.createElement("div");
          reactRoot.id = "subtitle-extension-root";
          reactRoot.style.cssText = `
            min-height: 400px;
            min-width: 600px;
          `;

          contentContainer.appendChild(closeButton);
          contentContainer.appendChild(reactRoot);
          overlay.appendChild(contentContainer);

          document.body.appendChild(overlay);

          // Ensure React and ReactDOM are available globally
          if (typeof window.React === "undefined" || typeof window.ReactDOM === "undefined") {
            console.error("React or ReactDOM is not loaded. Cannot inject app.");
            return;
          }

          const root = window.ReactDOM.createRoot(reactRoot);
          root.render(
            window.React.createElement(window.React.StrictMode,
              window.React.createElement(window.App)
            )
          );

          document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && document.getElementById("subtitle-extension-overlay")) {
              overlay.remove();
            }
          });
        };

        injectApp();
      },
    });
  }
});



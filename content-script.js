// content-script.js
console.log("Content script loaded.");

// Function to create the custom UI directly
function createCustomUI() {
  // Check if already injected
  if (document.getElementById("subtitle-extension-root")) {
    console.log("Extension UI already injected.");
    return;
  }

  // Create the main container
  const container = document.createElement("div");
  container.id = "subtitle-extension-root";
  container.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      font-family: Arial, sans-serif;
    ">
      <div style="
        background-color: #e0e0e0;
        border-radius: 8px;
        width: 90%;
        max-width: 1000px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      ">
        <!-- Header -->
        <div style="
          padding: 15px 20px;
          background-color: #d0d0d0;
          border-bottom: 1px solid #c0c0c0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <h2 style="margin: 0; font-size: 18px; color: #333;">Subtitle Settings Modal</h2>
          <button onclick="this.closest('#subtitle-extension-root').remove()" style="
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
          ">&times;</button>
        </div>
        
        <!-- Body -->
        <div style="
          padding: 20px;
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        ">
          <!-- About the Creator -->
          <div style="
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            flex: 1;
            min-width: 280px;
            max-width: 32%;
            display: flex;
            flex-direction: column;
          ">
            <h3 style="margin-top: 0; color: #333; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">About the Creator</h3>
            <div style="text-align: center;">
              <div style="
                width: 80px;
                height: 80px;
                border-radius: 50%;
                margin: 0 auto 10px;
                border: 2px solid #007bff;
                background: linear-gradient(45deg, #007bff, #0056b3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
                font-weight: bold;
              ">T</div>
              <h4 style="margin: 5px 0; color: #555;">Presented by Tuvshinbold</h4>
              <p style="font-size: 13px; color: #777; line-height: 1.5;">This extension was proudly developed by a 16-year-old with a passion for building helpful and creative tools for the web.</p>
              <p style="font-size: 13px; color: #777; line-height: 1.5;">This project combines real-time AI transcription with a fully customizable UI to make web content more accessible for everyone.</p>
            </div>
          </div>
          
          <!-- Preview -->
          <div style="
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            flex: 1;
            min-width: 280px;
            max-width: 32%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          ">
            <h3 style="margin-top: 0; color: #333; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px; width: 100%; text-align: left;">Preview</h3>
            <div style="
              background-color: #333;
              color: #fff;
              padding: 20px;
              border-radius: 6px;
              text-align: center;
              width: 100%;
              box-sizing: border-box;
              margin-bottom: 20px;
            ">This is what your subtitles will look like. Adjust the settings to see the changes live.</div>
            <button style="
              background-color: #007bff;
              color: #fff;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              font-size: 14px;
            ">Save Current Style as a Preset</button>
          </div>
          
          <!-- User Guide -->
          <div style="
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            flex: 1;
            min-width: 280px;
            max-width: 32%;
            display: flex;
            flex-direction: column;
          ">
            <h3 style="margin-top: 0; color: #333; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">User Guide</h3>
            <div style="margin-bottom: 15px;">
              <h4 style="margin: 0 0 10px 0; color: #333; font-size: 14px;">Getting Started</h4>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 10px; font-size: 14px; color: #555;">📝 Go to <strong>Processing</strong> and enter your Google Gemini API key to enable transcription.</li>
                <li style="margin-bottom: 10px; font-size: 14px; color: #555;">▶️ Click <strong>Start Live</strong> to begin real-time subtitles or <strong>Upload File</strong> to process a local file.</li>
              </ul>
            </div>
            <div>
              <h4 style="margin: 0 0 10px 0; color: #333; font-size: 14px;">Pro-Tips</h4>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 10px; font-size: 14px; color: #555;">🎨 Customize subtitle style in <strong>Appearance</strong>, then save your look in <strong>Saved</strong> presets.</li>
                <li style="margin-bottom: 10px; font-size: 14px; color: #555;">📍 Enter <strong>Position</strong> mode to drag and resize the subtitle box anywhere on the screen.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="
          padding: 15px 20px;
          background-color: #d0d0d0;
          border-top: 1px solid #c0c0c0;
          display: flex;
          justify-content: center;
          align-items: center;
        ">
          <div style="display: flex; gap: 10px;">
            <button style="background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; padding: 8px; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">📤</button>
            <button style="background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; padding: 8px; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">⚙️</button>
            <button style="background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; padding: 8px; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">🔤</button>
            <button style="background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; padding: 8px; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">🎨</button>
            <button style="background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; padding: 8px; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">📐</button>
            <button style="background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; padding: 8px; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">💾</button>
            <button style="background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; padding: 8px; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">🔍</button>
            <button style="background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; padding: 8px; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">ℹ️</button>
          </div>
        </div>
        
        <!-- Exit takeover button -->
        <div style="
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        ">
          <button onclick="this.closest('#subtitle-extension-root').remove()" style="
            background-color: #333;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
          ">Exit takeover</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(container);
  console.log("Custom UI injected successfully!");
}

// Inject the custom UI
createCustomUI();


chrome.action.onClicked.addListener(d=>{d.id&&chrome.scripting.executeScript({target:{tabId:d.id},function:()=>{(()=>{const i=document.getElementById("subtitle-extension-root");if(i){i.style.display=i.style.display==="none"?"block":"none";return}const e=document.createElement("div");e.id="subtitle-extension-overlay",e.style.cssText=`
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
          `;const t=document.createElement("div");t.id="subtitle-extension-content",t.style.cssText=`
            background: white;
            border-radius: 12px;
            padding: 40px;
            max-width: 90vw;
            max-height: 90vh;
            overflow: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            position: relative;
          `;const n=document.createElement("button");n.innerHTML="×",n.style.cssText=`
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
          `,n.addEventListener("click",function(){e.remove()});const o=document.createElement("div");if(o.id="subtitle-extension-root",o.style.cssText=`
            min-height: 400px;
            min-width: 600px;
          `,t.appendChild(n),t.appendChild(o),e.appendChild(t),document.body.appendChild(e),typeof window.React>"u"||typeof window.ReactDOM>"u"){console.error("React or ReactDOM is not loaded. Cannot inject app.");return}window.ReactDOM.createRoot(o).render(window.React.createElement(window.React.StrictMode,window.React.createElement(window.App))),document.addEventListener("keydown",function(c){c.key==="Escape"&&document.getElementById("subtitle-extension-overlay")&&e.remove()})})()}})});

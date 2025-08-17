// Local import map for the extension
const importMap = {
  "imports": {
    "react-dom/": "/public/js/react-dom.js",
    "react/": "/public/js/react.js",
    "react": "/public/js/react.js",
    "@google/genai": "/public/js/google-genai.js",
    "gsap": "/public/js/gsap.js",
    "gsap/ScrollTrigger": "/public/js/gsap.js",
    "gsap/SplitText": "/public/js/gsap.js",
    "gsap/": "/public/js/gsap.js"
  }
};

// Create and inject the import map script
const script = document.createElement('script');
script.type = 'importmap';
script.textContent = JSON.stringify(importMap);
document.head.appendChild(script);


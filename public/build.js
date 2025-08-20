const fs = require('fs');
const path = require('path');

// Create dist folder if it doesn't exist
const distFolder = path.join(__dirname, 'dist');
if (!fs.existsSync(distFolder)) {
  fs.mkdirSync(distFolder, { recursive: true });
}

// Copy manifest.json
fs.copyFileSync(
  path.join(__dirname, 'manifest.json'),
  path.join(distFolder, 'manifest.json')
);
console.log('✓ Copied manifest.json');

// Copy background.js
fs.copyFileSync(
  path.join(__dirname, 'background.js'),
  path.join(distFolder, 'background.js')
);
console.log('✓ Copied background.js');

// Copy content-script.js
fs.copyFileSync(
  path.join(__dirname, 'content-script.js'),
  path.join(distFolder, 'content-script.js')
);
console.log('✓ Copied content-script.js');

// Create icons folder if needed
const iconsFolder = path.join(distFolder, 'icons');
if (!fs.existsSync(iconsFolder)) {
  fs.mkdirSync(iconsFolder, { recursive: true });
}

// Copy icons if they exist
const iconSizes = [16, 48, 128];
for (const size of iconSizes) {
  const iconFile = `icon${size}.png`;
  const srcPath = path.join(__dirname, 'icons', iconFile);
  const destPath = path.join(iconsFolder, iconFile);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${iconFile}`);
  } else {
    console.log(`! Icon ${iconFile} not found, creating a placeholder`);
    
    // Create a simple colored square as placeholder
    const placeholderPath = path.join(__dirname, 'dist', 'icons', iconFile);
    try {
      // You would need a library to create actual PNG files, 
      // but for simplicity, we'll just create an empty file as a placeholder
      fs.writeFileSync(destPath, '');
      console.log(`  Created placeholder for ${iconFile}`);
    } catch (err) {
      console.error(`  Failed to create placeholder for ${iconFile}`, err);
    }
  }
}

console.log('Build completed successfully!');

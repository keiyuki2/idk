const fs = require('fs');
const path = require('path');

// Create dist folder if it doesn't exist
const distFolder = path.join(__dirname, 'dist');
if (!fs.existsSync(distFolder)) {
  fs.mkdirSync(distFolder, { recursive: true });
}

// Files to copy directly
const filesToCopy = [
  'manifest.json',
  'background.js',
  'content-script.js',
  'App.js'
];

// Copy each file
filesToCopy.forEach(file => {
  try {
    fs.copyFileSync(
      path.join(__dirname, file),
      path.join(distFolder, file)
    );
    console.log(`✓ Copied ${file}`);
  } catch (error) {
    console.error(`✗ Error copying ${file}:`, error.message);
  }
});

// Create icons folder if needed
const iconsFolder = path.join(distFolder, 'icons');
if (!fs.existsSync(iconsFolder)) {
  fs.mkdirSync(iconsFolder, { recursive: true });
}

// Copy icons if they exist
const iconSizes = [16, 48, 128];
iconSizes.forEach(size => {
  const iconFile = `icon${size}.png`;
  const srcPath = path.join(__dirname, 'icons', iconFile);
  const destPath = path.join(iconsFolder, iconFile);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${iconFile}`);
  } else {
    console.log(`! Icon ${iconFile} not found`);
  }
});

console.log('Build completed successfully!');

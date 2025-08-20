const fs = require('fs');
const path = require('path');

// Create dist folder if it doesn't exist
const distFolder = path.join(__dirname, 'dist');
if (!fs.existsSync(distFolder)) {
  fs.mkdirSync(distFolder, { recursive: true });
}

// Files to copy directly from root
const rootFilesToCopy = [
  'background.js',
  'content-script.js',
  'App.js'
];

// Copy each root file
rootFilesToCopy.forEach(file => {
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

// Copy public folder contents
const publicSrcPath = path.join(__dirname, 'public');
const publicDestPath = path.join(distFolder, 'public');

// Recursive function to copy a directory
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  // Get all files in the source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  // Copy each entry (file or directory)
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively copy directories
      copyDir(srcPath, destPath);
    } else {
      // Copy files
      fs.copyFileSync(srcPath, destPath);
      console.log(`✓ Copied ${path.relative(__dirname, srcPath)} to ${path.relative(__dirname, destPath)}`);
    }
  }
}

// Copy the entire public directory
try {
  copyDir(publicSrcPath, publicDestPath);
} catch (error) {
  console.error(`✗ Error copying public folder:`, error.message);
}

// Copy manifest.json to root of dist
try {
  fs.copyFileSync(
    path.join(__dirname, 'public', 'manifest.json'),
    path.join(distFolder, 'manifest.json')
  );
  console.log(`✓ Copied manifest.json to dist root`);
} catch (error) {
  console.error(`✗ Error copying manifest.json:`, error.message);
}

console.log('Build completed successfully!');

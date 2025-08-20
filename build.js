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

// Copy public/js folder contents
const jsSrcPath = path.join(__dirname, 'public', 'js');
const jsDestPath = path.join(distFolder, 'public', 'js');

// Create public/js folder in dist
if (!fs.existsSync(jsDestPath)) {
  fs.mkdirSync(jsDestPath, { recursive: true });
}

// Copy JS files
try {
  const jsFiles = fs.readdirSync(jsSrcPath);
  for (const file of jsFiles) {
    const srcPath = path.join(jsSrcPath, file);
    const destPath = path.join(jsDestPath, file);
    
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✓ Copied public/js/${file}`);
    }
  }
} catch (error) {
  console.error(`✗ Error copying public/js folder:`, error.message);
}

// Copy icons to dist/icons folder (not under public)
const iconsSrcPath = path.join(__dirname, 'public', 'icons');
const iconsDestPath = path.join(distFolder, 'icons');

// Create icons folder in dist
if (!fs.existsSync(iconsDestPath)) {
  fs.mkdirSync(iconsDestPath, { recursive: true });
}

// Copy icon files
try {
  const iconFiles = fs.readdirSync(iconsSrcPath);
  for (const file of iconFiles) {
    const srcPath = path.join(iconsSrcPath, file);
    const destPath = path.join(iconsDestPath, file);
    
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✓ Copied icons/${file}`);
    }
  }
} catch (error) {
  console.error(`✗ Error copying icons folder:`, error.message);
}

// Copy manifest.json to root of dist
try {
  // Read the manifest file
  let manifest = JSON.parse(fs.readFileSync(
    path.join(__dirname, 'public', 'manifest.json'), 
    'utf8'
  ));
  
  // Fix icon paths if needed
  if (manifest.action && manifest.action.default_icon) {
    const iconPaths = manifest.action.default_icon;
    for (const size in iconPaths) {
      if (iconPaths[size].startsWith('public/icons/')) {
        iconPaths[size] = iconPaths[size].replace('public/icons/', 'icons/');
      }
    }
  }
  
  // Write updated manifest to dist
  fs.writeFileSync(
    path.join(distFolder, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`✓ Copied and updated manifest.json to dist root`);
} catch (error) {
  console.error(`✗ Error updating manifest.json:`, error.message);
}

console.log('Build completed successfully!');

const fs = require('fs');
const path = require('path');

// Make sure the public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a simplified SVG template file
// This version has only the essential elements needed for the generator
const svgTemplate = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="10.125in"
   height="7.625in"
   viewBox="0 0 257.17501 193.675"
   version="1.1"
   id="svg5"
   xmlns="http://www.w3.org/2000/svg">
  <title id="title140310">Blockbuster VHS template</title>
  
  <!-- Main blue background -->
  <g transform="translate(0,0)">
    <!-- Blue background rectangle -->
    <rect
       style="fill:#354e7a;fill-opacity:1"
       width="256"
       height="192"
       x="0"
       y="0" />
    
    <!-- Yellow lines -->
    <path
       style="fill:none;stroke:#ecac10;stroke-width:0.8;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       d="m 28.998622,136.61917 82.001628,-0.003" />
    
    <path
       style="display:inline;fill:none;stroke:#ecac10;stroke-width:0.8;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       d="m 167.08357,31.349598 0.001,153.339062 82.00162,-0.004 -0.006,-154.695568" />
    
    <path
       style="display:inline;fill:none;stroke:#ecac10;stroke-width:0.8;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       d="m 29.003616,31.427531 10e-4,153.261129 82.001624,-0.004 -0.006,-154.515069" />
  </g>
  
  <!-- Title text at the top -->
  <text
     transform="rotate(90)"
     style="font-weight:bold;font-size:6.53724px;line-height:1;font-family:'Liberation Sans';fill:#ffffff"
     x="10.780658"
     y="-142.13525">
    <tspan
       x="10.780658"
       y="-142.13525">FIGHT CLUB</tspan>
  </text>
  
  <!-- Category text -->
  <text
     transform="rotate(90)"
     style="font-size:4.35816px;font-family:'Liberation Sans';fill:#ffffff"
     x="11.00138"
     y="-137.09912">
    <tspan
       x="11.00138"
       y="-137.09912">CATEGORY: DRAMA</tspan>
  </text>
  
  <!-- Rating text -->
  <text
     transform="rotate(90)"
     style="font-size:4.35816px;font-family:'Liberation Sans';fill:#ffffff"
     x="10.857597"
     y="-132.00865">
    <tspan
       x="10.857597"
       y="-132.00865">RATING: <tspan style="font-weight:bold">R</tspan></tspan>
  </text>
  
  <!-- Rent code text -->
  <text
     transform="rotate(90)"
     style="font-size:4.35816px;font-family:'Liberation Sans';fill:#ffffff"
     x="46.944378"
     y="-132.0807">
    <tspan
       x="46.944378"
       y="-132.0807">RENT CODE: T</tspan>
  </text>
  
  <!-- Product code text -->
  <text
     transform="rotate(90)"
     style="font-size:4.35816px;font-family:'Liberation Sans';fill:#ffffff"
     x="85.386307"
     y="-132.0807">
    <tspan
       x="85.386307"
       y="-132.0807">FOX 20000306</tspan>
  </text>
  
  <!-- Bottom title text (front side) -->
  <text
     transform="rotate(-90)"
     style="font-weight:bold;font-size:4.90293px;font-family:'Liberation Sans';fill:#ffffff"
     x="-132.43492"
     y="263.90442">
    <tspan
       x="-132.43492"
       y="263.90442">FIGHT CLUB</tspan>
  </text>
  
  <!-- Second title (spine) -->
  <text
     transform="rotate(90)"
     style="font-weight:bold;font-size:4.90293px;font-family:'Liberation Sans';fill:#ffffff"
     x="35.546677"
     y="-14.01248">
    <tspan
       x="35.546677"
       y="-14.01248">FIGHT CLUB</tspan>
  </text>
  
  <!-- Blockbuster warning text -->
  <g>
    <text
       style="font-weight:bold;font-size:4.94586px;line-height:1;font-family:'Liberation Sans Narrow';fill:#ecac10"
       x="32.790974"
       y="141.42719">
      <tspan
         x="32.790974"
         y="141.42719">PLEASE REWIND AFTER VIEWING</tspan>
    </text>
  </g>
</svg>`;

// Write the template to the public directory
fs.writeFileSync(path.join(publicDir, 'blockbuster-template.svg'), svgTemplate);

console.log('SVG template created successfully in the public directory');

// Optional: Create a basic index.html file if it doesn't exist
if (!fs.existsSync(path.join(publicDir, 'index.html'))) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blockbuster VHS Template</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>Blockbuster VHS Template</h1>
  <p>This is a static preview of the VHS template. Use the VHS Label Generator application to customize it.</p>
  <div>
    <img src="./blockbuster-template.svg" alt="Blockbuster VHS Template" style="max-width: 100%; height: auto;" />
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(publicDir, 'index.html'), htmlContent);
  console.log('Basic HTML preview created');
}

// Create a package.json file for dependencies if it doesn't exist
const rootDir = process.cwd();
if (!fs.existsSync(path.join(rootDir, 'package.json'))) {
  const packageJson = {
    name: "blockbuster-vhs-generator",
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint",
      setup: "node scripts/setup.js"
    },
    dependencies: {
      next: "latest",
      react: "latest",
      "react-dom": "latest",
      jsdom: "^21.1.1"
    },
    devDependencies: {
      autoprefixer: "latest",
      postcss: "latest",
      tailwindcss: "latest",
      eslint: "latest",
      "eslint-config-next": "latest"
    }
  };

  fs.writeFileSync(
    path.join(rootDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  console.log('package.json created');
}

console.log('Setup complete! You can now run "npm install" and then "npm run dev" to start the application.');
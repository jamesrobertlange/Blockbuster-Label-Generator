# Setup Guide for Blockbuster VHS Label Generator

This guide provides detailed instructions for setting up the Blockbuster VHS Label Generator application on your local machine.

## Prerequisites

- Node.js (version 14.0.0 or higher)
- npm or yarn
- Git

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/blockbuster-vhs-generator.git
cd blockbuster-vhs-generator
```

## Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

## Step 3: Set Up the SVG Template

1. Create a `public` directory in the root of your project (if it doesn't already exist):

```bash
mkdir -p public
```

2. Copy the Blockbuster VHS SVG template to the public directory. You have two options:

### Option A: Use the original SVG file

If you have the original SVG file, copy it to the public directory with the name `blockbuster-template.svg`.

### Option B: Create a minimal version from scratch

1. Create a new file named `blockbuster-template.svg` in the public directory.
2. Paste the following SVG code (this is a simplified version that contains the essential elements):

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="10.125in"
   height="7.625in"
   viewBox="0 0 257.17501 193.675"
   version="1.1"
   id="svg5"
   xmlns="http://www.w3.org/2000/svg">
  <!-- Base Blockbuster blue background -->
  <rect
     style="fill:#354e7a;fill-opacity:1"
     width="257.17501"
     height="193.675"
     x="0"
     y="0"
     ry="0" />
  
  <!-- Text elements -->
  <text
     transform="rotate(90)"
     style="font-weight:bold;font-size:6.53724px;font-family:'Liberation Sans';fill:#ffffff"
     x="10.780658"
     y="-142.13525">
    <tspan
       x="10.780658"
       y="-142.13525">FIGHT CLUB</tspan>
  </text>
  
  <text
     transform="rotate(90)"
     style="font-size:4.35816px;font-family:'Liberation Sans';fill:#ffffff"
     x="11.00138"
     y="-137.09912">
    <tspan
       x="11.00138"
       y="-137.09912">CATEGORY: DRAMA</tspan>
  </text>
  
  <text
     transform="rotate(90)"
     style="font-size:4.35816px;font-family:'Liberation Sans';fill:#ffffff"
     x="10.857597"
     y="-132.00865">
    <tspan
       x="10.857597"
       y="-132.00865">RATING: R</tspan>
  </text>
  
  <text
     transform="rotate(90)"
     style="font-size:4.35816px;font-family:'Liberation Sans';fill:#ffffff"
     x="46.944378"
     y="-132.0807">
    <tspan
       x="46.944378"
       y="-132.0807">RENT CODE: T</tspan>
  </text>
  
  <text
     transform="rotate(90)"
     style="font-size:4.35816px;font-family:'Liberation Sans';fill:#ffffff"
     x="85.386307"
     y="-132.0807">
    <tspan
       x="85.386307"
       y="-132.0807">FOX 20000306</tspan>
  </text>
  
  <text
     transform="rotate(-90)"
     style="font-weight:bold;font-size:4.90293px;font-family:'Liberation Sans';fill:#ffffff"
     x="-132.43492"
     y="263.90442">
    <tspan
       x="-132.43492"
       y="263.90442">FIGHT CLUB</tspan>
  </text>
  
  <text
     transform="rotate(90)"
     style="font-weight:bold;font-size:4.90293px;font-family:'Liberation Sans';fill:#ffffff"
     x="35.546677"
     y="-14.01248">
    <tspan
       x="35.546677"
       y="-14.01248">FIGHT CLUB</tspan>
  </text>
  
  <!-- Blockbuster Logo (simplified) -->
  <rect
     style="fill:#ecac10;fill-opacity:1"
     width="82"
     height="1"
     x="29"
     y="136.5" />
  
  <rect
     style="fill:#ecac10;fill-opacity:1"
     width="82"
     height="1"
     x="167"
     y="136.5" />
</svg>
```

## Step 4: Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Step 5: Use the Application

1. Open your browser and navigate to http://localhost:3000
2. Use the form on the left to customize your VHS label
3. Click "Update Preview" to see your changes
4. When you're satisfied with your design, click "Download SVG"

## Troubleshooting

### SVG not loading properly

If you encounter issues with the SVG template not loading properly:

1. Make sure the file is named exactly `blockbuster-template.svg` and is in the `public` directory
2. Check that the SVG file is valid by opening it in a web browser
3. Look for any errors in the browser console or server logs

### API errors

If you see errors related to the API endpoint:

1. Make sure the JSDOM package is installed (`npm install jsdom`)
2. Check the server logs for specific error messages
3. Ensure the API route file (`pages/api/update-svg.js`) exists and is correctly formatted

### Other issues

For any other issues:

1. Try restarting the development server
2. Clear your browser cache
3. Check for errors in your browser's developer console
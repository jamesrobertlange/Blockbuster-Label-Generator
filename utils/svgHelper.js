/**
 * Update the SVG with the provided parameters
 * @param {string} svgData - The original SVG data
 * @param {Object} params - The parameters to update
 * @returns {string} - The updated SVG data
 */
export function updateSvg(svgData, params) {
  const { title, category, rating, rentCode, productCode } = params;
  
  if (!svgData) return null;
  
  let updatedSvg = svgData;
  
  // Replace the title (multiple instances)
  updatedSvg = updatedSvg.replace(/FIGHT CLUB/g, title);
  
  // Replace the category
  updatedSvg = updatedSvg.replace(/CATEGORY: DRAMA/g, `CATEGORY: ${category}`);
  
  // Replace the rating
  updatedSvg = updatedSvg.replace(/RATING: R/g, `RATING: ${rating}`);
  updatedSvg = updatedSvg.replace(/id="tspan67519">(.*?)<\/tspan>/g, `id="tspan67519">${rating}</tspan>`);
  
  // Replace the rent code
  updatedSvg = updatedSvg.replace(/RENT CODE: T/g, `RENT CODE: ${rentCode}`);
  
  // Replace the product code
  updatedSvg = updatedSvg.replace(/FOX 20000306/g, productCode);
  
  return updatedSvg;
}

/**
 * Download the SVG file
 * @param {string} svgData - The SVG data to download
 * @param {string} filename - The filename for the download
 */
export function downloadSvg(svgData, filename) {
  if (!svgData) return;
  
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Convert SVG to PNG and download
 * @param {string} svgData - The SVG data
 * @param {string} filename - The filename for the download
 */
export function svgToPngDownload(svgData, filename) {
  if (!svgData) return;
  
  // Create a temporary SVG element
  const svg = new DOMParser().parseFromString(svgData, 'image/svg+xml').documentElement;
  
  // Extract width and height from the SVG
  let svgWidth = parseFloat(svg.getAttribute('width').replace('in', '')) * 96; // Convert inches to pixels (96 dpi)
  let svgHeight = parseFloat(svg.getAttribute('height').replace('in', '')) * 96;
  
  // Ensure we have valid dimensions
  if (isNaN(svgWidth) || isNaN(svgHeight)) {
    // Fallback dimensions
    svgWidth = 972; // 10.125in * 96dpi
    svgHeight = 732; // 7.625in * 96dpi
  }
  
  // Create a canvas element with the appropriate size
  const canvas = document.createElement('canvas');
  canvas.width = svgWidth;
  canvas.height = svgHeight;
  const ctx = canvas.getContext('2d');
  
  // Fill background with white (SVGs might have transparent backgrounds)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Create an image to draw the SVG
  const img = new Image();
  
  // Set up the image loading handler
  img.onload = function() {
    // Draw the image on the canvas
    ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
    
    // Convert canvas to PNG and download
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };
  
  // Handle errors
  img.onerror = function() {
    console.error('Error loading SVG for PNG conversion');
  };
  
  // Set the image source to a blob URL of the SVG
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svgBlob);
  img.src = url;
}
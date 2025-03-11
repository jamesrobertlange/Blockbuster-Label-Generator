/**
 * Update the SVG with the provided parameters
 * @param {string} svgData - The original SVG data
 * @param {Object} params - The parameters to update
 * @returns {string} - The updated SVG data
 */
export function updateSvg(svgData, params) {
    const { title, category, rating, rentCode, productCode } = params;
    
    if (!svgData) return null;
    
    // Create a DOM parser to handle the SVG
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgData, 'image/svg+xml');
    
    // Find and update the title text
    const titleTextElements = doc.querySelectorAll('text[transform="rotate(90)"] tspan');
    titleTextElements.forEach(element => {
      if (element.textContent.includes('FIGHT CLUB')) {
        element.textContent = title;
      }
    });
    
    // Find and update the category
    const categoryTextElements = doc.querySelectorAll('text[transform="rotate(90)"] tspan');
    categoryTextElements.forEach(element => {
      if (element.textContent.includes('CATEGORY:')) {
        element.textContent = `CATEGORY: ${category}`;
      }
    });
    
    // Find and update the rating
    const ratingTextElements = doc.querySelectorAll('text[transform="rotate(90)"] tspan');
    ratingTextElements.forEach(element => {
      if (element.textContent.includes('RATING:')) {
        element.textContent = `RATING: ${rating}`;
      }
    });
    
    // Find and update the rent code
    const rentCodeTextElements = doc.querySelectorAll('text[transform="rotate(90)"] tspan');
    rentCodeTextElements.forEach(element => {
      if (element.textContent.includes('RENT CODE:')) {
        element.textContent = `RENT CODE: ${rentCode}`;
      }
    });
    
    // Find and update the product code
    const productCodeTextElements = doc.querySelectorAll('text[transform="rotate(90)"] tspan');
    productCodeTextElements.forEach(element => {
      if (element.textContent.includes('FOX 20000306')) {
        element.textContent = productCode;
      }
    });
    
    // Also update the title text at the bottom of the label
    const bottomTitleElements = doc.querySelectorAll('text[transform="rotate(-90)"] tspan, text[y="-14.01248"] tspan');
    bottomTitleElements.forEach(element => {
      if (element.textContent.includes('FIGHT CLUB')) {
        element.textContent = title;
      }
    });
    
    // Serialize the updated SVG back to a string
    const serializer = new XMLSerializer();
    return serializer.serializeToString(doc);
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
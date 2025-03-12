import React, { useState, useEffect } from 'react';

const VHSLabelGenerator = () => {
  const [title, setTitle] = useState('FIGHT CLUB');
  const [category, setCategory] = useState('DRAMA');
  const [rating, setRating] = useState('R');
  const [rentCode, setRentCode] = useState('T');
  const [productCode, setProductCode] = useState('FOX 20000306');
  const [svgContent, setSvgContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Character limits
  const TITLE_MAX_LENGTH = 25;
  const RENT_CODE_MAX_LENGTH = 3;
  const PRODUCT_CODE_MAX_LENGTH = 18;

  // Fetch the SVG template directly
  useEffect(() => {
    const fetchSvg = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/blockbuster-template.svg');
        const text = await response.text();
        setSvgContent(text);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading SVG template:', error);
        setIsLoading(false);
      }
    };
    
    fetchSvg();
  }, []);

  // Update SVG content with form values
  const updateSvg = () => {
    if (!svgContent) return '';
    
    let updatedSvg = svgContent;
    
    // Replace the title (multiple instances)
    updatedSvg = updatedSvg.replace(/FIGHT CLUB/g, title);
    
    // Replace the category
    updatedSvg = updatedSvg.replace(/CATEGORY: DRAMA/g, `CATEGORY: ${category}`);
    
    // Replace the rating - targeting the nested tspan
    // This finds the pattern: id="tspan67519">R</tspan>
    updatedSvg = updatedSvg.replace(/id="tspan67519">(.*?)<\/tspan>/g, `id="tspan67519">${rating}</tspan>`);
    
    // Replace the rent code
    updatedSvg = updatedSvg.replace(/RENT CODE: T/g, `RENT CODE: ${rentCode}`);
    
    // Replace the product code
    updatedSvg = updatedSvg.replace(/FOX 20000306/g, productCode);
    
    return updatedSvg;
  };

  // Update preview automatically when form values change
  useEffect(() => {
    if (!isLoading) {
      const previewDiv = document.getElementById('preview-container');
      if (previewDiv) {
        previewDiv.innerHTML = updateSvg();
      }
    }
  }, [title, category, rating, rentCode, productCode, svgContent, isLoading]);
  
  const handleDownloadSvg = () => {
    const updatedSvg = updateSvg();
    if (!updatedSvg) return;
    
    const blob = new Blob([updatedSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `blockbuster-vhs-${title.toLowerCase().replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    const updatedSvg = updateSvg();
    if (!updatedSvg) return;
    
    // Create a temporary SVG element
    const svg = new DOMParser().parseFromString(updatedSvg, 'image/svg+xml').documentElement;
    
    // Get the SVG dimensions
    const svgWidth = svg.getAttribute('width').replace('in', '') * 96; // Convert inches to pixels (96 dpi)
    const svgHeight = svg.getAttribute('height').replace('in', '') * 96;
    
    // Add extra padding to bottom to match top whitespace
    const verticalPadding = 20; // Pixels of padding to add to bottom
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = svgWidth;
    canvas.height = svgHeight + verticalPadding;
    const ctx = canvas.getContext('2d');
    
    // Fill canvas with white background first
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create an image to draw the SVG
    const img = new Image();
    img.onload = () => {
      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
      
      // Convert canvas to PNG
      const pngUrl = canvas.toDataURL('image/png');
      
      // Download the PNG
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `blockbuster-vhs-${title.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
    };
    
    // Set the image source to the SVG blob URL
    const svgBlob = new Blob([updatedSvg], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
    img.src = svgUrl;

    // Clean up
    img.onload = function() {
      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
      
      // Convert canvas to PNG
      const pngUrl = canvas.toDataURL('image/png');
      
      // Download the PNG
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `blockbuster-vhs-${title.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      
      // Clean up
      URL.revokeObjectURL(svgUrl);
    };
    
    img.src = svgUrl;
  };

  // Handle input change with character limit
  const handleTitleChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= TITLE_MAX_LENGTH) {
      setTitle(value);
    }
  };

  const handleRentCodeChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= RENT_CODE_MAX_LENGTH) {
      setRentCode(value);
    }
  };

  const handleProductCodeChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= PRODUCT_CODE_MAX_LENGTH) {
      setProductCode(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Blockbuster VHS Label Generator</h1>
      <p className="text-center mb-8">Create your own custom Blockbuster VHS label</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Edit Label</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title: ({title.length}/{TITLE_MAX_LENGTH})</label>
            <input 
              type="text" 
              value={title} 
              onChange={handleTitleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded"
              maxLength={TITLE_MAX_LENGTH}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category:</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="ACTION">ACTION</option>
              <option value="COMEDY">COMEDY</option>
              <option value="DRAMA">DRAMA</option>
              <option value="HORROR">HORROR</option>
              <option value="SCI-FI">SCI-FI</option>
              <option value="THRILLER">THRILLER</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating:</label>
            <select 
              value={rating} 
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="NC-17">NC-17</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rent Code: ({rentCode.length}/{RENT_CODE_MAX_LENGTH})</label>
            <input 
              type="text" 
              value={rentCode} 
              onChange={handleRentCodeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              maxLength={RENT_CODE_MAX_LENGTH}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Product Code: ({productCode.length}/{PRODUCT_CODE_MAX_LENGTH})</label>
            <input 
              type="text" 
              value={productCode} 
              onChange={handleProductCodeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              maxLength={PRODUCT_CODE_MAX_LENGTH}
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleDownloadSvg} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Download SVG
            </button>
            <button 
              onClick={handleDownloadPng} 
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Download PNG
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div id="preview-container" className="border border-gray-300 rounded p-4 min-h-[400px] flex items-center justify-center">
            {isLoading ? (
              <p className="text-gray-500">Loading preview...</p>
            ) : (
              <div className="max-w-full" dangerouslySetInnerHTML={{ __html: updateSvg() }} />
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Customize your VHS label using the form above</li>
          <li>The preview updates automatically as you make changes</li>
          <li>When you're satisfied with your design, click "Download SVG" for vector format or "Download PNG" for image format</li>
          <li>You can open and further edit the SVG file in any vector graphics software like Inkscape or Adobe Illustrator</li>
        </ol>
      </div>
    </div>
  );
};

export default VHSLabelGenerator;
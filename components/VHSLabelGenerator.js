import React, { useState, useEffect } from 'react';

const VHSLabelGenerator = () => {
  const [title, setTitle] = useState('FIGHT CLUB');
  const [category, setCategory] = useState('DRAMA');
  const [rating, setRating] = useState('R');
  const [rentCode, setRentCode] = useState('T');
  const [productCode, setProductCode] = useState('FOX 20000306');
  const [svgContent, setSvgContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
  
  const handleDownload = () => {
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

  return (
    <div>
      <h1>Blockbuster VHS Label Generator</h1>
      <p>Create your own custom Blockbuster VHS label</p>
      
      <div>
        <h2>Edit Label</h2>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          />
        </div>
        
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="ACTION">ACTION</option>
            <option value="COMEDY">COMEDY</option>
            <option value="DRAMA">DRAMA</option>
            <option value="HORROR">HORROR</option>
            <option value="SCI-FI">SCI-FI</option>
            <option value="THRILLER">THRILLER</option>
          </select>
        </div>
        
        <div>
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
            <option value="NC-17">NC-17</option>
          </select>
        </div>
        
        <div>
          <label>Rent Code:</label>
          <input 
            type="text" 
            value={rentCode} 
            onChange={(e) => setRentCode(e.target.value.toUpperCase())} 
          />
        </div>
        
        <div>
          <label>Product Code:</label>
          <input 
            type="text" 
            value={productCode} 
            onChange={(e) => setProductCode(e.target.value.toUpperCase())} 
          />
        </div>
        
        <button onClick={handleDownload}>Download SVG</button>
      </div>
      
      <div>
        <h2>Preview</h2>
        <div id="preview-container" style={{ border: '1px solid #ccc', padding: '10px', minHeight: '400px' }}>
          {isLoading ? (
            <p>Loading preview...</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: updateSvg() }} />
          )}
        </div>
      </div>
      
      <div>
        <h2>Instructions</h2>
        <ol>
          <li>Customize your VHS label using the form above</li>
          <li>The preview updates automatically as you make changes</li>
          <li>When you're satisfied with your design, click "Download SVG"</li>
          <li>You can open and further edit the SVG file in any vector graphics software like Inkscape or Adobe Illustrator</li>
        </ol>
      </div>
    </div>
  );
};

export default VHSLabelGenerator;
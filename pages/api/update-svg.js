import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { title, category, rating, rentCode, productCode } = req.body;
    
    // Read the SVG template file
    const svgPath = path.join(process.cwd(), 'public', 'blockbuster-template.svg');
    const svgData = fs.readFileSync(svgPath, 'utf8');
    
    // Create a DOM to manipulate the SVG
    const dom = new JSDOM(svgData, { contentType: 'image/svg+xml' });
    const document = dom.window.document;
    
    // Find and update the title text
    const titleTextElements = document.querySelectorAll('text[transform="rotate(90)"] tspan');
    titleTextElements.forEach(element => {
      if (element.textContent.includes('FIGHT CLUB')) {
        element.textContent = title;
      }
    });
    
    // Find and update the category
    const categoryTextElements = document.querySelectorAll('text[transform="rotate(90)"] tspan');
    categoryTextElements.forEach(element => {
      if (element.textContent.includes('CATEGORY:')) {
        element.textContent = `CATEGORY: ${category}`;
      }
    });
    
    // Find and update the rating
    const ratingTextElements = document.querySelectorAll('text[transform="rotate(90)"] tspan');
    ratingTextElements.forEach(element => {
      if (element.textContent.includes('RATING:')) {
        element.textContent = `RATING: ${rating}`;
      }
    });
    
    // Find and update the rent code
    const rentCodeTextElements = document.querySelectorAll('text[transform="rotate(90)"] tspan');
    rentCodeTextElements.forEach(element => {
      if (element.textContent.includes('RENT CODE:')) {
        element.textContent = `RENT CODE: ${rentCode}`;
      }
    });
    
    // Find and update the product code
    const productCodeTextElements = document.querySelectorAll('text[transform="rotate(90)"] tspan');
    productCodeTextElements.forEach(element => {
      if (element.textContent.includes('FOX 20000306')) {
        element.textContent = productCode;
      }
    });
    
    // Also update the title text at the bottom of the label
    const bottomTitleElements = document.querySelectorAll('text[transform="rotate(-90)"] tspan, text[y="-14.01248"] tspan');
    bottomTitleElements.forEach(element => {
      if (element.textContent.includes('FIGHT CLUB')) {
        element.textContent = title;
      }
    });
    
    // Serialize the updated SVG back to a string
    const updatedSvg = dom.serialize();
    
    // Return the updated SVG
    res.status(200).json({ svg: updatedSvg });
  } catch (error) {
    console.error('Error updating SVG:', error);
    res.status(500).json({ message: 'Error updating SVG', error: error.message });
  }
}
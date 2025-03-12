# Blockbuster VHS Label Generator

A web application that generates customizable Blockbuster VHS labels in SVG format. Built with Next.js from a former Blockbuster employee (me) with inspiration and SVGs templated by users on reddit.com/r/VHS and [directly from this repo](https://github.com/rfinnie/blockbuster) with minor updates.

## Live Demo
A [live demo of the app can be found here](https://blockbuster-label-generator.vercel.app/).

## Features

- Customize movie title, category, rating, rent code, and product code
- Real-time preview of your custom VHS label
- Download your creation as an SVG file
- Compatible with vector graphics editors like Inkscape and Adobe Illustrator

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/blockbuster-vhs-generator.git
cd blockbuster-vhs-generator
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter your desired title, category, rating, rent code, and product code
2. The preview will update automatically as you make changes
3. Click "Download SVG" when you're satisfied with your design
4. Open the SVG file in any vector graphics editor for further customization

## Deployment

This is a Next.js project that can be easily deployed to platforms like Vercel:

```bash
npm install -g vercel
vercel
```

## Credits

- Original SVG template created by Ryan Finnie and is licensed under [CC-BY-SA](http://creativecommons.org/licenses/by-sa/4.0/)
- Built with [Next.js](https://nextjs.org/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Color Palette Generator

A responsive color palette display application built with React and Vite. Features vertical color strips that fill the full viewport height with interactive hover effects.

## Features

- **Vertical Strips Layout**: Full-height color strips that expand on hover
- **Responsive Design**: Works on mobile (stacked) and desktop (side-by-side)
- **Interactive Elements**: Hidden action buttons that appear on hover
- **Tailwind CSS**: Modern styling with utility classes
- **Fast Development**: Powered by Vite for rapid development

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- PostCSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm preview
```

## Project Structure

```
├── src/
│   ├── App.jsx          # Main app component with color strips
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS imports
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## Features Explained

### ColorStrip Component
- Takes color, hex code, name, and dark mode flag as props
- Displays color information at the bottom of each strip
- Shows hidden action button on hover
- Expands flex ratio on hover for emphasis

### Full Viewport Height
- Container uses `h-screen` to fill 100% viewport height
- Each strip grows equally with `flex-1`
- Strips expand on hover with `hover:flex-[1.5]`

### Design Notes

- **Future Bug**: Removing `h-screen` will cause strips to collapse to content height
- Uses `bg-[#hexcode]` for arbitrary color values in Tailwind
- `dark` prop determines text color contrast

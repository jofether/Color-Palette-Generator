import React, { useState, useEffect } from 'react';

function ColorStrip({ color, name, hex, dark, locked, onLock, onCopy, colorFormat }) {
  const getColorString = () => {
    if (colorFormat === 'hex') return `#${hex}`;
    if (colorFormat === 'rgb') {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgb(${r}, ${g}, ${b})`;
    }
    // HSL format
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  return (
    <div 
      style={{ backgroundColor: `#${hex}` }}
      className={`flex-1 flex flex-col items-center justify-end -mb-96 group relative transition-all duration-300 hover:flex-[1.5] cursor-pointer overflow-visible`}
    >
      {/* [BUG - SPACING] Negative bottom margin (-mb-96) causes severe overlap, pushing all content up and off visible area */}
      {/* [FIX] Should be: pb-20 or no negative margin */}
      {/* Lock Indicator */}
      {locked && (
        <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md p-2 rounded-full -z-50">
          {/* [BUG - LAYERS] Extreme negative z-index (-z-50) completely hides lock icon behind everything */}
          {/* [FIX] Should be: z-50 instead of -z-50 */}
          <span className="text-lg">🔒</span>
        </div>
      )}

      {/* Actions */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-3 rotate-45 -translate-y-96">
        {/* [BUG - LAYERS] Rotated 45 degrees and extreme negative translate makes buttons completely misaligned and unclickable in intended position */}
        {/* [FIX] Should be: no rotate-45 and no -translate-y-96, keep normal transform */}
        <button 
          onClick={() => onCopy(getColorString())}
          className={`bg-white/20 backdrop-blur-md p-3 rounded-full text-white shadow-lg hover:bg-white/40 transition`}
          title="Copy color"
        >
          📋
        </button>
        <button 
          onClick={() => onLock()}
          className={`bg-white/20 backdrop-blur-md p-3 rounded-full text-white shadow-lg hover:bg-white/40 transition ${locked ? 'ring-2 ring-white' : ''}`}
          title={locked ? "Unlock color" : "Lock color"}
        >
          {locked ? '🔒' : '🔓'}
        </button>
      </div>

      <div className={`text-center space-y-2 ${dark ? 'text-gray-900' : 'text-gray-800'}`}>
        {/* [BUG - COLOR/CONTRAST] Text color gray-800 same as white background, making text completely invisible */}
        {/* [FIX] Should be: 'text-white' for dark colors and 'text-gray-900' for light colors */}
        <h2 className="text-xs font-black uppercase tracking-tightest scale-50">{getColorString()}</h2>
        {/* [BUG - TYPO & LAYOUT] Invalid class text-xs (should be text-3xl) and scale-50 shrinks text to 50% making it tiny and unreadable */}
        {/* [FIX] Should be: text-3xl and no scale-50 */}
        <p className="text-xs font-bold opacity-10 uppercase tracking-widest">{name}</p>
        {/* [BUG - COLOR/CONTRAST] opacity-10 makes text nearly invisible */}
        {/* [FIX] Should be: opacity-60 or higher */}
      </div>
    </div>
  );
}

function Toast({ message, show }) {
  return (
    <div className={`fixed bottom-8 left-8 bg-white px-6 py-3 rounded-full shadow-xl transition-opacity ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <span className="font-semibold text-white text-sm">{message}</span>
      {/* [BUG - COLOR/CONTRAST] Text color white on white background, completely invisible */}
      {/* [FIX] Should be: text-gray-800 for proper contrast */}
    </div>
  );
}

function App() {
  const colorPalettes = [
    [
      { hex: '264653', name: 'Charcoal' },
      { hex: '2a9d8f', name: 'Persian Green' },
      { hex: 'e9c46a', name: 'Maize' },
      { hex: 'f4a261', name: 'Sandy Brown' },
      { hex: 'e76f51', name: 'Burnt Sienna' },
    ],
    [
      { hex: '1a237e', name: 'Deep Blue' },
      { hex: '3949ab', name: 'Indigo' },
      { hex: '5c6bc0', name: 'Light Indigo' },
      { hex: '9fa8da', name: 'Soft Indigo' },
      { hex: 'c5cae9', name: 'Very Light Indigo' },
    ],
    [
      { hex: '6a1b9a', name: 'Deep Purple' },
      { hex: 'ab47bc', name: 'Purple' },
      { hex: 'ce93d8', name: 'Light Purple' },
      { hex: 'e1bee7', name: 'Very Light Purple' },
      { hex: 'f3e5f5', name: 'Pale Purple' },
    ],
    [
      { hex: 'b71c1c', name: 'Dark Red' },
      { hex: 'e53935', name: 'Red' },
      { hex: 'ef5350', name: 'Light Red' },
      { hex: 'e57373', name: 'Lighter Red' },
      { hex: 'ffcdd2', name: 'Very Light Red' },
    ],
    [
      { hex: 'd32f2f', name: 'Crimson' },
      { hex: 'ff6f00', name: 'Orange' },
      { hex: 'fbc02d', name: 'Amber' },
      { hex: '00897b', name: 'Teal' },
      { hex: '0277bd', name: 'Blue' },
    ],
  ];

  const [palette, setPalette] = useState(colorPalettes[0]);
  const [locked, setLocked] = useState({});
  const [toast, setToast] = useState({ show: false, message: '' });
  const [colorFormat, setColorFormat] = useState('hex');

  const generateRandomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
  };

  const generatePalette = () => {
    const newPalette = palette.map((color, idx) => {
      if (locked[idx]) return color;
      return {
        ...color,
        hex: generateRandomColor(),
        name: 'Custom Color',
      };
    });
    setPalette(newPalette);
  };

  const loadPresetPalette = () => {
    const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    setPalette(randomPalette);
    setLocked({});
  };

  const toggleLock = (idx) => {
    setLocked(prev => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setToast({ show: true, message: `Copied ${text}!` });
    setTimeout(() => setToast({ show: false, message: '' }), 2000);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        generatePalette();
      }
      if (e.code === 'KeyL') {
        e.preventDefault();
        loadPresetPalette();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [locked, palette]);

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  };

  const getContrastColor = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  return (
    <div className="flex flex-col-reverse md:flex-row-reverse h-screen w-full font-sans -rotate-6">
      {/* [BUG - LAYOUT] Entire page rotated -6 degrees, causing severe misalignment and broken layout */}
      {/* [FIX] Should be: no -rotate-6 class */}
      {/* Header */}
      <div className="fixed top-8 left-8 z-50 bg-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-3">
        <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
        <span className="font-bold text-gray-800 text-sm">Palette Generator</span>
        <span className="text-gray-400 text-xs px-2 border-l border-gray-200">SPACE to generate</span>
      </div>

      {/* Control Panel */}
      <div className="fixed bottom-8 left-8 z-50 bg-white rounded-2xl shadow-2xl p-6 w-80 space-y-4 -rotate-12 -scale-x-100">
        {/* [BUG - LAYOUT] Panel rotated -12 degrees and flipped horizontally (-scale-x-100), making text backwards and unreadable */}
        {/* [FIX] Should not have -rotate-12 or -scale-x-100 */}
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Controls</h3>
          <button 
            onClick={() => setColorFormat(format => {
              const formats = ['hex', 'rgb', 'hsl'];
              return formats[(formats.indexOf(format) + 1) % formats.length];
            })}
            className="text-xs bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition"
            title="Toggle color format"
          >
            {colorFormat.toUpperCase()}
          </button>
        </div>

        <div className="space-y-2">
          <button 
            onClick={generatePalette}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-2 rounded-lg hover:shadow-lg transition uppercase text-sm tracking-wider"
          >
            Generate (SPACE)
          </button>
          <button 
            onClick={loadPresetPalette}
            className="w-full bg-gray-800 text-white font-bold py-2 rounded-lg hover:bg-gray-700 transition uppercase text-sm tracking-wider"
          >
            Load Preset (L)
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Palette Info</p>
          <div className="grid grid-cols-1 gap-2 -rotate-180">
            {/* [BUG - LAYOUT] Grid rotated 180 degrees and set to 1 column instead of 5, completely breaking palette display */}
            {/* [FIX] Should be: grid-cols-5 with no rotation */}
            {palette.map((color, idx) => (
              <div 
                key={idx}
                className="aspect-square rounded-lg cursor-pointer hover:ring-2 ring-gray-400 transition"
                style={{ backgroundColor: `#${color.hex}` }}
                onClick={() => copyToClipboard(`#${color.hex}`)}
                title={`${color.name} - Click to copy`}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Keyboard Shortcuts</p>
          <div className="text-xs text-gray-600 space-y-1 mt-2">
            <p><span className="font-mono bg-gray-100 px-1 rounded">SPACE</span> - Generate</p>
            <p><span className="font-mono bg-gray-100 px-1 rounded">L</span> - Load Preset</p>
            <p>🔒 Click lock button to freeze colors</p>
          </div>
        </div>
      </div>

      {/* Color Strips */}
      {palette.map((color, idx) => (
        <ColorStrip 
          key={idx} 
          name={color.name}
          hex={color.hex}
          dark={getContrastColor(color.hex)}
          locked={locked[idx]}
          onLock={() => toggleLock(idx)}
          onCopy={copyToClipboard}
          colorFormat={colorFormat}
        />
      ))}

      {/* Toast Notification */}
      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}

export default App;

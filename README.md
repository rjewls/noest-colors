# Chrome Extension - Noest Hub Navbar Customizer

A Chrome extension that automatically detects and customizes the navigation container and dropdown menus on the Noest Hub application (https://app.noest-dz.com/hub) with beautiful themes and extensive customization options.

## ✨ Features

### 🎨 Theme Presets (NEW!)
- **8 Pre-designed Themes** - Apply complete color schemes with one click
- Sunset, Ocean Breeze, Forest Green, Purple Haze, Night Mode, Candy Pop, Fire Blaze, Fresh Mint
- Instant application - All colors change simultaneously
- Professional gradients inspired by modern web design trends

### 🎯 Comprehensive Customization
- ✅ Navbar background (solid or gradient with angle control)
- ✅ Dropdown menu backgrounds (solid or gradient)
- ✅ Text colors with full contrast control
- ✅ Badge colors (text and background)
- ✅ Hover effects (background and text colors)
- ✅ SVG icon color inheritance
- ✅ Pseudo-element (`::before`, `::after`) color support
- ✅ 6 Animation effects (breathing, shimmer, wave, pulse, glow, rotate)
- ✅ Adjustable animation speeds

### 🚀 Technical Features
- Automatically detects navbar and dropdown elements
- Handles dynamically loaded content with MutationObserver
- Prevents original color flash on page load
- CSS injection with `!important` priority
- Settings persist via Chrome storage
- Works on all URLs matching `https://app.noest-dz.com/hub*`

## 📁 Project Structure

```
chrome-extension/
├── manifest.json       # Extension configuration (Manifest V3)
├── content.js         # Content script that modifies the navbar/dropdowns
├── options.html       # Settings page UI
├── options.js         # Settings page logic with theme system
├── THEMES.md          # Complete theme documentation
└── README.md          # This file
```

## Installation Instructions

### Step 1: Load the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
### Step 2: Access Settings

1. Visit https://app.noest-dz.com/hub
2. Right-click the extension icon and select **Options**
3. The settings page will open with all customization options

### Step 3: Choose a Theme or Customize

**Option A: Quick Theme (Recommended)**
1. In the "Quick Theme Presets" section at the top
2. Click any theme button (e.g., "🌅 Sunset" for orange-pink gradient)
3. All colors apply instantly!
4. Refresh the Noest Hub page to see changes

**Option B: Manual Customization**
1. Choose solid color or gradient for navbar
2. Set gradient angle (0-360 degrees)
3. Customize text colors, badge colors, hover effects
4. Add animation effects if desired
5. Click "Save Settings"

## 🎨 Quick Start: Apply the Sunset Theme

Your requested **orange-pink gradient** is available as the **Sunset theme**:

1. Open extension options
2. Click the **"🌅 Sunset"** button
3. Refresh Noest Hub page
4. Enjoy your beautiful gradient navbar! (Orange #FF881A → Pink/Red #FF3D3D at 135°)

## 📖 Available Themes

See [THEMES.md](./THEMES.md) for complete documentation of all 8 themes, including:
- Color specifications
- Use cases
- Design philosophy
- Customization tips

## 🛠️ Advanced Customization

### Gradient Angles
- `0°` - Bottom to top
- `90°` - Left to right  
- `135°` - Diagonal (bottom-left to top-right)
- `180°` - Top to bottom

### Animation Effects
- **Breathing**: Subtle opacity fade
- **Shimmer**: Left-to-right shine effect
- **Wave**: Top-to-bottom wave
- **Pulse**: Scale animation
- **Glow**: Shadow glow effect
- **Rotate**: Hue rotation

### Color Tips
- Use white text (`#FFFFFF`) on dark/vibrant backgrounds
- Use dark text (`#000000`) on light backgrounds
- Badge colors should contrast with background
- Hover effects should be subtle (use RGBA with low opacity)

## 🔧 How It Works

1. **manifest.json**: Extension configuration (Manifest V3)
2. **content.js**: 
   - Injects CSS immediately on page load (prevents flash)
   - Finds navbar and dropdown elements
   - Applies inline styles with `!important` priority
   - Handles pseudo-elements (`::before`, `::after`)
   - Monitors for dynamically added content
3. **options.html/js**: 
   - Settings UI with theme presets
   - Color pickers and sliders
   - Real-time value updates
   - Chrome storage integration

## 🐛 Troubleshooting

**Extension not working?**
- Ensure you're on a page matching `https://app.noest-dz.com/hub*`
- Check the browser console (F12 → Console) for error messages
- Try reloading the page (F5)
- Reload the extension in `chrome://extensions/`

**Can't find the navbar?**
- The HTML structure on the page might have changed
- Open Developer Tools (F12 → Elements)
- Search for `container-fluid` class in the HTML
- Update the selector in `content.js` if needed

## Tips

- The extension only runs on pages matching the specified URL pattern
- Changes are applied immediately on page load
- The MutationObserver ensures the styling is maintained even if content is loaded dynamically
- No data is collected or sent anywhere

## License

This extension is for personal use.

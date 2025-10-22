# Navbar Elements Manager - Feature Documentation

## Overview

This feature allows users to **show/hide** specific navbar elements and **reorder** them to customize their Noest Hub navigation experience.

## Features

### ✅ Show/Hide Elements
- Toggle visibility of any navbar menu item
- Hidden elements don't take up space in the navbar
- Checkboxes for easy visibility control

### ✅ Reorder Elements
- Change the order of navbar items
- Use ▲ (up) and ▼ (down) buttons to move elements
- First visible element appears on the left
- Settings persist across page reloads

### ✅ Available Elements

The following 11 navbar elements can be managed:

| ID | Label | Icon | Default Order |
|----|-------|------|---------------|
| `ajouter` | ➕ Ajouter | fa-plus | 0 |
| `ramassage` | 🚚 Ramassage | fa-truck | 1 |
| `reception` | 📦 Réception | fa-cubes | 2 |
| `dispatch` | 🔀 Dispatch | fa-random | 3 |
| `modification` | ✏️ Demandes de modification | fa-edit | 4 |
| `fdr` | 📋 Feuilles de route | fa-copy | 5 |
| `livraison` | 🚛 En Livraison | fa-truck | 6 |
| `suspendu` | ⚠️ Suspendus | fa-exclamation-triangle | 7 |
| `retours` | ↩️ Retours | fa-reply | 8 |
| `livres` | ✅ Livrés | fa-check-square | 9 |
| `finance` | 💰 Finance | fa-dollar-sign | 10 |

## User Interface

### Location
The Navbar Elements Manager appears in the extension options page, right after the "Quick Theme Presets" section.

### Controls

**For Each Element:**
- **Checkbox**: Click to show/hide the element
- **Label**: Shows the element name with emoji
- **▲ Button**: Move element up in order (disabled for first element)
- **▼ Button**: Move element down in order (disabled for last element)
- **☰ Handle**: Visual indicator for reordering (future drag-and-drop support)

### Visual Feedback
- Hidden elements have reduced opacity and gray background
- Active elements have white background
- Hover effects on buttons for better UX
- Up/down buttons are disabled at boundaries

## Technical Implementation

### Data Structure

Each navbar element is stored as an object:
```javascript
{
  id: 'dispatch',              // Unique identifier
  label: '🔀 Dispatch',       // Display name with emoji
  visible: true,               // Visibility state
  order: 3                     // Display order (0-based)
}
```

### Storage
- Saved to `chrome.storage.sync` as `navbarElements`
- Persists across browser sessions
- Syncs across devices (if Chrome sync is enabled)

### Files Modified

#### 1. **content.js** (Lines ~295-335, 670-730)

**Added Constants:**
```javascript
const DEFAULT_NAVBAR_ELEMENTS = [
  { id: 'ajouter', label: 'Ajouter', icon: 'fa-plus', visible: true, order: 0 },
  // ... 10 more elements
];
```

**Added Functions:**
- `getNavbarElementByIdentifier(element)`: Identifies navbar items by text/icons
- `applyNavbarElementSettings()`: Applies visibility and order to actual navbar
- Storage change listener for real-time updates

**Key Features:**
- Uses flexbox `order` property for reordering
- Sets `display: none` for hidden elements
- Identifies elements by multiple criteria (ID, text content, icons)

#### 2. **options.js** (Lines ~6-24, 370-460, 745-752)

**Added Constants:**
```javascript
const DEFAULT_NAVBAR_ELEMENTS = [
  { id: 'ajouter', label: '➕ Ajouter', visible: true, order: 0 },
  // ... 10 more elements
];
```

**Added Functions:**
- `renderNavbarElements()`: Renders the elements list in UI
- `handleElementVisibilityChange(e)`: Handles checkbox changes
- `handleElementMove(e)`: Handles up/down button clicks
- `saveNavbarElements()`: Saves to chrome.storage
- `loadNavbarElements()`: Loads from chrome.storage

**Integration:**
- Added to reset functionality
- Auto-loads on DOMContentLoaded
- Real-time saving on every change

#### 3. **options.html** (Lines ~217-301, 378-385)

**Added CSS:**
```css
.navbar-elements-manager { /* Container styles */ }
.elements-list { /* List layout */ }
.element-item { /* Individual item card */ }
.element-item.hidden-element { /* Grayed out style */ }
.drag-handle { /* Drag icon */ }
.element-checkbox { /* Checkbox styling */ }
.element-label { /* Label text */ }
.element-controls { /* Button container */ }
.btn-move { /* Up/down buttons */ }
```

**Added HTML Section:**
```html
<div class="setting-group navbar-elements-manager">
  <h2>📋 Navbar Elements Manager</h2>
  <p>Show/hide navbar items and reorder them</p>
  <div class="elements-list" id="navbarElementsList">
    <!-- Dynamically generated -->
  </div>
</div>
```

## How It Works

### Initialization Flow

1. **Extension Load** (content.js)
   ```
   Page Load → Load from chrome.storage → Apply settings to navbar
   ```

2. **Options Page Load** (options.js)
   ```
   Page Open → Load from chrome.storage → Render elements list
   ```

### Element Identification

The extension identifies navbar elements using multiple criteria:
- Element ID (e.g., `collect_li`, `livraison_li`)
- Text content (case-insensitive search)
- Icon classes (FontAwesome icons)

This multi-layered approach ensures reliable element detection even if the navbar structure changes slightly.

### Reordering Mechanism

Uses CSS Flexbox `order` property:
```javascript
element.style.order = config.order;
navbarList.style.display = 'flex';
navbarList.style.flexDirection = 'row';
```

Benefits:
- No DOM manipulation required
- Smooth transitions
- Native browser support
- Preserves event listeners

### Visibility Control

Simple CSS display property:
```javascript
if (config.visible) {
  element.style.display = '';
} else {
  element.style.display = 'none';
}
```

## User Guide

### How to Hide/Show Elements

1. Open extension options page
2. Scroll to "📋 Navbar Elements Manager"
3. **Uncheck** checkbox to hide element
4. **Check** checkbox to show element
5. Changes save automatically
6. Refresh Noest Hub page to see changes

### How to Reorder Elements

1. Open extension options page
2. Scroll to "📋 Navbar Elements Manager"
3. Find the element you want to move
4. Click **▲** to move it earlier (left) in navbar
5. Click **▼** to move it later (right) in navbar
6. Changes save automatically
7. Refresh Noest Hub page to see new order

### Example Use Cases

**Scenario 1: Hide Unused Elements**
- User never uses "Finance" or "FDR"
- Uncheck those elements
- Result: Cleaner, more focused navbar

**Scenario 2: Prioritize Common Actions**
- User frequently uses "Dispatch" and "Livraison"
- Move them to positions 0 and 1 (far left)
- Result: Faster access to commonly used features

**Scenario 3: Departmental Customization**
- Dispatch team: Show only dispatch-related items
- Delivery team: Show only delivery-related items
- Finance team: Show only finance-related items
- Result: Role-based navbar configurations

## Reset Functionality

The **Reset** button in options page now also resets:
- All elements to visible state
- All elements to default order (0-10)
- Saved settings cleared from storage

## Future Enhancements

### Potential Improvements

1. **Drag & Drop Reordering**
   - Use HTML5 Drag and Drop API
   - More intuitive than up/down buttons
   - Visual feedback during drag

2. **Element Groups**
   - Create custom groups (e.g., "Dispatch Operations", "Finance")
   - Show/hide entire groups at once

3. **Quick Presets**
   - "Dispatch View", "Finance View", "Manager View"
   - One-click switch between role-based layouts

4. **Search/Filter**
   - Search bar to quickly find elements
   - Filter by visibility status

5. **Custom Labels**
   - Allow users to rename elements
   - Personalize their experience

6. **Import/Export**
   - Export configuration as JSON
   - Share configurations between users
   - Team-wide standardization

## Troubleshooting

### Elements Don't Hide/Show
**Problem:** Changes don't appear after refresh
**Solution:** 
- Check browser console for errors
- Verify chrome.storage.sync is enabled
- Try disabling/re-enabling extension

### Order Changes Don't Apply
**Problem:** Elements appear in wrong order
**Solution:**
- Ensure no CSS overrides in page
- Check if flexbox is supported
- Try clearing browser cache

### Elements Not Detected
**Problem:** Some elements don't appear in manager
**Solution:**
- The navbar structure may have changed
- Check console logs for identification errors
- Update `getNavbarElementByIdentifier()` function

## Browser Compatibility

✅ Chrome/Edge (Chromium) - Full support  
✅ Manifest V3 compatible  
✅ Uses modern JavaScript (ES6+)  
✅ Flexbox for layout (all modern browsers)

## Performance Impact

- **Minimal**: Only runs when settings change
- **Storage**: ~1-2KB for element configuration
- **Memory**: Negligible overhead
- **Render**: No noticeable delay

## Security & Privacy

- ✅ No external API calls
- ✅ Data stored locally (chrome.storage.sync)
- ✅ No tracking or analytics
- ✅ No sensitive data collected
- ✅ Permissions: Only storage API required

---

**Status:** ✅ Fully Implemented and Tested  
**Version:** 1.0.0  
**Last Updated:** October 22, 2025  
**Author:** Chrome Extension Navbar Customizer

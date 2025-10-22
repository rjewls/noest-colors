# 📋 Navbar Elements Manager - Quick Start Guide

## What You Can Do

### ✅ Hide/Show Menu Items
Click the checkbox next to any navbar element to hide or show it:
- ☑️ **Checked** = Element is visible in navbar
- ☐ **Unchecked** = Element is hidden from navbar

### ✅ Change Order
Use the arrow buttons to move elements up or down:
- **▲** = Move element to the left (earlier in navbar)
- **▼** = Move element to the right (later in navbar)

## Visual Layout

```
┌─────────────────────────────────────────────────────────┐
│  📋 Navbar Elements Manager                             │
│  Show/hide navbar items and reorder them                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ☰  ☑  ➕ Ajouter                         [ ▲ ] [ ▼ ]   │
│  ☰  ☑  🚚 Ramassage                       [ ▲ ] [ ▼ ]   │
│  ☰  ☑  📦 Réception                       [ ▲ ] [ ▼ ]   │
│  ☰  ☐  🔀 Dispatch                        [ ▲ ] [ ▼ ]   │ ← Hidden (grayed out)
│  ☰  ☑  ✏️ Demandes de modification        [ ▲ ] [ ▼ ]   │
│  ☰  ☑  📋 Feuilles de route               [ ▲ ] [ ▼ ]   │
│  ☰  ☑  🚛 En Livraison                    [ ▲ ] [ ▼ ]   │
│  ☰  ☑  ⚠️ Suspendus                       [ ▲ ] [ ▼ ]   │
│  ☰  ☑  ↩️ Retours                         [ ▲ ] [ ▼ ]   │
│  ☰  ☑  ✅ Livrés                          [ ▲ ] [ ▼ ]   │
│  ☰  ☑  💰 Finance                         [ ▲ ] [ ▼ ]   │
│                                                          │
└─────────────────────────────────────────────────────────┘

Legend:
☰  = Drag handle (visual indicator)
☑  = Visible element
☐  = Hidden element
▲  = Move up (disabled for first element)
▼  = Move down (disabled for last element)
```

## Step-by-Step Examples

### Example 1: Hide "Dispatch" Element

**Before:**
```
Navbar: [Ajouter] [Ramassage] [Réception] [Dispatch] [Modification] ...
```

**Steps:**
1. Open extension options
2. Find "🔀 Dispatch" in the list
3. Click the checkbox to uncheck it
4. Refresh the Noest Hub page

**After:**
```
Navbar: [Ajouter] [Ramassage] [Réception] [Modification] ...
                                  ↑
                         Dispatch is now hidden
```

### Example 2: Move "Finance" to First Position

**Before:**
```
Order: 0=Ajouter, 1=Ramassage, 2=Réception, ..., 10=Finance
Navbar: [Ajouter] [Ramassage] [Réception] ... [Finance]
```

**Steps:**
1. Open extension options
2. Find "💰 Finance" in the list (at the bottom)
3. Click the **▲** button 10 times (or until it reaches the top)
4. Refresh the Noest Hub page

**After:**
```
Order: 0=Finance, 1=Ajouter, 2=Ramassage, 3=Réception, ...
Navbar: [Finance] [Ajouter] [Ramassage] [Réception] ...
           ↑
     Now in first position
```

### Example 3: Create a "Dispatch Team" View

**Goal:** Show only dispatch-related items

**Steps:**
1. Open extension options
2. **Uncheck** all elements except:
   - ☑ Ramassage
   - ☑ Réception
   - ☑ Dispatch
   - ☑ En Livraison
3. Move these to the top positions:
   - Click ▲ on "Dispatch" until it's at position 0
   - Click ▲ on "Ramassage" until it's at position 1
   - Click ▲ on "En Livraison" until it's at position 2
   - Click ▲ on "Réception" until it's at position 3
4. Refresh the Noest Hub page

**Result:**
```
Navbar: [Dispatch] [Ramassage] [En Livraison] [Réception]
           ↑
     Only 4 dispatch-related items visible
     Everything else is hidden
```

## Tips & Tricks

### 💡 Tip 1: Start with Hiding
- First, hide elements you never use
- Then reorder the remaining visible elements
- This gives you a cleaner workflow

### 💡 Tip 2: Group Related Items
- Put similar items together
- Example: All delivery-related items on the left
- Example: All finance-related items on the right

### 💡 Tip 3: Use the Reset Button
- If you mess up, click "Reset to Default"
- This restores all elements to original order
- All elements become visible again

### 💡 Tip 4: Test Different Layouts
- Try different configurations
- See what works best for your workflow
- Settings save automatically

## Common Configurations

### Configuration 1: "Manager View"
**Who:** Hub managers who oversee everything
**Visible:** All elements
**Order:** Default (0-10)

### Configuration 2: "Dispatch Operator"
**Who:** Team members handling dispatch
**Visible:** Ramassage, Réception, Dispatch, En Livraison
**Order:** Dispatch first, then Ramassage, En Livraison, Réception

### Configuration 3: "Finance Team"
**Who:** Finance/accounting staff
**Visible:** Finance, Livrés, Retours
**Order:** Finance first, then Livrés, Retours

### Configuration 4: "Minimalist"
**Who:** Users who want the cleanest interface
**Visible:** Only 3-4 most used items
**Order:** Based on frequency of use

## Keyboard Shortcuts

Currently none, but planned for future:
- `Ctrl+Up` - Move selected element up
- `Ctrl+Down` - Move selected element down
- `Space` - Toggle visibility
- `Ctrl+R` - Reset to default

## FAQ

**Q: Do changes save automatically?**  
A: Yes! Every change is saved immediately to chrome.storage.

**Q: Do I need to reload the extension?**  
A: No, just refresh the Noest Hub page to see changes.

**Q: Can I export my configuration?**  
A: Not yet, but this feature is planned for future updates.

**Q: Will this work on other websites?**  
A: No, this extension only works on the Noest Hub website.

**Q: Can I create multiple profiles?**  
A: Not yet, but multi-profile support is planned.

**Q: What happens if I hide all elements?**  
A: You can still access the options page to show them again.

## Need Help?

If elements don't appear correctly:
1. Check browser console (F12) for errors
2. Try clicking "Reset to Default"
3. Disable and re-enable the extension
4. Clear browser cache and reload

---

**🎨 Combine with Theme Presets!**

You can use the Navbar Elements Manager together with the Quick Theme Presets to create a fully personalized Noest Hub experience!

**Example:** 
- Apply "Ocean Breeze" theme
- Hide unused elements
- Reorder for your workflow
- = Perfect personalized dashboard! 🎉

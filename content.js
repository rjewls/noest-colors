/**
 * Chrome Extension Content Script
 * Detects the Noest Hub navbar and changes its background color
 */

const DEFAULT_COLOR = '#007bff';

// IMMEDIATE INJECTION: Hide elements before they render to prevent flash
(function() {
  const style = document.createElement('style');
  style.id = 'navbar-preload-hide';
  style.textContent = `
    /* Temporarily hide entire navbar until we process it */
    ul.nav.navbar-nav {
      visibility: hidden !important;
    }
  `;
  (document.head || document.documentElement).appendChild(style);
  console.log('🚀 Pre-load hiding CSS injected');
})();

// Function to inject CSS immediately to prevent flash
function injectStyle() {
  try {
    const navbarBg = getBackgroundStyle(navbarSettings);
    const dropdownBg = getBackgroundStyle(dropdownSettings);
    
    const navbarAnimation = getAnimationCSS(navbarSettings);
    const dropdownAnimation = getAnimationCSS(dropdownSettings);
    
    const style = document.createElement('style');
    style.textContent = `
    ${navbarAnimation}
    ${dropdownAnimation}
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] {
      background: ${navbarBg} !important;
      transition: background 0.3s ease;
    }
    
    /* Navbar links - base state */
    div[style*="padding:0 5px !important;"][class="container-fluid"] a,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle {
      color: ${navbarSettings.textColor} !important;
    }
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] small {
      color: ${navbarSettings.textColor} !important;
    }
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] small::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] small::after {
      color: ${navbarSettings.textColor} !important;
    }
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] a::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a::after {
      color: ${navbarSettings.textColor} !important;
    }
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] svg {
      color: ${navbarSettings.textColor} !important;
    }
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] svg path {
      fill: ${navbarSettings.textColor} !important;
    }
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] .badge {
      background-color: ${navbarSettings.badgeBgColor} !important;
      color: ${navbarSettings.badgeColor} !important;
    }
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:hover,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:active,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:focus,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:hover,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:active,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:focus {
      background-color: ${navbarSettings.hoverBgColor} !important;
      color: ${navbarSettings.hoverTextColor} !important;
    }
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:hover::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:hover::after,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:active::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:active::after,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:focus::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:focus::after,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:hover::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:hover::after,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:active::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:active::after,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:focus::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:focus::after {
      color: ${navbarSettings.hoverTextColor} !important;
    }
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:hover small,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:active small,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:focus small,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:hover small,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:active small,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:focus small {
      color: ${navbarSettings.hoverTextColor} !important;
    }
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:hover small::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:hover small::after,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:active small::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:active small::after,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:focus small::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:focus small::after,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:hover small::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:hover small::after,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:active small::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:active small::after,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:focus small::before,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:focus small::after {
      color: ${navbarSettings.hoverTextColor} !important;
    }
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:hover svg,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:active svg,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:focus svg,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:hover svg,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:active svg,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:focus svg {
      color: ${navbarSettings.hoverTextColor} !important;
    }
    
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:hover svg path,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:active svg path,
    div[style*="padding:0 5px !important;"][class="container-fluid"] a:focus svg path,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:hover svg path,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:active svg path,
    div[style*="padding:0 5px !important;"][class="container-fluid"] .dropdown-toggle:focus svg path {
      fill: ${navbarSettings.hoverTextColor} !important;
    }
    
    ul.dropdown-menu {
      background: ${dropdownBg} !important;
      transition: background 0.3s ease !important;
    }
    
    /* Dropdown menu items - target all possible variations */
    ul.dropdown-menu li a,
    ul.dropdown-menu li > a,
    .dropdown-menu li a,
    .dropdown-menu li > a,
    ul[class*="dropdown-menu"] li a,
    .dropdown-item {
      color: ${dropdownSettings.itemTextColor} !important;
      background-color: transparent !important;
      transition: none !important;
    }
    
    ul.dropdown-menu li a small,
    ul.dropdown-menu li > a small,
    .dropdown-menu li a small,
    .dropdown-item small {
      color: ${dropdownSettings.itemTextColor} !important;
    }
    
    ul.dropdown-menu li a svg,
    ul.dropdown-menu li > a svg,
    .dropdown-menu li a svg,
    .dropdown-item svg,
    ul.dropdown-menu li a i,
    .dropdown-menu li a i {
      color: ${dropdownSettings.itemTextColor} !important;
    }
    
    ul.dropdown-menu li a svg path,
    ul.dropdown-menu li > a svg path,
    .dropdown-menu li a svg path,
    .dropdown-item svg path {
      fill: ${dropdownSettings.itemTextColor} !important;
    }
    
    /* Hover state - using highest specificity */
    body ul.dropdown-menu li a:hover,
    body ul.dropdown-menu li > a:hover,
    body .dropdown-menu li a:hover,
    body .dropdown-item:hover,
    ul.dropdown-menu li a:hover:not(.disabled),
    ul.dropdown-menu li > a:hover:not(.disabled),
    .dropdown-menu li a:hover:not(.disabled),
    .dropdown-item:hover:not(.disabled) {
      background-color: ${dropdownSettings.itemHoverBgColor} !important;
      color: ${dropdownSettings.itemHoverTextColor} !important;
      transition: none !important;
    }
    
    ul.dropdown-menu li a:hover small,
    ul.dropdown-menu li > a:hover small,
    .dropdown-menu li a:hover small,
    .dropdown-item:hover small {
      color: ${dropdownSettings.itemHoverTextColor} !important;
    }
    
    ul.dropdown-menu li a:hover svg,
    ul.dropdown-menu li > a:hover svg,
    .dropdown-menu li a:hover svg,
    .dropdown-item:hover svg,
    ul.dropdown-menu li a:hover i,
    .dropdown-menu li a:hover i {
      color: ${dropdownSettings.itemHoverTextColor} !important;
    }
    
    ul.dropdown-menu li a:hover svg path,
    ul.dropdown-menu li > a:hover svg path,
    .dropdown-menu li a:hover svg path,
    .dropdown-item:hover svg path {
      fill: ${dropdownSettings.itemHoverTextColor} !important;
    }
    
    /* Active/Focus state - keep hover colors */
    ul.dropdown-menu li a:active,
    ul.dropdown-menu li a:focus,
    ul.dropdown-menu li > a:active,
    ul.dropdown-menu li > a:focus,
    .dropdown-menu li a:active,
    .dropdown-menu li a:focus,
    .dropdown-item:active,
    .dropdown-item:focus {
      background-color: ${dropdownSettings.itemHoverBgColor} !important;
      color: ${dropdownSettings.itemHoverTextColor} !important;
      transition: none !important;
    }
    
    ul.dropdown-menu li a:active small,
    ul.dropdown-menu li a:focus small,
    .dropdown-menu li a:active small,
    .dropdown-menu li a:focus small,
    .dropdown-item:active small,
    .dropdown-item:focus small {
      color: ${dropdownSettings.itemHoverTextColor} !important;
    }
    
    ul.dropdown-menu li a:active svg,
    ul.dropdown-menu li a:focus svg,
    .dropdown-menu li a:active svg,
    .dropdown-menu li a:focus svg,
    .dropdown-item:active svg,
    .dropdown-item:focus svg {
      color: ${dropdownSettings.itemHoverTextColor} !important;
    }
    
    ul.dropdown-menu li a:active svg path,
    ul.dropdown-menu li a:focus svg path,
    .dropdown-menu li a:active svg path,
    .dropdown-menu li a:focus svg path,
    .dropdown-item:active svg path,
    .dropdown-item:focus svg path {
      fill: ${dropdownSettings.itemHoverTextColor} !important;
    }
    
    /* Pseudo-elements */
    ul.dropdown-menu li a small::before,
    ul.dropdown-menu li a small::after,
    .dropdown-menu li a small::before,
    .dropdown-menu li a small::after {
      color: inherit !important;
    }
    
    /* Span and badge elements inside dropdown items */
    ul.dropdown-menu li a span,
    .dropdown-menu li a span,
    .dropdown-item span {
      color: inherit !important;
    }
    
    ul.dropdown-menu li a .badge,
    .dropdown-menu li a .badge,
    .dropdown-item .badge {
      background-color: ${navbarSettings.badgeBgColor} !important;
      color: ${navbarSettings.badgeColor} !important;
    }
  `;
  (document.head || document.documentElement).appendChild(style);
  } catch (error) {
    console.error('Error injecting styles:', error);
  }
}

function getAnimationCSS(settings) {
  if (settings.effect === 'none') return '';
  
  const speed = settings.effectSpeed || 3;
  const selector = settings === navbarSettings 
    ? 'div[style*="padding:0 5px !important;"][class="container-fluid"]'
    : 'ul.dropdown-menu';
  
  const keyframes = getEffectKeyframes(settings.effect, settings);
  
  return `
    @keyframes ${settings.effect}_${settings === navbarSettings ? 'navbar' : 'dropdown'} {
      ${keyframes}
    }
    ${selector} {
      animation: ${settings.effect}_${settings === navbarSettings ? 'navbar' : 'dropdown'} ${speed}s ease-in-out infinite;
    }
  `;
}

function getEffectKeyframes(effect, settings) {
  switch(effect) {
    case 'breathing':
      return `0%, 100% { opacity: 1; } 50% { opacity: 0.7; }`;
    case 'shimmer':
      return `0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; }`;
    case 'wave':
      return `0% { box-shadow: inset 0 0 0 rgba(255,255,255,0); } 50% { box-shadow: inset 0 -4px 10px rgba(255,255,255,0.5); } 100% { box-shadow: inset 0 0 0 rgba(255,255,255,0); }`;
    case 'pulse':
      return `0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); }`;
    case 'glow':
      return `0%, 100% { box-shadow: 0 0 0 rgba(255,255,255,0.5), inset 0 0 0 rgba(0,0,0,0); } 50% { box-shadow: 0 0 10px rgba(255,255,255,0.8), inset 0 0 10px rgba(255,255,255,0.3); }`;
    case 'rotate':
      return `0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); }`;
    default:
      return '';
  }
}

function getBackgroundStyle(settings) {
  if (settings.type === 'gradient') {
    const bg = `linear-gradient(${settings.angle || 135}deg, ${settings.color1 || '#007bff'}, ${settings.color2 || '#764ba2'})`;
    if (settings.effect === 'shimmer') {
      return `${bg}; background-size: 200% 100%`;
    }
    return bg;
  } else {
    return settings.color || '#007bff';
  }
}

let navbarSettings = { 
  type: 'solid', 
  color: '#007bff', 
  color1: '#007bff',
  color2: '#764ba2',
  angle: 135,
  effect: 'none', 
  effectSpeed: 3,
  textColor: '#000000',
  badgeColor: '#ffffff',
  badgeBgColor: '#dc3545',
  hoverBgColor: '#f0f0f0',
  hoverTextColor: '#000000'
};
let dropdownSettings = { 
  type: 'solid', 
  color: '#ffffff',
  color1: '#ffffff',
  color2: '#f8f9fa',
  angle: 180,
  effect: 'none', 
  effectSpeed: 3,
  itemTextColor: '#000000',
  itemHoverBgColor: '#f8f9fa',
  itemHoverTextColor: '#000000'
};

// Default navbar elements configuration (matching website's default order)
const DEFAULT_NAVBAR_ELEMENTS = [
  { id: 'ajouter', label: 'Ajouter', icon: 'fa-plus', visible: true },
  { id: 'ramassage', label: 'Ramassage', icon: 'fa-truck', visible: true },
  { id: 'reception', label: 'Réception', icon: 'fa-cubes', visible: true },
  { id: 'dispatch', label: 'Dispatch', icon: 'fa-random', visible: true },
  { id: 'modification', label: 'Demandes de modification', icon: 'fa-edit', visible: true },
  { id: 'fdr', label: 'Feuilles de route', icon: 'fa-copy', visible: true },
  { id: 'livraison', label: 'En Livraison', icon: 'fa-truck', visible: true },
  { id: 'suspendu', label: 'Suspendus', icon: 'fa-exclamation-triangle', visible: true },
  { id: 'retours', label: 'Retours', icon: 'fa-reply', visible: true },
  { id: 'livres', label: 'Livrés', icon: 'fa-check-square', visible: true },
  { id: 'finance', label: 'Finance', icon: 'fa-dollar-sign', visible: true }
];

let navbarElements = [...DEFAULT_NAVBAR_ELEMENTS];

// Flags to prevent multiple simultaneous executions
let isApplyingNavbarSettings = false;
let isApplyingLinkStyles = false;
let navbarInitialized = false;

// Function to inject hiding CSS for specific elements immediately
function injectElementHidingCSS(elementsToHide) {
  if (!elementsToHide || elementsToHide.length === 0) {
    console.log('✓ No elements to hide');
    return;
  }
  
  const hiddenIds = elementsToHide.filter(e => !e.visible).map(e => e.id);
  if (hiddenIds.length === 0) {
    console.log('✓ No hidden elements in configuration');
    return;
  }
  
  console.log('🚫 Injecting CSS to hide:', hiddenIds);
  
  // Build CSS selectors for elements to hide
  const selectors = [];
  
  hiddenIds.forEach(id => {
    // Add data attribute selectors
    selectors.push(`ul.nav.navbar-nav li[data-navbar-element="${id}"]`);
    selectors.push(`ul.nav.navbar-nav li[data-element-id="${id}"]`);
    
    // Add specific ID selectors based on element mapping
    switch(id) {
      case 'ramassage':
        selectors.push('ul.nav.navbar-nav #collect_li');
        break;
      case 'reception':
        selectors.push('ul.nav.navbar-nav #transit_li');
        break;
      case 'livraison':
        selectors.push('ul.nav.navbar-nav #livraison_li');
        break;
      case 'suspendu':
        selectors.push('ul.nav.navbar-nav #livechou_li');
        break;
      case 'retours':
        selectors.push('ul.nav.navbar-nav #return_li');
        break;
      case 'livres':
      case 'finance':
        selectors.push('ul.nav.navbar-nav #livred_li');
        break;
    }
    
    // Add selectors for dropdowns without IDs (using :has() for modern browsers)
    if (id === 'ajouter') {
      // First child is typically the "Ajouter" dropdown
      selectors.push('ul.nav.navbar-nav > li.dropdown:first-child');
    }
    if (id === 'dispatch') {
      // Dispatch is typically the 4th item
      selectors.push('ul.nav.navbar-nav > li.dropdown:nth-child(4)');
    }
  });
  
  const selectorString = selectors.join(',\n    ');
  
  const style = document.createElement('style');
  style.id = 'navbar-element-hiding';
  style.textContent = `
    /* Hide specific navbar elements immediately */
    ${selectorString} {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      position: absolute !important;
      left: -9999px !important;
      width: 0 !important;
      height: 0 !important;
      overflow: hidden !important;
    }
  `;
  
  (document.head || document.documentElement).appendChild(style);
  console.log('✅ Element hiding CSS injected with', selectors.length, 'selectors');
}

// Get the saved settings and inject style immediately
chrome.storage.sync.get(['navbarSettings', 'dropdownSettings', 'navbarElements'], (result) => {
  console.log('\n🚀 ========== EXTENSION LOADING ========== 🚀');
  console.log('📦 Raw storage result:', result);
  
  navbarSettings = result.navbarSettings || navbarSettings;
  dropdownSettings = result.dropdownSettings || dropdownSettings;
  navbarElements = result.navbarElements || navbarElements;
  
  // Migrate from old order-based to array-based ordering
  if (navbarElements.length > 0 && navbarElements[0].hasOwnProperty('order')) {
    navbarElements = navbarElements.sort((a, b) => a.order - b.order).map(e => {
      const { order, ...rest } = e;
      return rest;
    });
  }
  
  console.log('🎨 Navbar Settings:', navbarSettings);
  console.log('📋 Dropdown Settings:', dropdownSettings);
  console.log('📊 Navbar Elements:', navbarElements);
  console.log('🎯 Text Color:', navbarSettings.textColor);
  console.log('🚫 Hidden elements:', navbarElements.filter(e => !e.visible).map(e => e.id));
  console.log('========================================\n');
  
  // IMMEDIATELY inject CSS to hide elements before they render
  injectElementHidingCSS(navbarElements);
  
  injectStyle();
  console.log('✓ Styles injected');
  
  // Apply to existing elements
  styleElements();
  
  // Wait for navbar to appear in DOM, then apply settings
  waitForNavbarAndApply();
  
  // Failsafe: Reveal navbar after 5 seconds even if processing didn't complete
  setTimeout(() => {
    if (!navbarInitialized) {
      console.log('⚠️ Failsafe: Revealing navbar after timeout');
      revealNavbar();
    }
  }, 5000);
});

// Function to wait for navbar and apply all settings
function waitForNavbarAndApply() {
  let attempts = 0;
  const maxAttempts = 50; // Try for 15 seconds (50 * 300ms)
  
  const checkInterval = setInterval(() => {
    attempts++;
    const navbarList = document.querySelector('ul.nav.navbar-nav');
    
    if (navbarList) {
      clearInterval(checkInterval);
      console.log(`✅ Navbar found after ${attempts} attempts (${attempts * 300}ms)`);
      
      // Apply all settings now that navbar exists
      applyNavbarLinkStyles();
      applyNavbarElementSettings();
      startNavbarObserver();
    } else if (attempts >= maxAttempts) {
      clearInterval(checkInterval);
      console.error(`❌ Navbar not found after ${maxAttempts} attempts (${maxAttempts * 300}ms)`);
      // Reveal anyway to prevent invisible navbar
      revealNavbar();
    } else if (attempts % 5 === 0) {
      // Log every 5 attempts (every 1.5 seconds)
      console.log(`⏳ Still waiting for navbar... (${attempts * 300}ms)`);
    }
  }, 300);
}


// Function to apply direct inline styles to navbar links
function applyNavbarLinkStyles() {
  if (isApplyingLinkStyles) {
    console.log('⏭️ Skipping applyNavbarLinkStyles - already running');
    return;
  }
  
  isApplyingLinkStyles = true;
  console.log('🎨 applyNavbarLinkStyles() CALLED with color:', navbarSettings.textColor);
  
  // Check directly without waiting - navbar should be loaded by now
  const navbarList = document.querySelector('ul.nav.navbar-nav');
  
  if (!navbarList) {
    console.log('⚠️ Navbar list not found yet in applyNavbarLinkStyles');
    isApplyingLinkStyles = false;
    return;
  }
  
  console.log('✓ Navbar list found in applyNavbarLinkStyles');
  
  // Find all navbar links and apply colors directly
  const navLinks = navbarList.querySelectorAll('li > a, li > .dropdown-toggle');
  
  console.log('📊 Found', navLinks.length, 'navbar links');
  
  if (navLinks.length === 0) {
    console.log('⚠️ No navbar links found! Trying alternative selector...');
    const altLinks = navbarList.querySelectorAll('li a');
    console.log('📊 Alternative selector found', altLinks.length, 'links');
  }
  
  navLinks.forEach((link, index) => {
    console.log(`🔧 Styling link ${index + 1}:`, link.textContent.substring(0, 30));
    
    // Apply text color to the link itself
    link.style.setProperty('color', navbarSettings.textColor, 'important');
    
    // Apply to all child elements
    const smalls = link.querySelectorAll('small');
    smalls.forEach(s => {
      s.style.setProperty('color', navbarSettings.textColor, 'important');
      console.log('  ✓ Styled small element');
    });
    
    const svgs = link.querySelectorAll('svg');
    svgs.forEach(svg => {
      svg.style.setProperty('color', navbarSettings.textColor, 'important');
      const paths = svg.querySelectorAll('path');
      paths.forEach(path => {
        path.style.setProperty('fill', navbarSettings.textColor, 'important');
      });
      console.log('  ✓ Styled SVG with', paths.length, 'paths');
    });
    
    const icons = link.querySelectorAll('i');
    icons.forEach(i => {
      i.style.setProperty('color', navbarSettings.textColor, 'important');
      console.log('  ✓ Styled icon');
    });
    
    const spans = link.querySelectorAll('span:not(.badge)');
    spans.forEach(span => {
      span.style.setProperty('color', navbarSettings.textColor, 'important');
      console.log('  ✓ Styled span');
    });
  });
  
  console.log('✅ Applied direct styles to', navLinks.length, 'navbar links');
  isApplyingLinkStyles = false;
}

// Function to find and style the navbar container and dropdowns
function styleElements() {
  // Style navbar
  const navContainer = document.querySelector('div[style*="padding:0 5px !important;"][class="container-fluid"]');
  if (navContainer) {
    applyStyle(navContainer, navbarSettings);
  }
  
  // Apply direct styles to navbar links
  applyNavbarLinkStyles();
  
  // Style dropdowns
  const dropdowns = document.querySelectorAll('ul.dropdown-menu');
  dropdowns.forEach(dropdown => {
    if (!dropdown.hasAttribute('data-styled')) {
      dropdown.setAttribute('data-styled', 'true');
      applyStyle(dropdown, dropdownSettings);
    }
  });
}

function applyStyle(element, settings) {
  const bg = getBackgroundStyle(settings);
  element.style.setProperty('background', bg, 'important');
  element.style.setProperty('transition', 'background 0.3s ease', 'important');
  
  // Apply navbar-specific text and badge colors
  if (element.classList.contains('container-fluid')) {
    // Apply text color to all small elements
    const smallElements = element.querySelectorAll('small');
    smallElements.forEach(small => {
      small.style.setProperty('color', settings.textColor, 'important');
    });
    
    // Apply color to all SVG elements
    const svgs = element.querySelectorAll('svg');
    svgs.forEach(svg => {
      svg.style.setProperty('color', settings.textColor, 'important');
      // Also update the path fill color inside SVG
      const paths = svg.querySelectorAll('path');
      paths.forEach(path => {
        path.style.setProperty('fill', settings.textColor, 'important');
      });
    });
    
    // Apply badge colors
    const badges = element.querySelectorAll('.badge');
    badges.forEach(badge => {
      badge.style.setProperty('background-color', settings.badgeBgColor, 'important');
      badge.style.setProperty('color', settings.badgeColor, 'important');
    });
    
    // Apply hover styles to all anchor tags and dropdown toggles
    const links = element.querySelectorAll('a, .dropdown-toggle');
    links.forEach(link => {
      // Track if element is actively clicked
      let isClicked = false;
      
      // Hover effect
      link.addEventListener('mouseenter', function() {
        this.style.setProperty('background-color', settings.hoverBgColor, 'important');
        this.style.setProperty('color', settings.hoverTextColor, 'important');
        
        // Update text color on hover
        const childSmalls = this.querySelectorAll('small');
        childSmalls.forEach(s => s.style.setProperty('color', settings.hoverTextColor, 'important'));
        
        // Update SVG color on hover
        const childSvgs = this.querySelectorAll('svg');
        childSvgs.forEach(svg => {
          svg.style.setProperty('color', settings.hoverTextColor, 'important');
          const paths = svg.querySelectorAll('path');
          paths.forEach(path => {
            path.style.setProperty('fill', settings.hoverTextColor, 'important');
          });
        });
      });
      
      // Click/Active effect (mousedown)
      link.addEventListener('mousedown', function() {
        isClicked = true;
        this.style.setProperty('background-color', settings.hoverBgColor, 'important');
        this.style.setProperty('color', settings.hoverTextColor, 'important');
        
        // Update text color on click
        const childSmalls = this.querySelectorAll('small');
        childSmalls.forEach(s => s.style.setProperty('color', settings.hoverTextColor, 'important'));
        
        // Update SVG color on click
        const childSvgs = this.querySelectorAll('svg');
        childSvgs.forEach(svg => {
          svg.style.setProperty('color', settings.hoverTextColor, 'important');
          const paths = svg.querySelectorAll('path');
          paths.forEach(path => {
            path.style.setProperty('fill', settings.hoverTextColor, 'important');
          });
        });
      });
      
      // Mouseup to reset clicked state
      link.addEventListener('mouseup', function() {
        isClicked = false;
      });
      
      // Also reset on click elsewhere
      document.addEventListener('mousedown', function(e) {
        if (!link.contains(e.target)) {
          isClicked = false;
        }
      });
      
      // Focus effect (for keyboard navigation)
      link.addEventListener('focus', function() {
        this.style.setProperty('background-color', settings.hoverBgColor, 'important');
        this.style.setProperty('color', settings.hoverTextColor, 'important');
        
        // Update text color on focus
        const childSmalls = this.querySelectorAll('small');
        childSmalls.forEach(s => s.style.setProperty('color', settings.hoverTextColor, 'important'));
        
        // Update SVG color on focus
        const childSvgs = this.querySelectorAll('svg');
        childSvgs.forEach(svg => {
          svg.style.setProperty('color', settings.hoverTextColor, 'important');
          const paths = svg.querySelectorAll('path');
          paths.forEach(path => {
            path.style.setProperty('fill', settings.hoverTextColor, 'important');
          });
        });
      });
      
      link.addEventListener('mouseleave', function() {
        // Only remove styles if not clicked - maintain hover color when clicked
        if (!isClicked) {
          // Set to transparent instead of removing to avoid black flash
          this.style.setProperty('background-color', 'transparent', 'important');
          this.style.setProperty('color', settings.textColor, 'important');
          
          // Restore original text color
          const childSmalls = this.querySelectorAll('small');
          childSmalls.forEach(s => s.style.setProperty('color', settings.textColor, 'important'));
          
          // Restore original SVG color
          const childSvgs = this.querySelectorAll('svg');
          childSvgs.forEach(svg => {
            svg.style.setProperty('color', settings.textColor, 'important');
            const paths = svg.querySelectorAll('path');
            paths.forEach(path => {
              path.style.setProperty('fill', settings.textColor, 'important');
            });
          });
        } else {
          // Keep hover colors when clicked
          this.style.setProperty('background-color', settings.hoverBgColor, 'important');
          this.style.setProperty('color', settings.hoverTextColor, 'important');
        }
      });
      
      // Blur effect (when focus is lost)
      link.addEventListener('blur', function() {
        isClicked = false;
        this.style.setProperty('background-color', 'transparent', 'important');
        this.style.setProperty('color', settings.textColor, 'important');
        
        // Restore original text color
        const childSmalls = this.querySelectorAll('small');
        childSmalls.forEach(s => s.style.setProperty('color', settings.textColor, 'important'));
        
        // Restore original SVG color
        const childSvgs = this.querySelectorAll('svg');
        childSvgs.forEach(svg => {
          svg.style.setProperty('color', settings.textColor, 'important');
          const paths = svg.querySelectorAll('path');
          paths.forEach(path => {
            path.style.setProperty('fill', settings.textColor, 'important');
          });
        });
      });
    });
  }
  
  // Apply dropdown menu item styling
  if (element.classList.contains('dropdown-menu') || element.matches('ul.dropdown-menu')) {
    const dropdownItems = element.querySelectorAll('li a, li > a, .dropdown-item');
    dropdownItems.forEach(item => {
      // Set default styles
      item.style.setProperty('color', dropdownSettings.itemTextColor, 'important');
      item.style.setProperty('background-color', 'transparent', 'important');
      item.style.setProperty('transition', 'none', 'important');
      
      // Style child elements
      const childSmalls = item.querySelectorAll('small');
      childSmalls.forEach(s => s.style.setProperty('color', dropdownSettings.itemTextColor, 'important'));
      
      const childSvgs = item.querySelectorAll('svg, i');
      childSvgs.forEach(svg => {
        svg.style.setProperty('color', dropdownSettings.itemTextColor, 'important');
        if (svg.tagName === 'svg') {
          const paths = svg.querySelectorAll('path');
          paths.forEach(path => path.style.setProperty('fill', dropdownSettings.itemTextColor, 'important'));
        }
      });
      
      const childSpans = item.querySelectorAll('span');
      childSpans.forEach(span => {
        if (!span.classList.contains('badge')) {
          span.style.setProperty('color', dropdownSettings.itemTextColor, 'important');
        }
      });
      
      // Track click state for dropdown items
      let isItemClicked = false;
      
      // Hover event
      item.addEventListener('mouseenter', function() {
        this.style.setProperty('background-color', dropdownSettings.itemHoverBgColor, 'important');
        this.style.setProperty('color', dropdownSettings.itemHoverTextColor, 'important');
        
        const smalls = this.querySelectorAll('small');
        smalls.forEach(s => s.style.setProperty('color', dropdownSettings.itemHoverTextColor, 'important'));
        
        const svgs = this.querySelectorAll('svg, i');
        svgs.forEach(svg => {
          svg.style.setProperty('color', dropdownSettings.itemHoverTextColor, 'important');
          if (svg.tagName === 'svg') {
            const paths = svg.querySelectorAll('path');
            paths.forEach(path => path.style.setProperty('fill', dropdownSettings.itemHoverTextColor, 'important'));
          }
        });
        
        const spans = this.querySelectorAll('span');
        spans.forEach(span => {
          if (!span.classList.contains('badge')) {
            span.style.setProperty('color', dropdownSettings.itemHoverTextColor, 'important');
          }
        });
      });
      
      // Click event
      item.addEventListener('mousedown', function() {
        isItemClicked = true;
        this.style.setProperty('background-color', dropdownSettings.itemHoverBgColor, 'important');
        this.style.setProperty('color', dropdownSettings.itemHoverTextColor, 'important');
      });
      
      item.addEventListener('mouseup', function() {
        // Keep hover color for a moment after click
        setTimeout(() => {
          isItemClicked = false;
        }, 100);
      });
      
      // Mouse leave event
      item.addEventListener('mouseleave', function() {
        if (!isItemClicked) {
          // Set to transparent instead of removing to avoid black flash
          this.style.setProperty('background-color', 'transparent', 'important');
          this.style.setProperty('color', dropdownSettings.itemTextColor, 'important');
          
          const smalls = this.querySelectorAll('small');
          smalls.forEach(s => s.style.setProperty('color', dropdownSettings.itemTextColor, 'important'));
          
          const svgs = this.querySelectorAll('svg, i');
          svgs.forEach(svg => {
            svg.style.setProperty('color', dropdownSettings.itemTextColor, 'important');
            if (svg.tagName === 'svg') {
              const paths = svg.querySelectorAll('path');
              paths.forEach(path => path.style.setProperty('fill', dropdownSettings.itemTextColor, 'important'));
            }
          });
          
          const spans = this.querySelectorAll('span');
          spans.forEach(span => {
            if (!span.classList.contains('badge')) {
              span.style.setProperty('color', dropdownSettings.itemTextColor, 'important');
            }
          });
        } else {
          // Keep hover colors when clicked
          this.style.setProperty('background-color', dropdownSettings.itemHoverBgColor, 'important');
          this.style.setProperty('color', dropdownSettings.itemHoverTextColor, 'important');
        }
      });
    });
  }
}

// Function to identify and manage navbar elements
function getNavbarElementByIdentifier(element) {
  // Check text content and icons to identify elements
  const text = element.textContent.trim().toLowerCase();
  const hasIcon = (iconClass) => element.querySelector(`svg.${iconClass}, i.${iconClass}`);
  
  // Log for debugging
  console.log('🔍 Identifying element:', {
    id: element.id,
    text: text.substring(0, 50),
    hasIcons: element.querySelectorAll('svg, i').length > 0
  });
  
  if (text.includes('ajouter') && hasIcon('fa-plus')) return 'ajouter';
  if (text.includes('ramassage') && hasIcon('fa-truck')) {
    // Distinguish between Ramassage and En Livraison
    if (element.id === 'collect_li' || element.textContent.includes('Ramassage')) return 'ramassage';
    if (element.id === 'livraison_li' || text.includes('en livraison')) return 'livraison';
  }
  if (text.includes('finance') && hasIcon('fa-dollar-sign')) return 'finance';
  if (text.includes('réception') && hasIcon('fa-cubes')) return 'reception';
  if (element.id === 'livraison_li' || (text.includes('en livraison') && hasIcon('fa-truck'))) return 'livraison';
  if (element.id === 'livechou_li' || text.includes('suspendu') || text.includes('suspendus')) return 'suspendu';
  if (element.id === 'return_li' || (text.includes('retours') && hasIcon('fa-reply'))) return 'retours';
  if (element.id === 'livred_li' || ((text.includes('livrés') || text.includes('livres')) && hasIcon('fa-check-square'))) return 'livres';
  if (text.includes('dispatch') && hasIcon('fa-random')) return 'dispatch';
  if (text.includes('modification') && hasIcon('fa-edit')) return 'modification';
  if ((text.includes('feuilles de route') || text.includes('fdr')) && hasIcon('fa-copy')) return 'fdr';
  
  return null;
}

// Function to wait for an element to exist (non-blocking)
function waitForElement(selector, callback, maxAttempts = 30) {
  let attempts = 0;
  let intervalId;
  
  const checkElement = () => {
    attempts++;
    const element = document.querySelector(selector);
    
    if (element) {
      clearInterval(intervalId);
      console.log(`✅ Found element after ${attempts} attempts:`, selector.substring(0, 50));
      callback(element);
      return true;
    } else if (attempts >= maxAttempts) {
      clearInterval(intervalId);
      console.error(`❌ Element not found after ${maxAttempts} attempts:`, selector.substring(0, 50));
      return false;
    }
    // Continue checking (interval will call this again)
  };
  
  // Check immediately first
  if (checkElement() !== true) {
    // If not found, set up interval to keep checking
    intervalId = setInterval(checkElement, 300);
  }
}

// Function to apply navbar element visibility and order
function applyNavbarElementSettings() {
  if (isApplyingNavbarSettings) {
    console.log('⏭️ Skipping applyNavbarElementSettings - already running');
    return;
  }
  
  isApplyingNavbarSettings = true;
  console.log('🔧 applyNavbarElementSettings() called');
  console.log('📦 Current navbarElements:', JSON.stringify(navbarElements, null, 2));
  
  // Check directly without waiting - navbar should be loaded by now
  const navbarList = document.querySelector('ul.nav.navbar-nav');
  
  if (!navbarList) {
    console.log('⚠️ Navbar list not found yet in applyNavbarElementSettings');
    isApplyingNavbarSettings = false;
    return;
  }
  
  console.log('✅ Navbar list found!');
    
  console.log('✓ Applying navbar element settings', navbarElements);
  
  // Log which elements should be hidden
  const hiddenElements = navbarElements.filter(e => !e.visible);
  console.log('🚫 Elements to hide:', hiddenElements.map(e => e.id));
  
  // Get all direct li children (menu items)
  const menuItems = Array.from(navbarList.children).filter(child => child.tagName === 'LI');
  console.log('✓ Found', menuItems.length, 'menu items');
  
  // Create a map of elements with their identifiers
  const elementMap = new Map();
  menuItems.forEach(item => {
    const identifier = getNavbarElementByIdentifier(item);
    if (identifier) {
      elementMap.set(identifier, item);
      console.log('✓ Identified element:', identifier);
    }
  });
  
  // Use navbar elements in array order
  const sortedElements = [...navbarElements];
  
  console.log('✓ Elements in order:', sortedElements.map(e => e.id));
  console.log('📋 EXPECTED FINAL ORDER:', sortedElements.map((e, i) => `${i+1}. ${e.id}`).join(', '));
  
  // Add CSS rule to hide elements FIRST (before any manipulation)
  const hiddenIds = navbarElements.filter(e => !e.visible).map(e => e.id);
  if (hiddenIds.length > 0) {
    addHiddenElementsCSS(hiddenIds);
  }
  
  // Mark all elements with data attributes
  menuItems.forEach((item, index) => {
    const identifier = getNavbarElementByIdentifier(item);
    console.log(`\n🔍 Processing menu item ${index + 1}:`, identifier || 'UNIDENTIFIED');
    
    if (identifier) {
      const config = navbarElements.find(e => e.id === identifier);
      console.log(`   Config found:`, config ? `visible=${config.visible}, order=${config.order}` : 'NOT FOUND');
      
      // Add data attribute for identification
      item.setAttribute('data-navbar-element', identifier);
      item.setAttribute('data-element-id', identifier);
      
      if (config && !config.visible) {
        console.log(`   🚫 HIDING ${identifier}...`);
        
        // Hide with CSS only (don't remove from DOM yet - need for reordering)
        item.style.setProperty('display', 'none', 'important');
        item.style.setProperty('visibility', 'hidden', 'important');
        item.style.setProperty('opacity', '0', 'important');
        item.style.setProperty('position', 'absolute', 'important');
        item.style.setProperty('left', '-9999px', 'important');
        item.style.setProperty('pointer-events', 'none', 'important');
        item.setAttribute('hidden', 'true');
        item.setAttribute('aria-hidden', 'true');
        
        console.log(`   ✓ Applied hiding styles to ${identifier}`);
      } else if (config && config.visible) {
        console.log(`   ✓ ${identifier} is visible, ensuring it's shown`);
        // Make sure visible elements are shown
        item.style.removeProperty('display');
        item.style.removeProperty('visibility');
        item.style.removeProperty('opacity');
        item.style.removeProperty('position');
        item.style.removeProperty('left');
        item.style.removeProperty('pointer-events');
        item.removeAttribute('hidden');
        item.removeAttribute('aria-hidden');
      }
    } else {
      console.log(`   ⚠️ Could not identify this element`);
    }
  });
  
  // REORDER: Physically move DOM elements based on order configuration
  console.log('\n🔄 REORDERING ELEMENTS...');
  
  // Create array of elements with their order
  const elementsWithOrder = [];
  menuItems.forEach(item => {
    const identifier = getNavbarElementByIdentifier(item);
    if (identifier) {
      const config = navbarElements.find(e => e.id === identifier);
      if (config) {
        const orderIndex = navbarElements.findIndex(e => e.id === identifier);
        console.log(`   Found config for ${identifier}: order=${orderIndex}, visible=${config.visible}`);
        elementsWithOrder.push({
          element: item,
          id: identifier,
          order: orderIndex,
          visible: config.visible
        });
      } else {
        console.log(`   ⚠️ No config found for ${identifier}`);
      }
    }
  });
  
  console.log('📦 Elements BEFORE sorting:', elementsWithOrder.map(e => `${e.id}:${e.order}`).join(', '));
  
  // Sort by order (now based on array position)
  elementsWithOrder.sort((a, b) => a.order - b.order);
  
  console.log('📦 Elements AFTER sorting:', elementsWithOrder.map(e => `${e.id}:${e.order}`).join(', '));
  
  // Detach all elements first
  const detachedElements = elementsWithOrder.map(item => {
    if (item.element.parentNode) {
      item.element.parentNode.removeChild(item.element);
    }
    return item;
  });
  
  // Append back in the correct order
  detachedElements.forEach((item, index) => {
    navbarList.appendChild(item.element);
    console.log(`   ${index + 1}. ${item.id} (order: ${item.order}, visible: ${item.visible})`);
  });
  
  console.log('✅ Elements reordered in DOM');
  
  // Now remove hidden elements from DOM completely
  hiddenIds.forEach(hiddenId => {
    const element = elementMap.get(hiddenId);
    if (element && element.parentNode) {
      console.log(`   🗑️ Removing hidden element: ${hiddenId}`);
      element.parentNode.removeChild(element);
    }
  });
  
  console.log('✓ Navbar element settings applied');
  
  // Start continuous monitoring to remove hidden elements
  startNavbarObserver();
  
  // Reveal the navbar now that we've processed it
  revealNavbar();
  
  console.log('✅ Navbar element settings applied!');
  navbarInitialized = true;
  isApplyingNavbarSettings = false;
}

// Function to reveal the navbar after processing
function revealNavbar() {
  // Remove the pre-load hiding style
  const preloadStyle = document.getElementById('navbar-preload-hide');
  if (preloadStyle) {
    preloadStyle.remove();
    console.log('👁️ Navbar revealed');
  }
  
  // Make sure navbar is visible
  const navbarList = document.querySelector('ul.nav.navbar-nav');
  if (navbarList) {
    navbarList.style.setProperty('visibility', 'visible', 'important');
  }
}

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.navbarElements) {
      navbarElements = changes.navbarElements.newValue || navbarElements;
      applyNavbarElementSettings();
    }
    if (changes.navbarSettings) {
      navbarSettings = changes.navbarSettings.newValue || navbarSettings;
      applyNavbarLinkStyles();
    }
    if (changes.dropdownSettings) {
      dropdownSettings = changes.dropdownSettings.newValue || dropdownSettings;
      styleElements();
    }
  }
});

// Create a dedicated observer for the navbar to continuously remove hidden elements
let navbarObserver = null;
let hiddenElementsStyleTag = null;
let reorderTimeout = null;
let isReordering = false;
let lastReorderTime = 0;

// Function to add CSS that hides elements
function addHiddenElementsCSS(hiddenIds) {
  // Remove existing style tag if any
  if (hiddenElementsStyleTag && hiddenElementsStyleTag.parentNode) {
    hiddenElementsStyleTag.remove();
  }
  
  if (hiddenIds.length === 0) return;
  
  // Create multiple CSS selectors for maximum coverage
  const selectors = [];
  hiddenIds.forEach(id => {
    selectors.push(`li[data-navbar-element="${id}"]`);
    selectors.push(`li[data-element-id="${id}"]`);
    
    // Add specific ID selectors based on element ID
    switch(id) {
      case 'ramassage':
        selectors.push('#collect_li');
        break;
      case 'livraison':
        selectors.push('#livraison_li');
        break;
      case 'suspendu':
        selectors.push('#livechou_li');
        break;
      case 'retours':
        selectors.push('#return_li');
        break;
      case 'livres':
        selectors.push('#livred_li');
        break;
    }
  });
  
  const selectorString = selectors.join(',\n');
  
  hiddenElementsStyleTag = document.createElement('style');
  hiddenElementsStyleTag.setAttribute('id', 'navbar-hidden-elements-css');
  const cssContent = `
    ${selectorString} {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      position: absolute !important;
      left: -9999px !important;
      width: 0 !important;
      height: 0 !important;
      overflow: hidden !important;
      max-width: 0 !important;
      max-height: 0 !important;
    }
  `;
  hiddenElementsStyleTag.textContent = cssContent;
  (document.head || document.documentElement).prepend(hiddenElementsStyleTag);
  
  console.log('🎯 INJECTED HIDING CSS FOR:', hiddenIds);
  console.log('📝 CSS Selectors:', selectorString.substring(0, 200));
  console.log('✅ Style tag inserted in:', document.head ? 'HEAD' : 'DOCUMENT');
}

// Function to start observing the navbar for changes
function startNavbarObserver() {
  if (navbarInitialized) {
    console.log('⏭️ Navbar observer already started');
    return;
  }
  
  const navbarList = document.querySelector('ul.nav.navbar-nav');
  
  if (!navbarList) {
    console.log('⚠️ Cannot start navbar observer - navbar not found');
    return;
  }
  
  console.log('🔍 Starting navbar observer...');
  console.log('✓ Navbar list found in startNavbarObserver');
  
  // Stop existing observer if any
  if (navbarObserver) {
    navbarObserver.disconnect();
  }
  
  // Create new observer
  navbarObserver = new MutationObserver((mutations) => {
    let hasChildListChanges = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        hasChildListChanges = true;
      }
    });
    
    if (hasChildListChanges && !isReordering && (Date.now() - lastReorderTime > 2000)) {
      // Clear any existing reorder timeout
      if (reorderTimeout) {
        clearTimeout(reorderTimeout);
      }
      
      // Schedule reordering after a short delay
      reorderTimeout = setTimeout(() => {
        isReordering = true;
        lastReorderTime = Date.now();
        console.log('🔄 Detected navbar changes, reordering...');
        const navbarList = document.querySelector('ul.nav.navbar-nav');
        if (navbarList) {
          // Re-run just the reordering part
          const menuItems = Array.from(navbarList.children).filter(child => child.tagName === 'LI');
          console.log('📊 Found', menuItems.length, 'menu items');
          
          const elementsWithOrder = [];
          menuItems.forEach((item, index) => {
            const identifier = getNavbarElementByIdentifier(item);
            console.log(`   Item ${index}: ${identifier || 'UNIDENTIFIED'} - "${item.textContent.trim().substring(0, 30)}"`);
            if (identifier) {
              const config = navbarElements.find(e => e.id === identifier);
              if (config) {
                const orderIndex = navbarElements.findIndex(e => e.id === identifier);
                elementsWithOrder.push({
                  element: item,
                  id: identifier,
                  order: orderIndex,
                  visible: config.visible
                });
              }
            }
          });
          
          console.log('📦 Elements to reorder:', elementsWithOrder.map(e => `${e.id}(order:${e.order})`).join(', '));
          
          elementsWithOrder.sort((a, b) => a.order - b.order);
          
          console.log('📦 After sorting:', elementsWithOrder.map(e => e.id).join(', '));
          
          const detachedElements = elementsWithOrder.map(item => {
            if (item.element.parentNode) {
              item.element.parentNode.removeChild(item.element);
            }
            return item;
          });
          
          detachedElements.forEach((item) => {
            navbarList.appendChild(item.element);
          });
          
          console.log('✅ Reordered navbar elements after DOM changes');
        }
        isReordering = false;
        reorderTimeout = null;
      }, 1000);
    }
    
    // Process each item for visibility (existing logic)
    const menuItems = Array.from(navbarList.children).filter(child => child.tagName === 'LI');
    menuItems.forEach(item => {
      const identifier = getNavbarElementByIdentifier(item);
      if (identifier) {
        // Add data attribute for CSS targeting
        item.setAttribute('data-navbar-element', identifier);
        
        const config = navbarElements.find(e => e.id === identifier);
        if (config && !config.visible) {
          // Hide and remove
          item.style.setProperty('display', 'none', 'important');
          setTimeout(() => {
            if (item.parentNode) {
              item.remove();
              console.log('🗑️ Auto-removed hidden element:', identifier);
            }
          }, 0);
        }
      }
    });
  });// Observe the navbar list for any changes
navbarObserver.observe(navbarList, {
  childList: true,
  subtree: true
});

console.log('✓ Navbar observer started');
}


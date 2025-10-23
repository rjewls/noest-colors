/**
 * Options page script
 * Handles saving and loading user preferences
 */

const DEFAULT_NAVBAR = { type: 'solid', color: '#007bff', color1: '#007bff', color2: '#764ba2', angle: 135, effect: 'none', effectSpeed: 3, textColor: '#000000', badgeColor: '#ffffff', badgeBgColor: '#dc3545', hoverBgColor: '#f0f0f0', hoverTextColor: '#000000' };
const DEFAULT_DROPDOWN = { type: 'solid', color: '#ffffff', color1: '#ffffff', color2: '#f8f9fa', angle: 180, effect: 'none', effectSpeed: 3, itemTextColor: '#000000', itemHoverBgColor: '#f8f9fa', itemHoverTextColor: '#000000', loginMenuTextColor: '#000000', notificationMenuTextColor: '#ffffff' };

// Default navbar elements configuration (matching website's default order)
const DEFAULT_NAVBAR_ELEMENTS = [
  { id: 'ajouter', label: 'Ajouter', visible: true, order: 0 },
  { id: 'ramassage', label: 'Ramassage', visible: true, order: 1 },
  { id: 'reception', label: 'Reception', visible: true, order: 2 },
  { id: 'dispatch', label: 'Dispatch', visible: true, order: 3 },
  { id: 'modification', label: 'Demandes de modification', visible: true, order: 4 },
  { id: 'fdr', label: 'Feuilles de route', visible: true, order: 5 },
  { id: 'livraison', label: 'En Livraison', visible: true, order: 6 },
  { id: 'suspendu', label: 'Suspendus', visible: true, order: 7 },
  { id: 'retours', label: 'Retours', visible: true, order: 8 },
  { id: 'livres', label: 'Livres', visible: true, order: 9 },
  { id: 'finance', label: 'Finance', visible: true, order: 10 }
];

let navbarElements = [...DEFAULT_NAVBAR_ELEMENTS];

// Default dropdown items configuration (organized by parent navbar element)
const DEFAULT_DROPDOWN_ITEMS = {
  'ajouter': [
    { id: 'expedier-colis', label: 'Expedier un colis', icon: 'fa-plus-circle', visible: true },
    { id: 'expedier-interne', label: 'Expedier un colis interne', icon: 'fa-building', visible: true }
  ],
  'ramassage': [
    { id: 'colis-ramasser', label: 'Colis a ramasser', icon: 'fa-hourglass-start', visible: true },
    { id: 'colis-ramassage', label: 'Colis en ramassage', icon: 'fa-truck', visible: true },
    { id: 'colis-ramassage-stock', label: 'Colis en ramassage [Stock]', icon: 'fa-truck', visible: true },
    { id: 'colis-transit', label: 'Colis en transit', icon: 'fa-exchange-alt', visible: true }
  ],
  'reception': [
    { id: 'sacs-valider', label: 'Sacs a valider', icon: 'fa-long-arrow-alt-right', visible: true },
    { id: 'colis-valider', label: 'Colis a valider', icon: 'fa-check', visible: true },
    { id: 'sacs-perdus', label: 'Sacs Perdus', icon: 'fa-exclamation-triangle', visible: true },
    { id: 'colis-transferer', label: 'Colis à transférer', icon: 'fa-random', visible: true },
    { id: 'sacs-sortants', label: 'Sacs sortants', icon: 'fa-long-arrow-alt-left', visible: true }
  ],
  'dispatch': [
    { id: 'dispatch-main', label: 'Dispatch', icon: 'fa-random', visible: true },
    { id: 'stop-desk', label: 'Stop Desk', icon: 'fa-pause', visible: true },
    { id: 'vente-achat', label: 'Vente ET Achat', icon: 'fa-dollar-sign', visible: true },
    { id: 'colis-internes', label: 'Colis internes', icon: 'fa-building', visible: true },
    { id: 'historique-internes', label: 'Historique Colis internes', icon: 'fa-history', visible: true }
  ],
  'modification': [
    { id: 'demandes-cours', label: 'Demandes en cours', icon: 'fa-edit', visible: true },
    { id: 'demandes-traitees', label: 'Demandes traitées', icon: 'fa-calendar', visible: true }
  ],
  'fdr': [
    { id: 'creer-fdr', label: 'Créer une feuille de route', icon: 'fe-file-text', visible: true },
    { id: 'activation-fdr', label: 'Activation des feuilles de route', icon: 'fe-zap', visible: true },
    { id: 'liste-fdr', label: 'Liste des feuilles de route', icon: 'fe-layers', visible: true },
    { id: 'archive-fdr', label: 'Archive des feuilles de route', icon: 'fa-archive', visible: true }
  ],
  'retours': [
    { id: 'chez-livreur', label: 'Chez livreur', icon: 'fa-truck', visible: true },
    { id: 'retours-dispatch-admin', label: 'A dispatcher', icon: 'fa-random', visible: true, section: 'hub-admin' },
    { id: 'retours-transit-admin', label: 'En transit', icon: 'fa-exchange-alt', visible: true, section: 'hub-admin' },
    { id: 'retours-dispatch-entrepot', label: 'A dispatcher', icon: 'fa-random', visible: true, section: 'entrepot' },
    { id: 'retours-transit-entrepot', label: 'En transit', icon: 'fa-exchange-alt', visible: true, section: 'entrepot' },
    { id: 'retours-historique-entrepot', label: 'Historique', icon: 'fa-history', visible: true, section: 'entrepot' },
    { id: 'retours-dispatch-partenaires', label: 'A dispatcher', icon: 'fa-random', visible: true, section: 'partenaires' },
    { id: 'retours-transit-partenaires', label: 'En transit', icon: 'fa-exchange-alt', visible: true, section: 'partenaires' },
    { id: 'retours-historique-partenaires', label: 'Historique', icon: 'fa-history', visible: true, section: 'partenaires' }
  ],
  'livres': [
    { id: 'non-encaisse', label: 'Non Encaissés', icon: 'fa-clock', visible: true },
    { id: 'encaisse-non-verse', label: 'Encaissés non versés', icon: 'fa-dollar-sign', visible: true },
    { id: 'encaisse-verse', label: 'Encaissés et versés à la caisse', icon: 'fa-level-up-alt', visible: true },
    { id: 'ancien-historique', label: 'Ancien Historique', icon: 'fa-history', visible: true }
  ],
  'finance': [
    { id: 'reception-versement-admin', label: 'Réception versement admin', icon: 'fa-check', visible: true, section: 'reception' },
    { id: 'depot-partenaire', label: 'Dépot d\'argent partenaire', icon: 'fa-user-plus', visible: true, section: 'reception' },
    { id: 'depenses-charges', label: 'Dépenses (charges)', icon: 'fa-exchange-alt', visible: true, section: 'sortie' },
    { id: 'retrait-partenaire', label: 'Retrait d\'argent partenaire', icon: 'fa-user-minus', visible: true, section: 'sortie' },
    { id: 'pvs-caisse', label: 'PVs de caisse', icon: 'fa-funnel-dollar', visible: true, section: 'payments' },
    { id: 'pvs-transit', label: 'PVs en transit', icon: 'fa-exchange-alt', visible: true, section: 'payments' },
    { id: 'pvs-archives', label: 'PVs archivés', icon: 'fa-history', visible: true, section: 'payments' },
    { id: 'caisse-hub', label: 'Caisse', icon: 'fa-hand-holding-usd', visible: true, section: 'caisse' },
    { id: 'historique-mouvements', label: 'Historique des mouvements', icon: 'fa-history', visible: true, section: 'caisse' }
  ]
};

let dropdownItems = { ...DEFAULT_DROPDOWN_ITEMS };

// Theme presets - Popular web design color combinations
const THEMES = {
  sunset: {
    name: 'Sunset ðŸŒ…',
    navbar: {
      type: 'gradient',
      color1: '#FF881A',
      color2: '#FF3D3D',
      angle: 135,
      effect: 'none',
      effectSpeed: 3,
      textColor: '#FFFFFF',
      badgeColor: '#FFFFFF',
      badgeBgColor: '#FF6B6B',
      hoverBgColor: 'rgba(255, 255, 255, 0.2)',
      hoverTextColor: '#FFFFFF'
    },
    dropdown: {
      type: 'gradient',
      color1: '#FFE8D6',
      color2: '#FFD5D5',
      angle: 180,
      effect: 'none',
      effectSpeed: 3,
      itemTextColor: '#333333',
      itemHoverBgColor: '#FFD0B3',
      itemHoverTextColor: '#000000'
    }
  },
  ocean: {
    name: 'Ocean Breeze ðŸŒŠ',
    navbar: {
      type: 'gradient',
      color1: '#2E3192',
      color2: '#1BFFFF',
      angle: 120,
      effect: 'none',
      effectSpeed: 3,
      textColor: '#FFFFFF',
      badgeColor: '#FFFFFF',
      badgeBgColor: '#00D9FF',
      hoverBgColor: 'rgba(255, 255, 255, 0.15)',
      hoverTextColor: '#FFFFFF'
    },
    dropdown: {
      type: 'gradient',
      color1: '#E3F2FD',
      color2: '#E0F7FA',
      angle: 180,
      effect: 'none',
      effectSpeed: 3,
      itemTextColor: '#1565C0',
      itemHoverBgColor: '#B3E5FC',
      itemHoverTextColor: '#01579B'
    }
  },
  forest: {
    name: 'Forest Green ðŸŒ²',
    navbar: {
      type: 'gradient',
      color1: '#134E5E',
      color2: '#71B280',
      angle: 135,
      effect: 'none',
      effectSpeed: 3,
      textColor: '#FFFFFF',
      badgeColor: '#FFFFFF',
      badgeBgColor: '#4CAF50',
      hoverBgColor: 'rgba(255, 255, 255, 0.2)',
      hoverTextColor: '#FFFFFF'
    },
    dropdown: {
      type: 'gradient',
      color1: '#E8F5E9',
      color2: '#C8E6C9',
      angle: 180,
      effect: 'none',
      effectSpeed: 3,
      itemTextColor: '#2E7D32',
      itemHoverBgColor: '#A5D6A7',
      itemHoverTextColor: '#1B5E20'
    }
  },
  purple: {
    name: 'Purple Haze ðŸ’œ',
    navbar: {
      type: 'gradient',
      color1: '#667EEA',
      color2: '#764BA2',
      angle: 135,
      effect: 'none',
      effectSpeed: 3,
      textColor: '#FFFFFF',
      badgeColor: '#FFFFFF',
      badgeBgColor: '#9C27B0',
      hoverBgColor: 'rgba(255, 255, 255, 0.2)',
      hoverTextColor: '#FFFFFF'
    },
    dropdown: {
      type: 'gradient',
      color1: '#F3E5F5',
      color2: '#E1BEE7',
      angle: 180,
      effect: 'none',
      effectSpeed: 3,
      itemTextColor: '#6A1B9A',
      itemHoverBgColor: '#CE93D8',
      itemHoverTextColor: '#4A148C'
    }
  },
  night: {
    name: 'Night Mode ðŸŒ™',
    navbar: {
      type: 'gradient',
      color1: '#2C3E50',
      color2: '#34495E',
      angle: 135,
      effect: 'none',
      effectSpeed: 3,
      textColor: '#ECF0F1',
      badgeColor: '#FFFFFF',
      badgeBgColor: '#E74C3C',
      hoverBgColor: 'rgba(236, 240, 241, 0.1)',
      hoverTextColor: '#FFFFFF'
    },
    dropdown: {
      type: 'gradient',
      color1: '#34495E',
      color2: '#2C3E50',
      angle: 180,
      effect: 'none',
      effectSpeed: 3,
      itemTextColor: '#ECF0F1',
      itemHoverBgColor: '#455A64',
      itemHoverTextColor: '#FFFFFF'
    }
  },
  candy: {
    name: 'Candy Pop ðŸ¬',
    navbar: {
      type: 'gradient',
      color1: '#FF6FD8',
      color2: '#3813C2',
      angle: 120,
      effect: 'none',
      effectSpeed: 3,
      textColor: '#FFFFFF',
      badgeColor: '#FFFFFF',
      badgeBgColor: '#FF1493',
      hoverBgColor: 'rgba(255, 255, 255, 0.2)',
      hoverTextColor: '#FFFFFF'
    },
    dropdown: {
      type: 'gradient',
      color1: '#FFE5F8',
      color2: '#E8DEFF',
      angle: 180,
      effect: 'none',
      effectSpeed: 3,
      itemTextColor: '#880E4F',
      itemHoverBgColor: '#F8BBD0',
      itemHoverTextColor: '#4A148C'
    }
  },
  fire: {
    name: 'Fire Blaze ðŸ”¥',
    navbar: {
      type: 'gradient',
      color1: '#F83600',
      color2: '#FE8C00',
      angle: 135,
      effect: 'none',
      effectSpeed: 3,
      textColor: '#FFFFFF',
      badgeColor: '#FFFFFF',
      badgeBgColor: '#FF5722',
      hoverBgColor: 'rgba(255, 255, 255, 0.2)',
      hoverTextColor: '#FFFFFF'
    },
    dropdown: {
      type: 'gradient',
      color1: '#FFF3E0',
      color2: '#FFE0B2',
      angle: 180,
      effect: 'none',
      effectSpeed: 3,
      itemTextColor: '#E65100',
      itemHoverBgColor: '#FFCC80',
      itemHoverTextColor: '#BF360C'
    }
  },
  mint: {
    name: 'Fresh Mint ðŸƒ',
    navbar: {
      type: 'gradient',
      color1: '#00B4DB',
      color2: '#0083B0',
      angle: 135,
      effect: 'none',
      effectSpeed: 3,
      textColor: '#FFFFFF',
      badgeColor: '#FFFFFF',
      badgeBgColor: '#00BCD4',
      hoverBgColor: 'rgba(255, 255, 255, 0.2)',
      hoverTextColor: '#FFFFFF'
    },
    dropdown: {
      type: 'gradient',
      color1: '#E0F7FA',
      color2: '#B2EBF2',
      angle: 180,
      effect: 'none',
      effectSpeed: 3,
      itemTextColor: '#006064',
      itemHoverBgColor: '#80DEEA',
      itemHoverTextColor: '#004D40'
    }
  }
};

// Elements
const navbarTypeRadios = document.querySelectorAll('input[name="navbarType"]');
const navbarSolid = document.getElementById('navbarSolid');
const navbarGradient = document.getElementById('navbarGradient');
const navbarColor = document.getElementById('navbarColor');
const navbarColorHex = document.getElementById('navbarColorHex');
const navbarColor1 = document.getElementById('navbarColor1');
const navbarColor1Hex = document.getElementById('navbarColor1Hex');
const navbarColor2 = document.getElementById('navbarColor2');
const navbarColor2Hex = document.getElementById('navbarColor2Hex');
const navbarAngle = document.getElementById('navbarAngle');
const navbarAngleValue = document.getElementById('navbarAngleValue');
const navbarEffect = document.getElementById('navbarEffect');
const navbarEffectSpeed = document.getElementById('navbarEffectSpeed');
const navbarEffectSpeedValue = document.getElementById('navbarEffectSpeedValue');
const navbarTextColor = document.getElementById('navbarTextColor');
const navbarTextColorHex = document.getElementById('navbarTextColorHex');
const navbarBadgeColor = document.getElementById('navbarBadgeColor');
const navbarBadgeColorHex = document.getElementById('navbarBadgeColorHex');
const navbarBadgeBgColor = document.getElementById('navbarBadgeBgColor');
const navbarBadgeBgColorHex = document.getElementById('navbarBadgeBgColorHex');
const navbarHoverBgColor = document.getElementById('navbarHoverBgColor');
const navbarHoverBgColorHex = document.getElementById('navbarHoverBgColorHex');
const navbarHoverTextColor = document.getElementById('navbarHoverTextColor');
const navbarHoverTextColorHex = document.getElementById('navbarHoverTextColorHex');

const dropdownTypeRadios = document.querySelectorAll('input[name="dropdownType"]');
const dropdownSolid = document.getElementById('dropdownSolid');
const dropdownGradient = document.getElementById('dropdownGradient');
const dropdownColor = document.getElementById('dropdownColor');
const dropdownColorHex = document.getElementById('dropdownColorHex');
const dropdownColor1 = document.getElementById('dropdownColor1');
const dropdownColor1Hex = document.getElementById('dropdownColor1Hex');
const dropdownColor2 = document.getElementById('dropdownColor2');
const dropdownColor2Hex = document.getElementById('dropdownColor2Hex');
const dropdownAngle = document.getElementById('dropdownAngle');
const dropdownAngleValue = document.getElementById('dropdownAngleValue');
const dropdownBreathing = document.getElementById('dropdownBreathing');
const dropdownItemTextColor = document.getElementById('dropdownItemTextColor');
const dropdownItemTextColorHex = document.getElementById('dropdownItemTextColorHex');
const dropdownItemHoverBgColor = document.getElementById('dropdownItemHoverBgColor');
const dropdownItemHoverBgColorHex = document.getElementById('dropdownItemHoverBgColorHex');
const dropdownItemHoverTextColor = document.getElementById('dropdownItemHoverTextColor');
const dropdownItemHoverTextColorHex = document.getElementById('dropdownItemHoverTextColorHex');

// Special menu override elements
const loginMenuTextColor = document.getElementById('loginMenuTextColor');
const loginMenuTextColorHex = document.getElementById('loginMenuTextColorHex');
const notificationMenuTextColor = document.getElementById('notificationMenuTextColor');
const notificationMenuTextColorHex = document.getElementById('notificationMenuTextColorHex');

const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const statusMessage = document.getElementById('statusMessage');
const presetColors = document.querySelectorAll('.preset-color');

// Load saved settings on page load
document.addEventListener('DOMContentLoaded', loadSettings);

// Event listeners
navbarTypeRadios.forEach(radio => radio.addEventListener('change', toggleNavbarType));
dropdownTypeRadios.forEach(radio => radio.addEventListener('change', toggleDropdownType));

navbarColor.addEventListener('change', () => syncHex(navbarColor, navbarColorHex));
navbarColorHex.addEventListener('input', () => syncColor(navbarColorHex, navbarColor));
navbarColor1.addEventListener('change', () => syncHex(navbarColor1, navbarColor1Hex));
navbarColor1Hex.addEventListener('input', () => syncColor(navbarColor1Hex, navbarColor1));
navbarColor2.addEventListener('change', () => syncHex(navbarColor2, navbarColor2Hex));
navbarColor2Hex.addEventListener('input', () => syncColor(navbarColor2Hex, navbarColor2));

navbarTextColor.addEventListener('change', () => syncHex(navbarTextColor, navbarTextColorHex));
navbarTextColorHex.addEventListener('input', () => syncColor(navbarTextColorHex, navbarTextColor));
navbarBadgeColor.addEventListener('change', () => syncHex(navbarBadgeColor, navbarBadgeColorHex));
navbarBadgeColorHex.addEventListener('input', () => syncColor(navbarBadgeColorHex, navbarBadgeColor));
navbarBadgeBgColor.addEventListener('change', () => syncHex(navbarBadgeBgColor, navbarBadgeBgColorHex));
navbarBadgeBgColorHex.addEventListener('input', () => syncColor(navbarBadgeBgColorHex, navbarBadgeBgColor));
navbarHoverBgColor.addEventListener('change', () => syncHex(navbarHoverBgColor, navbarHoverBgColorHex));
navbarHoverBgColorHex.addEventListener('input', () => syncColor(navbarHoverBgColorHex, navbarHoverBgColor));
navbarHoverTextColor.addEventListener('change', () => syncHex(navbarHoverTextColor, navbarHoverTextColorHex));
navbarHoverTextColorHex.addEventListener('input', () => syncColor(navbarHoverTextColorHex, navbarHoverTextColor));

dropdownColor.addEventListener('change', () => syncHex(dropdownColor, dropdownColorHex));
dropdownColorHex.addEventListener('input', () => syncColor(dropdownColorHex, dropdownColor));
dropdownColor1.addEventListener('change', () => syncHex(dropdownColor1, dropdownColor1Hex));
dropdownColor1Hex.addEventListener('input', () => syncColor(dropdownColor1Hex, dropdownColor1));
dropdownColor2.addEventListener('change', () => syncHex(dropdownColor2, dropdownColor2Hex));
dropdownColor2Hex.addEventListener('input', () => syncColor(dropdownColor2Hex, dropdownColor2));

dropdownItemTextColor.addEventListener('change', () => syncHex(dropdownItemTextColor, dropdownItemTextColorHex));
dropdownItemTextColorHex.addEventListener('input', () => syncColor(dropdownItemTextColorHex, dropdownItemTextColor));
dropdownItemHoverBgColor.addEventListener('change', () => syncHex(dropdownItemHoverBgColor, dropdownItemHoverBgColorHex));
dropdownItemHoverBgColorHex.addEventListener('input', () => syncColor(dropdownItemHoverBgColorHex, dropdownItemHoverBgColor));
dropdownItemHoverTextColor.addEventListener('change', () => syncHex(dropdownItemHoverTextColor, dropdownItemHoverTextColorHex));
dropdownItemHoverTextColorHex.addEventListener('input', () => syncColor(dropdownItemHoverTextColorHex, dropdownItemHoverTextColor));

// Special menu override sync listeners
loginMenuTextColor.addEventListener('change', () => syncHex(loginMenuTextColor, loginMenuTextColorHex));
loginMenuTextColorHex.addEventListener('input', () => syncColor(loginMenuTextColorHex, loginMenuTextColor));
notificationMenuTextColor.addEventListener('change', () => syncHex(notificationMenuTextColor, notificationMenuTextColorHex));
notificationMenuTextColorHex.addEventListener('input', () => syncColor(notificationMenuTextColorHex, notificationMenuTextColor));

navbarAngle.addEventListener('input', () => navbarAngleValue.textContent = navbarAngle.value + 'Â°');
dropdownAngle.addEventListener('input', () => dropdownAngleValue.textContent = dropdownAngle.value + 'Â°');

navbarEffect.addEventListener('change', () => {});
navbarEffectSpeed.addEventListener('input', () => navbarEffectSpeedValue.textContent = navbarEffectSpeed.value + 's');

dropdownEffect = document.getElementById('dropdownEffect');
dropdownEffectSpeed = document.getElementById('dropdownEffectSpeed');
dropdownEffectSpeedValue = document.getElementById('dropdownEffectSpeedValue');

dropdownEffect.addEventListener('change', () => {});
dropdownEffectSpeed.addEventListener('input', () => dropdownEffectSpeedValue.textContent = dropdownEffectSpeed.value + 's');

saveBtn.addEventListener('click', saveSettings);
resetBtn.addEventListener('click', resetSettings);
presetColors.forEach(color => {
  color.addEventListener('click', selectPresetColor);
});

// Theme preset buttons
document.addEventListener('DOMContentLoaded', () => {
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const themeName = btn.getAttribute('data-theme');
      applyTheme(themeName);
    });
  });
  
  // Initialize navbar elements manager
  renderNavbarElements();
});

// Navbar Elements Manager Functions
function renderNavbarElements() {
  const container = document.getElementById('navbarElementsList');
  if (!container) return;
  
  container.innerHTML = '';
  
  // Sort by order
  const sorted = [...navbarElements].sort((a, b) => a.order - b.order);
  console.log('Rendering navbar elements in order:', sorted.map(e => `${e.label}:${e.order}`));
  
  sorted.forEach((element, index) => {
    const item = document.createElement('div');
    item.className = `element-item ${!element.visible ? 'hidden-element' : ''}`;
    item.dataset.id = element.id;
    
    item.innerHTML = `
      <span class="drag-handle">â˜°</span>
      <input type="checkbox" class="element-checkbox" ${element.visible ? 'checked' : ''} data-id="${element.id}">
      <span class="element-label">${element.label}</span>
      <div class="element-controls">
        <button class="btn-move" data-action="up" data-id="${element.id}" ${index === 0 ? 'disabled' : ''}>â–²</button>
        <button class="btn-move" data-action="down" data-id="${element.id}" ${index === sorted.length - 1 ? 'disabled' : ''}>â–¼</button>
      </div>
    `;
    
    container.appendChild(item);
  });
  
  // Add event listeners
  const checkboxes = container.querySelectorAll('.element-checkbox');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', handleElementVisibilityChange);
  });
  
  const moveButtons = container.querySelectorAll('.btn-move');
  moveButtons.forEach(btn => {
    btn.addEventListener('click', handleElementMove);
  });
}

function handleElementVisibilityChange(e) {
  const id = e.target.dataset.id;
  const isVisible = e.target.checked;
  
  const element = navbarElements.find(el => el.id === id);
  if (element) {
    element.visible = isVisible;
    saveNavbarElements();
    renderNavbarElements();
  }
}

function handleElementMove(e) {
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;
  
  const sorted = [...navbarElements].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex(el => el.id === id);
  
  if (currentIndex === -1) return;
  
  if (action === 'up' && currentIndex > 0) {
    // Swap with previous element
    const temp = sorted[currentIndex].order;
    sorted[currentIndex].order = sorted[currentIndex - 1].order;
    sorted[currentIndex - 1].order = temp;
    
    console.log('Moving up:', id, 'from', temp, 'to', sorted[currentIndex].order);
  } else if (action === 'down' && currentIndex < sorted.length - 1) {
    // Swap with next element
    const temp = sorted[currentIndex].order;
    sorted[currentIndex].order = sorted[currentIndex + 1].order;
    sorted[currentIndex + 1].order = temp;
    
    console.log('Moving down:', id, 'from', temp, 'to', sorted[currentIndex].order);
  }
  
  // Update the global array with the new orders
  navbarElements = sorted.map(element => {
    return { ...element };
  });
  
  console.log('Updated navbarElements:', navbarElements);
  
  saveNavbarElements();
  renderNavbarElements();
}

function saveNavbarElements() {
  console.log('Saving navbar elements:', navbarElements);
  chrome.storage.sync.set({ navbarElements }, () => {
    console.log('âœ“ Navbar elements saved to storage');
    
    // Verify what was saved
    chrome.storage.sync.get(['navbarElements'], (result) => {
      console.log('âœ“ Verified saved elements:', result.navbarElements);
    });
  });
}

function loadNavbarElements() {
  chrome.storage.sync.get(['navbarElements'], (result) => {
    if (result.navbarElements) {
      navbarElements = result.navbarElements;
    }
    renderNavbarElements();
  });
}

// Dropdown items functions
function saveDropdownItems() {
  console.log('Saving dropdown items:', dropdownItems);
  chrome.storage.sync.set({ dropdownItems }, () => {
    if (chrome.runtime.lastError) {
      console.error('Error saving dropdown items:', chrome.runtime.lastError);
    } else {
      console.log('Dropdown items saved successfully');
      // Verify what was saved
      chrome.storage.sync.get(['dropdownItems'], (result) => {
        console.log('✓ Verified saved dropdown items:', result.dropdownItems);
      });
    }
  });
}

function loadDropdownItems() {
  chrome.storage.sync.get(['dropdownItems'], (result) => {
    if (result.dropdownItems) {
      dropdownItems = result.dropdownItems;
    }
    renderDropdownItems();
  });
}

function renderDropdownItems() {
  const container = document.getElementById('dropdownItemsContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  // Get navbar elements that have dropdowns
  const navbarElementsWithDropdowns = DEFAULT_NAVBAR_ELEMENTS.filter(element => 
    DEFAULT_DROPDOWN_ITEMS[element.id] && DEFAULT_DROPDOWN_ITEMS[element.id].length > 0
  );
  
  navbarElementsWithDropdowns.forEach(navbarElement => {
    const section = document.createElement('div');
    section.className = 'dropdown-section';
    
    const dropdownItemsForElement = dropdownItems[navbarElement.id] || DEFAULT_DROPDOWN_ITEMS[navbarElement.id] || [];
    
    section.innerHTML = `
      <div class="dropdown-section-header">
        <span class="dropdown-section-icon">${getIconForNavbarElement(navbarElement.id)}</span>
        <h3 class="dropdown-section-title">${navbarElement.label} Dropdown</h3>
      </div>
      <div class="dropdown-items-list">
        ${dropdownItemsForElement.map(item => `
          <div class="dropdown-item ${!item.visible ? 'hidden-item' : ''}" data-parent="${navbarElement.id}" data-id="${item.id}">
            <input type="checkbox" class="dropdown-item-checkbox" ${item.visible ? 'checked' : ''} data-parent="${navbarElement.id}" data-id="${item.id}">
            <span class="dropdown-item-label">${item.label}</span>
            ${item.section ? `<span class="dropdown-item-section">${item.section}</span>` : ''}
          </div>
        `).join('')}
      </div>
    `;
    
    container.appendChild(section);
  });
  
  // Add event listeners
  const checkboxes = container.querySelectorAll('.dropdown-item-checkbox');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', handleDropdownItemVisibilityChange);
  });
}

function handleDropdownItemVisibilityChange(e) {
  const parentId = e.target.dataset.parent;
  const itemId = e.target.dataset.id;
  const isVisible = e.target.checked;
  
  if (dropdownItems[parentId]) {
    const item = dropdownItems[parentId].find(item => item.id === itemId);
    if (item) {
      item.visible = isVisible;
      saveDropdownItems();
      renderDropdownItems();
    }
  }
}

function getIconForNavbarElement(elementId) {
  const icons = {
    'ajouter': '➕',
    'ramassage': '🚚',
    'reception': '📦',
    'dispatch': '🔀',
    'modification': '✏️',
    'fdr': '📄',
    'retours': '↩️',
    'livres': '✅',
    'finance': '💰'
  };
  return icons[elementId] || '📋';
}

// Load dropdown items when page loads
document.addEventListener('DOMContentLoaded', loadDropdownItems);

// Reset dropdown items button
document.addEventListener('DOMContentLoaded', () => {
  const resetDropdownBtn = document.getElementById('resetDropdownItemsBtn');
  if (resetDropdownBtn) {
    resetDropdownBtn.addEventListener('click', () => {
      if (confirm('Reset all dropdown items to default visibility? All items will be shown.')) {
        dropdownItems = JSON.parse(JSON.stringify(DEFAULT_DROPDOWN_ITEMS)); // Deep copy
        saveDropdownItems();
        renderDropdownItems();
        
        // Show confirmation
        const originalText = resetDropdownBtn.textContent;
        resetDropdownBtn.textContent = '✓ Reset Complete!';
        resetDropdownBtn.style.background = '#28a745';
        setTimeout(() => {
          resetDropdownBtn.textContent = originalText;
          resetDropdownBtn.style.background = '#6c757d';
        }, 2000);
      }
    });
  }
});

// Load navbar elements when page loads
document.addEventListener('DOMContentLoaded', loadNavbarElements);

// Reset order to default (matching website's default order)
document.addEventListener('DOMContentLoaded', () => {
  const resetBtn = document.getElementById('resetOrderBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset navbar elements to website default order? This will not affect visibility settings.')) {
        // Reset only the order, keep visibility settings
        navbarElements = navbarElements.map(element => {
          const defaultElement = DEFAULT_NAVBAR_ELEMENTS.find(d => d.id === element.id);
          if (defaultElement) {
            return { ...element, order: defaultElement.order };
          }
          return element;
        });
        
        saveNavbarElements();
        renderNavbarElements();
        
        // Show confirmation
        const originalText = resetBtn.textContent;
        resetBtn.textContent = 'âœ… Order Reset!';
        resetBtn.style.background = '#28a745';
        setTimeout(() => {
          resetBtn.textContent = originalText;
          resetBtn.style.background = '#6c757d';
        }, 2000);
      }
    });
  }
  
  // Clear all settings and reset to defaults
  const clearBtn = document.getElementById('clearAllSettingsBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('âš ï¸ WARNING: This will delete ALL extension settings (colors, order, visibility) and reset everything to defaults. Continue?')) {
        // Clear all storage
        chrome.storage.sync.clear(() => {
          console.log('âœ“ All settings cleared');
          
          // Reset to defaults
          navbarElements = [...DEFAULT_NAVBAR_ELEMENTS];
          dropdownItems = { ...DEFAULT_DROPDOWN_ITEMS };
          
          // Show confirmation
          const originalText = clearBtn.textContent;
          clearBtn.textContent = 'âœ… All Settings Cleared!';
          clearBtn.style.background = '#28a745';
          
          // Reload the page to show defaults
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      }
    });
  }
});

// Helper function to convert rgba/rgb to hex
function toHex(color) {
  // If already hex, return as is
  if (color.startsWith('#')) return color;
  
  // Parse rgba/rgb
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (match) {
    const r = parseInt(match[1]).toString(16).padStart(2, '0');
    const g = parseInt(match[2]).toString(16).padStart(2, '0');
    const b = parseInt(match[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }
  
  // Return default if can't parse
  return '#ffffff';
}

function applyTheme(themeName) {
  const theme = THEMES[themeName];
  if (!theme) return;
  
  const navbar = theme.navbar;
  const dropdown = theme.dropdown;
  
  // Apply navbar settings
  document.querySelector(`input[name="navbarType"][value="${navbar.type}"]`).checked = true;
  toggleNavbarType();
  
  navbarColor.value = toHex(navbar.color || navbar.color1);
  navbarColorHex.value = toHex(navbar.color || navbar.color1);
  navbarColor1.value = toHex(navbar.color1);
  navbarColor1Hex.value = toHex(navbar.color1);
  navbarColor2.value = toHex(navbar.color2);
  navbarColor2Hex.value = toHex(navbar.color2);
  navbarAngle.value = navbar.angle;
  navbarAngleValue.textContent = navbar.angle + 'Â°';
  navbarEffect.value = navbar.effect;
  navbarEffectSpeed.value = navbar.effectSpeed;
  navbarEffectSpeedValue.textContent = navbar.effectSpeed + 's';
  navbarTextColor.value = toHex(navbar.textColor);
  navbarTextColorHex.value = toHex(navbar.textColor);
  navbarBadgeColor.value = toHex(navbar.badgeColor);
  navbarBadgeColorHex.value = toHex(navbar.badgeColor);
  navbarBadgeBgColor.value = toHex(navbar.badgeBgColor);
  navbarBadgeBgColorHex.value = toHex(navbar.badgeBgColor);
  navbarHoverBgColor.value = toHex(navbar.hoverBgColor);
  navbarHoverBgColorHex.value = toHex(navbar.hoverBgColor);
  navbarHoverTextColor.value = toHex(navbar.hoverTextColor);
  navbarHoverTextColorHex.value = toHex(navbar.hoverTextColor);
  
  // Apply dropdown settings
  document.querySelector(`input[name="dropdownType"][value="${dropdown.type}"]`).checked = true;
  toggleDropdownType();
  
  dropdownColor.value = toHex(dropdown.color || dropdown.color1);
  dropdownColorHex.value = toHex(dropdown.color || dropdown.color1);
  dropdownColor1.value = toHex(dropdown.color1);
  dropdownColor1Hex.value = toHex(dropdown.color1);
  dropdownColor2.value = toHex(dropdown.color2);
  dropdownColor2Hex.value = toHex(dropdown.color2);
  dropdownAngle.value = dropdown.angle;
  dropdownAngleValue.textContent = dropdown.angle + 'Â°';
  dropdownEffect.value = dropdown.effect;
  dropdownEffectSpeed.value = dropdown.effectSpeed;
  dropdownEffectSpeedValue.textContent = dropdown.effectSpeed + 's';
  dropdownItemTextColor.value = toHex(dropdown.itemTextColor);
  dropdownItemTextColorHex.value = toHex(dropdown.itemTextColor);
  dropdownItemHoverBgColor.value = toHex(dropdown.itemHoverBgColor);
  dropdownItemHoverBgColorHex.value = toHex(dropdown.itemHoverBgColor);
  dropdownItemHoverTextColor.value = toHex(dropdown.itemHoverTextColor);
  dropdownItemHoverTextColorHex.value = toHex(dropdown.itemHoverTextColor);
  
  // Save immediately
  const navbarSettings = {
    type: navbar.type,
    color: navbar.color || navbar.color1,
    color1: navbar.color1,
    color2: navbar.color2,
    angle: navbar.angle,
    effect: navbar.effect,
    effectSpeed: navbar.effectSpeed,
    textColor: navbar.textColor,
    badgeColor: navbar.badgeColor,
    badgeBgColor: navbar.badgeBgColor,
    hoverBgColor: navbar.hoverBgColor,
    hoverTextColor: navbar.hoverTextColor
  };
  
  const dropdownSettings = {
    type: dropdown.type,
    color: dropdown.color || dropdown.color1,
    color1: dropdown.color1,
    color2: dropdown.color2,
    angle: dropdown.angle,
    effect: dropdown.effect,
    effectSpeed: dropdown.effectSpeed,
    itemTextColor: dropdown.itemTextColor,
    itemHoverBgColor: dropdown.itemHoverBgColor,
    itemHoverTextColor: dropdown.itemHoverTextColor
  };
  
  chrome.storage.sync.set({ navbarSettings, dropdownSettings }, () => {
    statusMessage.classList.add('success');
    statusMessage.textContent = `âœ“ ${theme.name} theme applied successfully!`;
    
    setTimeout(() => {
      statusMessage.classList.remove('success');
    }, 3000);
  });
}

function syncHex(colorInput, hexInput) {
  hexInput.value = colorInput.value;
}

function syncColor(hexInput, colorInput) {
  const value = hexInput.value;
  if (/^#[0-9A-F]{6}$/i.test(value)) {
    colorInput.value = value;
  }
}

function toggleNavbarType() {
  const type = document.querySelector('input[name="navbarType"]:checked').value;
  if (type === 'solid') {
    navbarSolid.classList.remove('hidden');
    navbarGradient.classList.add('hidden');
  } else {
    navbarSolid.classList.add('hidden');
    navbarGradient.classList.remove('hidden');
  }
}

function toggleDropdownType() {
  const type = document.querySelector('input[name="dropdownType"]:checked').value;
  if (type === 'solid') {
    dropdownSolid.classList.remove('hidden');
    dropdownGradient.classList.add('hidden');
  } else {
    dropdownSolid.classList.add('hidden');
    dropdownGradient.classList.remove('hidden');
  }
}

function selectPresetColor(e) {
  const color = window.getComputedStyle(e.target).backgroundColor;
  const hexColor = rgbToHex(color);
  // Assume it's for navbar solid for now
  navbarColor.value = hexColor;
  navbarColorHex.value = hexColor;
}

function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  if (!result || result.length < 3) return '#007bff';
  
  const r = parseInt(result[0]);
  const g = parseInt(result[1]);
  const b = parseInt(result[2]);
  
  return '#' + [r, g, b]
    .map(x => x.toString(16).padStart(2, '0').toUpperCase())
    .join('');
}

function saveSettings() {
  const navbarSettings = {
    type: document.querySelector('input[name="navbarType"]:checked').value,
    color: navbarColor.value,
    color1: navbarColor1.value,
    color2: navbarColor2.value,
    angle: navbarAngle.value,
    effect: navbarEffect.value,
    effectSpeed: navbarEffectSpeed.value,
    textColor: navbarTextColor.value,
    badgeColor: navbarBadgeColor.value,
    badgeBgColor: navbarBadgeBgColor.value,
    hoverBgColor: navbarHoverBgColor.value,
    hoverTextColor: navbarHoverTextColor.value
  };
  
  const dropdownSettings = {
    type: document.querySelector('input[name="dropdownType"]:checked').value,
    color: dropdownColor.value,
    color1: dropdownColor1.value,
    color2: dropdownColor2.value,
    angle: dropdownAngle.value,
    effect: dropdownEffect.value,
    effectSpeed: dropdownEffectSpeed.value,
    itemTextColor: dropdownItemTextColor.value,
    itemHoverBgColor: dropdownItemHoverBgColor.value,
    itemHoverTextColor: dropdownItemHoverTextColor.value,
    loginMenuTextColor: loginMenuTextColor.value,
    notificationMenuTextColor: notificationMenuTextColor.value
  };
  
  chrome.storage.sync.set({ navbarSettings, dropdownSettings, navbarElements }, () => {
    // Show success message
    statusMessage.classList.add('success');
    statusMessage.textContent = 'âœ“ Settings saved successfully!';
    
    setTimeout(() => {
      statusMessage.classList.remove('success');
    }, 3000);
  });
}

function loadSettings() {
  chrome.storage.sync.get(['navbarSettings', 'dropdownSettings', 'navbarElements'], (result) => {
    const navbar = result.navbarSettings || DEFAULT_NAVBAR;
    const dropdown = result.dropdownSettings || DEFAULT_DROPDOWN;
    
    // Load navbar elements if available
    if (result.navbarElements) {
      navbarElements = result.navbarElements;
      renderNavbarElements();
    }
    
    // Set navbar
    document.querySelector(`input[name="navbarType"][value="${navbar.type}"]`).checked = true;
    toggleNavbarType();
    navbarColor.value = navbar.color;
    navbarColorHex.value = navbar.color;
    navbarColor1.value = navbar.color1 || '#007bff';
    navbarColor1Hex.value = navbar.color1 || '#007bff';
    navbarColor2.value = navbar.color2 || '#764ba2';
    navbarColor2Hex.value = navbar.color2 || '#764ba2';
    navbarAngle.value = navbar.angle || 135;
    navbarAngleValue.textContent = navbarAngle.value + 'Â°';
    navbarEffect.value = navbar.effect || 'none';
    navbarEffectSpeed.value = navbar.effectSpeed || 3;
    navbarEffectSpeedValue.textContent = navbarEffectSpeed.value + 's';
    navbarTextColor.value = navbar.textColor || '#000000';
    navbarTextColorHex.value = navbar.textColor || '#000000';
    navbarBadgeColor.value = navbar.badgeColor || '#ffffff';
    navbarBadgeColorHex.value = navbar.badgeColor || '#ffffff';
    navbarBadgeBgColor.value = navbar.badgeBgColor || '#dc3545';
    navbarBadgeBgColorHex.value = navbar.badgeBgColor || '#dc3545';
    navbarHoverBgColor.value = navbar.hoverBgColor || '#f0f0f0';
    navbarHoverBgColorHex.value = navbar.hoverBgColor || '#f0f0f0';
    navbarHoverTextColor.value = navbar.hoverTextColor || '#000000';
    navbarHoverTextColorHex.value = navbar.hoverTextColor || '#000000';
    
    // Set dropdown
    document.querySelector(`input[name="dropdownType"][value="${dropdown.type}"]`).checked = true;
    toggleDropdownType();
    dropdownColor.value = dropdown.color;
    dropdownColorHex.value = dropdown.color;
    dropdownColor1.value = dropdown.color1 || '#ffffff';
    dropdownColor1Hex.value = dropdown.color1 || '#ffffff';
    dropdownColor2.value = dropdown.color2 || '#f8f9fa';
    dropdownColor2Hex.value = dropdown.color2 || '#f8f9fa';
    dropdownAngle.value = dropdown.angle || 180;
    dropdownAngleValue.textContent = dropdownAngle.value + 'Â°';
    dropdownEffect.value = dropdown.effect || 'none';
    dropdownEffectSpeed.value = dropdown.effectSpeed || 3;
    dropdownEffectSpeedValue.textContent = dropdownEffectSpeed.value + 's';
    dropdownItemTextColor.value = dropdown.itemTextColor || '#000000';
    dropdownItemTextColorHex.value = dropdown.itemTextColor || '#000000';
    dropdownItemHoverBgColor.value = dropdown.itemHoverBgColor || '#f8f9fa';
    dropdownItemHoverBgColorHex.value = dropdown.itemHoverBgColor || '#f8f9fa';
    dropdownItemHoverTextColor.value = dropdown.itemHoverTextColor || '#000000';
    dropdownItemHoverTextColorHex.value = dropdown.itemHoverTextColor || '#000000';
    
    // Set special menu overrides
    loginMenuTextColor.value = dropdown.loginMenuTextColor || '#000000';
    loginMenuTextColorHex.value = dropdown.loginMenuTextColor || '#000000';
    notificationMenuTextColor.value = dropdown.notificationMenuTextColor || '#ffffff';
    notificationMenuTextColorHex.value = dropdown.notificationMenuTextColor || '#ffffff';
  });
}

function resetSettings() {
  // Reset to defaults
  document.querySelector('input[name="navbarType"][value="solid"]').checked = true;
  toggleNavbarType();
  navbarColor.value = DEFAULT_NAVBAR.color;
  navbarColorHex.value = DEFAULT_NAVBAR.color;
  navbarColor1.value = DEFAULT_NAVBAR.color1;
  navbarColor1Hex.value = DEFAULT_NAVBAR.color1;
  navbarColor2.value = DEFAULT_NAVBAR.color2;
  navbarColor2Hex.value = DEFAULT_NAVBAR.color2;
  navbarAngle.value = DEFAULT_NAVBAR.angle;
  navbarAngleValue.textContent = DEFAULT_NAVBAR.angle + 'Â°';
  navbarTextColor.value = DEFAULT_NAVBAR.textColor;
  navbarTextColorHex.value = DEFAULT_NAVBAR.textColor;
  navbarBadgeColor.value = DEFAULT_NAVBAR.badgeColor;
  navbarBadgeColorHex.value = DEFAULT_NAVBAR.badgeColor;
  navbarBadgeBgColor.value = DEFAULT_NAVBAR.badgeBgColor;
  navbarBadgeBgColorHex.value = DEFAULT_NAVBAR.badgeBgColor;
  navbarHoverBgColor.value = DEFAULT_NAVBAR.hoverBgColor;
  navbarHoverBgColorHex.value = DEFAULT_NAVBAR.hoverBgColor;
  navbarHoverTextColor.value = DEFAULT_NAVBAR.hoverTextColor;
  navbarHoverTextColorHex.value = DEFAULT_NAVBAR.hoverTextColor;
  navbarEffect.value = 'none';
  navbarEffectSpeed.value = 3;
  navbarEffectSpeedValue.textContent = '3s';
  
  document.querySelector('input[name="dropdownType"][value="solid"]').checked = true;
  toggleDropdownType();
  dropdownColor.value = DEFAULT_DROPDOWN.color;
  dropdownColorHex.value = DEFAULT_DROPDOWN.color;
  dropdownColor1.value = DEFAULT_DROPDOWN.color1;
  dropdownColor1Hex.value = DEFAULT_DROPDOWN.color1;
  dropdownColor2.value = DEFAULT_DROPDOWN.color2;
  dropdownColor2Hex.value = DEFAULT_DROPDOWN.color2;
  dropdownAngle.value = DEFAULT_DROPDOWN.angle;
  dropdownAngleValue.textContent = DEFAULT_DROPDOWN.angle + 'Â°';
  dropdownEffect.value = 'none';
  dropdownEffectSpeed.value = 3;
  dropdownEffectSpeedValue.textContent = '3s';
  
  // Reset navbar elements
  navbarElements = [...DEFAULT_NAVBAR_ELEMENTS];
  renderNavbarElements();
  
  chrome.storage.sync.set({ 
    navbarSettings: DEFAULT_NAVBAR, 
    dropdownSettings: DEFAULT_DROPDOWN,
    navbarElements: DEFAULT_NAVBAR_ELEMENTS 
  }, () => {
    statusMessage.classList.add('success');
    statusMessage.textContent = 'âœ“ Settings reset to default!';
    
    setTimeout(() => {
      statusMessage.classList.remove('success');
    }, 3000);
  });
}

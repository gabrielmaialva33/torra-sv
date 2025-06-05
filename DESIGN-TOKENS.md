# Design Tokens Integration

This document explains how to maintain design consistency between Figma and the codebase.

## 🎨 Figma Design Reference

**Original Design**: [Sistema Clique e Retira](https://www.figma.com/design/xCCqMmngtZ6G8symsyJ7O5/Sistema-Clique-e-Retira?node-id=25-2772&t=cBYxPyMJrrNlzclz-4)

## 🔄 Design Token Sync

### Current Implementation

All design tokens from Figma have been manually extracted and implemented in:
- `tailwind.config.js` - Color palette, typography, shadows, spacing
- `src/app.css` - CSS variables for dynamic theming

### Color Tokens

```javascript
// From Figma to Tailwind
'torra': {
  'orange': {
    DEFAULT: '#FF5101',  // Primary CTA color
    'light': '#FF7B3D',  // Hover states
  },
  'purple': {
    'light': '#42437B',  // Gradient start
    'dark': '#181945',   // Gradient end
  },
  'gray': {
    50: '#FFFFFF',
    100: '#F0F0F2',
    150: '#EFEFEF',      // Background
    200: '#EBECF1',      // Borders
    300: '#E3E4E9',
    400: '#DBE2EB',      // Input borders
    500: '#6C757D',
    600: '#495057',
    900: '#000000',
  }
}
```

### Typography Scale

```javascript
fontSize: {
  'h1': ['32px', { lineHeight: '1.1', fontWeight: '500' }],
  'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
  'input': ['15px', { lineHeight: '1.171875', fontWeight: '400' }],
  'button': ['16px', { lineHeight: '2.8125', fontWeight: '700', letterSpacing: '0.45px' }],
  'footer': ['13px', { lineHeight: '1.21', fontWeight: '400' }],
}
```

### Shadows

```javascript
boxShadow: {
  'card': '0px 6px 8px 0px rgba(4, 4, 7, 0.1)',
  'footer': '16px 0px 16px 0px rgba(24, 23, 38, 0.06)',
  'button': '0px 0px 10px -5px rgba(112, 94, 200, 0.5)',
}
```

## 🔧 Automated Token Import (Future Enhancement)

### Option 1: Figma Tokens Plugin

1. Install [Figma Tokens](https://www.figma.com/community/plugin/843461159747178978/Figma-Tokens) plugin
2. Export tokens as JSON
3. Use build script to transform tokens to Tailwind config

### Option 2: Style Dictionary

```bash
# Install Style Dictionary
npm install --save-dev style-dictionary

# Create config file
# style-dictionary.config.json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "src/styles/",
      "files": [{
        "destination": "tokens.css",
        "format": "css/variables"
      }]
    },
    "js": {
      "transformGroup": "js",
      "buildPath": "src/tokens/",
      "files": [{
        "destination": "tokens.js",
        "format": "javascript/module"
      }]
    }
  }
}
```

### Option 3: Figma API Integration

```javascript
// scripts/sync-figma-tokens.js
const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FILE_KEY = 'xCCqMmngtZ6G8symsyJ7O5';

async function fetchFigmaTokens() {
  const response = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}/styles`,
    {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    }
  );
  
  const data = await response.json();
  // Transform and save tokens
}
```

## 📝 Manual Token Updates

When updating design tokens:

1. **In Figma**: Update the design system
2. **Extract Values**: Use Figma Dev Mode to copy exact values
3. **Update Config**: Modify `tailwind.config.js`
4. **Test Components**: Run `pnpm dev` and check all components
5. **Update Showcase**: Add new tokens to `ComponentShowcase.svelte`

## 🎯 Best Practices

1. **Naming Convention**: Use semantic names (e.g., `torra-orange` not `#FF5101`)
2. **Token Hierarchy**: Primary → Secondary → Tertiary variations
3. **Documentation**: Comment the purpose of each token
4. **Version Control**: Track all token changes in Git
5. **Testing**: Always test in multiple browsers after updates

## 🔍 Token Usage Examples

```svelte
<!-- Using color tokens -->
<div class="bg-torra-orange hover:bg-torra-orange-light">
  Click & Retire
</div>

<!-- Using typography tokens -->
<h1 class="text-h1 font-roboto text-torra-dark">
  Entrar no Painel
</h1>

<!-- Using shadow tokens -->
<div class="shadow-card hover:shadow-xl">
  Card content
</div>

<!-- Using gradient -->
<div class="bg-radial-purple">
  Gradient background
</div>
```

## 🚀 Future Improvements

1. **CI/CD Integration**: Automate token sync on Figma updates
2. **Token Validation**: Add tests to ensure token consistency
3. **Dark Mode**: Extend tokens for dark theme support
4. **Component Tokens**: Add component-specific design tokens
5. **Animation Tokens**: Standardize animation durations and easings

---

For questions about design tokens, contact the design team or refer to the Figma file.
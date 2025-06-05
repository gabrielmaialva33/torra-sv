# Assets Structure

This directory contains all static assets for the Torra Click & Retire system.

## Directory Structure

```
assets/
├── icons/
│   ├── brand/         # Brand logos and identity
│   │   ├── torra-logo.svg
│   │   ├── click-retire-logo.svg
│   │   ├── torra-logo-square.png
│   │   └── svelte.svg
│   └── ui/            # UI icons for interface elements
│       ├── user.svg
│       ├── login.svg
│       ├── home.svg
│       ├── alert.svg
│       ├── check-outline.svg
│       ├── check-solid.svg
│       ├── store.svg
│       ├── lockers.svg
│       ├── lockers-alt.svg
│       ├── truck.svg
│       ├── avatar.svg
│       ├── gift.svg
│       ├── sync-status.svg
│       ├── not-ok.svg
│       └── do-not-disturb.svg
├── images/
│   ├── backgrounds/   # Background images
│   │   └── background-border-shadow.png
│   └── illustrations/ # Illustrations and decorative images
├── fonts/            # Custom fonts (if needed)
└── index.js          # Centralized export file
```

## Usage

### Import individual assets:
```javascript
import { torraLogo, iconUser } from '@/assets';
```

### Import asset collections:
```javascript
import { brandIcons, uiIcons, backgrounds } from '@/assets';

// Use icons
<img src={brandIcons.torraLogo} alt="Torra" />
<img src={uiIcons.user} alt="User" />
```

### Direct import:
```javascript
import torraLogo from '@/assets/icons/brand/torra-logo.svg';
```

## Naming Convention

- **Brand Icons**: Use full brand name (e.g., `torra-logo.svg`, `click-retire-logo.svg`)
- **UI Icons**: Use descriptive names without prefixes (e.g., `user.svg`, `home.svg`)
- **Images**: Use kebab-case with descriptive names (e.g., `background-border-shadow.png`)

## Icon Sources

- **Lucide Icons**: User, Login icons
- **Material Symbols**: Home, Do Not Disturb icons
- **Icon Park**: Check icons
- **Tabler Icons**: Truck icon
- **Radix Icons**: Avatar icon
- **Other Libraries**: Various UI icons

## Adding New Assets

1. Place the asset in the appropriate subfolder
2. Follow the naming convention
3. Add export to `index.js` if it's a commonly used asset
4. Update this README if adding a new category

## Optimization

- SVG icons should be optimized using SVGO
- PNG/JPG images should be compressed
- Use appropriate formats: SVG for icons, PNG for images with transparency
- Consider lazy loading for large images
# Torra Click & Retire - Modern Web Application

A visually striking, modern web application built with Svelte and Tailwind CSS for the Torra Click & Retire system. This project creates an immersive login experience with smooth animations, micro-interactions, and a distinctive visual identity.

## 🎨 Design Philosophy

The application implements a sophisticated two-panel layout that communicates the brand's modern, efficient service:

- **Left Panel**: Clean, minimalist login form with subtle interactions
- **Right Panel**: Dynamic gradient background with animated illustrations
- **Visual Identity**: Incorporates Torra's orange (#FF5101) and purple gradient palette
- **Micro-interactions**: Smooth transitions, hover effects, and loading states

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd torra-sv

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
torra-sv/
├── src/
│   ├── assets/          # Images, icons, and static assets
│   │   ├── icons/       # UI and brand icons
│   │   └── images/      # Illustrations and backgrounds
│   ├── lib/
│   │   ├── components/  # Reusable UI components
│   │   │   ├── IconInput.svelte      # Input field with icon prefix
│   │   │   ├── LoginPanel.svelte     # Login form container
│   │   │   ├── IllustrationPanel.svelte # Animated illustrations
│   │   │   └── Footer.svelte         # Page footer
│   │   └── pages/       # Page components
│   │       └── LandingPage.svelte    # Main landing page
│   ├── App.svelte       # Root application component
│   ├── app.css          # Global styles and animations
│   └── main.js          # Application entry point
├── tailwind.config.js   # Tailwind configuration with custom tokens
└── vite.config.js       # Vite bundler configuration
```

## 🎨 Design System

### Colors

The color palette is extracted from the Figma design and configured in Tailwind:

- **Primary Orange**: `#FF5101` (torra-orange)
- **Light Orange**: `#FF7B3D` (torra-orange-light)
- **Dark Text**: `#1A1630` (torra-dark)
- **Purple Gradient**: `#42437B` → `#181945`
- **Grays**: Multiple shades from `#FFFFFF` to `#000000`

### Typography

- **Headings**: Roboto Medium, 32px
- **Body Text**: Roboto Regular, 16px
- **Input Fields**: Roboto Regular, 15px
- **Buttons**: Inter Bold, 16px with letter-spacing

### Animations

All animations use cubic-bezier easing for natural motion:

- **Slide-in**: Panels slide from left/right on load
- **Fade-in**: Sequential element appearance
- **Float**: Continuous floating animation for illustrations
- **Hover Effects**: Subtle scale and shadow changes

## 🧩 Key Components

### LandingPage
The main container that orchestrates the two-panel layout and manages the overall page structure.

### LoginPanel
Contains the authentication form with:
- Animated logo
- Custom input fields with icon prefixes
- Interactive submit button with loading state
- Password recovery link

### IconInput
A reusable input component featuring:
- Icon prefix in a separate container
- Focus states with color transitions
- Hover effects
- Accessibility support

### IllustrationPanel
Dynamic right panel with:
- Radial gradient background
- Floating illustrations with staggered animations
- Particle effects
- Click & Retire branding

## 🔧 Technical Details

### Tailwind Configuration

The `tailwind.config.js` includes:
- Custom color tokens matching Figma design
- Extended spacing scale for precise layouts
- Custom border radius variants
- Animation utilities
- Typography presets

### Animation System

Animations are implemented using:
- CSS keyframes for performance
- Svelte transitions for component states
- Staggered delays for sequential appearance
- Hardware-accelerated transforms

### Responsive Design

While optimized for 1440px desktop screens, the design includes:
- Minimum width constraints
- Flexible container sizing
- Proper overflow handling

## 🎯 Future Enhancements

- [ ] Mobile responsive design
- [ ] Form validation with error states
- [ ] API integration for authentication
- [ ] Additional page routes
- [ ] Internationalization (i18n)
- [ ] Dark mode support
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)

## 🔗 Design Reference

The design is based on the Figma file:
[Sistema Clique e Retira](https://www.figma.com/design/xCCqMmngtZ6G8symsyJ7O5/Sistema-Clique-e-Retira?node-id=25-2772&t=cBYxPyMJrrNlzclz-4)

## 📝 Development Notes

### Code Style
- All code and comments are in English
- Components follow single-responsibility principle
- Consistent naming conventions (PascalCase for components)
- Proper TypeScript types can be added via `svelte-check`

### Performance Considerations
- Images are optimized and loaded efficiently
- Animations use CSS transforms for GPU acceleration
- Minimal JavaScript for interactions
- Lazy loading can be implemented for larger applications

## 📄 License

This project is proprietary to Lojas Torra. All rights reserved.

---

Built with ❤️ using Svelte and Tailwind CSS
# Lojas Torra - Click & Retire System

A modern web application built with Svelte and Tailwind CSS, implementing a visually striking login interface for the
Lojas Torra Click & Retire system.

## 🚀 Project Overview

This project implements a login page based on the Figma design for Lojas Torra's Click & Retire system. The design
emphasizes a modern, clean aesthetic with smooth animations and a distinctive visual identity.

### Key Features

- **Modern Split-Screen Design**: Clean white form panel with gradient background panel
- **Smooth Animations**: Entry animations using Svelte transitions
- **Interactive Elements**: Hover effects and micro-interactions
- **Fully Responsive**: Adapts seamlessly from mobile to desktop
- **Accessible**: Semantic HTML with proper form structure
- **Type-Safe**: Written with best practices and clear documentation

## 🛠️ Technology Stack

- **Svelte**: Modern reactive framework for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Vite**: Next-generation frontend tooling for fast development
- **Lucide Icons**: Beautiful & consistent icon set

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

1. Clone the repository:

```bash
git clone [repository-url]
cd torra-sv
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## 🎨 Design System

### Color Palette (from Figma)

```css
/* Primary Colors */
--torra-orange: #FF5101

;
--torra-orange-light: #FF7B3D

;
--torra-dark: #1A1630

;

/* Gradient Colors */
--torra-gradient-start: #42437B

;
--torra-gradient-end: #181945

;

/* Gray Scale */
--torra-gray-100: #F0F0F2

;
--torra-gray-200: #EBECF1

;
--torra-gray-300: #E3E4E9

;
--torra-gray-400: #DBE2EB

;
--torra-gray-500: #6C757D

;
--torra-gray-600: #495057

;
```

### Typography

- **Primary Font**: Inter (400, 700)
- **Secondary Font**: Roboto (400, 500)

### Design Decisions

1. **Visual Identity**: The design maintains Lojas Torra's brand identity with the distinctive orange color (#FF5101)
   and clean, modern aesthetics.

2. **User Experience**:
    - Clear visual hierarchy guides users to the login form
    - Smooth animations create a premium feel
    - Hover states provide immediate feedback

3. **Accessibility**:
    - High contrast ratios for text readability
    - Semantic HTML structure
    - Keyboard navigation support

## 📁 Project Structure

```
torra-sv/
├── src/
│   ├── assets/           # Static assets (images, fonts)
│   ├── lib/
│   │   ├── components/   # Svelte components
│   │   │   └── Login.svelte
│   │   └── utils.js      # Utility functions
│   ├── App.svelte        # Main application component
│   ├── app.css          # Global styles with Tailwind
│   └── main.js          # Application entry point
├── public/              # Public static files
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## 🎯 Component Architecture

### Login Component

The main Login component (`src/lib/components/Login.svelte`) implements:

- **Form Handling**: Username and password inputs with validation
- **Animations**: Entry animations using Svelte's transition system
- **Micro-interactions**: Button hover effects, input focus states
- **Responsive Design**: Mobile-first approach with breakpoints

### Animation System

- **Entry Animations**: Components fly in with staggered delays
- **Hover Effects**: Smooth transitions on interactive elements
- **Loading States**: Visual feedback during form submission
- **Floating Elements**: Subtle background animations for visual interest

## 🔄 Development Workflow

### Figma Integration

The design is based on the Figma file:
[Sistema Clique e Retira](https://www.figma.com/design/xCCqMmngtZ6G8symsyJ7O5/Sistema-Clique-e-Retira?node-id=25-2772)

Design tokens (colors, typography, spacing) have been extracted and implemented in the Tailwind configuration.

### Version Control

This project is ready for GitHub integration. To push to a repository:

```bash
git init
git add .
git commit -m "Initial commit: Lojas Torra Click & Retire login page"
git remote add origin [your-repository-url]
git push -u origin main
```

## 🚀 Future Enhancements

1. **Authentication Integration**: Connect to backend authentication service
2. **Form Validation**: Add comprehensive client-side validation
3. **Error Handling**: Implement error states and user feedback
4. **Additional Pages**: Extend to full application flow
5. **Testing**: Add unit and integration tests
6. **Performance**: Implement lazy loading and code splitting

## 📝 License

This project is proprietary to Lojas Torra. All rights reserved.

## 👥 Contributors

- Frontend Development: [Your Name]
- Design: Based on Figma design by Lojas Torra team

---

For questions or support, please contact the development team.
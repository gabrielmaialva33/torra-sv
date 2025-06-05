# Torra SV - Click & Retire System

A modern, professional web application built with **Svelte**, **Tailwind CSS**, and **shadcn-ui** for Lojas Torra's
Click & Retire system. This project showcases a visually striking login interface with immersive animations and a
distinctive brand identity.

## 🎨 Design Philosophy

The application embodies a unique visual identity inspired by
the [Figma design](https://www.figma.com/design/xCCqMmngtZ6G8symsyJ7O5/Sistema-Clique-e-Retira?node-id=25-2772&t=cBYxPyMJrrNlzclz-4),
featuring:

- **Split-screen layout**: Clean form interface with vibrant illustration panel
- **Brand colors**: Torra orange (#FF5101) with deep purple gradients
- **Micro-interactions**: Smooth animations and hover effects
- **Professional typography**: Inter and Roboto fonts for optimal readability
- **Responsive design**: Fully adaptive across all device sizes

## 🚀 Features

- **Modern Tech Stack**: Svelte 5 + Vite for blazing-fast performance
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **shadcn-ui Components**: Professional UI components with consistent design
- **Animated Elements**: Smooth transitions and interactive components
- **Figma Integration**: Design tokens imported from Figma
- **Type Safety**: JSDoc comments for better developer experience
- **Optimized Assets**: SVG icons and optimized images

## 📦 Project Structure

```
torra-sv/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Button.svelte
│   │   │   ├── InputField.svelte
│   │   │   ├── Login.svelte
│   │   │   └── ...
│   │   ├── pages/         # Page components
│   │   │   └── LandingPage.svelte
│   │   └── utils.js       # Utility functions (cn, etc.)
│   ├── assets/           # Images, icons, and static assets
│   │   ├── icons/
│   │   ├── images/
│   │   └── utils/
│   ├── app.css          # Global styles and CSS variables
│   ├── App.svelte       # Root component
│   └── main.js          # Application entry point
├── public/              # Static assets
├── components.json      # shadcn-ui configuration
├── tailwind.config.js   # Tailwind configuration with custom tokens
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd torra-sv
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Build for production**
   ```bash
   pnpm build
   # or
   npm run build
   ```

## 🎨 Design Tokens

The project uses custom Tailwind configuration to match the Figma design:

### Colors

- **Torra Orange**: `#FF5101` (primary brand color)
- **Orange Light**: `#FF7B3D` (hover states)
- **Purple Gradient**: Radial gradient from `#42437B` to `#181945`
- **Dark Text**: `#1A1630`
- **Grays**: Custom scale from `#FFFFFF` to `#000000`

### Typography

- **Headings**: Roboto, 32px, weight 500
- **Body**: Inter, 16px, weight 400
- **Buttons**: Inter, 16px, weight 700, uppercase
- **Input**: Roboto, 15px, weight 400

### Shadows

- **Card**: `0px 6px 8px rgba(4, 4, 7, 0.1)`
- **Button**: `0px 0px 10px -5px rgba(112, 94, 200, 0.5)`
- **Footer**: `16px 0px 16px rgba(24, 23, 38, 0.06)`

### Border Radius

- **Left Panel**: `8px 0px 0px 8px`
- **Right Panel**: `0px 8px 8px 0px`
- **Inputs**: `3px 0px 0px 3px` (left), `0px 5px 5px 0px` (right)

## 🧩 Components

### Core Components

- **Login**: Full login page with split-screen design
- **InputField**: Custom input with icon support and animations
- **Button**: Styled button with hover effects and loading states
- **IllustrationPanel**: Animated background with floating elements
- **Footer**: Copyright footer with proper styling

### shadcn-ui Integration

The project is configured to use shadcn-ui components:

```bash
# Add new components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
```

### Animation Classes

- `animate-float`: Smooth floating animation (6s loop)
- `animate-slide-in-left`: Left entrance animation
- `animate-slide-in-right`: Right entrance animation
- `animate-fade-in`: Fade in effect
- `animate-pulse-slow`: Gentle pulsing effect

## 🔧 Development Workflow

### Import Aliases

The project uses import aliases for cleaner imports:

- `$lib`: `./src/lib`
- `$components`: `./src/lib/components`
- `$pages`: `./src/lib/pages`
- `$assets`: `./src/assets`

### Code Style

- Use English for all code, comments, and documentation
- Follow Svelte best practices
- Use JSDoc comments for component props
- Keep components small and focused
- Use `cn()` utility for conditional classes

### Git Workflow

```bash
# Feature branch
git checkout -b feature/component-name

# Commit with conventional commits
git commit -m "feat: add new animation to login panel"

# Push and create PR
git push origin feature/component-name
```

## 🚀 Deployment

The project is configured for easy deployment:

1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Preview locally**
   ```bash
   pnpm preview
   ```

3. **Deploy to your platform**
    - **Vercel**: Connect GitHub repo and deploy automatically
    - **Netlify**: Drag & drop dist folder or connect repo
    - **Custom**: Upload dist folder to your server

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=https://api.lojastorra.com.br
VITE_APP_NAME=Click & Retire
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🔍 Performance Optimizations

- **Lazy Loading**: Images loaded on demand
- **Code Splitting**: Routes loaded dynamically
- **CSS Optimization**: PurgeCSS removes unused styles
- **Asset Optimization**: SVGs optimized, images compressed
- **Animation Performance**: GPU-accelerated transforms

## 🧪 Testing

```bash
# Run tests (when configured)
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

## 📄 License

This project is proprietary to Lojas Torra. All rights reserved.

---

**Created with ❤️ by Maia for Lojas Torra**
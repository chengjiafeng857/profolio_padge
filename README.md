# Portfolio Page

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features a dark/light theme toggle and smooth scrolling navigation.

## 🚀 Features

- **Modern Tech Stack**: Built with React 18, TypeScript, and Vite for fast development and optimal performance
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Theme**: Toggle between dark and light themes with persistent storage
- **Smooth Navigation**: Animated navbar with scroll effects and smooth scrolling to sections
- **Mobile-Friendly**: Hamburger menu for mobile navigation
- **Performance Optimized**: Uses Vite for fast builds and hot module replacement

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: CSS with CSS Variables for theming
- **Development**: ESLint for code quality
- **Language Composition**: 
  - TypeScript (57.8%)
  - CSS (40.0%)
  - HTML (1.1%)
  - JavaScript (1.1%)

## 🎨 Design Features

### Theme System
- CSS custom properties for seamless theme switching
- Persistent theme selection using localStorage
- Smooth transitions between light and dark modes

### Navigation
- Fixed navbar with transparency effects on scroll
- Mobile hamburger menu
- Active section highlighting
- Smooth scrolling with navbar offset calculation

### Styling Highlights
- Modern CSS with custom properties
- Responsive design patterns
- Smooth animations and transitions
- Professional color scheme for both themes

## 📁 Project Structure

```
profolio_padge/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles import
│   └── vite-env.d.ts    # Vite type declarations
├── styles.css           # Main stylesheet with themes
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── eslint.config.js     # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chengjiafeng857/profolio_padge.git
cd profolio_padge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

### App Component
The main component (`src/App.tsx`) handles:
- Theme management and persistence
- Navbar scroll effects
- Mobile navigation toggle
- Smooth scrolling functionality
- Active section highlighting

### Styling System
The CSS architecture uses:
- CSS custom properties for theming
- Responsive design with mobile-first approach
- Smooth transitions and animations
- Modern typography with Inter font family

## 🌐 Browser Support

This portfolio supports all modern browsers with ES6+ support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Experience

- Responsive hamburger menu
- Touch-friendly navigation
- Optimized layouts for mobile devices
- Smooth scrolling on mobile browsers

## 🔧 Customization

### Themes
Modify the CSS custom properties in `styles.css` to customize colors:
- Light theme variables in `:root`
- Dark theme variables in `[data-theme="dark"]`

### Content
Update the content sections in `src/App.tsx` to personalize your portfolio.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Cheng Jiafeng** - [chengjiafeng857](https://github.com/chengjiafeng857)

---

Built with using React, TypeScript, and Vite

# TourMate Frontend

This is the frontend application for TourMate, built with React 18 and Vite.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Full dark mode support with system preference detection
- **Modern UI**: Built with Tailwind CSS and Material Tailwind components
- **Smooth Animations**: Framer Motion for engaging user interactions
- **Fast Navigation**: React Router for SPA experience
- **Interactive Maps**: Leaflet and Google Maps integration
- **Accessibility**: WCAG compliant with proper ARIA labels

## Tech Stack

- **React 18**: Latest React with hooks and concurrent features
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Material Tailwind**: React components for Material Design
- **Framer Motion**: Production-ready motion library
- **React Router DOM**: Declarative routing
- **React Icons**: Popular icon libraries as React components
- **React Leaflet**: React components for Leaflet maps

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for better type safety (future enhancement)
- Implement proper error boundaries

### Component Structure
- Keep components small and focused
- Use custom hooks for shared logic
- Implement proper prop validation
- Follow the atomic design methodology

### Performance
- Lazy load components and routes
- Optimize images and assets
- Implement proper caching strategies
- Monitor bundle size and performance metrics

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
VITE_FIREBASE_CONFIG=your_firebase_config
```

## Deployment

The application can be deployed to various platforms:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Upload build files to S3 bucket
- **Azure Static Web Apps**: GitHub Actions integration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Follow the existing code style
2. Write meaningful commit messages
3. Add tests for new features
4. Update documentation as needed

## Performance Metrics

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

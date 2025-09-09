# Deployment Guide for TourMate Frontend

This guide covers different deployment options for the TourMate frontend application.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

## Build for Production

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build the application**
   ```bash
   npm run build
   ```

3. **Test production build locally**
   ```bash
   npm run preview
   ```

## Deployment Options

### 1. Vercel (Recommended)

Vercel provides the easiest deployment for React applications.

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **For subsequent deployments**
   ```bash
   vercel --prod
   ```

**Environment Variables:**
- Set environment variables in Vercel dashboard
- Variables starting with `VITE_` will be available in the client

### 2. Netlify

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to netlify.com
   - Or connect your GitHub repository for continuous deployment

**Netlify Configuration (_redirects file):**
```
/*    /index.html   200
```

### 3. AWS S3 + CloudFront

1. **Create S3 bucket**
   ```bash
   aws s3 mb s3://tourmate-frontend
   ```

2. **Upload build files**
   ```bash
   aws s3 sync dist/ s3://tourmate-frontend --delete
   ```

3. **Configure bucket for static website hosting**
   ```bash
   aws s3 website s3://tourmate-frontend --index-document index.html --error-document index.html
   ```

### 4. Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

### 5. GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "homepage": "https://username.github.io/tour-mate",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## Environment Variables

Create a `.env.production` file for production environment:

```env
VITE_API_BASE_URL=https://api.tourmate.com
VITE_GOOGLE_MAPS_API_KEY=your_production_api_key
VITE_FIREBASE_CONFIG=your_production_firebase_config
```

## Performance Optimization

### 1. Bundle Analysis
```bash
npm run analyze
```

### 2. Code Splitting
- Implement lazy loading for routes
- Use dynamic imports for large components

### 3. Image Optimization
- Use WebP format for images
- Implement responsive images
- Use CDN for image delivery

### 4. Caching Strategy
- Configure proper cache headers
- Use service workers for offline support

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./
```

## Monitoring and Analytics

### 1. Error Tracking
- Integrate Sentry for error monitoring
- Set up alerts for critical issues

### 2. Performance Monitoring
- Use Google Analytics or similar
- Monitor Core Web Vitals
- Set up real user monitoring (RUM)

### 3. Uptime Monitoring
- Use services like Pingdom or StatusCake
- Set up alerts for downtime

## Security Considerations

1. **HTTPS Only**
   - Ensure all deployments use HTTPS
   - Set up HSTS headers

2. **Content Security Policy**
   - Configure CSP headers
   - Restrict script sources

3. **Environment Variables**
   - Never commit sensitive data
   - Use platform-specific secret management

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Routes Not Working**
   - Configure server to handle SPA routing
   - Add _redirects file for Netlify
   - Set up CloudFront error pages for AWS

3. **Environment Variables Not Working**
   - Ensure variables start with `VITE_`
   - Check platform-specific variable settings
   - Restart development server after changes

## Support

For deployment issues:
- Check the platform-specific documentation
- Contact support@tourmate.com
- Create an issue in the GitHub repository

# Deployment Guide for Vercel

This guide will help you deploy your portfolio to Vercel safely.

## Prerequisites

1. A GitHub account (recommended) or GitLab/Bitbucket
2. A Vercel account (free tier is sufficient)
3. Your project should be pushed to a Git repository

## Step-by-Step Deployment

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account (or create an account)

3. **Import Project**
   - Click "Add New..." → "Project"
   - Select your repository (`bijay-portfolio`)
   - Click "Import"

4. **Configure Project**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `dist` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)

5. **Environment Variables** (if needed)
   - Currently, your project doesn't require environment variables
   - If you add EmailJS or other services later, add them here

6. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)

7. **Get Your URL**
   - Vercel will provide a URL like: `your-project.vercel.app`
   - Your site is now live!

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - For production: `vercel --prod`

## Post-Deployment

### Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Continuous Deployment

- Every push to your `main` branch will automatically trigger a new deployment
- You can preview deployments from other branches as well

## Troubleshooting

### Build Fails

1. **Check build logs** in Vercel dashboard
2. **Test locally first**:
   ```bash
   npm run build
   npm run preview
   ```

3. **Common issues**:
   - Missing dependencies: Run `npm install` locally and commit `package-lock.json`
   - Image paths: Ensure all images are imported correctly (using `import`)
   - Environment variables: Add any required vars in Vercel dashboard

### Images Not Loading

- All images should be imported in components (which you've done correctly)
- Ensure image files are committed to Git
- Check file paths are relative (../pictures/...)

### Performance Optimization

- Images are automatically optimized by Vercel
- Static assets are cached efficiently
- Consider optimizing large images before deployment

## Security Notes

✅ Your `vercel.json` includes security headers:
- X-Content-Type-Options
- X-Frame-Options  
- X-XSS-Protection

✅ No sensitive data in code:
- No API keys exposed
- EmailJS keys should be added as environment variables if used

## Monitoring

- Vercel provides analytics and performance monitoring
- Check the "Analytics" tab in your dashboard
- Monitor Core Web Vitals

## Rollback

- If something goes wrong, you can rollback to a previous deployment
- Go to "Deployments" → Select a previous version → "Promote to Production"

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord


# Deployment Guide

## Quick Deploy Options

### 1. **Railway.app** (Recommended - Easiest)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize and deploy
railway init
railway up
```

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select the `Dev` repository
5. Railway will automatically detect and deploy

### 2. **Heroku** (Classic)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create online-shop

# Add MongoDB Atlas
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### 3. **Vercel + Railway**

**Frontend on Vercel:**
```bash
# Go to vercel.com
# Import /frontend from GitHub
# Deploy
```

**Backend on Railway:**
- Deploy just the `/backend` folder to Railway

### 4. **Docker Hub + AWS**

```bash
# Build images
docker build -t online-shop-backend ./backend
docker build -t online-shop-frontend ./frontend

# Push to Docker Hub
docker tag online-shop-backend yourusername/online-shop-backend
docker push yourusername/online-shop-backend

docker tag online-shop-frontend yourusername/online-shop-frontend
docker push yourusername/online-shop-frontend

# Deploy to AWS ECS/EKS or similar
```

## Environment Variables

Set these in your hosting platform:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/online-shop
JWT_SECRET=your-secure-random-secret-key
NODE_ENV=production
PORT=5000
```

## MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up (free tier available)
3. Create cluster
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/online-shop`
5. Use this for MONGODB_URI

## Post-Deployment

After deployment, seed the database:

```bash
# SSH into your server and run
npm run seed

# Or call the seed endpoint (create this in production)
# POST /api/seed
```

## Testing Live Deployment

Once deployed:

```bash
# Test health endpoint
curl https://your-app.railway.app/api/health

# Test API
curl https://your-app.railway.app/api/products

# Login
curl -X POST https://your-app.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## Demo Credentials

```
Email: john@example.com
Password: password123
```

## Monitoring & Logs

- **Railway**: Dashboard shows logs and metrics
- **Heroku**: `heroku logs --tail`
- **Vercel**: Vercel dashboard
- **AWS**: CloudWatch logs

## Custom Domain

1. Buy domain (GoDaddy, Namecheap, etc.)
2. Point DNS to hosting provider
3. Enable HTTPS (automatic on most platforms)

## Performance Tips

- Enable caching on static files
- Use CDN for images
- Database indexing (MongoDB)
- Compress responses (gzip)
- Use environment-specific configs

## Troubleshooting

**App crashes on deploy:**
- Check logs: `heroku logs --tail` or Railway dashboard
- Verify environment variables are set
- Check MongoDB connection string

**Frontend not loading:**
- Verify build succeeded: `npm run build:frontend`
- Check static file serving in production

**API calls fail:**
- Verify CORS is enabled
- Check API_URL in frontend matches backend URL
- Test with `curl`

---

**Next Steps:** 
1. Choose hosting platform
2. Fork/connect GitHub repo
3. Set environment variables
4. Deploy
5. Test live URL
6. Seed database

Need help with specific platform? Let me know!

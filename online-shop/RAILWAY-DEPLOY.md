# 🚀 Deploy to Railway in 5 Minutes

## Step 1: Create Railway Account
Go to [railway.app](https://railway.app) and sign up with GitHub

## Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Connect your GitHub account
4. Select the **"Dev"** repository

## Step 3: Configure Services

Railway will auto-detect your setup. Configure:

### Service 1: MongoDB
- Railway provides MongoDB automatically
- Get connection string from Railway dashboard
- Copy to MONGODB_URI

### Service 2: Backend
- Set environment variables:
  ```
  MONGODB_URI: (from Railway MongoDB)
  JWT_SECRET: generate-a-random-secret-here
  NODE_ENV: production
  ```
- Service runs on: `https://online-shop-backend.railway.app`

### Service 3: Frontend
- Service runs on: `https://online-shop.railway.app`

## Step 4: Deploy
1. Push code to GitHub:
   ```bash
   git push origin main
   ```
2. Railway auto-deploys on push
3. View logs in Railway dashboard

## Step 5: Seed Database
Open terminal and run:
```bash
railway run npm run seed
```

Or manually seed by making API call (after creating seed endpoint)

## Access Your App

**Live URL:** `https://online-shop.railway.app`

**API Base:** `https://online-shop.railway.app/api`

**Login with:**
- Email: `john@example.com`
- Password: `password123`

## What's Deployed

✅ MongoDB Database  
✅ Express Backend API  
✅ React Frontend  
✅ All CRUD operations  
✅ Authentication  
✅ Location services  

## Monitoring

View in Railway Dashboard:
- **Logs** - Real-time application logs
- **Metrics** - CPU, Memory usage
- **Deployments** - Deployment history

## Troubleshooting

**App won't start:**
- Check logs in Railway dashboard
- Verify MONGODB_URI is set
- Check Node version (should be 18.x)

**Database issues:**
- Connect to Railway MongoDB with MongoDB Compass
- Use connection string from Railway
- Verify database is created

**Frontend issues:**
- Check REACT_APP_API_URL is correct
- Look at browser console for errors
- Verify backend API is running

## Scale Up (Later)

From Railway dashboard:
1. Go to Backend service
2. Increase CPU/Memory
3. Increase replicas for load balancing

## Custom Domain

1. Buy domain (optional)
2. In Railway: Settings → Domain
3. Add your domain
4. Update DNS settings

---

**That's it! Your app is live! 🎉**

GitHub: https://github.com/abiculat/Dev

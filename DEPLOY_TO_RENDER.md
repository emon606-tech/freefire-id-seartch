# 🚀 Deploy to Render - Free Fire Player Lookup Server

**Deploy your server to Render and get a public URL for real Free Fire data!**

## 📋 Prerequisites

1. **GitHub Account** (free)
2. **Render Account** (free tier available)
3. **Your code** pushed to GitHub

## 🎯 Step-by-Step Deployment

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Free Fire Player Lookup Server"
git branch -M main

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Deploy on Render

1. **Go to [render.com](https://render.com)** and sign up/login
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**

   - **Name**: `freefire-player-lookup`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free` (or paid if you want)

5. **Click "Create Web Service"**

### Step 3: Wait for Deployment

- Render will automatically:
  - Clone your repository
  - Install dependencies
  - Start your server
  - Give you a public URL

### Step 4: Get Your Public URL

Your server will be available at:
```
https://freefire-player-lookup.onrender.com
```

## 🔧 Environment Variables (Optional)

Render automatically sets:
- `NODE_ENV=production`
- `PORT=10000` (Render's default)

## 🌐 Test Your Deployed Server

```bash
# Health check
curl https://freefire-player-lookup.onrender.com/api/health

# Player lookup
curl https://freefire-player-lookup.onrender.com/api/player/1234567

# Test connectivity
curl https://freefire-player-lookup.onrender.com/api/test-connectivity
```

## 📱 Update Your Webpage

Once deployed, your webpage will automatically use the Render server instead of localhost!

## 🎯 Benefits of Render Deployment

- **Public URL** - Accessible from anywhere
- **No CORS issues** - Professional domain
- **Auto-deployment** - Updates when you push to GitHub
- **Free tier** - No cost for basic usage
- **SSL certificate** - HTTPS by default
- **Global CDN** - Fast worldwide access

## 🔍 Troubleshooting

### Build fails?
- Check `package.json` has all dependencies
- Ensure `start` script is correct
- Check Render logs for errors

### Server won't start?
- Verify `PORT` environment variable
- Check if port 10000 is available
- Review server logs

### API calls fail?
- Test with curl first
- Check server health endpoint
- Verify CORS settings

## 🎮 Ready to Deploy!

1. **Push to GitHub** ✅
2. **Deploy on Render** ✅
3. **Get public URL** ✅
4. **Test your API** ✅
5. **Use from anywhere** ✅

---

**Your Free Fire Player Lookup Server will be live on the internet! 🌍** 
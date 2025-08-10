# 🔥 Free Fire Player Lookup Server

**Your own server to bypass CORS and get REAL Free Fire player data from Garena!**

## 🚀 What This Does

- **Bypasses CORS restrictions** that block direct API calls
- **Proxies requests** to Garena's Free Fire servers
- **Attempts multiple endpoints** for maximum success rate
- **Returns real player data** when available
- **Falls back gracefully** when servers block access

## 📋 Requirements

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Open Your Webpage
- Navigate to: `http://localhost:3000`
- Your webpage will now use the server instead of direct API calls!

## 🔧 How It Works

1. **Your webpage** sends UID to `http://localhost:3000/api/player/{UID}`
2. **Our server** tries multiple Garena endpoints:
   - `https://ff.garena.com/api/player/{UID}`
   - `https://freefire.garena.com/api/player/{UID}`
   - `https://garena.com/freefire/player/{UID}`
   - And more...
3. **Server processes** the response and sends it back
4. **Your webpage** displays the real data!

## 🌐 API Endpoints

- **`GET /api/player/:uid`** - Look up a player by UID
- **`GET /api/health`** - Check server health
- **`GET /api/test-connectivity`** - Test Garena server connections

## 📱 Test the API

```bash
# Test player lookup
curl http://localhost:3000/api/player/1234567

# Check server health
curl http://localhost:3000/api/health

# Test Garena connectivity
curl http://localhost:3000/api/test-connectivity
```

## 🎯 Why This Works

- **No CORS issues** - Server-to-server communication
- **Professional headers** - Mimics real browser requests
- **Multiple fallbacks** - Tries different endpoints
- **Error handling** - Graceful degradation

## ⚠️ Important Notes

- **Server must be running** for the webpage to work
- **Port 3000** must be available
- **Internet connection** required to reach Garena servers
- **Garena may still block** some requests (server-side protection)

## 🔍 Troubleshooting

### Server won't start?
- Check if port 3000 is in use
- Ensure Node.js is installed
- Run `npm install` first

### No data returned?
- Check server console for errors
- Verify Garena servers are accessible
- Try different UIDs

### CORS errors?
- Make sure you're using `http://localhost:3000` not `file://`

## 🎮 Ready to Go!

1. **Install**: `npm install`
2. **Start**: `npm start`
3. **Open**: `http://localhost:3000`
4. **Search**: Enter any Free Fire UID
5. **Get Real Data**: From Garena's servers!

---

**Made with ❤️ for Free Fire players who want real data!** 
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for GitHub Pages frontend
app.use(cors({
    origin: [
        'https://emonxxx11.github.io',
        'https://freefire-id-seartch.onrender.com',
        'http://localhost:3000'
    ],
    credentials: false,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Garena API endpoints to try
const GARENA_ENDPOINTS = [
    // Official Free Fire endpoints
    `https://ff.garena.com/api/player`,
    `https://freefire.garena.com/api/player`,
    `https://api.garena.com/freefire/player`,
    
    // Shop and auth endpoints
    `https://mshop.garenanow.com/api/shop/apps/roles`,
    `https://mshop.garenanow.com/api/auth/player_id_login`,
    `https://mshop.garenanow.com/api/shop/pay/init`,
    
    // Alternative API patterns
    `https://api.garena.com/freefire/player`,
    `https://mshop.garenanow.com/api/player`,
    `https://ff.garena.com/api/v1/player`,
    `https://freefire.garena.com/api/v1/player`,
    
    // Direct player lookup
    `https://ff.garena.com/player`,
    `https://freefire.garena.com/player`,
    `https://garena.com/freefire/player`
];

// Professional headers to mimic real browser requests
function getHeaders() {
    return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'Origin': 'https://freefire.garena.com',
        'Referer': 'https://freefire.garena.com/',
        'X-Requested-With': 'XMLHttpRequest'
    };
}

// Root endpoint - redirect to GitHub Pages
app.get('/', (req, res) => {
    res.redirect('https://emonxxx11.github.io/freefire-id-fornted/');
});

// API info endpoint
app.get('/api', (req, res) => {
    res.json({
        name: 'Free Fire Player Lookup API',
        version: '1.0.0',
        frontend: 'https://emonxxx11.github.io/freefire-id-fornted/',
        endpoints: {
            health: '/api/health',
            player: '/api/player/{uid}',
            connectivity: '/api/test-connectivity'
        }
    });
});

// Main player lookup endpoint
app.get('/api/player/:uid', async (req, res) => {
    const { uid } = req.params;
    
    // Validate UID format (Free Fire: 7-50 digits)
    if (!/^\d{7,50}$/.test(uid)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid UID format. Free Fire UIDs must be 7-50 digits.'
        });
    }
    
    console.log(`🔍 Looking up player with UID: ${uid}`);
    
    // Try each Garena endpoint
    for (const baseUrl of GARENA_ENDPOINTS) {
        try {
            const endpoint = `${baseUrl}/${uid}`;
            console.log(`🌐 Trying: ${endpoint}`);
            
            const response = await axios.get(endpoint, {
                headers: getHeaders(),
                timeout: 10000, // 10 second timeout
                validateStatus: (status) => status < 500 // Accept 2xx, 3xx, 4xx status codes
            });
            
            console.log(`✅ ${endpoint}: ${response.status}`);
            
            if (response.status === 200 && response.data) {
                console.log('🎯 Found player data!');
                
                // Process the response to extract player info
                const playerData = processGarenaResponse(response.data, uid);
                
                if (playerData) {
                    return res.json({
                        success: true,
                        data: playerData,
                        source: endpoint
                    });
                }
            }
        } catch (error) {
            console.log(`❌ ${baseUrl} failed:`, error.message);
            continue;
        }
    }
    
    // If all endpoints fail, return not found
    console.log('❌ All Garena endpoints failed');
    res.status(404).json({
        success: false,
        error: 'Player not found in Free Fire servers',
        message: 'The UID may not exist or Garena servers are currently unavailable.'
    });
});

// Process Garena API response to extract player data
function processGarenaResponse(data, uid) {
    try {
        // Try different response structures
        let player = null;
        
        if (data.player) {
            player = data.player;
        } else if (data.data) {
            player = data.data;
        } else if (data.nickname || data.username) {
            player = data;
        } else if (Array.isArray(data) && data.length > 0) {
            player = data[0];
        }
        
        if (!player) {
            return null;
        }
        
        // Extract and standardize player information
        return {
            uid: uid,
            nickname: player.nickname || player.username || player.name || 'Unknown',
            level: player.level || player.lvl || 1,
            rank: player.rank || player.tier || 'Unranked',
            region: player.region || player.server || 'Unknown',
            clan: player.clan || player.guild || 'No Clan',
            kills: player.kills || player.total_kills || 0,
            matches: player.matches || player.total_matches || 0,
            img_url: player.img_url || player.avatar || player.profile_pic || null,
            last_seen: player.last_seen || player.last_login || new Date().toISOString()
        };
    } catch (error) {
        console.log('❌ Error processing Garena response:', error.message);
        return null;
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Free Fire Player Lookup Server is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Test connectivity to Garena servers
app.get('/api/test-connectivity', async (req, res) => {
    const results = [];
    
    for (const baseUrl of GARENA_ENDPOINTS.slice(0, 3)) { // Test first 3 endpoints
        try {
            const response = await axios.head(baseUrl, {
                headers: getHeaders(),
                timeout: 5000
            });
            
            results.push({
                endpoint: baseUrl,
                status: '✅ Online',
                response_time: response.headers['x-response-time'] || 'Unknown'
            });
        } catch (error) {
            results.push({
                endpoint: baseUrl,
                status: '❌ Offline',
                error: error.message
            });
        }
    }
    
    res.json({
        success: true,
        message: 'Garena server connectivity test',
        results: results,
        timestamp: new Date().toISOString()
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Free Fire Player Lookup Server running on port ${PORT}`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📊 Player Lookup: http://localhost:${PORT}/api/player/{uid}`);
    console.log(`🎮 Frontend: https://emonxxx11.github.io/freefire-id-fornted/`);
    console.log(`📡 API Info: http://localhost:${PORT}/api`);
}); 

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://*.vercel.app'],
    credentials: true
}));
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        city TEXT NOT NULL,
        currentUsage INTEGER NOT NULL,
        maxCapacity INTEGER NOT NULL,
        utilization REAL NOT NULL,
        status TEXT NOT NULL,
        lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS capacity_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        asset_id INTEGER NOT NULL,
        utilization REAL NOT NULL,
        status TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (asset_id) REFERENCES assets(id)
    )`);

    // Check if data exists, if not insert sample data
    db.get("SELECT COUNT(*) as count FROM assets", (err, row) => {
        if (row && row.count === 0) {
            const sampleAssets = [
                // Delhi Assets
                ['Signature Bridge', 'Bridge', 'Delhi', 4200, 5000, 84, 'high'],
                ['Rajiv Chowk Metro', 'Metro', 'Delhi', 9200, 8000, 115, 'overload'],
                ['DND Flyway', 'Road', 'Delhi', 6500, 7000, 93, 'congested'],
                ['Okhla Water Plant', 'Utility', 'Delhi', 380, 500, 76, 'high'],
                // Mumbai Assets
                ['Bandra-Worli Sea Link', 'Bridge', 'Mumbai', 1200, 6000, 20, 'underused'],
                ['Eastern Express Highway', 'Road', 'Mumbai', 5500, 5000, 110, 'overload'],
                ['CST Railway Station', 'Railway', 'Mumbai', 8500, 10000, 85, 'high'],
                ['Dharavi Water Plant', 'Utility', 'Mumbai', 320, 400, 80, 'high'],
                // Bangalore Assets
                ['MG Road Metro', 'Metro', 'Bangalore', 7500, 8000, 94, 'congested'],
                ['Electronic City Flyover', 'Road', 'Bangalore', 4200, 4500, 93, 'congested'],
                ['Silk Board Junction', 'Road', 'Bangalore', 5800, 5000, 116, 'overload'],
                ['Cauvery Water Supply', 'Utility', 'Bangalore', 280, 350, 80, 'high'],
                // Chennai Assets
                ['Chennai Central', 'Railway', 'Chennai', 4500, 5000, 90, 'congested'],
                ['Marina Beach', 'Public Space', 'Chennai', 2800, 10000, 28, 'underused'],
                ['Chennai Metro Central', 'Metro', 'Chennai', 3200, 4000, 80, 'high'],
                // Kolkata Assets
                ['Howrah Bridge', 'Bridge', 'Kolkata', 3800, 4000, 95, 'congested'],
                ['Kolkata Metro', 'Metro', 'Kolkata', 4200, 4500, 93, 'congested'],
                ['Vidyasagar Setu', 'Bridge', 'Kolkata', 2800, 3500, 80, 'high'],
                // Hyderabad Assets
                ['Hyderabad Metro', 'Metro', 'Hyderabad', 3500, 6000, 58, 'normal'],
                ['Hussain Sagar Road', 'Road', 'Hyderabad', 2800, 4000, 70, 'normal'],
                ['Outer Ring Road', 'Road', 'Hyderabad', 6200, 6000, 103, 'overload'],
                // Pune Assets
                ['Katraj Tunnel', 'Tunnel', 'Pune', 1800, 3000, 60, 'normal'],
                ['Pune Metro', 'Metro', 'Pune', 2200, 4000, 55, 'normal'],
                ['Mumbai-Pune Expressway', 'Road', 'Pune', 5200, 5000, 104, 'overload'],
                // Ahmedabad Assets
                ['Sabarmati Riverfront', 'Public Space', 'Ahmedabad', 1200, 5000, 24, 'underused'],
                ['BRTS Corridor', 'Road', 'Ahmedabad', 3800, 4000, 95, 'congested'],
                ['Kankaria Lake', 'Public Space', 'Ahmedabad', 800, 3000, 27, 'underused'],
                // Jaipur Assets
                ['Jaipur Metro', 'Metro', 'Jaipur', 1800, 3500, 51, 'normal'],
                ['Tonk Road Flyover', 'Road', 'Jaipur', 3200, 3500, 91, 'congested'],
                // Lucknow Assets
                ['Lucknow Metro', 'Metro', 'Lucknow', 2100, 3500, 60, 'normal'],
                ['Shaheed Path', 'Road', 'Lucknow', 4200, 4500, 93, 'congested']
            ];

            const stmt = db.prepare(`INSERT INTO assets 
                (name, type, city, currentUsage, maxCapacity, utilization, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`);

            sampleAssets.forEach(asset => {
                stmt.run(asset[0], asset[1], asset[2], asset[3], asset[4], asset[5], asset[6]);
            });

            stmt.finalize();
            console.log('✅ Sample data inserted');
        }
    });
});

// ==================== API ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        database: 'connected',
        timestamp: new Date().toISOString() 
    });
});

// Get all assets
app.get('/api/assets', (req, res) => {
    const { status, city } = req.query;
    let query = 'SELECT * FROM assets';
    const params = [];

    if (status || city) {
        query += ' WHERE 1=1';
        if (status) {
            query += ' AND status = ?';
            params.push(status);
        }
        if (city) {
            query += ' AND city = ?';
            params.push(city);
        }
    }

    query += ' ORDER BY lastUpdated DESC';

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error fetching assets' });
        } else {
            res.json({ success: true, data: rows });
        }
    });
});

// Get single asset
app.get('/api/assets/:id', (req, res) => {
    db.get('SELECT * FROM assets WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error fetching asset' });
        } else if (!row) {
            res.status(404).json({ success: false, message: 'Asset not found' });
        } else {
            res.json({ success: true, data: row });
        }
    });
});

// Update asset status
app.put('/api/assets/:id', (req, res) => {
    const { status, currentUsage, utilization } = req.body;
    
    db.run(
        'UPDATE assets SET status = ?, currentUsage = ?, utilization = ?, lastUpdated = CURRENT_TIMESTAMP WHERE id = ?',
        [status, currentUsage, utilization, req.params.id],
        function(err) {
            if (err) {
                res.status(500).json({ success: false, message: 'Error updating asset' });
            } else if (this.changes === 0) {
                res.status(404).json({ success: false, message: 'Asset not found' });
            } else {
                // Log the change
                db.run(
                    'INSERT INTO capacity_logs (asset_id, utilization, status) VALUES (?, ?, ?)',
                    [req.params.id, utilization, status]
                );
                
                res.json({ success: true, message: 'Asset updated successfully' });
            }
        }
    );
});

// Get statistics
app.get('/api/stats', (req, res) => {
    db.get(`
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status = 'overload' THEN 1 ELSE 0 END) as overload,
            SUM(CASE WHEN status = 'congested' THEN 1 ELSE 0 END) as congested,
            SUM(CASE WHEN status = 'high' THEN 1 ELSE 0 END) as high,
            SUM(CASE WHEN status = 'normal' THEN 1 ELSE 0 END) as normal,
            SUM(CASE WHEN status = 'underused' THEN 1 ELSE 0 END) as underused
        FROM assets
    `, (err, row) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error fetching stats' });
        } else {
            res.json({ success: true, data: row });
        }
    });
});

// Get cities list
app.get('/api/cities', (req, res) => {
    db.all('SELECT DISTINCT city FROM assets ORDER BY city', (err, rows) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error fetching cities' });
        } else {
            res.json({ success: true, data: rows.map(r => r.city) });
        }
    });
});

// Get asset history
app.get('/api/assets/:id/history', (req, res) => {
    db.all(
        'SELECT * FROM capacity_logs WHERE asset_id = ? ORDER BY timestamp DESC LIMIT 10',
        [req.params.id],
        (err, rows) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Error fetching history' });
            } else {
                res.json({ success: true, data: rows });
            }
        }
    );
});

// Start server locally
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`\n🚀 ==================================`);
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🚀 API available at http://localhost:${PORT}/api`);
        console.log(`🚀 Health check: http://localhost:${PORT}/api/health`);
        console.log(`🚀 ==================================\n`);
    });
}

// Export for Vercel
module.exports = app;
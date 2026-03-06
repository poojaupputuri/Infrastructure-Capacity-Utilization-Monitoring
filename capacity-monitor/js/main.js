// ==================== MAIN APPLICATION LOGIC ====================

// Global variables
let currentFilter = 'all';
let assets = [];

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Capacity Monitoring Dashboard...');
    
    // Load data
    assets = window.assetsData || [];
    
    // Initialize all components
    updateStats();
    renderTable();
    updateAlerts();
    updatePeakHours();
    updateOverallUtilization();
    renderCityGrid();
    updateTime();
    
    // Set up real-time updates (simulated)
    setInterval(simulateRealTimeUpdate, 30000); // Update every 30 seconds
    setInterval(updateTime, 1000); // Update time every second
});

// ==================== STATISTICS FUNCTIONS ====================

function updateStats() {
    const stats = window.getStatistics ? window.getStatistics() : {
        overload: 0,
        congested: 0,
        high: 0,
        normal: 0,
        underused: 0,
        total: assets.length
    };

    // Update stat counters
    document.getElementById('overloadCount').textContent = stats.overload || 0;
    document.getElementById('congestedCount').textContent = stats.congested || 0;
    document.getElementById('highCount').textContent = stats.high || 0;
    document.getElementById('normalCount').textContent = stats.normal || 0;
    document.getElementById('underusedCount').textContent = stats.underused || 0;
    
    // Update alert count
    const criticalCount = (stats.overload || 0) + (stats.congested || 0);
    document.getElementById('alertCount').textContent = criticalCount;
}

// ==================== TABLE RENDERING ====================

function renderTable() {
    const tbody = document.getElementById('assetsTableBody');
    if (!tbody) return;

    // Filter assets based on current filter
    let filteredAssets = assets;
    if (currentFilter !== 'all') {
        filteredAssets = assets.filter(a => a.status === currentFilter);
    }

    if (filteredAssets.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="loading-row">No assets found</td></tr>`;
        return;
    }

    let html = '';
    filteredAssets.forEach(asset => {
        const statusClass = `status-${asset.status}`;
        const fillColor = window.statusColors ? window.statusColors[asset.status] : getColorByUtilization(asset.utilization);
        
        html += `<tr>
            <td>${asset.name}</td>
            <td>${asset.type}</td>
            <td>${asset.city}</td>
            <td>${asset.currentUsage.toLocaleString()}</td>
            <td>${asset.maxCapacity.toLocaleString()}</td>
            <td>
                <div class="capacity-bar">
                    <div class="capacity-fill" style="width: ${asset.utilization}%; background: ${fillColor}"></div>
                </div>
                <div style="font-size: 11px; margin-top: 4px;">${asset.utilization}%</div>
            </td>
            <td><span class="status-badge ${statusClass}">${window.statusLabels ? window.statusLabels[asset.status] : asset.status.toUpperCase()}</span></td>
        </tr>`;
    });
    
    tbody.innerHTML = html;
}

// Fallback color function
function getColorByUtilization(utilization) {
    if (utilization > 100) return '#1e293b';
    if (utilization > 90) return '#b91c1c';
    if (utilization > 70) return '#c2410c';
    if (utilization > 30) return '#166534';
    return '#1e3a8a';
}

// ==================== ALERTS FUNCTIONS ====================

function updateAlerts() {
    const alertsList = document.getElementById('alertsList');
    if (!alertsList) return;

    const alerts = window.getRecentAlerts ? window.getRecentAlerts() : [];

    if (alerts.length === 0) {
        alertsList.innerHTML = '<div class="alert-placeholder">No active alerts</div>';
        return;
    }

    let html = '';
    alerts.forEach(alert => {
        const alertType = alert.status === 'overload' ? 'critical' : 'warning';
        const message = alert.status === 'overload' 
            ? `⚠️ ${alert.name} exceeds capacity by ${alert.utilization - 100}%`
            : `🔥 ${alert.name} at ${alert.utilization}% capacity`;
        
        html += `<div class="alert-item ${alertType}">
            <div>${message}</div>
            <div class="alert-time">${alert.time || new Date().toLocaleTimeString()}</div>
        </div>`;
    });
    
    alertsList.innerHTML = html;
}

// ==================== PEAK HOURS CHART ====================

function updatePeakHours() {
    const barsContainer = document.getElementById('peakHoursBars');
    if (!barsContainer) return;

    const peakData = window.getPeakHoursData ? window.getPeakHoursData() : 
        [30, 25, 20, 18, 20, 25, 40, 65, 85, 95, 90, 85, 80, 75, 70, 75, 85, 95, 100, 95, 80, 60, 45, 35];
    
    let html = '';
    // Show every 2nd hour for cleaner display
    for (let i = 0; i < peakData.length; i += 2) {
        const height = peakData[i];
        const hour = i.toString().padStart(2, '0') + ':00';
        html += `<div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
            <div class="bar" style="height: ${height}px;" title="${hour} - ${height}%"></div>
            <div class="bar-label">${hour}</div>
        </div>`;
    }
    
    barsContainer.innerHTML = html;
}

// ==================== OVERALL UTILIZATION ====================

function updateOverallUtilization() {
    const overallEl = document.getElementById('overallUtilization');
    if (!overallEl) return;

    const avg = window.getOverallUtilization ? window.getOverallUtilization() : 
        Math.round(assets.reduce((sum, a) => sum + a.utilization, 0) / assets.length);
    
    overallEl.textContent = avg + '%';
}

// ==================== CITY GRID ====================

function renderCityGrid() {
    const cityGrid = document.getElementById('cityGrid');
    if (!cityGrid) return;

    const cityStats = window.getCityStatistics ? window.getCityStatistics() : {};

    if (Object.keys(cityStats).length === 0) {
        cityGrid.innerHTML = '<div class="loading-row">No city data available</div>';
        return;
    }

    let html = '';
    for (const [city, stats] of Object.entries(cityStats)) {
        html += `<div class="city-card">
            <div class="city-name">${city}</div>
            <div class="city-stats">
                <div class="city-stat-item">
                    <span>Total Assets:</span>
                    <span>${stats.total}</span>
                </div>
                <div class="city-stat-item">
                    <span>Overload:</span>
                    <span style="color: #b91c1c;">${stats.overload}</span>
                </div>
                <div class="city-stat-item">
                    <span>Congested:</span>
                    <span style="color: #c2410c;">${stats.congested}</span>
                </div>
                <div class="city-stat-item">
                    <span>Underused:</span>
                    <span style="color: #1e3a8a;">${stats.underused}</span>
                </div>
                <div class="city-stat-item">
                    <span>Avg Utilization:</span>
                    <span>${stats.avgUtilization}%</span>
                </div>
            </div>
        </div>`;
    }
    
    cityGrid.innerHTML = html;
}

// ==================== FILTER FUNCTIONS ====================

function filterAssets(filter) {
    currentFilter = filter;
    
    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.textContent.toLowerCase();
        if ((filter === 'all' && btnText.includes('all')) || 
            (filter !== 'all' && btnText.includes(filter))) {
            btn.classList.add('active');
        }
    });

    // Re-render table with new filter
    renderTable();
}

// ==================== TIME FUNCTIONS ====================

function updateTime() {
    const timeEl = document.getElementById('currentTime');
    if (!timeEl) return;
    
    const now = new Date();
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    timeEl.textContent = now.toLocaleString('en-IN', options);
}

// ==================== SIMULATED REAL-TIME UPDATES ====================
// Update filterAssets function to also filter map
function filterAssets(filter) {
    currentFilter = filter;
    
    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.textContent.toLowerCase();
        if ((filter === 'all' && btnText.includes('all')) || 
            (filter !== 'all' && btnText.includes(filter))) {
            btn.classList.add('active');
        }
    });

    // Re-render table with new filter
    renderTable();
    
    // Update map if filterMapByStatus exists
    if (typeof window.filterMapByStatus === 'function') {
        window.filterMapByStatus(filter);
    }
}
function simulateRealTimeUpdate() {
    // Randomly update some asset values to simulate real-time changes
    const randomIndex = Math.floor(Math.random() * assets.length);
    const asset = assets[randomIndex];
    
    // Slight random variation (-5% to +5%)
    const variation = Math.floor(Math.random() * 10) - 5;
    let newUsage = asset.currentUsage + Math.floor(asset.maxCapacity * variation / 100);
    
    // Ensure within bounds
    newUsage = Math.max(0, Math.min(asset.maxCapacity * 1.5, newUsage));
    
    // Update asset
    asset.currentUsage = newUsage;
    asset.utilization = Math.round((newUsage / asset.maxCapacity) * 100);
    
    // Update status based on new utilization
    if (asset.utilization > 100) {
        asset.status = 'overload';
    } else if (asset.utilization > 90) {
        asset.status = 'congested';
    } else if (asset.utilization > 70) {
        asset.status = 'high';
    } else if (asset.utilization > 30) {
        asset.status = 'normal';
    } else {
        asset.status = 'underused';
    }
    
    // Refresh dashboard
    updateStats();
    renderTable();
    updateAlerts();
    updateOverallUtilization();
    renderCityGrid();
    
    console.log('Real-time update completed');
}

// ==================== EXPORT FUNCTIONS ====================
// Make functions globally available for HTML onclick handlers
window.filterAssets = filterAssets;
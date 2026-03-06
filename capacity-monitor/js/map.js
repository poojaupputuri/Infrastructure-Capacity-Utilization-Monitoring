// ==================== MAP INITIALIZATION ====================

let map;
let heatLayer;
let markers = [];
let currentMapMode = 'heatmap'; // 'heatmap' or 'markers'

// Asset coordinates for major Indian cities
const cityCoordinates = {
    'Delhi': [28.6139, 77.2090],
    'Mumbai': [19.0760, 72.8777],
    'Bangalore': [12.9716, 77.5946],
    'Chennai': [13.0827, 80.2707],
    'Kolkata': [22.5726, 88.3639],
    'Hyderabad': [17.3850, 78.4867],
    'Pune': [18.5204, 73.8567],
    'Ahmedabad': [23.0225, 72.5714],
    'Jaipur': [26.9124, 75.7873],
    'Lucknow': [26.8467, 80.9462]
};

// Initialize map
function initMap() {
    // Center map on India
    map = L.map('capacityMap').setView([22.5726, 78.9629], 5);
    
    // Add base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Initialize heat layer
    updateHeatmap();
    
    // Add markers
    updateMarkers();
}

// Update heatmap based on current data
function updateHeatmap() {
    if (heatLayer) {
        map.removeLayer(heatLayer);
    }

    // Prepare heatmap data points
    const heatData = [];
    
    window.assetsData.forEach(asset => {
        const coords = cityCoordinates[asset.city];
        if (coords) {
            // Intensity based on utilization (0-1 scale)
            let intensity = asset.utilization / 100;
            
            // Boost intensity for overload/congested
            if (asset.status === 'overload') intensity *= 1.5;
            if (asset.status === 'congested') intensity *= 1.3;
            
            heatData.push([coords[0], coords[1], intensity]);
        }
    });

    // Create heat layer with custom gradient
    heatLayer = L.heatLayer(heatData, {
        radius: 30,
        blur: 20,
        maxZoom: 10,
        gradient: {
            0.0: '#1e3a8a',     // Underused
            0.3: '#166534',      // Normal
            0.7: '#c2410c',      // High
            0.9: '#b91c1c',      // Congested
            1.0: '#1e293b'       // Overload
        },
        minOpacity: 0.6
    }).addTo(map);
}

// Update markers on map
function updateMarkers() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add new markers
    window.assetsData.forEach(asset => {
        const coords = cityCoordinates[asset.city];
        if (!coords) return;

        // Create custom marker with color based on status
        const markerColor = getMarkerColor(asset.status);
        
        const marker = L.circleMarker(coords, {
            radius: 10,
            fillColor: markerColor,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        // Add popup with asset info
        marker.bindPopup(`
            <div style="min-width: 200px;">
                <h4 style="margin:0 0 10px 0;">${asset.name}</h4>
                <p><strong>City:</strong> ${asset.city}</p>
                <p><strong>Type:</strong> ${asset.type}</p>
                <p><strong>Usage:</strong> ${asset.currentUsage.toLocaleString()} / ${asset.maxCapacity.toLocaleString()}</p>
                <p><strong>Utilization:</strong> ${asset.utilization}%</p>
                <p><strong>Status:</strong> <span style="color: ${markerColor};">${asset.status.toUpperCase()}</span></p>
            </div>
        `);

        markers.push(marker);
    });
}

// Get marker color based on status
function getMarkerColor(status) {
    const colors = {
        'overload': '#1e293b',
        'congested': '#b91c1c',
        'high': '#c2410c',
        'normal': '#166534',
        'underused': '#1e3a8a'
    };
    return colors[status] || '#94a3b8';
}

// Toggle between heatmap and markers
function toggleHeatmap(showHeatmap) {
    currentMapMode = showHeatmap ? 'heatmap' : 'markers';
    
    // Update button states
    document.querySelectorAll('.map-control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    if (showHeatmap) {
        // Hide markers, show heatmap
        markers.forEach(marker => map.removeLayer(marker));
        if (!map.hasLayer(heatLayer)) {
            heatLayer.addTo(map);
        }
    } else {
        // Hide heatmap, show markers
        if (heatLayer) {
            map.removeLayer(heatLayer);
        }
        updateMarkers();
    }
}

// Zoom controls
function zoomIn() {
    map.zoomIn();
}

function zoomOut() {
    map.zoomOut();
}

function resetView() {
    map.setView([22.5726, 78.9629], 5);
}

// Filter map by status
function filterMapByStatus(status) {
    if (currentMapMode === 'heatmap') {
        // For heatmap, we need to recreate with filtered data
        if (heatLayer) {
            map.removeLayer(heatLayer);
        }
        
        const filteredAssets = status === 'all' 
            ? window.assetsData 
            : window.assetsData.filter(a => a.status === status);
        
        const heatData = [];
        filteredAssets.forEach(asset => {
            const coords = cityCoordinates[asset.city];
            if (coords) {
                let intensity = asset.utilization / 100;
                if (asset.status === 'overload') intensity *= 1.5;
                if (asset.status === 'congested') intensity *= 1.3;
                heatData.push([coords[0], coords[1], intensity]);
            }
        });

        heatLayer = L.heatLayer(heatData, {
            radius: 30,
            blur: 20,
            maxZoom: 10,
            gradient: {
                0.0: '#1e3a8a',
                0.3: '#166534',
                0.7: '#c2410c',
                0.9: '#b91c1c',
                1.0: '#1e293b'
            },
            minOpacity: 0.6
        }).addTo(map);
    } else {
        // For markers, filter visible markers
        markers.forEach(marker => map.removeLayer(marker));
        
        const filteredAssets = status === 'all' 
            ? window.assetsData 
            : window.assetsData.filter(a => a.status === status);
        
        filteredAssets.forEach(asset => {
            const coords = cityCoordinates[asset.city];
            if (!coords) return;

            const markerColor = getMarkerColor(asset.status);
            
            const marker = L.circleMarker(coords, {
                radius: 10,
                fillColor: markerColor,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);

            marker.bindPopup(`
                <div style="min-width: 200px;">
                    <h4 style="margin:0 0 10px 0;">${asset.name}</h4>
                    <p><strong>City:</strong> ${asset.city}</p>
                    <p><strong>Type:</strong> ${asset.type}</p>
                    <p><strong>Usage:</strong> ${asset.currentUsage.toLocaleString()} / ${asset.maxCapacity.toLocaleString()}</p>
                    <p><strong>Utilization:</strong> ${asset.utilization}%</p>
                    <p><strong>Status:</strong> <span style="color: ${markerColor};">${asset.status.toUpperCase()}</span></p>
                </div>
            `);

            markers.push(marker);
        });
    }
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait for assets data to load
    setTimeout(() => {
        initMap();
    }, 500);
});

// Export functions
window.toggleHeatmap = toggleHeatmap;
window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.resetView = resetView;
window.filterMapByStatus = filterMapByStatus;
// ==================== SAMPLE INFRASTRUCTURE ASSETS DATA ====================
// This file contains all the sample data for the Capacity Monitoring Dashboard

const assetsData = [
    // Delhi Assets
    {
        id: 1,
        name: 'Signature Bridge',
        type: 'Bridge',
        city: 'Delhi',
        currentUsage: 4200,
        maxCapacity: 5000,
        utilization: 84,
        status: 'high'
    },
    {
        id: 2,
        name: 'Rajiv Chowk Metro Station',
        type: 'Metro',
        city: 'Delhi',
        currentUsage: 9200,
        maxCapacity: 8000,
        utilization: 115,
        status: 'overload'
    },
    {
        id: 3,
        name: 'DND Flyway',
        type: 'Road',
        city: 'Delhi',
        currentUsage: 6500,
        maxCapacity: 7000,
        utilization: 93,
        status: 'congested'
    },
    {
        id: 4,
        name: 'Okhla Water Treatment Plant',
        type: 'Utility',
        city: 'Delhi',
        currentUsage: 380,
        maxCapacity: 500,
        utilization: 76,
        status: 'high'
    },

    // Mumbai Assets
    {
        id: 5,
        name: 'Bandra-Worli Sea Link',
        type: 'Bridge',
        city: 'Mumbai',
        currentUsage: 1200,
        maxCapacity: 6000,
        utilization: 20,
        status: 'underused'
    },
    {
        id: 6,
        name: 'Eastern Express Highway',
        type: 'Road',
        city: 'Mumbai',
        currentUsage: 5500,
        maxCapacity: 5000,
        utilization: 110,
        status: 'overload'
    },
    {
        id: 7,
        name: 'Chhatrapati Shivaji Terminus',
        type: 'Railway',
        city: 'Mumbai',
        currentUsage: 8500,
        maxCapacity: 10000,
        utilization: 85,
        status: 'high'
    },
    {
        id: 8,
        name: 'Dharavi Water Treatment Plant',
        type: 'Utility',
        city: 'Mumbai',
        currentUsage: 320,
        maxCapacity: 400,
        utilization: 80,
        status: 'high'
    },

    // Bangalore Assets
    {
        id: 9,
        name: 'MG Road Metro Station',
        type: 'Metro',
        city: 'Bangalore',
        currentUsage: 7500,
        maxCapacity: 8000,
        utilization: 94,
        status: 'congested'
    },
    {
        id: 10,
        name: 'Electronic City Flyover',
        type: 'Road',
        city: 'Bangalore',
        currentUsage: 4200,
        maxCapacity: 4500,
        utilization: 93,
        status: 'congested'
    },
    {
        id: 11,
        name: 'Silk Board Junction',
        type: 'Road',
        city: 'Bangalore',
        currentUsage: 5800,
        maxCapacity: 5000,
        utilization: 116,
        status: 'overload'
    },
    {
        id: 12,
        name: 'Cauvery Water Supply',
        type: 'Utility',
        city: 'Bangalore',
        currentUsage: 280,
        maxCapacity: 350,
        utilization: 80,
        status: 'high'
    },

    // Chennai Assets
    {
        id: 13,
        name: 'Chennai Central Railway',
        type: 'Railway',
        city: 'Chennai',
        currentUsage: 4500,
        maxCapacity: 5000,
        utilization: 90,
        status: 'congested'
    },
    {
        id: 14,
        name: 'Marina Beach Promenade',
        type: 'Public Space',
        city: 'Chennai',
        currentUsage: 2800,
        maxCapacity: 10000,
        utilization: 28,
        status: 'underused'
    },
    {
        id: 15,
        name: 'Chennai Metro - Central',
        type: 'Metro',
        city: 'Chennai',
        currentUsage: 3200,
        maxCapacity: 4000,
        utilization: 80,
        status: 'high'
    },

    // Kolkata Assets
    {
        id: 16,
        name: 'Howrah Bridge',
        type: 'Bridge',
        city: 'Kolkata',
        currentUsage: 3800,
        maxCapacity: 4000,
        utilization: 95,
        status: 'congested'
    },
    {
        id: 17,
        name: 'Kolkata Metro - Esplanade',
        type: 'Metro',
        city: 'Kolkata',
        currentUsage: 4200,
        maxCapacity: 4500,
        utilization: 93,
        status: 'congested'
    },
    {
        id: 18,
        name: 'Vidyasagar Setu',
        type: 'Bridge',
        city: 'Kolkata',
        currentUsage: 2800,
        maxCapacity: 3500,
        utilization: 80,
        status: 'high'
    },

    // Hyderabad Assets
    {
        id: 19,
        name: 'Hyderabad Metro - Ameerpet',
        type: 'Metro',
        city: 'Hyderabad',
        currentUsage: 3500,
        maxCapacity: 6000,
        utilization: 58,
        status: 'normal'
    },
    {
        id: 20,
        name: 'Hussain Sagar Bund Road',
        type: 'Road',
        city: 'Hyderabad',
        currentUsage: 2800,
        maxCapacity: 4000,
        utilization: 70,
        status: 'normal'
    },
    {
        id: 21,
        name: 'Outer Ring Road',
        type: 'Road',
        city: 'Hyderabad',
        currentUsage: 6200,
        maxCapacity: 6000,
        utilization: 103,
        status: 'overload'
    },

    // Pune Assets
    {
        id: 22,
        name: 'Katraj Tunnel',
        type: 'Tunnel',
        city: 'Pune',
        currentUsage: 1800,
        maxCapacity: 3000,
        utilization: 60,
        status: 'normal'
    },
    {
        id: 23,
        name: 'Pune Metro - Vanaz',
        type: 'Metro',
        city: 'Pune',
        currentUsage: 2200,
        maxCapacity: 4000,
        utilization: 55,
        status: 'normal'
    },
    {
        id: 24,
        name: 'Mumbai-Pune Expressway',
        type: 'Road',
        city: 'Pune',
        currentUsage: 5200,
        maxCapacity: 5000,
        utilization: 104,
        status: 'overload'
    },

    // Ahmedabad Assets
    {
        id: 25,
        name: 'Sabarmati Riverfront',
        type: 'Public Space',
        city: 'Ahmedabad',
        currentUsage: 1200,
        maxCapacity: 5000,
        utilization: 24,
        status: 'underused'
    },
    {
        id: 26,
        name: 'Ahmedabad BRTS Corridor',
        type: 'Road',
        city: 'Ahmedabad',
        currentUsage: 3800,
        maxCapacity: 4000,
        utilization: 95,
        status: 'congested'
    },
    {
        id: 27,
        name: 'Kankaria Lake Front',
        type: 'Public Space',
        city: 'Ahmedabad',
        currentUsage: 800,
        maxCapacity: 3000,
        utilization: 27,
        status: 'underused'
    },

    // Jaipur Assets
    {
        id: 28,
        name: 'Jaipur Metro - Chandpole',
        type: 'Metro',
        city: 'Jaipur',
        currentUsage: 1800,
        maxCapacity: 3500,
        utilization: 51,
        status: 'normal'
    },
    {
        id: 29,
        name: 'Tonk Road Flyover',
        type: 'Road',
        city: 'Jaipur',
        currentUsage: 3200,
        maxCapacity: 3500,
        utilization: 91,
        status: 'congested'
    },

    // Lucknow Assets
    {
        id: 30,
        name: 'Lucknow Metro - Hazratganj',
        type: 'Metro',
        city: 'Lucknow',
        currentUsage: 2100,
        maxCapacity: 3500,
        utilization: 60,
        status: 'normal'
    },
    {
        id: 31,
        name: 'Shaheed Path',
        type: 'Road',
        city: 'Lucknow',
        currentUsage: 4200,
        maxCapacity: 4500,
        utilization: 93,
        status: 'congested'
    }
];

// ==================== STATUS COLOR MAPPING ====================
const statusColors = {
    'overload': '#1e293b',    // Dark - Overload
    'congested': '#b91c1c',   // Red - Congested
    'high': '#c2410c',        // Orange - High Usage
    'normal': '#166534',       // Green - Normal
    'underused': '#1e3a8a'     // Blue - Underused
};

const statusLabels = {
    'overload': 'OVERLOAD',
    'congested': 'CONGESTED',
    'high': 'HIGH USAGE',
    'normal': 'NORMAL',
    'underused': 'UNDERUSED'
};

// ==================== CITY LIST ====================
const citiesList = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

// ==================== HELPER FUNCTIONS ====================

// Get assets by status
function getAssetsByStatus(status) {
    return assetsData.filter(asset => asset.status === status);
}

// Get assets by city
function getAssetsByCity(city) {
    return assetsData.filter(asset => asset.city === city);
}

// Get statistics
function getStatistics() {
    return {
        overload: assetsData.filter(a => a.status === 'overload').length,
        congested: assetsData.filter(a => a.status === 'congested').length,
        high: assetsData.filter(a => a.status === 'high').length,
        normal: assetsData.filter(a => a.status === 'normal').length,
        underused: assetsData.filter(a => a.status === 'underused').length,
        total: assetsData.length
    };
}

// Get overall utilization percentage
function getOverallUtilization() {
    const total = assetsData.reduce((sum, a) => sum + a.utilization, 0);
    return Math.round(total / assetsData.length);
}

// Get peak hours data (simulated)
function getPeakHoursData() {
    // Returns utilization percentages for 24 hours
    return [30, 25, 20, 18, 20, 25, 40, 65, 85, 95, 90, 85, 80, 75, 70, 75, 85, 95, 100, 95, 80, 60, 45, 35];
}

// Get city-wise statistics
function getCityStatistics() {
    const cityStats = {};
    
    citiesList.forEach(city => {
        const cityAssets = assetsData.filter(a => a.city === city);
        if (cityAssets.length > 0) {
            cityStats[city] = {
                total: cityAssets.length,
                overload: cityAssets.filter(a => a.status === 'overload').length,
                congested: cityAssets.filter(a => a.status === 'congested').length,
                underused: cityAssets.filter(a => a.status === 'underused').length,
                avgUtilization: Math.round(
                    cityAssets.reduce((sum, a) => sum + a.utilization, 0) / cityAssets.length
                )
            };
        }
    });
    
    return cityStats;
}

// Get recent alerts
function getRecentAlerts() {
    const criticalStatuses = ['overload', 'congested'];
    return assetsData
        .filter(a => criticalStatuses.includes(a.status))
        .map(asset => ({
            ...asset,
            message: asset.status === 'overload' 
                ? `Exceeds capacity by ${asset.utilization - 100}%`
                : `Operating at ${asset.utilization}% capacity`,
            time: new Date().toLocaleTimeString()
        }))
        .slice(0, 5);
}

// ==================== EXPORT DATA ====================
// Make all data and functions globally available
window.assetsData = assetsData;
window.statusColors = statusColors;
window.statusLabels = statusLabels;
window.citiesList = citiesList;
window.getAssetsByStatus = getAssetsByStatus;
window.getAssetsByCity = getAssetsByCity;
window.getStatistics = getStatistics;
window.getOverallUtilization = getOverallUtilization;
window.getPeakHoursData = getPeakHoursData;
window.getCityStatistics = getCityStatistics;
window.getRecentAlerts = getRecentAlerts;
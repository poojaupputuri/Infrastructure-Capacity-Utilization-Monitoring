// ==================== CHART UTILITIES ====================
// This file contains helper functions for charts and visualizations
// (Currently not used in main dashboard but available for enhancements)

function createCapacityGauge(canvasId, value) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background arc
    ctx.beginPath();
    ctx.arc(width/2, height, width/3, Math.PI, 0, false);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 20;
    ctx.stroke();
    
    // Draw value arc
    const percentage = value / 100;
    const endAngle = Math.PI + (Math.PI * percentage);
    
    ctx.beginPath();
    ctx.arc(width/2, height, width/3, Math.PI, endAngle, false);
    
    // Color based on value
    if (value > 90) ctx.strokeStyle = '#b91c1c';
    else if (value > 70) ctx.strokeStyle = '#c2410c';
    else if (value > 30) ctx.strokeStyle = '#166534';
    else ctx.strokeStyle = '#1e3a8a';
    
    ctx.lineWidth = 20;
    ctx.stroke();
    
    // Draw value text
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    ctx.fillText(value + '%', width/2, height - 30);
}

function createPieChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2 - 10;
    const centerX = width / 2;
    const centerY = height / 2;
    
    let startAngle = 0;
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    
    const colors = {
        overload: '#1e293b',
        congested: '#b91c1c',
        high: '#c2410c',
        normal: '#166534',
        underused: '#1e3a8a'
    };
    
    Object.entries(data).forEach(([key, value]) => {
        if (value === 0) return;
        
        const sliceAngle = (value / total) * (Math.PI * 2);
        const endAngle = startAngle + sliceAngle;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        ctx.fillStyle = colors[key] || '#94a3b8';
        ctx.fill();
        
        startAngle = endAngle;
    });
}

// Export functions
window.createCapacityGauge = createCapacityGauge;
window.createPieChart = createPieChart;
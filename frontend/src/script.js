document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Element References ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const totalPeopleSpan = document.getElementById('total-people');
    const peopleByRoleList = document.getElementById('people-by-role');
    const heatmapContainer = document.getElementById('heatmap-container');
    const productionChartCtx = document.getElementById('productionChart').getContext('2d');

    // --- Theme Management ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        let theme = 'light';
        if (body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
        updateChartTheme(); // Update chart colors on theme change
    });

    // --- Chart.js Initialization ---
    const productionChart = new Chart(productionChartCtx, {
        type: 'line',
        data: { labels: [], datasets: [{ label: 'Worker Activity', data: [] }] },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    function updateChartTheme() {
        const isDarkMode = body.classList.contains('dark-mode');
        const textColor = isDarkMode ? '#e0e0e0' : '#333';
        const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

        productionChart.options.scales.x.ticks.color = textColor;
        productionChart.options.scales.y.ticks.color = textColor;
        productionChart.options.scales.x.grid.color = gridColor;
        productionChart.options.scales.y.grid.color = gridColor;
        productionChart.options.plugins.legend.labels.color = textColor;
        productionChart.data.datasets[0].borderColor = isDarkMode ? '#4bc0c0' : 'rgba(75, 192, 192, 1)';
        productionChart.data.datasets[0].backgroundColor = isDarkMode ? 'rgba(75, 192, 192, 0.5)' : 'rgba(75, 192, 192, 0.2)';
        productionChart.update();
    }

    // --- Heatmap Initialization ---
    const heatmapInstance = h337.create({
        container: heatmapContainer,
        radius: 20,
        maxOpacity: .8
    });

    // --- Data Fetching ---
    function updateLiveStatus() {
        fetch('/api/status').then(res => res.json()).then(data => {
            totalPeopleSpan.textContent = data.total_people;
            peopleByRoleList.innerHTML = '';
            for (const role in data.people_by_role) {
                const li = document.createElement('li');
                li.textContent = `${role}: ${data.people_by_role[role]}`;
                peopleByRoleList.appendChild(li);
            }
        }).catch(err => console.error('Error fetching status:', err));

        fetch('/api/heatmap').then(res => res.json()).then(data => {
            heatmapInstance.setData({ max: 10, data: data.heatmap_data });
        }).catch(err => console.error('Error fetching heatmap:', err));
    }

    function initializeDashboard() {
        fetch('/api/production_data').then(res => res.json()).then(data => {
            productionChart.data.labels = data.labels;
            productionChart.data.datasets[0].data = data.data;
            updateChartTheme(); // Initial theme setting for chart
        }).catch(err => console.error('Error fetching production data:', err));

        updateLiveStatus();
        setInterval(updateLiveStatus, 5000);
    }

    initializeDashboard();
});

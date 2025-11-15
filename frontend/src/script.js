document.addEventListener('DOMContentLoaded', function() {
    // DOM Element References
    const totalPeopleSpan = document.getElementById('total-people');
    const peopleByRoleList = document.getElementById('people-by-role');
    const heatmapContainer = document.getElementById('heatmap-container');
    const productionChartCtx = document.getElementById('productionChart').getContext('2d');

    // --- Chart.js Initialization ---
    const productionChart = new Chart(productionChartCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Worker Activity',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // --- Heatmap Initialization ---
    const heatmapInstance = h337.create({
        container: heatmapContainer,
        radius: 20,
        maxOpacity: .8
    });

    function updateLiveStatus() {
        // Fetch and update live personnel data
        fetch('/api/status')
            .then(response => response.json())
            .then(data => {
                totalPeopleSpan.textContent = data.total_people;
                peopleByRoleList.innerHTML = '';
                for (const role in data.people_by_role) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${role}: ${data.people_by_role[role]}`;
                    peopleByRoleList.appendChild(listItem);
                }
            })
            .catch(error => console.error('Error fetching status:', error));

        // Fetch and update live heatmap data
        fetch('/api/heatmap')
            .then(response => response.json())
            .then(data => {
                heatmapInstance.setData({ max: 10, data: data.heatmap_data });
            })
            .catch(error => console.error('Error fetching heatmap:', error));
    }

    function initializeDashboard() {
        // Fetch the historical production data once to populate the chart
        fetch('/api/production_data')
            .then(response => response.json())
            .then(data => {
                productionChart.data.labels = data.labels;
                productionChart.data.datasets[0].data = data.data;
                productionChart.update();
            })
            .catch(error => console.error('Error fetching production data:', error));

        // Fetch live data immediately, then set an interval
        updateLiveStatus();
        setInterval(updateLiveStatus, 5000); // Refresh every 5 seconds
    }

    initializeDashboard();
});

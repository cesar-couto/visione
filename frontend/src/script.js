document.addEventListener('DOMContentLoaded', function() {
    // DOM Element References
    const totalPeopleSpan = document.getElementById('total-people');
    const peopleByRoleList = document.getElementById('people-by-role');
    const snapshotsDiv = document.getElementById('snapshots');
    const heatmapContainer = document.getElementById('heatmap-container');

    // --- Heatmap Initialization ---
    // Create a heatmap instance once and configure it.
    const heatmapInstance = h337.create({
        container: heatmapContainer,
        radius: 20,
        maxOpacity: .8,
        minOpacity: 0,
        blur: .75
    });

    function fetchData() {
        // --- Fetch status data (personnel count and roles) ---
        fetch('/api/status')
            .then(response => response.json())
            .then(data => {
                totalPeopleSpan.textContent = data.total_people;
                peopleByRoleList.innerHTML = ''; // Clear previous list
                for (const role in data.people_by_role) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${role}: ${data.people_by_role[role]}`;
                    peopleByRoleList.appendChild(listItem);
                }
            })
            .catch(error => console.error('Error fetching status:', error));

        // --- Fetch and render heatmap data ---
        fetch('/api/heatmap')
            .then(response => response.json())
            .then(data => {
                // The API provides data in a format like:
                // { heatmap_data: [{ x: 10, y: 20, value: 5 }, ...] }
                // We need to pass this array to the heatmap instance.
                const heatmapData = {
                    max: 10, // Max value for a single point
                    data: data.heatmap_data
                };
                heatmapInstance.setData(heatmapData);
            })
            .catch(error => console.error('Error fetching heatmap:', error));

        // --- Fetch and display snapshot data ---
        fetch('/api/snapshots')
            .then(response => response.json())
            .then(data => {
                snapshotsDiv.innerHTML = ''; // Clear previous list
                data.forEach(snapshot => {
                    const snapshotElement = document.createElement('div');
                    snapshotElement.className = 'snapshot';
                    snapshotElement.innerHTML = `
                        <strong>${new Date(snapshot.timestamp).toLocaleTimeString()}</strong>
                        <p>Total People: ${snapshot.total_people}</p>
                    `;
                    snapshotsDiv.appendChild(snapshotElement);
                });
            })
            .catch(error => console.error('Error fetching snapshots:', error));
    }

    // Fetch data on page load and then every 5 seconds
    fetchData();
    setInterval(fetchData, 5000);
});

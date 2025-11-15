document.addEventListener('DOMContentLoaded', function() {
    const totalPeopleSpan = document.getElementById('total-people');
    const peopleByRoleList = document.getElementById('people-by-role');
    const heatmapDiv = document.getElementById('heatmap');

    function fetchData() {
        // Fetch status data
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

        // Fetch heatmap data
        fetch('/api/heatmap')
            .then(response => response.json())
            .then(data => {
                // For the MVP, we'll just show a simple representation of the data.
                heatmapDiv.innerHTML = `<pre>${JSON.stringify(data.heatmap_data, null, 2)}</pre>`;
            })
            .catch(error => console.error('Error fetching heatmap:', error));
    }

    // Fetch data every 5 seconds
    fetchData();
    setInterval(fetchData, 5000);
});

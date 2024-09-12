document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const backlogId = document.getElementById('backlogId').value;

    const username = 'john.doe@example.com';
    const password = 'securePassword123';
    
    const authHeader = 'Basic ' + btoa(username + ':' + password);

    fetch(`http://localhost:8080/backlogs/${backlogId}/backlog-items`, {
        method: 'GET',
        headers: {
            'Authorization': authHeader,
        }
    })
    .then(response => response.json())
    .then(data => {
        const backlogItemsList = document.getElementById('backlogItemsList');
        backlogItemsList.innerHTML = ''; // Limpar a lista antes de exibir

        if (data.length === 0) {
            backlogItemsList.innerHTML = '<li>No items found for this backlog</li>';
        } else {
            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `ID: ${item.id}, Description: ${item.description}, Start: ${item.startDate}, End: ${item.endDate}`;
                backlogItemsList.appendChild(listItem);
            });
        }
    })
    .catch((error) => {
        console.error('Error fetching backlog items:', error);
    });
});

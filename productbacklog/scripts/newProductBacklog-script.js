document.getElementById('backlogItemForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const description = document.getElementById('description').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const backlogId = document.getElementById('backlogId').value;

    const backlogItemData = {
        description: description,
        startDate: startDate,
        endDate: endDate,
        backlogId: backlogId
    };

    const username = 'john.doe@example.com';
    const password = 'securePassword123';
    
    const authHeader = 'Basic ' + btoa(username + ':' + password);

    fetch(`http://localhost:8080/backlogs/${backlogId}/backlog-items/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader,
        },
        body: JSON.stringify(backlogItemData),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultMessage').innerText = 'Backlog Item added successfully!';
    })
    .catch((error) => {
        document.getElementById('resultMessage').innerText = 'Error adding Backlog Item!';
        console.error('Error:', error);
    });
});

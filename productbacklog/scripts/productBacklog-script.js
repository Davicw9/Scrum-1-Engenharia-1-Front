document.getElementById('productBacklogForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const backlogData = {
        title: title,
        description: description,
        createdDate: new Date().toISOString().split('T')[0], // Adiciona a data atual
        backlogItems: [] // Inicialmente vazio
    };

    // Defina seu usuário e senha de autenticação
    const username = 'john.doe@example.com';
    const password = 'securePassword123';

    // Codifica o usuário e senha para o formato Base64
    const authHeader = 'Basic ' + btoa(username + ':' + password);

    fetch('http://localhost:8080/backlogs/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader,  // Cabeçalho de autenticação
        },
        body: JSON.stringify(backlogData),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultMessage').innerText = 'Product Backlog created successfully!';
    })
    .catch((error) => {
        document.getElementById('resultMessage').innerText = 'Error creating Product Backlog!';
        console.error('Error:', error);
    });
});

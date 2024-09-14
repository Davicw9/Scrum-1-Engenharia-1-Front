// Função para obter parâmetros da URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', function() {
    const itemId = getQueryParam('id');
    const backlogId = getQueryParam('backlogId');

    const username = 'john.doe@example.com';
    const password = 'securePassword123';
    const authHeader = 'Basic ' + btoa(username + ':' + password);

    // Carregar dados do item existente
    fetch(`http://localhost:8080/backlogs/${backlogId}/backlog-items/${itemId}`, {
        method: 'GET',
        headers: {
            'Authorization': authHeader,
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('description').value = data.description;
        document.getElementById('startDate').value = data.startDate;
        document.getElementById('endDate').value = data.endDate;
        document.getElementById('backlogId').value = backlogId; // Não editável
    })
    .catch(error => {
        console.error('Erro ao carregar item:', error);
    });

    // Submeter formulário para editar item
    document.getElementById('backlogItemForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const description = document.getElementById('description').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        const backlogItemData = {
            description: description,
            startDate: startDate,
            endDate: endDate,
            backlogId: backlogId
        };

        fetch(`http://localhost:8080/backlogs/${backlogId}/backlog-items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
            },
            body: JSON.stringify(backlogItemData),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultMessage').innerText = 'Item atualizado com sucesso!';
        })
        .catch((error) => {
            document.getElementById('resultMessage').innerText = 'Erro ao atualizar o item!';
            console.error('Erro:', error);
        });
    });
});

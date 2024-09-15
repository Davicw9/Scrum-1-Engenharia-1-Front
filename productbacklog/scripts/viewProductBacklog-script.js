// Modificando a função de listagem para incluir o backlogId ao redirecionar para edição
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
            backlogItemsList.innerHTML = '<li>Nenhum item encontrado para este Product Backlog.</li>';
            backlogItemsList.classList.add('list-message')
        } else {
            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.classList.add('backlog-item');

                const itemInfo = document.createElement('p');
                itemInfo.textContent = `Descrição: ${item.description} Data Inicial: ${item.startDate} Data final: ${item.endDate} Product Backlog Id: ${item.id}`;

                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('button-container');

                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.classList.add('btn-editar');
                editButton.onclick = function() {
                    redirecionarParaEditar(item.id, backlogId); // Inclui backlogId na URL
                };

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.classList.add('btn-excluir');
                deleteButton.onclick = function() {
                    excluirItem(item.id, backlogId, listItem);
                };

                buttonContainer.appendChild(editButton);
                buttonContainer.appendChild(deleteButton);

                listItem.appendChild(itemInfo);
                listItem.appendChild(buttonContainer);

                backlogItemsList.appendChild(listItem);
            });
        }
    })
    .catch(error => {
        console.error('Erro ao buscar itens do backlog:', error);
    });
});

// Função para redirecionar para a página de edição com backlogId e itemId
function redirecionarParaEditar(itemId, backlogId) {
    window.location.href = `editProductBacklogItemScreen.html?id=${itemId}&backlogId=${backlogId}`;
}

// Função para excluir um item do backlog
function excluirItem(itemId, backlogId, listItem) {
    const confirmar = confirm('Tem certeza que deseja excluir este item?');
    if (confirmar) {
        const username = 'john.doe@example.com';
        const password = 'securePassword123';
        const authHeader = 'Basic ' + btoa(username + ':' + password);

        fetch(`http://localhost:8080/backlogs/${backlogId}/backlog-items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': authHeader,
            }
        })
        .then(response => {
            if (response.ok) {
                // Remove o item da lista na interface
                listItem.remove();
                alert('Item excluído com sucesso.');
            } else {
                alert('Erro ao excluir o item.');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir o item:', error);
            alert('Ocorreu um erro ao tentar excluir o item.');
        });
    }
}
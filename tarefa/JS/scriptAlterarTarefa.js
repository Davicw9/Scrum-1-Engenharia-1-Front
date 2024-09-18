document.addEventListener('DOMContentLoaded', function() {
    const novaTarefaBtn = document.querySelector('.btn-new-task'); // Atualize para a classe correta
    const formNovaTarefa = document.getElementById('taskForm');
    const formEditarTarefa = document.getElementById('editForm');
    const taskList = document.getElementById('tasks-table-body'); // Atualize para o ID correto do tbody

    // Função para alternar o formulário de nova tarefa
    novaTarefaBtn.addEventListener('click', function() {
        formNovaTarefa.classList.toggle('hidden');
        formEditarTarefa.classList.add('hidden');  // Esconde o formulário de edição, se estiver aberto
    });

    // Função para abrir o formulário de editar tarefa ao clicar no botão editar
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-task-btn')) {
            const taskRow = event.target.closest('tr');
            const taskId = taskRow.dataset.taskId; // Assumindo que a linha tem o ID da tarefa

            // Preencher o formulário de edição com os dados da tarefa
            document.getElementById('edit-task-name').value = taskRow.querySelector('.task-name').textContent;
            document.getElementById('edit-task-desc').value = taskRow.querySelector('.task-desc').textContent;
            document.getElementById('edit-task-responsible').value = taskRow.querySelector('.task-responsible').textContent;
            document.getElementById('edit-task-start').value = taskRow.querySelector('.task-start').textContent;
            document.getElementById('edit-task-end').value = taskRow.querySelector('.task-end').textContent;

            // Exibe o formulário de edição e oculta o de nova tarefa
            formEditarTarefa.classList.remove('hidden');
            formNovaTarefa.classList.add('hidden');
        }
    });

    // Função para salvar alterações na tarefa
    const editarForm = document.getElementById('editForm');
    editarForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Aqui, você pode pegar os dados do formulário de edição e atualizar a linha da tarefa correspondente
        const taskId = document.getElementById('edit-task-id').value; // Assumindo que o ID da tarefa está em um campo oculto
        const taskRow = document.querySelector(`tr[data-task-id="${taskId}"]`);

        // Atualiza os valores da tarefa visualmente
        taskRow.querySelector('.task-name').textContent = document.getElementById('edit-task-name').value;
        taskRow.querySelector('.task-desc').textContent = document.getElementById('edit-task-desc').value;
        taskRow.querySelector('.task-responsible').textContent = document.getElementById('edit-task-responsible').value;
        taskRow.querySelector('.task-start').textContent = document.getElementById('edit-task-start').value;
        taskRow.querySelector('.task-end').textContent = document.getElementById('edit-task-end').value;

        // Esconde o formulário de edição
        formEditarTarefa.classList.add('hidden');
    });
});

// Oculta o formulário de alteração de tarefa
function hideEditForm() {
    document.getElementById('form-editar-tarefa').classList.add('hidden');
}

function showEditForm(taskId) {
    // Atualize o formulário com dados da tarefa se necessário
    document.getElementById('form-editar-tarefa').classList.remove('hidden');
}


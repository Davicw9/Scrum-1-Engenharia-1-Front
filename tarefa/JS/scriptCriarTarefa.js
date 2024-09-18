// Função para exibir o formulário de nova tarefa
function showTaskForm() {
    var form = document.getElementById("taskForm");
    form.classList.toggle("hidden");
    form.classList.toggle("show");
}

// Adiciona um evento de clique ao botão "Criar Tarefa"
document.querySelector('.btn-create-task').addEventListener('click', function(event) {
    event.preventDefault();

    const taskName = document.querySelector('input[name="task-name"]').value;
    const taskDescription = document.querySelector('textarea[name="task-desc"]').value;
    const taskResponsible = document.querySelector('input[name="task-responsible"]').value;
    const taskPriority = document.querySelector('input[name="task-priority"]').value;
    const taskStart = document.querySelector('input[name="task-start"]').value;
    const taskEnd = document.querySelector('input[name="task-end"]').value;

    if (taskName && taskDescription && taskResponsible && taskStart && taskEnd) {
        const taskId = Date.now(); // Gera um ID único baseado no timestamp atual

        // Adiciona a nova tarefa visualmente na tabela
        const tasksBody = document.getElementById('tasks-table-body');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${taskName}</td>
            <td>${taskDescription}</td>
            <td>${taskResponsible}</td>
            <td>${taskPriority}</td>
            <td>${taskStart}</td>
            <td>${taskEnd}</td>
            <td>
                <button onclick="toggleComments('${taskId}')">Comentários</button>
                <button onclick="editTask('${taskId}')">Alterar</button>
            </td>
        `;
        tasksBody.appendChild(tr);

        // Adiciona uma linha para os comentários
        const trComments = document.createElement('tr');
        trComments.id = `comments-row-${taskId}`;
        trComments.style.display = 'none'; // Inicialmente oculto
        trComments.innerHTML = `
            <td colspan="6">
                <div>
                    <h4>Comentários para ${taskName}</h4>
                    <ul id="comments-list-${taskId}">
                        <!-- Comentários serão carregados aqui -->
                    </ul>
                    <textarea id="new-comment-${taskId}" placeholder="Adicionar comentário..."></textarea>
                    <button onclick="addComment('${taskId}')">Enviar</button>
                </div>
            </td>
        `;
        tasksBody.appendChild(trComments);

        // Limpa os campos do formulário
        document.querySelector('form').reset();

        // Fecha o formulário
        showTaskForm();
    } else {
        alert('Preencha todos os campos!');
    }
});

// Função para adicionar comentários
function addComment(taskId) {
    const commentInput = document.getElementById(`new-comment-${taskId}`);
    const commentText = commentInput.value;

    if (commentText.trim() !== "") {
        const commentList = document.getElementById(`comments-list-${taskId}`);
        const newComment = document.createElement('li');
        newComment.textContent = commentText;
        commentList.appendChild(newComment);

        // Limpa o campo de comentário
        commentInput.value = "";
    } else {
        alert('Digite um comentário.');
    }
}

// Função para mostrar/ocultar os comentários
function toggleComments(taskId) {
    const commentRow = document.getElementById(`comments-row-${taskId}`);
    if (commentRow.style.display === 'none') {
        commentRow.style.display = 'table-row';
    } else {
        commentRow.style.display = 'none';
    }
}


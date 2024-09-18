// Função para carregar as sprints do backend
function loadSprints() {
    fetch('URL_DO_BACKEND_SPRINTS') // Atualize a URL do backend
        .then(response => response.json())
        .then(data => {
            const sprintsList = document.getElementById('sprints-list');

            // Limpa a mensagem padrão de "Sem sprints"
            sprintsList.innerHTML = '';

            // Verifica se há sprints
            if (data.length === 0) {
                sprintsList.innerHTML = "<li class='no-sprints'>Sem sprints</li>";
            } else {
                data.forEach(sprint => {
                    const li = document.createElement('li');
                    li.classList.add('sprint-item');
                    li.innerHTML = `
                        <span class="sprint-name">${sprint.name}</span>
                        <span class="sprint-time">${sprint.time} min</span>
                    `;
                    sprintsList.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error('Erro ao carregar as sprints:', error);
        });
}

// Função para carregar as tarefas do backend
function loadTasks() {
    fetch('URL_DO_BACKEND_TASKS') // Atualize a URL do backend
        .then(response => response.json())
        .then(data => {
            const tasksBody = document.getElementById('tasks-table-body');
            const commentSection = document.getElementById('comments-section');

            // Limpa a mensagem padrão de "Sem tarefas"
            tasksBody.innerHTML = '';

            // Verifica se há tarefas
            if (data.length === 0) {
                tasksBody.innerHTML = "<tr><td colspan='7' class='no-tasks'>Sem tarefas</td></tr>";
            } else {
                data.forEach(task => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${task.name}</td>
                        <td>${task.description}</td>
                        <td>${task.responsible}</td>
                        <td>${task.startDate}</td>
                        <td>${task.endDate}</td>
                        <td>
                            <button onclick="toggleComments('${task.id}')">Comentários</button>
                            <button onclick="editTask('${task.id}')">Editar</button>
                        </td>
                    `;
                    tasksBody.appendChild(tr);

                    // Adiciona uma seção para comentários
                    const commentsDiv = document.createElement('div');
                    commentsDiv.id = `comments-${task.id}`;
                    commentsDiv.className = 'comments-div';
                    commentsDiv.style.display = 'none';
                    commentsDiv.innerHTML = `
                        <h4>Comentários para ${task.name}</h4>
                        <ul id="comments-list-${task.id}">
                            <!-- Comentários serão carregados aqui -->
                        </ul>
                        <textarea id="new-comment-${task.id}" placeholder="Adicionar comentário..."></textarea>
                        <button onclick="addComment('${task.id}')">Enviar</button>
                    `;
                    commentSection.appendChild(commentsDiv);

                    fetchComments(task.id); // Carrega comentários para a tarefa
                });

                // Exibe a seção de comentários quando há tarefas
                commentSection.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar as tarefas:', error);
        });
}

// Função para carregar comentários associados a uma tarefa
function fetchComments(taskId) {
    fetch(`URL_DO_BACKEND_COMMENTS/${taskId}`) // Atualize a URL do backend
        .then(response => response.json())
        .then(data => {
            const commentsList = document.getElementById(`comments-list-${taskId}`);
            commentsList.innerHTML = '';

            data.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');
                commentItem.innerText = comment.text;
                commentsList.appendChild(commentItem);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar comentários:', error);
        });
}





// Carrega sprints, tarefas e comentários ao carregar a página
window.onload = function() {
    loadSprints();
    loadTasks();
};

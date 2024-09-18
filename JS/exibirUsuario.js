const userName = document.getElementById('user-name');
const email = document.getElementById('email');
//const userName = document.getElementById('user-name');
//const userName = document.getElementById('user-name');
function authenticatedFetch(url, options = {}) {
    const username = localStorage.getItem('authUsername');  // Obtém o nome de usuário do localStorage
    const password = localStorage.getItem('authUsername');  // Obtém a senha do localStorage
    
    if (!username || !password) {
        console.error('Usuário não autenticado');
        window.location.href = '/index.html';  // Redireciona para a página de login se não houver credenciais
        return Promise.reject('Usuário não autenticado');  // Rejeita a promessa para parar a execução
    }

    // Codifica o nome de usuário e a senha em base64 para o Basic Auth
    const credentials = btoa(`${username}:${password}`);
    
    // Exibe as credenciais no console para depuração (não recomendado em produção)
    console.log('Credenciais codificadas:', credentials);

    // Define os headers, incluindo o header Authorization para Basic Auth
    const headers = {
        ...options.headers,
        'Authorization': `Basic ${credentials}`,  // Adiciona as credenciais codificadas
        'Content-Type': 'application/json'
    };

    // Retorna a chamada do fetch com os headers atualizados
    return fetch(url, {
        ...options,
        headers
    });
}
function getUserData() {
    authenticatedFetch('http://localhost:8080/users/me', { 
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            console.error('Erro na resposta:', response.status);
            throw new Error('Erro ao buscar os dados do usuário');
        }
        return response.json();
    })
    .then(userData => {
        console.log('Dados do usuário:', userData);
        localStorage.setItem('authId', userData);
        userName.innerHTML = `${userData.name}`
        email.innerHTML = `${userData.email}`
    })
    .catch(error => {
        console.log('PASSOU POR AQUI');
        console.error('Erro ao buscar os dados do usuário:', error);
    });
}

// Ao carregar a página, tenta obter os dados do usuário
document.addEventListener('DOMContentLoaded', function() {
    getUserData();  // Chama a função para buscar os dados do usuário ao carregar a página
});
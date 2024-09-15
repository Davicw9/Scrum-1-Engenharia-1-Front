// Adiciona um listener para o evento de submissão do formulário de login
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário, que seria recarregar a página

    // Obtém os valores dos campos de email e senha do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Envia uma requisição POST para o endpoint de login
        const response = await fetch("http://localhost:8080/users/auth", {
            method: 'POST', // Define o método HTTP como POST
            headers: { 'Content-Type': 'application/json' }, // Define o tipo de conteúdo como JSON
            body: JSON.stringify({ email, password }) // Converte os dados do formulário para JSON e inclui no corpo da requisição
        });

        // Verifica se a resposta da requisição foi bem-sucedida
        if (!response.ok) {
            // Se a resposta não for ok (status diferente de 2xx), obtém o texto de erro e lança uma exceção com essa mensagem
            const errorText = await response.text();
            throw new Error(errorText);
        }

        // Converte a resposta para JSON e armazena o token no localStorage
        const data = await response.json();
        localStorage.setItem('authToken', data.token); // Armazena o token no localStorage
        alert("Login realizado com sucesso!"); // Exibe uma mensagem de sucesso para o usuário
        window.location.href = './MinhasEquipes.html'; // Redireciona o usuário para a página inicial após o login

    } catch (error) {
        // Se houver um erro durante a requisição, exibe a mensagem de erro na tela
        document.getElementById('error-message').textContent = error.message;
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Obtém os valores dos campos de email e senha do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Envia uma requisição POST para o endpoint de login
        const response = await fetch("http://localhost:8080/users/auth", {
            method: 'POST', // Define o método HTTP como POST
            headers: { 'Content-Type': 'application/json' }, // Define o tipo de conteúdo como JSON
            body: JSON.stringify({ email, password }) // Converte os dados do formulário para JSON
        });

        // Verifica se a resposta da requisição foi bem-sucedida
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Armazena o email e a senha no localStorage
        localStorage.setItem('authUsername', email); // Armazena o nome de usuário
        localStorage.setItem('authPassword', password); // Armazena a senha
        alert("Login realizado com sucesso!"); // Exibe uma mensagem de sucesso
        window.location.href = './MinhasEquipes.html'; // Redireciona o usuário para a próxima página

    } catch (error) {
        document.getElementById('error-message').textContent = error.message; // Exibe a mensagem de erro
    }
});

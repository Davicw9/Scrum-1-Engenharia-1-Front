document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnContinuar").addEventListener("click", function() {
        // Captura os valores dos inputs
        const nome = document.getElementById("nome").value;
        const sobrenome = document.getElementById("sobrenome").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const telefone = document.getElementById("telefone").value;
        const nascimento = document.getElementById("nascimento").value;
        const URL = 'http://localhost:8080/users/save';
        // Verifica se todos os campos foram preenchidos
        if (!nome || !email || !password || !telefone || !nascimento) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        else{
            // Cria um objeto com os valores
        const user = {
            name: nome,
            lastName: sobrenome,
            email: email,
            password: password,
            cellphoneNumber: telefone,
            birthDate: nascimento
        };
        

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar usuário');
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuário salvo com sucesso:', data);
            alert('Usuário salvo com sucesso');
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao salvar usuário');
        });
        }

        // Se necessário, você pode adicionar código aqui para enviar o objeto para um servidor, salvar no localStorage, etc.
    });
});
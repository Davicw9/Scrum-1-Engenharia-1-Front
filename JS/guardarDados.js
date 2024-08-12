//função que recebera os dados e os guardará  todos os itens no sessionStorage
function receberNomeUsuario() {
    var nameUsuario = document.getElementById("form_name_usuario").value;
    console.log(nameUsuario);
    sessionStorage.setItem("nameUsuario", nameUsuario);

    var emailUsuario = document.getElementById("form_email_usuario").value;
    console.log(emailUsuario);
    sessionStorage.setItem("emailUsuario", emailUsuario);

    var telefoneUsuario = document.getElementById("form_telefone_usuario").value;
    console.log(telefoneUsuario);
    sessionStorage.setItem("telefoneUsuario", telefoneUsuario);

    var nascidoUsuario = document.getElementById("form_nascimento_usuario").value;
    console.log(nascidoUsuario);
    sessionStorage.setItem("nascidoUsuario", nascidoUsuario);

    window.location.href = "../paginas/AlterarDados.html"; 
}

//Acesso dos dados do sessionStorage para mandar aos ids do itens da nova pagina
var nameUsuario = sessionStorage.getItem("nameUsuario");
if (nameUsuario) {
    document.getElementById("valor_form_name_usuario").textContent = nameUsuario;
}
var emailUsuario = sessionStorage.getItem("emailUsuario");
if (emailUsuario) {
    document.getElementById("valor_form_email_usuario").textContent = emailUsuario;
}
var telefoneUsuario = sessionStorage.getItem("telefoneUsuario");
if (telefoneUsuario) {
    document.getElementById("valor_form_telefone_usuario").textContent = telefoneUsuario;
}
var nascidoUsuario = sessionStorage.getItem("nascidoUsuario");
if (nascidoUsuario) {
    document.getElementById("valor_form_nascimento_usuario").textContent = nascidoUsuario;
}

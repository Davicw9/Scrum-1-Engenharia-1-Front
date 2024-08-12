const user = document.querySelector("form");
const Iname = document.querySelector(".form_name");
const Iemail = document.querySelector(".form_email");
const Itelefone = document.querySelector(".form_telefone");
const Inascimento = document.querySelector(".form_nascimento");

function atualizarUser(){
    fetch("http//localhost:3306/",
    {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            name: Iname.value,
            email: Iemail.value,
            telefone: Itelefone.value,
            nasximento: Inascimento
        })
    })
        .then(function(res){console.log(res)})
        .catch(function(res){console.log(res)})
    
};

function limpar(){
    Iname.value ="";
    Iemail.value ="";
    Itelefone.value ="";
    Inascimento.value ="";
}
tarefa.addEventListener('submit',function(event){
    event.preventDefault();

    atualizarUser();
    limpar();
})
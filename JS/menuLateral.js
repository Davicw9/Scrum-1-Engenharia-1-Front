document.getElementById('btn-menu').addEventListener('click', function() {
    var sidebar = document.getElementById('barraLateral');
    sidebar.classList.toggle('active'); // Adiciona ou remove a classe 'active'
});

document.getElementById('div-x').addEventListener
('click', function(){

        var sidebar = document.getElementById('barraLateral');
        sidebar.classList.remove('active');
    }
)
document.getElementById('sair').addEventListener
('click', function(event){
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('authUsername');
    localStorage.removeItem('authUsername');
    window.location.href = 'index.html';
})
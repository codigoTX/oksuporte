//Ao clicar no nome do usuário logado, mostra as opções.
function userDropdownMenu() {
  document.getElementById("user-dropdown").classList.toggle("show");
}

//Fecha o menu dropdown ao clicar fora das opções dele.
window.onclick = function(event) {
  if (!event.target.matches('.btn-info-loged')) {
    var userDropdowns = document.getElementsByClassName("user-dropdown-content");
    var i;
    for (i = 0; i < userDropdowns.length; i++) {
      var openDropdown = userDropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
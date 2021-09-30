//MODAL FORMULÁRIO DE CHAMADOS//
let openModalTickets = () => {
  let modal = document.querySelector('.modal-open-ticket');
  modal.classList.add('show-modal');
  modal.addEventListener('click', (e) => {

    if(e.target.className === 'btn-cancel-modal'){
      modal.classList.remove('show-modal');
    };
  });
};

//SALVA DADOS DO FORMULÁRIO DE ABERTURA DE CHAMADOS NO FIREBASE.

//OBTER DADOS DO FIREBASE PARA ALIMENTAR TABELA DOS CHAMADOS.

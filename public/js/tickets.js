
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

//SALVA DADOS DO FORMULÁRIO DE ABERTURA DE CHAMADOS NO MONGODB.
const form = document.querySelector('form');
// const emailError = document.querySelector('.email.error')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  // resetando as variáveis de erros
  // emailError.textContent = ''

  // Recebendo valores do formulário  
  const title = form.title.value;
  const serial = form.serial.value;
  const description = form.description.value;
  const attachment = form.attachment.value;
  const openedAt = new Date
  try {
    const res = await fetch('/tickets', { 
      method: 'POST', 
      body: JSON.stringify({ title, serial, description, attachment, openedAt }),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      // emailError.textContent = data.errors.email;
    }
    if (data.ticket) {
      location.assign('/tickets');
    }
  }
  catch (err) {
    console.log(err);
  }
});


//OBTER DADOS DO MONGODB PARA ALIMENTAR A TABELA DOS CHAMADOS.
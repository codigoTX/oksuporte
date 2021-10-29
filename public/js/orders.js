
//MODAL FORMULÁRIO DE CHAMADOS//
let openModalOrders = () => {
  let modal = document.querySelector('.modal-open-order');
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
  const finalClient = form.finalClient.value;
  const title = form.title.value;
  const obs = form.obs.value;
  const attachment = form.attachment.value;
  const startedAt = new Date;

  try {
    const res = await fetch('/orders', { 
      method: 'POST', 
      body: JSON.stringify({ finalClient, title, obs, attachment, startedAt}),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      // emailError.textContent = data.errors.email;
    }
    if (data.order) {
      location.assign('/orders');
    }
  }
  catch (err) {
    console.log(err);
  }
});


//OBTER DADOS DO MONGODB PARA ALIMENTAR A TABELA DOS CHAMADOS.
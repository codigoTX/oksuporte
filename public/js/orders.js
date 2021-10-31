//MODAL FORMULÁRIO DE PEDIDOS//
let openModalOrders = () => {
  let modal = document.querySelector('.modal-open-order');
  modal.classList.add('show-modal');
  modal.addEventListener('click', (e) => {

    if(e.target.className === 'btn-cancel-modal'){
      modal.classList.remove('show-modal');
    };
  });
};

//SALVA DADOS DO FORMULÁRIO DE ABERTURA DE PEDIDOS NO MONGODB.
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
      body: JSON.stringify({ finalClient, title, obs, attachment, startedAt }),
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


function formatOrdersTable(){
  const ordersTable = document.querySelector('#table-orders');
  const rows = ordersTable.querySelectorAll('tr');

  for(i=1; i<rows.length; i++){
    let cel = rows[i].getElementsByTagName('td');
    if(cel[cel.length-1].firstChild.nodeValue == 'Enviado'){
      rows[i].classList.toggle('sent');
    }
    else if(cel[cel.length-1].firstChild.nodeValue == 'Recebido'){
      rows[i].classList.toggle('received');
    }
    else if(cel[cel.length-1].firstChild.nodeValue == 'Produção'){
      rows[i].classList.toggle('production');
    }
    else if(cel[cel.length-1].firstChild.nodeValue == 'Limp/Emb'){
      rows[i].classList.toggle('dispatch');
    }
    else if(cel[cel.length-1].firstChild.nodeValue == 'Retirada'){
      rows[i].classList.toggle('withdrawal');
    }
    else if(cel[cel.length-1].firstChild.nodeValue == 'Montagem'){
      rows[i].classList.toggle('installation');
    }
    else if(cel[cel.length-1].firstChild.nodeValue == 'Concluído'){
      rows[i].classList.toggle('concluded');
    }
    else if(cel[cel.length-1].firstChild.nodeValue == 'Cancelado'){
      rows[i].classList.toggle('canceled');
    }
    else if(cel[cel.length-1].firstChild.nodeValue == 'Pausado'){
      rows[i].classList.toggle('paused');
    }    
    else{
      rows[i].classList.toggle('assistance');
    }
  }

}



//OBTER DADOS DO MONGODB PARA ALIMENTAR A TABELA DOS CHAMADOS.
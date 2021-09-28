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
document.getElementById('tickets-form').addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();

  dbTickets.add({
    title: e.target.title.value,
    serial: e.target.serial.value, 
    description: e.target.description.value, 
    attachment: e.target.attachment.value,
    opening: firebase.firestore.FieldValue.serverTimestamp(),
  }).then(() => {
    //alert('Chamado aberto com sucesso!');
    window.location.href = "tickets"; 
    document.getElementById('tickets-form').reset();
  })
  .catch(e => {
    alert('Falha ao abrir chamado');
  });
};

//OBTER DADOS DO FIREBASE PARA ALIMENTAR TABELA DOS CHAMADOS.
const ticketsList = document.querySelector('[data-js="tickets-list"]');

dbTickets.orderBy("opening", "desc").get().then(snapshot => {
  const ticketGroup = snapshot.docs.reduce((acc, doc) => {
    const {id, title, user, companies, opening, status} = doc.data();

    acc += `<tr>
              <td>${id}</td>
              <td>${title}</td>
              <td>${user}</td>
              <td>${companies}</td>
              <td>${opening.toDate().toLocaleDateString('pt-BR', {timeZone: 'UTC'})} - ${opening.toDate().toLocaleTimeString('pt-BR', {timeStyle: "short"})}</td>
              <td>${status}</td>
            </tr>`
    return acc;
  }, '') 
  ticketsList.innerHTML += ticketGroup;
})
.catch(err => {
  console.log(err.message)
})
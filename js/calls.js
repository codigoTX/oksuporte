//MODAL FORMULÁRIO DE CHAMADOS//
let openModalCalls = () => {
  let modal = document.querySelector('.modal-open-call');
  modal.classList.add('show-modal');
  modal.addEventListener('click', (e) => {

    if(e.target.className === 'btn-cancel-modal'){
      modal.classList.remove('show-modal');
    };
  });
};


//SALVA DADOS DO FORMULÁRIO DE ABERTURA DE CHAMADOS NO FIREBASE.
document.getElementById('calls-form').addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();

  dbCalls.add({
    title: e.target.title.value,
    serial: e.target.serial.value, 
    description: e.target.description.value, 
    attachment: e.target.attachment.value,
    opening: firebase.firestore.FieldValue.serverTimestamp(),
  }).then(() => {
    //alert('Chamado aberto com sucesso!');
    window.location.href = "calls.html"; 
    document.getElementById('calls-form').reset();
  })
  .catch(e => {
    alert('Falha ao abrir chamado');
  });
};

//OBTER DADOS DO FIREBASE PARA ALIMENTAR TABELA DOS CHAMADOS.
const callsList = document.querySelector('[data-js="calls-list"]');

dbCalls.orderBy("opening", "desc").get().then(snapshot => {
  const callGroup = snapshot.docs.reduce((acc, doc) => {
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
  callsList.innerHTML += callGroup;
})
.catch(err => {
  console.log(err.message)
})
const db = firebase.firestore();

const formNewCall = document.querySelector('[data-js="add-call-form"]');



/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^FIRESTORE^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/



//AO CLICAR NO NOME DO USUÁRIO LOGADO, MOSTRA AS OPÇÕES.
function userDropdownMenu() {
  document.getElementById("user-dropdown").classList.toggle("show-user-opts");
}
//FECHA O MENU DROPDOWN AO CLICAR FORA DAS OPÇÕES.
window.onclick = function(event) {
  if (!event.target.matches('.btn-info-loged')) {
    let userDropdowns = document.getElementsByClassName("user-dropdown-content");
    
    for (let i = 0; i < userDropdowns.length; i++) {
      let openDropdown = userDropdowns[i];
      if (openDropdown.classList.contains('show-user-opts')) {
        openDropdown.classList.remove('show-user-opts');
      };
    };
  };
};

//CONTROLA OS TEMAS (dark/light) --- "https://www.youtube.com/watch?v=wodWDIdV9BY"
const logo = document.getElementById('logo-left');

let darkModeStatus = localStorage.getItem('darkModeStatus'); 

const darkModeToggle = document.querySelector('#theme');

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkModeStatus', 'enabled');
  logo.src = "assets/images/logo_oksuporte2.png";
};

const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkModeStatus', 'disabled');
  logo.src = "assets/images/logo_oksuporte.png";
};
 
if (darkModeStatus === 'enabled'){
  enableDarkMode();
};


// darkModeToggle.addEventListener('click', () => {
//   darkModeStatus = localStorage.getItem('darkModeStatus'); 
  
//   if(darkModeStatus !== 'enabled'){
//     enableDarkMode(); 
//   } 
//   else{  
//     disableDarkMode(); 
//   }
// });



//FORMATAÇÃO CONDICIONAL DA TABELA DE PEDIDOS.
const tableFormat = () => {
  let table = document.getElementById('table')
}



//OPÇÕES SITUAÇÃO PEDIDOS
let osSts ='';
let osStsOpts = document.getElementsByName('sts-options');

const getChecked = () => { 
  for(let i=0; i<osStsOpts.length; i++){
    if(osStsOpts[i].checked){      
      osSts = osStsOpts[i].value;
      document.querySelector('#table-orders > tbody > tr:nth-child(2) > td:nth-child(7) > button > p').innerText = osSts;
    };
    localStorage.setItem('sp', osSts);
  };
};


//MODAL SITUAÇÃO PEDIDOS
let openModal = (modalId) => {
  const modal = document.getElementById('os-modal');
  modal.classList.add('show-modal');
  modal.addEventListener('click', (e) => {

    if(e.target.className === 'btn-cancel-modal'){
      modal.classList.remove('show-modal');
    };
  });
};


const btnOpenModal = document.querySelector('.os-sts-menu');
// btnOpenModal.addEventListener('click', () => openModal('os-modal'));

//Gera o Id dos chamados.
let generatesId = () => {
  var resultId = '';
  var PrefixId = 'CPN';//PEGAR AS DUAS PRIMEIRAS LETRAS DA EMPRESA E SOMAR COM UM NÚMERO RANDÔMICO DE TRÊS DÍGITOS.
  var SuffixId = Math.floor(Math.random()*10000);
  
  resultId = PrefixId+SuffixId;
  return resultId;
};

/*----------------------------------------------------------------------------------------------------------*/
//GERAIS FIREBASE//
let dbUsers = db.collection('users');
let dbCompanies = db.collection('companies');
let dbCalls = db.collection('calls');
let dbOrders = db.collection('orders');


//SALVA DADOS DO FORMULÁRIO NO FIREBASE.
document.getElementById('calls-form').addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();

  dbCalls.add({
    title: e.target.title.value,
    serial: e.target.serial.value, 
    description: e.target.description.value, 
    attachment: e.target.attachment.value,
    opening: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    // alert('Chamado aberto com sucesso!');
    // window.location.href = "calls.html"; 
    document.getElementById('calls-form').reset();
  })
  .catch(e => {
    alert('Falha ao abrir chamado');
  });
};

//OBTER DADOS DO FIREBASE PARA ALIMENTAR TABELA DOS CHAMADOS.
const callsList = document.querySelector('[data-js="calls-list"]');

dbCalls.get().then(snapshot => {
  const callGroup = snapshot.docs.reduce((acc, doc) => {
    acc += `<tr>
              <td>${doc.data().id}</td>
              <td>${doc.data().title}</td>
              <td>${doc.data().user}</td>
              <td>${doc.data().companies}</td>
              <td>${doc.data().opening}</td>
              <td>${doc.data().status}</td>
            </tr>`
    return acc;
  }, '') 
  callsList.innerHTML += callGroup;
})
.catch(err => {
  console.log(err.message)
})
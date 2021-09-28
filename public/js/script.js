const db = firebase.firestore();

//REFERENCIAS FIREBASE//
let dbUsers = db.collection('users');
let dbCompanies = db.collection('companies');
let dbTickets = db.collection('tickets');
let dbOrders = db.collection('orders');

let tbTicketsRef = document.querySelector('#tb-tickets');


/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^GERAIS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/


//AO CLICAR NO NOME DO USUÁRIO LOGADO, MOSTRA AS OPÇÕES.
function userDropdownMenu() {
  document.getElementById("user-dropdown").classList.toggle("show-user-opts");
};

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
let themeDark = localStorage.getItem('darkModeStatus'); 
const logoLeft = document.getElementById('logo-left');

if(themeDark === 'enabled'){
  document.body.classList.add('darkmode');
  localStorage.setItem('darkModeStatus', 'enabled');
  logoLeft.src = "/images/logo_oksuporte2.png";
}
else{
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkModeStatus', 'disabled');
  logoLeft.src = "/images/logo_oksuporte.png";
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


//MODAL SITUAÇÃO PEDIDOS//
let openModalOrders = () => {
  let modal = document.getElementById('os-modal');
  modal.classList.add('show-modal');
  modal.addEventListener('click', (e) => {

    if(e.target.className === 'btn-cancel-modal'){
      modal.classList.remove('show-modal');
    };
  });
};


//Gera o Id dos chamados.
let generatesId = () => {
  var resultId = '';
  var PrefixId = 'CPN';//PEGAR AS DUAS PRIMEIRAS LETRAS DA EMPRESA E SOMAR COM UM NÚMERO RANDÔMICO DE TRÊS DÍGITOS.
  var SuffixId = Math.floor(Math.random()*10000);
  
  resultId = PrefixId+SuffixId;
  return resultId;
};

/*----------------------------------------------------------------------------------------------------------*/

//CONTROLA OS TEMAS (dark/light) --- "https://www.youtube.com/watch?v=wodWDIdV9BY"
const logo = document.getElementById('logo-left');

let darkModeStatus = localStorage.getItem('darkModeStatus'); 

const darkModeToggle = document.querySelector('#theme');

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkModeStatus', 'enabled');
  logo.src = "/images/logo_oksuporte2.png";
  darkModeToggle.setAttribute('checked', 'true');
};

const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkModeStatus', 'disabled');
  logo.src = "/images/logo_oksuporte.png";
};
 
if (darkModeStatus === 'enabled'){
  enableDarkMode();
};


darkModeToggle.addEventListener('click', () => {
  darkModeStatus = localStorage.getItem('darkModeStatus'); 
  
  if(darkModeStatus !== 'enabled'){
    enableDarkMode(); 
  } 
  else{  
    disableDarkMode(); 
  }
});
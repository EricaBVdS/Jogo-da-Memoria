const input = document.querySelector('.username_input')
const btn = document.querySelector('.login_btn')
const form = document.querySelector('.login-form')



// Validação de input
const validateInput = ({ target }) => {
  if ( target.value.length > 2) {
    btn.removeAttribute('disabled')
    return
  }

  btn.setAttribute('disabled', '')
}


// salva o nome do player
const handleSubmit = (event) => {

//bloquia comportamento padrão do envio de formulário
  event.preventDefault();

//no navegador possui um armazenamento local chamado local storage
//podemos usar para salvar o nome digitado 
  localStorage.setItem('player', input.value)

  window.location = 'pages/jogo.html'

}



input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);


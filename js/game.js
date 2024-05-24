const grid = document.querySelector('.grid')
const spanNome = document.querySelector('.nome')
const timer = document.querySelector('.timer')
const modal = document.querySelector('.modal')
const mShadow = document.querySelector('.mShadow')
const modalText = document.querySelector('.mText')
const textBestTime = document.querySelector('.t_bestPlayer')

const images = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8']



///cria um elemento para reduzir código
const createElement = ( tag, className) => {
  const element = document.createElement(tag)
  element.className = className
  return element
}


let firstCard = '' //salva primeira carta virada
let secondCard = ''



//verifica se o jogo acabou
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.desabilita-card')

  if(disabledCards.length === 16){

    clearInterval(this.loop)
    modal.style.display = 'flex'
    mShadow.style.display = 'block'
    modalText.innerHTML = `Parabêns ${spanNome.innerHTML}! seu tempo foi ${timer.innerHTML}`
  }
}



//verifica se combina
const checkCards = () => {
  const firstImage = firstCard.getAttribute('data-imagem') //pega o atributo criado
  const secondtImage = secondCard.getAttribute('data-imagem')

  if (firstImage === secondtImage) {
    
    firstCard.firstChild.classList.add('desabilita-card')
    secondCard.firstChild.classList.add('desabilita-card')

    firstCard = ''
    secondCard = ''

    checkEndGame()

  } else {
    setTimeout(() => {
      firstCard.classList.remove('revela-card')
      secondCard.classList.remove('revela-card')

      firstCard = ''
      secondCard = ''

    },500)
    
  }
}


//função de evento para virar a carta no clique
const revealCard = ( {target}) => {

  //evita duplo clique
  if (target.parentNode.className.includes('revela-card')) {
    return
  }

  //
  if (firstCard === '') {

    target.parentNode.classList.add('revela-card')
    firstCard = target.parentNode

  } else if ( secondCard === ''){

    target.parentNode.classList.add('revela-card')
    secondCard = target.parentNode

    checkCards()

  }
  
}


//Cria card
const creatCard = (img) => {

  const card = createElement('div', 'card')
  const frente= createElement('div', ' face frente')
  const verso = createElement('div', ' face verso')

  frente.style.backgroundImage = `url('../img/${img}.png')`
  card.appendChild(frente)
  card.appendChild(verso)
  card.addEventListener('click', revealCard)
  card.setAttribute('data-imagem', img) //cria um atributo na tag html

  return card
}

//cria jogo
const loadGame = () => {

  // array para duplicar as imagens
  const duplicateImages = [...images, ...images]
  
  //embaralha as imagens
  const shuffledArray = duplicateImages.sort(() => Math.random()- 0.5);

  // cria card com image ja embaralhada
  shuffledArray.forEach((img) => {

    const card = creatCard(img);

    grid.appendChild(card)



  })

}

let sec =0
let min = 0


const twoDigit= (digit) => {
  if(digit<10){
    return('0'+digit)
  }else{
    return(digit)
  }
}

//inicia tempo
const starTimer = () => {
  this.loop = setInterval(()=>{
    sec ++
    if ( sec == 60){
      min++
      sec=0
    }
    timer.innerHTML = `${twoDigit(min)}:${twoDigit(sec)}`
  }, 1000)

}


//inicia jogo
window.onload = () => {
 
  spanNome.innerHTML = localStorage.getItem('player')
  starTimer()
  loadGame()
}

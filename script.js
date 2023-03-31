const content_cards_house = document.getElementById('content_cards_house')
const result_house = document.getElementById('result_house')
const content_cards_player = document.getElementById('content_cards_player')
const result_player = document.getElementById('result_player')
const show_the_remaining_cards = document.getElementById(
  'show_the_remaining_cards'
)
const ask_for_a_card = document.getElementById('ask_for_a_card')
const look_at_the_cards = document.getElementById('look_at_the_cards')
const play_again = document.getElementById('play_again')
const bankdiv = document.getElementById('coins')
const coinContainer = document.getElementById('coin-container')
const bet_amount_content = document.getElementById('bet_amount_content')

let bank = 1000
let coins = [5, 10, 20, 50, 100, 200]
let betCoinsplayerTwo = []
let numbersPlayerOne = []
let numbersPlayerTwo = []
let resultPlayerOne = ''
let resultPlayerTwo = ''
let showHouseFirstCard = false

const suits = [
  { name: 'hearts', icon: `<i class="bi bi-suit-spade-fill"></i>` },
  {
    name: 'diamonds',
    icon: `<i class="bi bi-suit-diamond-fill text-danger"></i>`
  },
  { name: 'clubs', icon: `<i class="text-danger bi bi-suit-heart-fill"></i>` },
  { name: 'spades', icon: `<i class="bi bi-suit-club-fill"></i>` }
]

const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

let deck = [].concat(
  ...suits.map(suit =>
    ranks.map(rank => ({
      id: rank + '-' + suit.name,
      rank,
      suit: suit.name,
      icon: suit.icon
    }))
  )
)

//generating 2 random numbers
function getTwoRandomCards (deck) {
  const randomIndex1 = Math.floor(Math.random() * deck.length)
  const randomIndex2 = Math.floor(Math.random() * deck.length)
  return [deck[randomIndex1], deck[randomIndex2]]
}

function getCardValue (card) {
  switch (card.rank) {
    case 'A':
      return 11
    case 'K':
    case 'Q':
    case 'J':
      return 10
    default:
      return card.rank
  }
}

function totalPoints (player) {
  return player.reduce((accumulator, currentValue) => {
    return accumulator + getCardValue(currentValue)
  }, 0)
}

function validationCards (resultPlayer, numbersPlayer, printResult) {
  if (resultPlayer > 21 && numbersPlayer.some(item => item.rank === 'A')) {
    resultPlayer -= 10
  }

  if (resultPlayer !== 21) {
    showHouseFirstCard = true
  }
  printResult.innerHTML = ''
  printResult.innerHTML += `ResultPlayer: ${resultPlayer}`
}

function showingCards (numbersPlayer, printResult) {
  const cardsPlayerOne = numbersPlayer.map(item => {
    return `
    <div class="cards">
      <span class="cards_number_one">${item.rank}</span>
      <span class="icons">${item.icon}</span>
      <span class="cards_number_two">${item.rank}</span>
    </div>
  `
  })
  printResult.innerHTML = cardsPlayerOne.join('')
}

//house player settings
numbersPlayerOne = getTwoRandomCards(deck)
//eliminando las cartas que ya son de la casa
deck = deck.filter(card => !numbersPlayerOne.includes(card))

//sumando para obtener la cantidad de puntos player one
resultPlayerOne = totalPoints(numbersPlayerOne)

validationCards(resultPlayerOne, numbersPlayerOne, result_house)

//hide validation cards
// if (resultPlayerOne > 21 && numbersPlayerOne.some(item => item.rank === 'A')) {
//   resultPlayerOne -= 10
// }

// if (resultPlayerOne !== 21) {
//   showHouseFirstCard = true
// }
// result_house.innerHTML += `Resultado del jugador 1: ${resultPlayerOne}`

// Agregamos las cartas del jugador 1 a la interfaz

const cardsPlayerOne = numbersPlayerOne.map((item, index) => {
  const shouldFlip = showHouseFirstCard && index === 0 && resultPlayerOne < 21
  return `
    <div class="cards ${shouldFlip ? 'flip' : ''}">
      <span class="cards_number_one">${item.rank}</span>
      <span class="icons ${shouldFlip != false ? 'data' : ''}">${
    item.icon
  }</span>
      <span class="cards_number_two">${item.rank}</span>
    </div>
  `
})

content_cards_house.innerHTML = cardsPlayerOne.join('')

//player cards settings
numbersPlayerTwo = getTwoRandomCards(deck)

//eliminando las cartas que ya son del player
deck = deck.filter(card => !numbersPlayerTwo.includes(card))

//sum count point player two
resultPlayerTwo = totalPoints(numbersPlayerTwo)

validationCards(resultPlayerTwo, numbersPlayerTwo, result_player)

//hide validation cards
// if (resultPlayerTwo > 21 && numbersPlayerTwo.some(item => item.rank === 'A')) {
//   resultPlayerTwo -= 10
// }

// if (resultPlayerTwo !== 21) {
//   showHouseFirstCard = true
// }
// result_player.innerHTML += `Result player 2: ${resultPlayerTwo}`

// Agregamos las cartas del jugador 2 a la interfaz

showingCards(numbersPlayerTwo, content_cards_player)

const askForLetter = () => {
  const remainingCardsRamdon = deck.sort(function () {
    return Math.random() - 0.5
  })

  const remainingCards = remainingCardsRamdon.map(item => {
    const shouldFlip = false
    return `
    <div class="cards-container">
      <div onclick="showSelectedCard('${item.id}')" id="${
      item.id
    }" class="cards ${shouldFlip == false ? 'flip' : ''}">
        <span class="cards_number_one">${item.rank}</span>
        <span class="icons ${shouldFlip != true ? 'data' : ''}">${
      item.icon
    }</span>
        <span class="cards_number_two">${item.rank}</span>
      </div>
    </div>
    
  `
  })

  show_the_remaining_cards.innerHTML = remainingCards.join('')
}

const showSelectedCard = card_id => {
  alert('lasdsa`dlkn')
  const selectedCard = document.getElementById(card_id)
  selectedCard.classList.add('get')
  selectedCard.children[1].classList.remove('data')
  selectedCard.classList.remove('flip')

  // Agregar la carta seleccionada a numbersPlayerTwo
  const card = deck.find(card => card.id === card_id)
  numbersPlayerTwo.push(card)

  //sum count point player two
  resultPlayerTwo = totalPoints(numbersPlayerTwo)

  validationCards(resultPlayerTwo, numbersPlayerTwo, result_player)

  if (resultPlayerTwo >= 21) {
    showingCards(numbersPlayerOne, content_cards_house)
    ask_for_a_card.style.display = 'none'
  }

  // updated cards player two
  showingCards(numbersPlayerTwo, content_cards_player)
}

const showCards = () => {
  ask_for_a_card.style.display = 'none'
  play_again.style.display = 'inline'
  look_at_the_cards.style.display = 'none'
  showingCards(numbersPlayerOne, content_cards_house)
}

const restart = () => {
  window.location.reload()
}

//config coins
const content_coins = coins.map(item => {
  let style_coins = ''
  switch (item) {
    case 5:
      style_coins = 'coin-five'
      break
    case 10:
      style_coins = 'coin-then'
      break
    case 20:
      style_coins = 'coin-twenty'
      break
    case 50:
      style_coins = 'coin-fifty'
      break
    case 100:
      style_coins = 'coin-hundred'
      break
    case 200:
      style_coins = 'coin-two_hundred'
      break
  }

  return `
    <div onclick="betCoin('${item}')" class="${style_coins}">
      ${item}
    </div>
  `
})

bankdiv.innerHTML = content_coins.join('')

function betCoin (coin) {
  bet_amount_content.innerHTML = ""
  betCoinsplayerTwo.push(parseInt(coin))
  let total = betCoinsplayerTwo.reduce((a, b) => a + b, 5);
  console.log(total)
  bet_amount_content.innerHTML += `$ ${total}`
}

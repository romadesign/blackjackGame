import { savedatauser } from './localstorage.js'
import {
  content_cards_house,
  content_cards_player,
  result_house,
  result_player, //xd
  show_the_remaining_cards,
  ask_for_a_card,
  look_at_the_cards,
  play_again,
  bankdiv,
  bet_amount_content,
  bet_button,
  hide_content,
  bet_amount,
  modal_result,
  bank,
  coins,
  betCoinsplayerTwo,
} from './constants.js'
//ejecutando funcion creada en el archivo para localstorage
savedatauser()

let betCoinsplayer_house = ''
let numbersPlayerOne = []
let numbersPlayerTwo = []
let resultPlayerOne = ''
let resultPlayerTwo = ''
let showHouseFirstCard = false
let total = ''
//hide button bet
bet_button.style.display = 'none'

const suits = [
  { name: 'hearts', icon: `<i class="bi bi-suit-spade-fill"></i>` },
  {
    name: 'diamonds',
    icon: `<i class="bi bi-suit-diamond-fill text-danger"></i>`
  },
  {
    name: 'clubs',
    icon: `<i class="text-danger bi bi-suit-heart-fill"></i>`
  },
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
function getRandomCards (deck, numberOfCards) {
  if (numberOfCards == 2) {
    const randomIndex1 = Math.floor(Math.random() * deck.length)
    const randomIndex2 = Math.floor(Math.random() * deck.length)
    return [deck[randomIndex1], deck[randomIndex2]]
  } else if (numberOfCards == 1) {
    const randomCard = Math.floor(Math.random() * deck.length)
    return deck[randomCard]
  }
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

function modalResult (resultPlayerOne, resultPlayerTwo, message) {
  modal_result.innerHTML = `
    <div class="content_modal_you_lost">
      <div class="result_player_modal">
        <div>
          <div>Home</div>
          <h4>Total: ${resultPlayerOne}</h4>
        </div>
      </div>
      <div>
        <h6>${message}</h6> 
      </div>
      <div class="result_player_modal">
        <div>
          <div>Player two</div>
          <h4>Total: ${resultPlayerTwo}</h4>
        </div>
      </div>
    </div>
  `
}

function start_Game () {
  showCards()
  /////////Player One ///////
  //house player settings
  const numberOfCards = 2
  numbersPlayerOne = getRandomCards(deck, numberOfCards)
  //eliminando las cartas que ya son de la casa
  deck = deck.filter(card => !numbersPlayerOne.includes(card))

  //sumando para obtener la cantidad de puntos player one
  resultPlayerOne = totalPoints(numbersPlayerOne)

  validationCards(resultPlayerOne, numbersPlayerOne, result_house)

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

  ////////////Player two ////////////////////
  //player cards settings
  numbersPlayerTwo = getRandomCards(deck, numberOfCards)

  //eliminando las cartas que ya son del player
  deck = deck.filter(card => !numbersPlayerTwo.includes(card))

  //sum count point player two
  resultPlayerTwo = totalPoints(numbersPlayerTwo)

  validationCards(resultPlayerTwo, numbersPlayerTwo, result_player)

  showingCards(numbersPlayerTwo, content_cards_player)
}

function showCards () {
  const remainingCardsRamdon = deck.sort(function () {
    return Math.random() - 0.5
  })

  const remainingCards = remainingCardsRamdon.map(item => {
    const shouldFlip = false
    const cardElement = document.createElement('div')
    cardElement.setAttribute('id', item.id)
    cardElement.classList.add('cards', shouldFlip == false ? 'flip' : '')

    const numberOneElement = document.createElement('span')
    numberOneElement.classList.add('cards_number_one')
    numberOneElement.innerHTML = item.rank

    const iconElement = document.createElement('span')
    iconElement.classList.add('icons', shouldFlip != true ? 'data' : '')
    iconElement.innerHTML = item.icon

    const numberTwoElement = document.createElement('span')
    numberTwoElement.classList.add('cards_number_two')
    numberTwoElement.innerHTML = item.rank

    cardElement.appendChild(numberOneElement)
    cardElement.appendChild(iconElement)
    cardElement.appendChild(numberTwoElement)

    cardElement.addEventListener('click', () => {
      showSelectedCard(item.id)
    })

    const containerElement = document.createElement('div')
    containerElement.classList.add('cards-container')
    containerElement.appendChild(cardElement)

    return containerElement
  })

  show_the_remaining_cards.innerHTML = ''
  remainingCards.forEach(container => {
    show_the_remaining_cards.appendChild(container)
  })
}

const showSelectedCard = card_id => {
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

  if (resultPlayerTwo > 21) {
    showingCards(numbersPlayerOne, content_cards_house)
    const message = 'The house wins :8'
    modalResult(resultPlayerOne, resultPlayerTwo, message)
    ask_for_a_card.style.display = 'none'
    look_at_the_cards.style.display = 'none'
    bet_amount.innerHTML = ''
  }

  // updated cards player two
  showingCards(numbersPlayerTwo, content_cards_player)
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

  const betCoinElement = document.createElement('div')
  betCoinElement.classList.add(style_coins)
  betCoinElement.innerText = item

  betCoinElement.addEventListener('click', () => {
    betCoin(item)
  })

  return betCoinElement
})

bankdiv.append(...content_coins)

function betCoin (coin) {
  //show button bet
  bet_button.style.display = 'block'

  bet_amount_content.innerHTML = ''
  betCoinsplayerTwo.push(parseInt(coin))
  total = betCoinsplayerTwo.reduce((a, b) => a + b, 0)
  betCoinsplayer_house = total
  bet_amount_content.innerHTML += `$ ${total}`
}

function betAmount () {
  const total_bet_players = total + betCoinsplayer_house
  bet_amount.innerHTML = `
    <div>
      <div class="total_text">
        TOTAL BET
      </div>
      <div class="total">
        $ ${total_bet_players}
      </div>
    </div>
  `
}

bet_button.addEventListener('click', () => {
  betAmount()
  bankdiv.style.display = 'none'
  hide_content.style.display = 'inline-flex'
  start_Game()
})

look_at_the_cards.addEventListener('click', () => {
  ask_for_a_card.style.display = 'none'
  look_at_the_cards.style.display = 'none'
  play_again.style.display = 'block'
  showingCards(numbersPlayerOne, content_cards_house)

  //traer automaticamente una carta del array barajas
  if (resultPlayerOne < resultPlayerTwo) {
    const numberOfCards = 1
    const newCard = getRandomCards(deck, numberOfCards)

    // Agregar la carta al azar a numbersPlayerOne
    numbersPlayerOne.push(newCard)
    resultPlayerOne = totalPoints(numbersPlayerOne) //sumando todas las cartas
    console.log(resultPlayerOne)
    validationCards(resultPlayerOne, numbersPlayerOne, result_house)

    //Mostrando todas las cartas
    const cardsPlayerOne = numbersPlayerOne.map((item, index) => {
      const shouldFlip =
        showHouseFirstCard && index === 0 && resultPlayerOne < 21
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

    if (resultPlayerOne > resultPlayerTwo) {
      if (resultPlayerOne >= 22) {
        const message = 'gano player 2'
        modalResult(resultPlayerOne, resultPlayerTwo, message)
      } else {
        const message = 'gano la casa '
        modalResult(resultPlayerOne, resultPlayerTwo, message)
      }
    } else {
      const message = 'You win :('
      modalResult(resultPlayerOne, resultPlayerTwo, message)
    }
  } else if (resultPlayerOne == resultPlayerTwo) {
    const message = 'You win xD'
    modalResult(resultPlayerOne, resultPlayerTwo, message)
  } else {
    const message = 'The house wins :3'
    modalResult(resultPlayerOne, resultPlayerTwo, message)
  }
})

ask_for_a_card.addEventListener('click', () => {
  show_the_remaining_cards.style.display = 'block'
})

play_again.addEventListener('click', () => {
  window.location.reload()
})

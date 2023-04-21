import { getLocalStorageData } from './localstorage.js'

export const content_cards_house = document.getElementById('content_cards_house')
export const content_cards_player = document.getElementById('content_cards_player')
export const result_house = document.getElementById('result_house')
export const result_player = document.getElementById('result_player')
export const show_the_remaining_cards = document.getElementById('show_the_remaining_cards')
export const ask_for_a_card = document.getElementById('ask_for_a_card')
export const look_at_the_cards = document.getElementById('look_at_the_cards')
export const play_again = document.getElementById('play_again')
export const bankdiv = document.getElementById('coins')
export const coinContainer = document.getElementById('coin-container')
export const bet_amount_content = document.getElementById('bet_amount_content')
export const bet_button = document.getElementById('bet_button')
export const hide_content = document.getElementById('hide_content')
export const bet_amount = document.getElementById('bet_amounts')
export const modal_result = document.getElementById('modal_you_lost')
export const create_user= document.getElementById('create_user')

//form create user
export const createBtn = document.getElementById('create_user_btn');
export const usernameInput = document.getElementById('username');
export const my_coins_div = document.getElementById('my_coins');
export const profile = "https://depor.com/resizer/pfVziOV4X8Vu9nwknDc-oNItlB8=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/6Y2EDIISGFGVFANEVDCR5LCG34.jpg"

export let bank = 1000
export let coins = [5, 10, 20, 50, 100, 200]
export let betCoinsplayerTwo = []
export const getMyCoinsTotal = getLocalStorageData('coins_user')
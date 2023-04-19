import { createBtn, usernameInput, getMyCoinsTotal } from './constants.js'

export const savedatauser = () => {
  createBtn.addEventListener('click', () => {
    const username = usernameInput.value
    console.log(username)
    // aquí puedes hacer lo que quieras con el valor capturado del input
    saveDataToLocalStorage('username', username)
    saveDataToLocalStorage('coins_user', 2500)
    console.log(getMyCoinsTotal)
  })
}

export function saveDataToLocalStorage (key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}


export function getLocalStorageData(key) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
}
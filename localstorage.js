import { createBtn, usernameInput, getMyCoinsTotal } from './constants.js'

export const savedatauser = () => {
  createBtn.addEventListener('click', () => {
    location.reload()
    const username = usernameInput.value
    saveDataToLocalStorage('username', username)
    saveDataToLocalStorage('coins_user', 2500)
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
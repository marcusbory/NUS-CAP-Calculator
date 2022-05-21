// const { createCard } = require('./factory.js')
import { createCard, calculateCAP, calculateMC } from './factory.js'

let idCounter = 1

const addEvent = () => {
  createCard(idCounter)
  idCounter++
}

const handleSubmit = (e) => {
  e.preventDefault()
  calculateCAP()
  calculateMC()
}

document.getElementById("add-entry").addEventListener("click", addEvent)

document.getElementById("entries").addEventListener("submit", (e) => handleSubmit(e))


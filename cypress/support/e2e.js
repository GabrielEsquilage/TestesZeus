import './commands'
import './utils'

beforeEach(() => {

})


Cypress.on('uncaught:exception', (err, runnable) => {
  console.log('Exceção capturada:', err.message)
  return false
})
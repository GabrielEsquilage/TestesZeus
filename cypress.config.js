const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'h7dove',
  e2e: {
    baseUrl: 'https://dev.erp.inovacarreira.com.br',
        experimentalSessionAndOrigin: true,
    
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    defaultCommandTimeout: 10000,
    
    pageLoadTimeout: 60000,
    
    video: true,
    videosFolder: 'cypress/videos',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    chromeWebSecurity: false,
    
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: false,
      json: true,
    },
  },
  
  env: {
    loginUrl: 'https://dev.erp.inovacarreira.com.br/login',
    cadastroCursoUrl: 'https://erp.fatecie.edu.br/v2/academico/cursos/criacao',
    username: 'admin',
    password: '7Y/6p0p\\iYd{'
  }
})


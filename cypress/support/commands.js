
Cypress.Commands.add('login', () => {
  cy.visit('https://dev.erp.inovacarreira.com.br/login')
  cy.get('#login-input', { timeout: 5000 }).type('admin')
  cy.get('#password-input').type('7Y/6p0p\\iYd{')
  cy.get('button[type="submit"]').click()
  cy.url({ timeout: 5000 }).should('include', '/dashboard')
})

Cypress.Commands.add('loginprod', () => {
  cy.visit('https://erp.fatecie.edu.br/login')
  cy.get('#login-input', { timeout: 5000 }).type('admin')
  cy.get('#password-input').type('7Y/6p0p\\iYd{')
  cy.get('button[type="submit"]').click()
  cy.url({ timeout: 5000 }).should('include', '/dashboard')
})

Cypress.Commands.add('fillByLabel', (labelText, value) => {
  cy.contains(labelText).parent().find('input, textarea').clear().type(value)
})

Cypress.Commands.add('selectByLabel', (labelText, option) => {
  cy.contains(labelText).parent().find('select').select(option)
})


Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible').should('not.be.disabled')
})

Cypress.Commands.add('clearAndType', (selector, value) => {
  cy.get(selector).clear().type(value)
})


Cypress.Commands.add('clickCustomDropdown', (triggerText, optionText) => {
  cy.contains(triggerText).click()
  cy.contains(optionText).click()
})


Cypress.Commands.add('selecionarOpcaoAleatoria', (labelTexto) => {
  cy.log(`Selecionando opção aleatória em: ${labelTexto}`)
  
  cy.contains(labelTexto)
    .scrollIntoView()
    .should('be.visible')
    .wait(300)
  
  cy.contains(labelTexto)
    .parent()
    .find('input, button, [role="combobox"]')
    .first()
    .click({ force: true })
    .wait(500)
  
  cy.wait(1000)
  
  cy.get('body').then($body => {
    let $options = $body.find('div[class*="cursor-pointer"][class*="rounded-lg"]:visible')
    
    if ($options.length === 0) {
      $options = $body.find('[role="option"]:visible')
    }
    
    if ($options.length === 0) {
      $options = $body.find('[role="dialog"]:visible div.cursor-pointer')
    }
    
    if ($options.length === 0) {
      $options = $body.find('div[class*="hover:bg-gray-100"]:visible')
    }
    
    if ($options.length === 0) {
      $options = $body.find('ul:visible li:visible')
    }
    
    if ($options.length > 0) {
      const validOptions = $options.filter((index, el) => {
        const text = Cypress.$(el).text().trim()
        return text.length > 0 && !text.includes('undefined')
      })
      
      if (validOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * validOptions.length)
        const selectedText = Cypress.$(validOptions[randomIndex]).text().trim()
        
        cy.log(` Encontradas ${validOptions.length} opções`)
        cy.log(` Selecionando: "${selectedText}" (opção ${randomIndex + 1})`)
        
        cy.wrap(validOptions[randomIndex])
          .scrollIntoView()
          .click({ force: true })
          .wait(500)
        
        cy.contains(labelTexto)
          .parent()
          .should('contain', selectedText)
          .then(() => {
            cy.log(`Opção "${selectedText}" selecionada com sucesso!`)
          })
      } else {
        cy.log('Nenhuma opção válida encontrada após filtrar')
        throw new Error(`Nenhuma opção válida encontrada para: ${labelTexto}`)
      }
    } else {
      cy.log('Nenhuma opção encontrada no dropdown')
      throw new Error(`Dropdown não abriu ou não há opções para: ${labelTexto}`)
    }
  })
  
  cy.wait(500)
})


Cypress.Commands.add('selecionarOpcaoAleatoriaDireto', (labelTexto) => {
  cy.log(`Selecionando opção (método direto) em: ${labelTexto}`)
  
  cy.contains(labelTexto)
    .scrollIntoView()
    .parent()
    .find('input, button, [role="combobox"]')
    .first()
    .click({ force: true })
  
  cy.wait(1000)
  
  cy.get('[role="dialog"]:visible')
    .find('div.cursor-pointer')
    .should('have.length.greaterThan', 0)
    .then($options => {
      const randomIndex = Math.floor(Math.random() * $options.length)
      const selectedText = $options.eq(randomIndex).text().trim()
      
      cy.log(`Selecionando: "${selectedText}"`) 
      cy.wrap($options.eq(randomIndex)).click({ force: true })
    })
  
  cy.wait(500)
})

Cypress.Commands.add('selecionarOpcaoAleatoriaDiretoOption', (labelTexto) => {
  cy.log(`Selecionando opção (método direto) em: ${labelTexto}`)
  
  cy.contains(labelTexto)
    .scrollIntoView()
    .parent()
    .find('div, input, button, [role="option"]')
    .first()
    .click({ force: true })
  
  cy.wait(1000)
  
  cy.get('[role="dialog"]:visible')
    .find('div.cursor-pointer')
    .should('have.length.greaterThan', 0)
    .then($options => {
      const randomIndex = Math.floor(Math.random() * $options.length)
      const selectedText = $options.eq(randomIndex).text().trim()
      
      cy.log(`Selecionando: "${selectedText}"`) 
      cy.wrap($options.eq(randomIndex)).click({ force: true })
    })
  
  cy.wait(500)
})

Cypress.Commands.add('logToTerminal', (message) => {
  cy.task('log', message)
})

Cypress.Commands.add('preencherFormularioDisciplina', (dados = {}) => {
  cy.contains('span', 'Selecione a Forma da Disciplina').click()
  cy.contains('div', dados.forma || 'Eletiva').click()

  cy.contains('span', 'Tipo da Disciplina').click()
  cy.contains('div', dados.tipo || 'Padrão').click()

  cy.contains('span', 'Série').click()
  cy.contains('div', dados.serie || 'Série 1').click()

  cy.contains('Total de Créditos').scrollIntoView().parent()
      .find('input, textarea').clear().type(dados.creditos || '100')

  cy.contains('Nota Mínima para Aprovação (%)').scrollIntoView().parent()
      .find('input, textarea').clear().type(dados.notaMinima || '7')

  cy.contains('span', 'Tipo da Nota').click()
  cy.contains('div', dados.tipoNota || 'Média').click()

  cy.contains('Valor da Disciplina').scrollIntoView().parent()
      .find('input, textarea').clear().type(dados.valor || '5000')

  cy.contains('Observação').scrollIntoView().parent()
      .find('input, textarea').clear().type(dados.obs || 'TESTE AUTOMATIZADO')

  cy.contains('Falta Diária?').closest('div')
      .contains('p', dados.faltaDiaria || 'Sim').click()

  cy.contains('Nota?').closest('div')
      .contains('p', dados.temNota || 'Sim').click()
  
  
  cy.get('body').then(($body) => {
    const chevron = $body.find('svg.lucide-chevron-right');
    
    if (chevron.length > 0 && chevron.closest('button').is(':enabled')) {
      cy.wrap(chevron).closest('button').click();
    } else {
      cy.contains('button', 'Avançar').scrollIntoView().click({ force: true });
    }
  });
})

Cypress.Commands.add('preencherFormularioDisciplinaAlterado', (dados = {}) => {
  cy.contains('label', 'Forma da Oferta').click()
  cy.contains('div', dados.forma || 'Eletiva').click()

  cy.contains('Valor da Disciplina').scrollIntoView().parent()
      .find('input, textarea').clear().type(dados.valor || '5000')

  cy.contains('Observação').scrollIntoView().parent()
      .find('input, textarea').clear().type(dados.obs || 'TESTE AUTOMATIZADO')

  cy.contains('Falta Diária?').closest('div')
      .contains('p', dados.faltaDiaria || 'Não').click()

  cy.contains('Nota?').closest('div')
      .contains('p', dados.temNota || 'Não').click()
  
  
  cy.get('body').then(($body) => {
    const chevron = $body.find('svg.lucide-chevron-right');
    
    if (chevron.length > 0 && chevron.closest('button').is(':enabled')) {
      cy.wrap(chevron).closest('button').click();
    } else {
      cy.contains('button', 'Avançar').scrollIntoView().click({ force: true });
    }
  });
})
describe('Valida LP Pós-Graduação', () => {
    let sharedCpf;
    let sharedEmail;
    let sharedName;

    it('Deve fazer o cadastro completo', () => {

        cy.visit('https://matriculapos.dev.fatecie.edu.br/inscription')

        cy.generateRandomName().then(nome => {
            sharedName = nome;
            cy.logToTerminal(`Nome gerado e salvo: ${nome}`)
            cy.contains('Nome Completo').scrollIntoView().parent()
                .find('input, textarea').clear().type(nome)
        })

        cy.generateValidCpf().then(cpf => {
            sharedCpf = cpf;
            cy.logToTerminal(`CPF gerado e salvo: ${cpf}`)
            cy.contains('CPF').scrollIntoView().parent()
                .find('input, textarea').clear().type(cpf)
        })

        cy.contains('Telefone').scrollIntoView().parent()
            .find('input, textarea').clear().type('44444444444')

        cy.generateRandomName().then(nome => {
            cy.contains('Nome Social').scrollIntoView().parent()
                .find('input, textarea').clear().type(nome)
        })

        cy.contains('Data de Nascimento ').scrollIntoView().parent()
            .find('input').clear().type('2000-01-01')

        cy.generateEmail().then(email => {
            sharedEmail = email;
            cy.logToTerminal(`Email gerado e salvo: ${email}`)
            cy.contains('E-mail').scrollIntoView().parent()
                .find('input, textarea').clear().type(email)
        })

        cy.contains('button', 'Próximo').scrollIntoView().click()


        cy.contains('Digite seu CEP').scrollIntoView().parent()
            .find('input, textarea').clear().type('87020-015')
        cy.wait(1000)

        cy.contains('Número').scrollIntoView().parent()
            .find('input, textarea').clear().type('000')

        cy.contains('Button', 'Próximo').scrollIntoView().click()

        cy.get('button[role="combobox"]')
          .contains('Selecione um curso')
          .click();
        cy.contains('ESPECIALIZAÇÃO EM ARQUITETURA E URBANISMO 123')
          .should('be.visible')
          .click();

        cy.selecionarOpcaoAleatoriaDireto('Estado')
        cy.selecionarOpcaoAleatoriaDireto('Cidade')
        cy.selecionarOpcaoAleatoriaDireto('Qual polo prefere estudar?')
        cy.selecionarOpcaoAleatoriaDireto('Planos de Pagamento')
        cy.selecionarOpcaoAleatoriaDireto('Dia de vencimento das mensalidades')
        cy.contains('label', 'Pix').click()
        cy.contains('Possui cupom de desconto?').scrollIntoView().parent()
            .find('input, textarea').clear().type('bolsa100')

        cy.get('[role="checkbox"][data-slot="checkbox"]').eq(0).click();
        cy.get('[role="checkbox"][data-slot="checkbox"]').eq(1).click();

        cy.wait(6000)
        cy.contains('Button', 'Enviar').scrollIntoView().click()
        cy.wait(6000)
        

    })

    it('Deve retornar erro no cadastro - email e cpf ja existem', () => { 

        cy.visit('https://matriculapos.dev.fatecie.edu.br/inscription')

        cy.logToTerminal(`Usando Nome salvo: ${sharedName}`)
        cy.contains('Nome Completo').scrollIntoView().parent()
            .find('input, textarea').clear().type(sharedName)

        cy.logToTerminal(`Usando Nome salvo: ${sharedCpf}`)    
        cy.contains('CPF').scrollIntoView().parent()
            .find('input, textarea').clear().type(sharedCpf)

        cy.contains('Telefone').scrollIntoView().parent()
            .find('input, textarea').clear().type('44444444444')

        cy.generateRandomName().then(nome => {
            cy.contains('Nome Social').scrollIntoView().parent()
                .find('input, textarea').clear().type(nome)
        })

        cy.contains('Data de Nascimento ').scrollIntoView().parent()
            .find('input').clear().type('2000-01-01')

        cy.logToTerminal(`Usando Email salvo: ${sharedEmail}`)
        cy.contains('E-mail').scrollIntoView().parent()
            .find('input, textarea').clear().type(sharedEmail)

        cy.contains('button', 'Próximo').scrollIntoView().click()


        cy.contains('Digite seu CEP').scrollIntoView().parent()
            .find('input, textarea').clear().type('87080-400')
        cy.wait(6000)

        cy.contains('Número').scrollIntoView().parent()
            .find('input, textarea').clear().type('000')

        cy.contains('Button', 'Próximo').scrollIntoView().click()

        cy.get('button[role="combobox"]')
          .contains('Selecione um curso')
          .click();
        cy.contains('ESPECIALIZAÇÃO EM ARQUITETURA E URBANISMO 123')
          .should('be.visible')
          .click();

        cy.selecionarOpcaoAleatoriaDireto('Estado')
        cy.selecionarOpcaoAleatoriaDireto('Cidade')
        cy.selecionarOpcaoAleatoriaDireto('Qual polo prefere estudar?')
        cy.selecionarOpcaoAleatoriaDireto('Planos de Pagamento')
        cy.selecionarOpcaoAleatoriaDireto('Dia de vencimento das mensalidades')
        cy.contains('label', 'Pix').click()
        cy.contains('Possui cupom de desconto?').scrollIntoView().parent()
            .find('input, textarea').clear().type('bolsa100')

        cy.get('[role="checkbox"][data-slot="checkbox"]').eq(0).click();
        cy.get('[role="checkbox"][data-slot="checkbox"]').eq(1).click();

        cy.wait(6000)
        cy.contains('Button', 'Enviar').scrollIntoView().click()
        cy.wait(6000)


    })
})
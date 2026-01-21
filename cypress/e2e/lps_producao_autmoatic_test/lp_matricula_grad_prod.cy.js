describe('[PROD] Valida LP Graduação', () => {
    let sharedCpf;
    let sharedEmail;
    let sharedName;


    it('Deve fazer o cadastro completo - cupom 100%', () => {

        cy.visit('https://lp-polo-dev.inovacarreira.com.br/inscription')

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

        cy.contains('button', 'Avançar').scrollIntoView().click()

        cy.contains('Digite seu CEP').scrollIntoView().parent()
            .find('input, textarea').clear().type('87020-015')

        cy.wait(1000)

        cy.contains('Número').scrollIntoView().parent()
            .find('input, textarea').clear().type('000')

        cy.contains('Button', 'Avançar').scrollIntoView().click()

        
        cy.get('button[role="combobox"]')
            .contains('Selecione um curso')
            .click();

        cy.contains('BACHARELADO EM ARQUITETURA E URBANISMO')
            .should('be.visible')
            .click();

        cy.selecionarOpcaoAleatoriaDireto('Planos de Pagamento')

        //cy.selecionarOpcaoAleatoriaDireto('Estado')
        //cy.selecionarOpcaoAleatoriaDireto('Cidade')
        //cy.selecionarOpcaoAleatoriaDireto('Qual polo prefere estudar?')
        //cy.selecionarOpcaoAleatoriaDireto('Planos de Pagamento')
        cy.selecionarOpcaoAleatoriaDireto('Dia de vencimento das mensalidades')

        //cy.contains('label', 'Pix').click()

        cy.contains('Cupom').scrollIntoView().parent()
            .find('input, textarea').clear().type('bolsa100')

        cy.get('[role="checkbox"][data-slot="checkbox"]').eq(0).click()
        cy.get('[role="checkbox"][data-slot="checkbox"]').eq(1).click()

        cy.contains('p', 'Cupom aplicado com sucesso!')
            .should('be.visible')

        //cy.contains('Button', 'Enviar').scrollIntoView().click()

        //cy.contains('button', 'Fechar', { timeout: 60000 })
        //    .should('be.visible')
        //    .and('be.enabled')
    })

    it('Deve fazer o cadastro completo - Sem Cupom - PIX', () => {

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

        cy.get('[role="checkbox"][data-slot="checkbox"]').eq(0).click()
        cy.get('[role="checkbox"][data-slot="checkbox"]').eq(1).click()

        cy.contains('Button', 'Enviar').scrollIntoView().click()

        cy.contains('button', 'Fechar', { timeout: 60000 })
            .should('be.visible')
            .and('be.enabled')
    })

    it('Deve fazer o cadastro completo - Sem Cupom - cartão de crédito', () => {

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

        cy.contains('label', 'Cartão de Crédito').click()

        cy.get('[role="checkbox"][data-slot="checkbox"]').eq(0).click()
        cy.get('[role="checkbox"][data-slot="checkbox"]').eq(1).click()

        cy.contains('Número do cartão').scrollIntoView().parent()
            .find('input').clear().type('4000000000000010')

        cy.contains('Nome que está no cartão').scrollIntoView().parent()
            .find('input').clear().type('TESTE TESTE')

        cy.contains('Mês de Vencimento ').scrollIntoView().parent()
            .find('input').clear().type('10')

        cy.contains('Ano de Vencimento').scrollIntoView().parent()
            .find('input').clear().type('2029')

        cy.contains('CVV').scrollIntoView().parent()
            .find('input').clear().type('129')

        cy.wait(1500)

        cy.contains('Button', 'Enviar').scrollIntoView().click()

        cy.contains('button', 'Fechar', { timeout: 60000 })
            .should('be.visible')
            .and('be.enabled')
    })

    it('Deve retornar erro no cadastro - teste com mesmos dados de Nome, Email, CPF, Curso', () => {

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

        cy.get('[role="checkbox"][data-slot="checkbox"]').eq(0).click()
        cy.get('[role="checkbox"][data-slot="checkbox"]').eq(1).click()

        cy.wait(6000)

        cy.contains('Button', 'Enviar').scrollIntoView().click()

        cy.wait(1500)

        cy.contains('button', 'Fechar', { timeout: 60000 })
            .should('be.visible')
            .and('be.enabled')
            .click()
    })

    it('Deve retornar erro ao passar step 1 para 2, sem preenchimento', () => {

        cy.visit('https://matriculapos.dev.fatecie.edu.br/inscription')

        cy.contains('button', 'Próximo').scrollIntoView().click()

        cy.get('span.text-red-500')
            .then($spans => {
                const textos = [...$spans].map(s => s.innerText.trim())
                expect(textos).to.include.members([
                    'Campo Obrigatório',
                    'E-mail inválido',
                    'Por Favor, selecione uma data'
                ])
            })
    })
})

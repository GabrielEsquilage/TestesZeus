describe('Cadastro de Pessoa', () => {

    let sharedName;
    let sharedNameSocial;
    let sharedCpf
    let sharedEmail


    it('Deve fazer o cadastro completo', () => {
        cy.loginprod('admin', '7Y/6p0p\\iYd{');
        cy.wait(2500)
        cy.visit('https://erp.fatecie.edu.br/v2/controle-de-acesso/pessoas/criacao')
        cy.generateRandomName().then(nome => {
            sharedName = nome;
            cy.logToTerminal(`Nome gerado e salvo: ${nome}`)
            cy.contains('Nome Completo').scrollIntoView().parent()
                .find('input, textarea').clear().type(nome)
        })

        cy.generateRandomName().then(social => {
            sharedNameSocial = social;
            cy.logToTerminal(`Nome gerado e salvo: ${social}`)
            cy.contains('Nome Social').scrollIntoView().parent()
                .find('input, textarea').clear().type(social)
        })

        cy.contains('span', 'Selecione a raça...').click()
        cy.contains('div', 'Parda').click()

        cy.contains('span', 'Selecione o gênero...').click()
        cy.contains('div', 'Masculino').click()

        cy.contains('Data de Nascimento')
            .scrollIntoView()
            .parent()
            .find('input')
            .clear()
            .type('01/01/2000{enter}');

        cy.generateValidCpf().then(cpf => {
            sharedCpf = cpf;
            cy.logToTerminal(`CPF gerado e salvo: ${cpf}`);
            
            cy.get('input[name="documentos.0.numero"]')
                .scrollIntoView()
                .clear()
                .type(cpf);
        });

        cy.contains('button', 'Avançar').click()
        
        //step2

        cy.contains('CEP').scrollIntoView().parent()
            .find('input, textarea').clear().type('87020-015')

        
        cy.contains('Número').scrollIntoView().parent().click()
            .find('input, textarea').clear().type('855')
        cy.wait(1000)

        cy.contains('button', 'Avançar').scrollIntoView().click()

        cy.wait(1000)

        cy.contains('span', 'E-mail de Usuário')
        cy.contains('span','Telefone')

        cy.generateEmail().then(email => {
            sharedEmail = email;
            cy.logToTerminal(`Email gerado e salvo: ${email}`)
            cy.get('input[name="contatos.0.valor"]').type(email)
        })
        
        cy.get('[name="contatos.1.valor"]').type('(44)991366353')
        
        cy.contains('button', 'Avançar').click()

        //step valitaton

        cy.then(() => {
            cy.contains('p', 'Nome Completo')
                .parent()
                .find('.truncate')
                .should('have.text', sharedName);
            cy.logToTerminal(`Nome validado com sucesso!: ${sharedName}`)

            cy.contains('p', 'Nome Social')
                .parent()
                .find('.truncate')
                .should('have.text', sharedNameSocial);
            cy.logToTerminal(`Nome Social Validado com Sucesso!: ${sharedNameSocial}`)

            cy.contains('p', 'CPF')
                .parent()
                .find('div, span')
                .should('contain', sharedCpf);
            cy.logToTerminal(`CPF Validado com Sucesso!: ${sharedCpf}`)

            cy.contains('p', 'Email_usuario')
                .parent()
                .find('button')
                .should('have.text', sharedEmail);
            cy.logToTerminal(`E-mail Validado com Sucesso!: ${sharedEmail}`)
        });

        cy.contains('button', 'Concluir').click()

    })

    it('Deve editar e cancelar a edição', () => {
        cy.loginprod('admin', '7Y/6p0p\\iYd{');
        cy.wait(2500)
        cy.visit('https://erp.fatecie.edu.br/v2/controle-de-acesso/pessoas/listagem')
        
        cy.then(() => {
            cy.get('input[placeholder="Pesquisar..."]')
                .scrollIntoView()
                .clear()
                .type(sharedName)
        })

        cy.wait(1500)

        cy.contains('div', sharedName).click()

        cy.contains('button', 'Editar Dados').click()
        cy.wait(1500)

        cy.generateRandomName().then(social => {
            sharedNameSocial = social;
            cy.logToTerminal(`Nome gerado e salvo: ${social}`)
            cy.contains('Nome Social').scrollIntoView().parent()
                .find('input, textarea').clear().type(social)
        })

        cy.contains('button', 'Avançar').click()
        cy.contains('button', 'Avançar').click()
        cy.contains('button', 'Avançar').click()

        cy.contains('button', 'Cancelar operação').click()
        cy.wait(1000)
        cy.contains('button', 'Descartar dados').click()


    })

    it('Deve editar e concluir a edição', () => {
        cy.loginprod('admin', '7Y/6p0p\\iYd{');
        cy.wait(2500)
        cy.visit('https://erp.fatecie.edu.br/v2/controle-de-acesso/pessoas/listagem')
        
        cy.then(() => {
            cy.get('input[placeholder="Pesquisar..."]')
                .scrollIntoView()
                .clear()
                .type(sharedName)
        })

        cy.wait(1500)

        cy.contains('div', sharedName).click()

        cy.contains('button', 'Editar Dados').click()
        cy.wait(1500)

        cy.generateValidCpf().then(cpf => {
            sharedCpf = cpf;
            cy.logToTerminal(`CPF gerado e salvo: ${cpf}`);
            
            cy.get('input[name="documentos.0.numero"]')
                .scrollIntoView()
                .clear()
                .type(cpf);
        });

        cy.contains('button', 'Avançar').click()
        cy.contains('button', 'Avançar').click()
        cy.contains('button', 'Avançar').click()

        cy.contains('button', 'Concluir').click()


    })

    it('Deve excluir e concluir a edição', () => {
        cy.loginprod('admin', '7Y/6p0p\\iYd{');
        cy.wait(2500);
        cy.visit('https://erp.fatecie.edu.br/v2/controle-de-acesso/pessoas/listagem');
    
        cy.then(() => {
            cy.get('input[placeholder="Pesquisar..."]')
                .scrollIntoView()
                .clear()
                .type(sharedName);  
        });

        cy.contains('div', sharedName).click({ force: true });

        cy.contains('button', 'Excluir Dados').click({ force: true });

        cy.get('div.flex-col-reverse').find('button').contains('Excluir').click({ force: true });

        cy.wait(5000)

        cy.visit('https://erp.fatecie.edu.br/v2/controle-de-acesso/pessoas/listagem')
        
        cy.then(() => {
            cy.get('input[placeholder="Pesquisar..."]')
                .scrollIntoView()
                .clear()
                .type(sharedName);  
        });



    });
})

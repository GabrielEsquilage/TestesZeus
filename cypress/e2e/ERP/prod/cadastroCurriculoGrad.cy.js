describe('[PROD] Cadastro de Curriculo de Graduação', () => {


    it('Deve fazer o cadastro completo', () => {
        cy.loginprod('admin', '7Y/6p0p\\iYd{');
        cy.wait(2500)
        cy.visit('https://erp.fatecie.edu.br/v2/academico/curriculos/criacao')

        cy.contains('Nome do Currículo').scrollIntoView().parent()
            .find('input, textarea').clear().type("CURRICULO TESTE GRADUAÇÃO")

        cy.contains('Código do Currículo').scrollIntoView().parent()
            .find('input, textarea').clear().type("CTG")

        cy.contains('span', 'Selecione um nivel de ensino').click()
        cy.contains('div', 'Graduação').click()

        cy.contains('span', 'Selecione um módulo').click()
        cy.contains('div', 'Módulo 1').click()

        cy.contains('span', 'Selecione um curso').click()
        cy.contains('div', '2a GRADUACAO - BACHARELADO EM CIÊNCIAS CONTÁBEIS').click()

        cy.contains('Valor total do Currículo').scrollIntoView().parent()
            .find('input, textarea').clear().type('100000')

        cy.contains('Horas Atividade Complementares ').scrollIntoView().parent()
            .find('input, textarea').clear().type('1000')

        cy.contains('Horas Atividades de Extensão').scrollIntoView().parent()
            .find('input, textarea').clear().type('1000')

        cy.contains('Observação').scrollIntoView().parent()
            .find('input, textarea').clear().type('TESTE AUTOMATIZADO')

        cy.contains('button', 'Avançar').click()
        cy.wait(500)

        //---

        cy.contains('div', 'ACESSIBILIDADE, METODOLOGIAS ATIVAS E ASSISTIVAS').click()

        cy.contains('div', 'ADMINISTRAÇÃO DA PRODUÇÃO').click()

        cy.contains('div', 'ADMINISTRAÇÃO DE COMÉRCIO EXTERIOR').click()

        cy.contains('button', 'Avançar').click()
        cy.wait(500)

        //---

        cy.preencherFormularioDisciplina();
        cy.preencherFormularioDisciplina();
        cy.preencherFormularioDisciplina();

        //-----

        cy.contains('button', 'Avançar').click()

        cy.contains('div', 'Pós - Geral 1').click()

        cy.contains('button', 'Avançar').click()

        //---

        cy.contains('button', 'Concluir').click()

    })

    it('Deve Editar Cadastro de Curriculo Sem Alteração', () => {
        cy.loginprod('admin', '7Y/6p0p\\iYd{');
        cy.wait(2500)
        cy.visit('https://erp.fatecie.edu.br/v2/academico/curriculos/listagem')

        cy.then(() => {
            cy.get('input[placeholder="Pesquisar..."]')
                .scrollIntoView()
                .clear()
                .type('CURRICULO TESTE GRADUAÇÃO')
        })
        cy.contains('div', 'CURRICULO TESTE GRADUAÇÃO').click()

        cy.contains('button', 'Editar Dados').click()

        cy.contains('button', 'Avançar').click()
        cy.wait(1000)
        cy.contains('button', 'Avançar').click()
        cy.wait(1000)
        cy.contains('button', 'Avançar').click()
        cy.wait(1000)
        cy.contains('button', 'Avançar').click()
        cy.wait(1000)
        cy.contains('button', 'Concluir').click()

    })

    it('Deve Cancelar Edição Cadastro de Curriculo', () => {
        cy.loginprod('admin', '7Y/6p0p\\iYd{');
        cy.wait(2500)
        cy.visit('https://erp.fatecie.edu.br/v2/academico/curriculos/listagem')

        cy.then(() => {
            cy.get('input[placeholder="Pesquisar..."]')
                .scrollIntoView()
                .clear()
                .type('CURRICULO TESTE GRADUAÇÃO')
        })
        cy.contains('div', 'CURRICULO TESTE GRADUAÇÃO').click()

        cy.contains('button', 'Editar Dados').click()

        cy.contains('button', 'Avançar').click()
        cy.wait(1000)
        cy.contains('button', 'Avançar').click()
        cy.wait(1000)
        cy.contains('button', 'Avançar').click()
        cy.wait(1000)
        cy.contains('button', 'Avançar').click()
        cy.wait(1000)
        cy.contains('button', 'Cancelar operação').click()

    })

    it('Deve Editar Cadastro de Curriculo com Alteração', () => {
        cy.loginprod('admin', '7Y/6p0p\\iYd{');
        cy.wait(2500)
        cy.visit('https://erp.fatecie.edu.br/v2/academico/curriculos/listagem')

        cy.then(() => {
            cy.get('input[placeholder="Pesquisar..."]')
                .scrollIntoView()
                .clear()
                .type('CURRICULO TESTE GRADUAÇÃO')
        })
        cy.contains('div', 'CURRICULO TESTE GRADUAÇÃO').click()

        cy.contains('button', 'Editar Dados').click()

        cy.wait(1500)

        cy.contains('Código do Currículo').scrollIntoView().parent()
            .find('input, textarea').clear().click()

        cy.contains('Código do Currículo').scrollIntoView().parent()
            .find('input, textarea').clear().type("TESTE")


        cy.contains('Nome do Currículo').scrollIntoView().parent()
            .find('input, textarea').clear().type("CURRICULO TESTE GRADUAÇÃO ALTERADO")

        cy.contains('button', 'Avançar').click()
        cy.wait(1000)

        cy.contains('button', 'Avançar').click()

        cy.preencherFormularioDisciplinaAlterado();

        cy.contains('button', 'Avançar').click()
        cy.wait(1000)
        cy.contains('button', 'Avançar').click()
        cy.wait(1000)
        cy.contains('button', 'Concluir').click()

    })

    it('Deve Excluir Cadastro de Curriculo', () => {
        cy.loginprod('admin', '7Y/6p0p\\iYd{');
        cy.wait(2500);
        cy.visit('https://erp.fatecie.edu.br/v2/academico/curriculos/listagem');

        cy.get('input[placeholder="Pesquisar..."]')
            .scrollIntoView()
            .clear()
            .type('CURRICULO TESTE GRADUAÇÃO');

        cy.contains('div', 'CURRICULO TESTE GRADUAÇÃO').click();

        cy.contains('button', 'Excluir Dados').click({ force: true });
        cy.get('div.flex-col-reverse').find('button').contains('Excluir').click({ force: true });

        cy.get('input[placeholder="Pesquisar..."]')
            .scrollIntoView()
            .clear()
            .type('CURRICULO TESTE GRADUAÇÃO');

        cy.contains('CURRICULO TESTE GRADUAÇÃO').should('not.exist');
    });
})

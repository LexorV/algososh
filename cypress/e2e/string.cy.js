describe('start string', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/recursion')
    })
    it('Проверка, что если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear()
        cy.get('button').should('be.disabled')
    })
    it('Проверка корекности разворачивании строки', () => {
        cy.get('input').type('123')
        cy.get('button').eq(1).click()
        cy.wait(1000)
        cy.get('[class*=circle_content]')
            .should('have.length', 3)
            .each((el, index) => {
                cy.wrap(el).contains(index + 1)
                cy.wrap(el).find('[class*=circle_default]')
            })
            cy.wait(1000)
        cy.get('[class*=circle_content]')
            .should('have.length', 3)
            .each((el, index) => {
                cy.wrap(el).contains(index + 1)
                if(index === 0 || index === 2) {
                    cy.wrap(el).find('[class*=circle_changing]')
                }
                if(index === 1) {
                    cy.wrap(el).find('[class*=circle_default]')
                }
            })
            cy.wait(1000)
        cy.get('[class*=circle_content]')
            .should('have.length', 3)
            .each((el, index) => {
              cy.wrap(el).contains(3 - index)
                if(index === 0 || index === 2) {
                    cy.wrap(el).find('[class*=circle_modified]')
                }
                if(index === 1) {
                    cy.wrap(el).find('[class*=circle_default]')
                }
            })
            cy.wait(1000)
        cy.get('[class*=circle_content]')
            .should('have.length', 3)
            .each((el, index) => {
              cy.wrap(el).contains(3 - index)
                if(index === 0 || index === 2) {
                    cy.wrap(el).find('[class*=circle_modified]')
                }
                if(index === 1) {
                    cy.wrap(el).find('[class*=circle_changing]')
                }
            })
            cy.wait(1000)
            cy.get('[class*=circle_content]')
            .should('have.length', 3)
            .each((el) => {
                    cy.wrap(el).find('[class*=circle_modified]')
            })

    })
})
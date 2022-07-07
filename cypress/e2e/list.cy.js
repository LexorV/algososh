const dellEl = (button, indexEl, indexSecond, position) => {
    cy.get('button').eq(button).click({ force: true })
    cy.get('[class*=circle_content]')
        .each((el, index) => {
            if(index === indexEl) {
                cy.wrap(el).find('[class*=circle_small]');
                cy.get(el).should('not.have.text', position);
            }
        })
    cy.wait(1000)
    cy.get('[class*=circle_content]')
        .should('have.length', 3)
        .each((el, index) => {
            if(index === indexSecond) {
                cy.wrap(el).contains(position)
            }
        })


}
describe('start list', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/list')
    })
    it('Проверка, что если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').eq(0).clear()
        cy.get('button').eq(1).should('be.disabled')
        cy.get('button').eq(2).should('be.disabled')
    })
    it('Проверка отрисовки дефолтного списка', () => {
        cy.get('[class*=circle_letter]')
            .each((el) => {
                cy.get(el).should('not.have.text', '');
            })
        cy.get('[class*=circle_content]')
            .should('have.length', 4)
            .each((el, index) => {
                if(index === 0) {
                    cy.wrap(el).contains('head')
                }
                if(index === 3) {
                    cy.wrap(el).contains('tail')
                }
            })
    })
    it('Проверка добавления элемента в head', () => {
        cy.get('input').eq(0).click({ force: true }).type('12')
        cy.get('button').eq(1).click({ force: true })
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 0) {
                    cy.wrap(el).find('[class*=circle_small]')
                        .contains('12')
                }
            })
        cy.wait(1000)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 0) {
                    cy.wrap(el).find('[class*=circle_modified]');
                    cy.wrap(el).contains('12')
                }
            })
        cy.wait(1000)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 0) {
                    cy.wrap(el).find('[class*=circle_default]');
                    cy.wrap(el).contains('12')
                    cy.wrap(el).contains('head')
                }
            })
    })
    it('Проверка добавления элемента в tail', () => {
        cy.get('input').eq(0).click({ force: true }).type('12')
        cy.get('button').eq(2).click({ force: true })
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 3) {
                    cy.wrap(el).find('[class*=circle_small]')
                        .contains('12')
                }
            })
        cy.wait(1000)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 4) {
                    cy.wrap(el).find('[class*=circle_modified]');
                    cy.wrap(el).contains('12')
                }
            })
        cy.wait(1000)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 4) {
                    cy.wrap(el).find('[class*=circle_default]');
                    cy.wrap(el).contains('12')
                    cy.wrap(el).contains('tail')
                }
            })
    })
    it('Проверка удаления элемента из head', () => {
        dellEl(3, 0, 0, 'head')
    })
    it('Проверка удаления элемента из tail', () => {
        dellEl(4, 3, 2, 'tail')
    })
    it('Проверка добавления элемента по индексу', () => {
        cy.get('input').eq(0).click({ force: true }).type('12')
        cy.get('input').eq(1).clear({ force: true })
        cy.get('input').eq(1).click({ force: true }).type(2)
        cy.get('button').eq(5).click({ force: true })
        cy.wait(1000)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 0) {
                    cy.wrap(el).find('[class*=circle_small]')
                        .contains('12')
                }
            })
        cy.wait(1000)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 0) {
                    cy.wrap(el).find('[class*=circle_changing]')
                    cy.wrap(el).contains('head')
                }
                if(index === 1) {
                    cy.wrap(el).find('[class*=circle_small]')
                        .contains('12')
                }
            })
        cy.wait(1000)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 1) {
                    cy.wrap(el).find('[class*=circle_changing]')
                }
                if(index === 2) {
                    cy.wrap(el).find('[class*=circle_small]')
                        .contains('12')
                }
            })
        cy.wait(1000)
        cy.get('[class*=circle_content]')
            .should('have.length', 5)
            .each((el, index) => {
                if(index === 2) {
                    cy.wrap(el).find('[class*=circle_modified]')
                        .contains('12')
                }
                if(index === 1 || index === 0) {
                    cy.wrap(el).find('[class*=circle_default]')
                }
            })
        cy.wait(1000)
        cy.get('[class*=circle_content]')
            .should('have.length', 5)
            .each((el, index) => {
                if(index === 2) {
                    cy.wrap(el).find('[class*=circle_default]')
                        .contains('12')
                }
            })
    })
    it('Проверка удаление элемента по индексу', () => {
        cy.get('input').eq(1).clear({ force: true })
        cy.get('input').eq(1).click({ force: true }).type(2)
        cy.get('button').eq(6).click({ force: true })
        cy.wait(500)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 0) {
                    cy.wrap(el).find('[class*=circle_changing]')
                }
            })
        cy.wait(500)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 1) {
                    cy.wrap(el).find('[class*=circle_changing]')
                }
            })
        cy.wait(500)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 2) {
                    cy.wrap(el).find('[class*=circle_changing]')
                }
            })
        cy.wait(500)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 2) {
                    cy.wrap(el)
                        .find('[class*=circle_tail]')
                        .find('[class*=circle_small]')
                    cy.wrap(el).find('[class*=circle_default]')
                        .find('[class*=circle_letter]')
                        .should('have.text', '')
                }
            })

        cy.wait(500)
        cy.get('[class*=circle_content]')
            .should('have.length', 3)
            .each((el) => {
                cy.wrap(el).find('[class*=circle_default]')
            })
    })

})
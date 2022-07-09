const addAnimEll = (style, indexEl) => {
    cy.get('[class*=circle_content]')
        .each((el, index) => {
            if(index === indexEl)
                cy.wrap(el).find(`[class*=${style}]`)
        })
}
const checkText = (indexEl) => {
    cy.get('[class*=circle_content]')
        .should('have.length', 7)
        .each((el, index) => {
            if(index === indexEl) {
                cy.wrap(el).contains('12')
            }

        })
}
const checkHead = (indexEl) => {
    cy.get('[class*=circle_content]')
        .should('have.length', 7)
        .each((el, index) => {
            if(index === indexEl) {
                cy.wrap(el).contains('head')
            }

        })
}
const checkTail = (indexEl) => {
    cy.get('[class*=circle_content]')
        .should('have.length', 7)
        .each((el, index) => {
            if(index === indexEl) {
                cy.wrap(el).contains('tail')
            }

        })
}
const addEll = (indexEl, indexElHead, indexElTail) => {
    cy.get('input').click({ force: true }).type('12')
    cy.get('button').eq(1).click({ force: true })
    addAnimEll('circle_changing', indexEl)
    cy.wait(1000)
    addAnimEll('circle_default', indexEl)
    checkText(indexEl)
    checkHead(indexElHead)
    checkTail(indexElTail)
}
describe('start queue', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/queue')
    })
    it('Проверка, что если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear()
        cy.get('button').should('be.disabled')
    })
    it('Проверьте правильность добавления элемента в очередь', () => {
        addEll(0, 0, 0)
        addEll(1, 0, 1)
    })
    it('Проверьте правильность удаления элемента из очереди', () => {
        addEll(0, 0, 0)
        addEll(1, 0, 1)
        cy.get('button').eq(2).click({ force: true })
        addAnimEll('circle_default', 0)
        cy.wait(500)
        addAnimEll('circle_changing', 0)
        cy.wait(500)
        addAnimEll('circle_default', 0)
        checkHead(1)
        checkTail(1)
    })
    it('Проверьте правильность удаления элемента из очереди', () => {
        addEll(0, 0, 0)
        addEll(1, 0, 1)
        cy.get('button').eq(3).click({ force: true })
        cy.get('[class*=circle_letter]')
            .each((el) => {
                cy.get(el).should('not.have.text', '12');
                cy.get(el).should('not.have.text', 'head');
                cy.get(el).should('not.have.text', 'tail');
            })
    })
})
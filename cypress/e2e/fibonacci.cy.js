describe('start string', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/fibonacci')
    })
    it('Проверка, что если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear()
        cy.get('button').should('be.disabled')
    })
    it('Проверка, что если в инпуте отрицательных значении, то кнопка добавления недоступна', () => {
        cy.get('input').type(-1)
        cy.get('button').should('be.disabled')
    })
    it('Проверка корректности генерации чисел ', () => {
        const testCicle = (length, indexArr, value) => {
            cy.get('[class*=circle_letter]')
                .should('have.length', length)
                .each((el, index) => {
                    if(index === indexArr) {
                        cy.wrap(el).contains(value)
                    }
                })
        }
        cy.get('input').clear()
        cy.get('input').type(3)
        cy.get('button').eq(1).click({ force: true })
        cy.wait(500)
        testCicle(1, 0, 0)
        cy.wait(500)
        testCicle(2, 1, 1)
        cy.wait(500)
        testCicle(3, 2, 1)
        cy.wait(500)
        testCicle(4, 3, 2)

    })
})
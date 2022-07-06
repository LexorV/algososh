const addAnimEll = (length, style, indexEl) => {
    cy.get('[class*=circle_content]')
    .should('have.length', length)
    .each((el, index) => {
        if(index === indexEl )
        cy.wrap(el).find(`[class*=${style}]`)
        cy.wrap(el).contains('12')
    })
}
const addEll = (length, indexEl) => {
    cy.get('input').click({ force: true }).type('12')
    cy.get('button').eq(1).click({ force: true })
    addAnimEll(length,'circle_changing', indexEl)
    cy.wait(1000)
    addAnimEll(length,'circle_default', indexEl)
}
describe('start stack', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/stack')
    })
    it('Проверка, что если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear()
        cy.get('button').eq(1).should('be.disabled')
    })
    it('Проверка, что если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear()
        cy.get('button').eq(1).should('be.disabled')
    })
    it('Проверьте правильность добавления элемента в стек', () => {
        addEll(1, 0)
    })
    it('Проверка правильность удаления элемента из стека', () => {
        addEll(1, 0);
        cy.get('button').eq(2).click({ force: true })
        addAnimEll(1,'circle_changing', 0)
    cy.wait(1000)
    cy.get('[class*=circle_content]')
    .should('have.length', 0)
    })
    it('Проверка поведение кнопки «Очистить»', () => {
        addEll(1, 0)
        addEll(2, 1)
        cy.get('button').eq(3).click({ force: true })
        cy.get('[class*=circle_content]')
        .should('have.length', 0)
        })
})
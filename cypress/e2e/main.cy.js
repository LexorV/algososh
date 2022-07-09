describe('test start project', function() {
    it('should be available on localhost:3001', function() {
        cy.visit('http://localhost:3001');
    });
});
describe('test route', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001')
    })
    it('Проверка перехода на страницу строка', () => {
        cy.get('[class*=main-page_string]').click({ force: true })
        cy.url('http://localhost:3001/recursion')
    })
    it('Проверка перехода на страницу последовательность Фибоначчи', () => {
        cy.get('[class*=main-page_fibonacci]').click({ force: true, multiple: true })
        cy.url('http://localhost:3001/fibonacci')
    })
    it('Проверка перехода на страницу сортировка массива', () => {
        cy.get('[class*=main-page_arr]').click({ force: true })
        cy.url('http://localhost:3001/sorting')
    })
    it('Проверка перехода на страницу Стек', () => {
        cy.get('[class*=main-page_stack]').click({ force: true })
        cy.url('http://localhost:3001/stack')
    })
    it('Проверка перехода на страницу Очередь', () => {
        cy.get('[class*=main-page_queue]').click({ force: true })
        cy.url('http://localhost:3001/queue')
    })
    it('Проверка перехода на страницу Связный список', () => {
        cy.get('[class*=main-page_list]').click({ force: true })
        cy.url('http://localhost:3001/list')
    })


})
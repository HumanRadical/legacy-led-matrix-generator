describe('Main page tests', () => {
    it('Can set the size of the matrix', () => {
        cy.visit('http://localhost:5173/')
        cy.viewport('macbook-16')
        cy.get('#x-axis').clear().type('2')
        cy.get('#y-axis').clear().type('2')
        cy.get('#inputBox').clear().type('[0xff0000, 0x00ff00, 0x0000ff, 0xffff00]')
        cy.get('.submit').click()
    })
})
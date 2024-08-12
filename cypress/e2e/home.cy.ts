describe('template spec', () => {
  it('passes', () => {
    const stub = cy.stub()
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('ResizeObserver')) {
        stub()
        return false
      }
    })
    cy.visit('http://localhost:3001')
  })
})

describe('template spec', () => {
  beforeEach(() => {
    const stub = cy.stub()
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('ResizeObserver')) {
        stub()
        return false
      }
    })
  })

  it('should list the categories', () => {
    cy.visit('http://localhost:3001')
    cy.wait(2000)
    cy.get(`[data-testid="categories-ul"]`).should('be.visible')
    cy.get(`[data-testid="category-li"]`).should('have.length.at.least', 1)
  })

  it('should list the categories', () => {
    cy.visit('http://localhost:3001')
    cy.wait(2000)
    cy.get(`[data-testid="products-div"]`).should('be.visible')
    cy.get(`[data-testid="product-div"]`).should('have.length.at.least', 1)
  })

  it('should list the product if searched product exists', () => {
    cy.visit('http://localhost:3001')
    cy.get(`[data-testid="search-product-input"]`).type('nike')
    cy.wait(2000)
    cy.get(`[data-testid="product-div"]`).should('have.length.at.least', 1)
  })

  it('should show the alert if searched product not exists', () => {
    cy.visit('http://localhost:3001')
    cy.get(`[data-testid="search-product-input"]`).type('asdfasdfasdfasdf')
    cy.wait(2000)
    cy.get(`[data-testid="alert"]`).should('be.visible')
  })
})

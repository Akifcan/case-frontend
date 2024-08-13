describe('product detail spec', () => {
  beforeEach(() => {
    const stub = cy.stub()
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('ResizeObserver')) {
        stub()
        return false
      }
    })
  })

  it('should list two product in the basket', () => {
    cy.visit('http://localhost:3001')
    cy.wait(2000)

    cy.get(`[data-testid="products-div"]`).should('be.visible')
    cy.get(`[data-testid="product-div"]`).eq(0).click()
    cy.wait(2000)

    cy.get(`[data-testid="product-detail-div"]`).should('be.visible')
    cy.get(`[data-testid="product-images-div"]`).should('be.visible')
    cy.get(`[data-testid="add-to-basket-button"]`).click()
    cy.wait(1000)
    cy.get(`[data-testid="logo-h1"]`).click()
    cy.wait(1000)

    cy.get(`[data-testid="product-div"]`).eq(1).click()
    cy.get(`[data-testid="product-detail-div"]`).should('be.visible')
    cy.get(`[data-testid="product-images-div"]`).should('be.visible')
    cy.get(`[data-testid="add-to-basket-button"]`).click()
    cy.wait(1000)
    cy.get(`[data-testid="logo-h1"]`).click()
    cy.wait(1000)

    cy.get(`[data-testid="basket-link-div"]`).click()
    cy.wait(2000)
    cy.get(`[data-testid="total-price-h4"]`).should('be.visible')
    cy.get(`[data-testid="basket-item-div"]`).should('have.length.at.least', 1)
  })
})

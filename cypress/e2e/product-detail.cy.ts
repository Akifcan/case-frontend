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

  it('should list the product detail', () => {
    cy.visit('http://localhost:3001')
    cy.wait(2000)
    cy.get(`[data-testid="products-div"]`).should('be.visible')
    const productDiv = cy.get(`[data-testid="product-div"]`).first()
    productDiv.click()
    cy.wait(2000)
    cy.get(`[data-testid="product-detail-div"]`).should('be.visible')
    cy.get(`[data-testid="product-images-div"]`).should('be.visible')
  })

  it('should show  total item count ', () => {
    cy.visit('http://localhost:3001')
    cy.wait(2000)
    cy.get(`[data-testid="products-div"]`).should('be.visible')
    const productDiv = cy.get(`[data-testid="product-div"]`).first()
    productDiv.click()
    cy.wait(2000)
    cy.get(`[data-testid="product-detail-div"]`).should('be.visible')
    cy.get(`[data-testid="product-images-div"]`).should('be.visible')
    cy.get(`[data-testid="add-to-basket-button"]`).click()
    cy.wait(2000)
    cy.get(`[data-testid="add-to-basket-button"]`).should('be.visible')
  })
})

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

  it('should show the new product button if authorized user', () => {
    cy.visit('http://localhost:3001/auth/login')
    cy.wait(2000)

    cy.get(`[data-testid="login-email-input"]`).should('be.visible')
    cy.get(`[data-testid="login-password-input"]`).should('be.visible')

    cy.get(`[data-testid="login-email-input"]`).type('akifcannnn@icloud.com')
    cy.get(`[data-testid="login-password-input"]`).type('test123A%')
    cy.get(`[data-testid="login-submit-button"]`).click()
    cy.wait(2000)

    cy.get(`[data-testid="new-product-button"]`).should('be.visible')
  })

  it('shouldn not show the new product button if not authorized user', () => {
    cy.visit('http://localhost:3001/auth/login')
    cy.wait(2000)

    cy.get(`[data-testid="login-email-input"]`).should('be.visible')
    cy.get(`[data-testid="login-password-input"]`).should('be.visible')

    cy.get(`[data-testid="login-email-input"]`).type('johndoe@mail.com')
    cy.get(`[data-testid="login-password-input"]`).type('test123A%')
    cy.get(`[data-testid="login-submit-button"]`).click()
    cy.wait(2000)

    cy.get(`[data-testid="new-product-button"]`).should('not.exist')
  })

  it('should show the not authorized label if not authorized user', () => {
    cy.visit('http://localhost:3001/auth/login')
    cy.wait(2000)

    cy.get(`[data-testid="login-email-input"]`).should('be.visible')
    cy.get(`[data-testid="login-password-input"]`).should('be.visible')

    cy.get(`[data-testid="login-email-input"]`).type('johndoe@mail.com')
    cy.get(`[data-testid="login-password-input"]`).type('test123A%')
    cy.get(`[data-testid="login-submit-button"]`).click()
    cy.wait(2000)

    cy.visit('http://localhost:3001/product/new-product')
    cy.wait(2000)
    cy.get(`[data-testid="not-authorized-label"]`).should('be.visible')
  })

  it('shouldn not show the new product button if not authorized user', () => {
    cy.visit('http://localhost:3001/auth/login')
    cy.wait(2000)

    cy.get(`[data-testid="login-email-input"]`).should('be.visible')
    cy.get(`[data-testid="login-password-input"]`).should('be.visible')

    cy.get(`[data-testid="login-email-input"]`).type('johndoe@mail.com')
    cy.get(`[data-testid="login-password-input"]`).type('test123A%')
    cy.get(`[data-testid="login-submit-button"]`).click()
    cy.wait(2000)

    cy.get(`[data-testid="new-product-button"]`).should('not.exist')
  })
})

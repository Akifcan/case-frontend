describe('login spec', () => {
  beforeEach(() => {
    const stub = cy.stub()
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('ResizeObserver')) {
        stub()
        return false
      }
    })
  })

  it('should show the go to profile link when logged in successfully', () => {
    cy.visit('http://localhost:3001/auth/login')
    cy.wait(2000)

    cy.get(`[data-testid="login-email-input"]`).should('be.visible')
    cy.get(`[data-testid="login-password-input"]`).should('be.visible')

    cy.get(`[data-testid="login-email-input"]`).type('akifcannnn@icloud.com')
    cy.get(`[data-testid="login-password-input"]`).type('test123A%')
    cy.get(`[data-testid="login-submit-button"]`).click()
    cy.wait(2000)

    cy.get(`[data-testid="go-to-profile-link"]`).should('be.visible')
  })

  it('should show the go to profile link when logged in successfully', () => {
    cy.visit('http://localhost:3001/auth/login')
    cy.wait(2000)

    cy.get(`[data-testid="login-email-input"]`).should('be.visible')
    cy.get(`[data-testid="login-password-input"]`).should('be.visible')

    cy.get(`[data-testid="login-email-input"]`).type('notexists@user.com')
    cy.get(`[data-testid="login-password-input"]`).type('test123A%asdasd')
    cy.get(`[data-testid="login-submit-button"]`).click()
    cy.wait(2000)

    cy.get(`[data-testid="alert"]`).should('be.visible')
  })
})

describe('register spec', () => {
  beforeEach(() => {
    const stub = cy.stub()
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('ResizeObserver')) {
        stub()
        return false
      }
    })
  })

  it('should show the go to profile link when registered successfully', () => {
    cy.visit('http://localhost:3001/auth/register')
    cy.wait(2000)

    cy.get(`[data-testid="register-name-input"]`).should('be.visible').type('test user')
    cy.get(`[data-testid="register-email-input"]`)
      .should('be.visible')
      .type(`akifcannnndemo${Math.random()}.@test.com`)
    cy.get(`[data-testid="register-password-input"]`).should('be.visible').type('test123A%')

    cy.get(`[data-testid="register-submit-button"]`).click()
    cy.wait(2000)

    cy.get(`[data-testid="go-to-profile-link"]`).should('be.visible').click()
  })

  it('should show an alert if email already exists', () => {
    cy.visit('http://localhost:3001/auth/register')
    cy.wait(2000)

    cy.get(`[data-testid="register-name-input"]`).should('be.visible').type('test user')
    cy.get(`[data-testid="register-email-input"]`).should('be.visible').type(`akifcannnn@icloud.com`)
    cy.get(`[data-testid="register-password-input"]`).should('be.visible').type('test123A%')

    cy.get(`[data-testid="register-submit-button"]`).click()
    cy.wait(2000)
    cy.get(`[data-testid="alert"]`).should('be.visible')
  })
})

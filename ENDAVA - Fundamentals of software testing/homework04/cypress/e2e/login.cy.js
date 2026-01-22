/// <reference types="cypress" />

describe('Tests', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/v1/')
    
    cy.fixture('users').as('users')
  })

  afterEach(() => {
    cy.screenshot()
  })

  it('Test Case 1 - Verify error message on failed login', function() {
    cy.get('#user-name').type(this.users.invalidUser.username)
    cy.get('#password').type(this.users.invalidUser.password)
    cy.get('#login-button').click()

    cy.get('[data-test="error"]').should(
      'have.text',
      'Epic sadface: Username and password do not match any user in this service'
    )
  })

  it('Test Case 2 - Verify successful login', function() {
    cy.get('#user-name').type(this.users.validUser.username)
    cy.get('#password').type(this.users.validUser.password)
    cy.get('#login-button').click()

    cy.url().should('include', '/inventory.html')
  })

  it('Test Case 3 - Verify inventory sorting', function() {
    cy.get('#user-name').type(this.users.validUser.username)
    cy.get('#password').type(this.users.validUser.password)
    cy.get('#login-button').click()

    cy.get('.product_sort_container').select('Name (Z to A)')

    cy.get('.inventory_item_name').first()
      .should('have.text', 'Test.allTheThings() T-Shirt (Red)')
  })

  it('Test Case 4 - Verify product purchase', function() {
    cy.get('#user-name').type(this.users.validUser.username)
    cy.get('#password').type(this.users.validUser.password)
    cy.get('#login-button').click()

    cy.contains('Add to cart').click()

    cy.get('.shopping_cart_link').click()
    cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack')

    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('Miona')
    cy.get('[data-test="lastName"]').type('Sretenovic')
    cy.get('[data-test="postalCode"]').type('11000')
    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="finish"]').click()
    cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER')
  })

})

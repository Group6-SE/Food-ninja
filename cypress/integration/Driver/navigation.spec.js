/// <reference types="cypress" />

context("Login", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.get(".driver").click({ force: true });
  
      cy.get('input[type="email"]')
        .click()
        .type("chamod@gmail.com", { delay: 50 });
  
      cy.get('input[type="password"]').click().type("123456", { delay: 50 });
  
      cy.get('input[type="submit"]').click();
    });
  
    it("Navigate to pending orders", () => {
      cy.get(".pendingOrders").click();
    });
  
    it("Navigate to my orders", () => {
      cy.get(".myOrders").click();
    });
  

  });
  
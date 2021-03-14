/// <reference types="cypress" />

context("Login", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.get(".employee").click({ force: true });
  
      cy.get('input[type="email"]')
        .click()
        .type("sandaru@gmail.com", { delay: 50 });
  
      cy.get('input[type="password"]').click().type("123456", { delay: 50 });
  
      cy.get('input[type="submit"]').click();
    });
  
    it("Navigate to menu", () => {
      cy.get(".pendingOrders").click();
    });
  
    it("Navigate to Cart", () => {
      cy.get(".acceptedOrders").click();
      cy.wait(50);
    });
  
 
  });
  
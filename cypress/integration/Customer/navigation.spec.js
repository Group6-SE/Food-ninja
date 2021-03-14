/// <reference types="cypress" />

context("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get(".customer").click({ force: true });

    cy.get('input[type="email"]')
      .click()
      .type("yasith@gmail.com", { delay: 50 });

    cy.get('input[type="password"]').click().type("123456", { delay: 50 });

    cy.get('input[type="submit"]').click();
  });

  it("Navigate to menu", () => {
    cy.get(".menu").click();
  });

  it("Navigate to Cart", () => {
    cy.get(".myCart").click();
  });

  it("Navigate to Favorites", () => {
    cy.get(".myFavorites").click();
  });
});

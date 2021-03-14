/// <reference types="cypress" />

context("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get(".manager").click({ force: true });

    cy.get('input[type="email"]')
      .click()
      .type("admin@gmail.com", { delay: 100 });

    cy.get('input[type="password"]').click().type("admin1234", { delay: 100 });

    cy.get('input[type="submit"]').click();
  });

  it("Add an employee", () => {
    cy.get(".addEmployee").click();
    cy.get('input[id="employee_name"]').click().type("binoy", { delay: 50 });
    cy.get('input[id="job_post"]').click().type("Chef", { delay: 50 });
    cy.get('input[id="email"]').click().type("binoy@gmail.com", { delay: 50 });
    cy.get('input[id="password"]').click().type("123456", { delay: 50 });
    cy.get('input[id="contact_number"]').click().type("0710987653", { delay: 50 });
    cy.get('input[type="submit"]').click();
  });

  it("Add a driver", () => {
    cy.get(".addDriver").click();
    cy.get('input[id="employee_name"]').click().type("yasith", { delay: 50 });
    cy.get('input[id="contact_number"]').click().type("0710987653", { delay: 50 });
    cy.get('input[id="vehical_type"]').click().type("Car", { delay: 50 });
    cy.get('input[id="vehical_no"]').click().type("CAB-1234", { delay: 50 });
    cy.get('input[id="email"]').click().type("yasith@gmail.com", { delay: 50 });
    cy.get('input[id="password"]').click().type("123456", { delay: 50 });
    cy.get('input[type="submit"]').click();
  });

  it("Add a discount", () => {
    cy.get(".addDiscount").click();
  });

  it("Add food item", () => {
    cy.get(".addFood").click();
  })
});

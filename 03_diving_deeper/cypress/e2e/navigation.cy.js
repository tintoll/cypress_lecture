/// <reference types="Cypress" />

describe("page navigation", () => {
  it("should navigate between pages", () => {
    cy.visit("http://localhost:5173");
  });
});

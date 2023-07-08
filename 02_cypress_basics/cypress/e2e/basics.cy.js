/// <reference types="Cypress" />

describe("tasks page", () => {
  it("should render the main image", () => {
    cy.visit("http://localhost:5173/");
  });
});

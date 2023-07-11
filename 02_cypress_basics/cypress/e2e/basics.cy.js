/// <reference types="Cypress" />

describe("tasks page", () => {
  it("should render the main image", () => {
    cy.visit("http://localhost:5173/");
    // cy.get(".main-header img"); // 중첩해서 사용하는 것은 좋지 않다.
    cy.get(".main-header").find("img"); // 이렇게 사용하면 정확히 원하는 것을 가져오지 않는다.
  });

  it("should display the page title", () => {
    cy.visit("http://localhost:5173/");

    // h1을 다 찾는다. should를 이용해서 명시적으로 기대한 값을 검증한다.
    cy.get("h1").should("have.length", 1);
    cy.get("h1").contains("My Cypress Course Tasks"); // 묵시적 검증이 된다.

    // cy.contains("My Cypress Course Tasks"); // 사이트 전체에서 글자가 포하모디어있는지 찾는다.
  });
});

/// <reference types="Cypress" />

describe("contact form", () => {
  it("should submit the form ", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type("Hello");
    cy.get('[data-cy="contact-input-name"]').type("joi");
    cy.get('[data-cy="contact-input-email"]').type("test@example.com");

    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    cy.get('[data-cy="contact-btn-submit"]').should(
      "not.have.attr",
      "disabled"
    );

    // 함수를 체인닝해서 사용할 수 있다.
    cy.get('[data-cy="contact-btn-submit"]')
      .contains("Send Message")
      .should("not.have.attr", "disabled");
    // 가독성을 좋게 하기 위해서 should를 and로 바꿀 수 있다. 2개는 같은 역할을 한다.
    cy.get('[data-cy="contact-btn-submit"]')
      .contains("Send Message")
      .and("not.have.attr", "disabled");

    // const btn = cy.get('[data-cy="contact-btn-submit"]'); 변수에 get을 할 수는 있지만 실제 btn 객체가 담겨져 있지 않다.

    // as 메서드를 이용하여 alias를 주어 사용하는 것을 권장한다.
    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
    cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
  });
});

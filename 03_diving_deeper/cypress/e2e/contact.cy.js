/// <reference types="Cypress" />

describe(
  "contact form",
  { defaultCommandTimeout: 1000, browser: "firefox" },
  () => {
    it("should submit the form ", () => {
      cy.visit("/about");
      cy.get('[data-cy="contact-input-message"]').type("Hello");
      cy.get('[data-cy="contact-input-name"]').type("joi");
      // cy.get('[data-cy="contact-input-email"]').type("test@example.com");

      cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
      cy.get('[data-cy="contact-btn-submit"]').should(
        "not.have.attr",
        "disabled"
      );

      // then 메서드를 이용하여 같은 요소에 대한 검증을 묶어서 할 수 있다.
      cy.get('[data-cy="contact-btn-submit"]').then((el) => {
        // 이곳에서 el은 말그대로 dom element이다. 그래서 검증시 expect를 이용해야한다.
        expect(el.attr("disabled")).to.be.undefined;
        expect(el.text()).to.eq("Send Message");
      });

      // 함수를 체인닝해서 사용할 수 있다.
      cy.get('[data-cy="contact-btn-submit"]')
        .contains("Send Message")
        .should("not.have.attr", "disabled");
      // 가독성을 좋게 하기 위해서 should를 and로 바꿀 수 있다. 2개는 같은 역할을 한다.
      cy.get('[data-cy="contact-btn-submit"]')
        .contains("Send Message")
        .and("not.have.attr", "disabled");

      // const btn = cy.get('[data-cy="contact-btn-submit"]'); 변수에 get을 할 수는 있지만 실제 btn 객체가 담겨져 있지 않다.

      // 스페셜키를 이용하여 enter 처리
      cy.get('[data-cy="contact-input-email"]').type("test@example.com{enter}");

      // as 메서드를 이용하여 alias를 주어 사용하는 것을 권장한다.
      cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
      // cy.get("@submitBtn").click();
      cy.get("@submitBtn").contains("Sending...");
      cy.get("@submitBtn").should("have.attr", "disabled");
    });

    it("should validate the form input", () => {
      cy.visit("/about");
      cy.get('[data-cy="contact-btn-submit"]').click();
      cy.get('[data-cy="contact-btn-submit"]').then((el) => {
        expect(el).to.not.have.attr("disabled");
        expect(el.text()).to.not.eq("Sending....");
      });
      cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");

      cy.get('[data-cy="contact-input-message"]').focus().blur();
      cy.get('[data-cy="contact-input-message"]')
        .parent()
        .should("have.attr", "class")
        .and("match", /invalid/);

      cy.get('[data-cy="contact-input-name"]').focus().blur();
      cy.get('[data-cy="contact-input-name"]')
        .parent()
        .should("have.attr", "class")
        .and("match", /invalid/);
      cy.get('[data-cy="contact-input-email"]').focus().blur();
      cy.get('[data-cy="contact-input-email"]')
        .parent()
        .should("have.attr", "class")
        .and("match", /invalid/);
    });
  }
);

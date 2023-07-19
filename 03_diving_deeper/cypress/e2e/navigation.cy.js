/// <reference types="Cypress" />

describe("page navigation", () => {
  it("should navigate between pages", () => {
    cy.visit("/");

    // 하이렉키 구조의 html로 요소를 찾는데 그렇게 되면 구조가 변경되면 테스트가 실패한다.
    // cypress에서 요소를 찾을때 불확식성이 있는 것들은 아래 처럼 data-cy를 넣어서 요소를 찾기 쉽게 하는 것을 권장한다.
    cy.get('[data-cy="header-about-link"]').click();
    // 이동한 주소 확인
    cy.location("pathname").should("eq", "/about");
    // 뒤로가기
    cy.go("back");
    cy.location("pathname").should("eq", "/");
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-home-link"]').click();
    cy.location("pathname").should("eq", "/");
  });
});

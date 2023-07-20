/// <reference types="cypress" />

describe("share location", () => {
  it("should fetch the user location", () => {
    cy.visit("/").then((win) => {
      // then에서 작업 하는 이유는 window 객체에 접근하지 못할 수 있어서 직업 받을 수 있는 then에서 작업한다.
      // stub는 첫번째 인자롤 사용할 개체, 두번째 인자로 대체할 메서드명을 입력한다.
      cy.stub(win.navigator.geolocation, "getCurrentPosition").as(
        "getUserPosition"
      );
    });
    cy.get('[data-cy="get-loc-btn"]').click();
    // alias는 요소를 주는것 말고 데이터도 가능하다
    cy.get("@getUserPosition").should("have.been.called");
  });
});

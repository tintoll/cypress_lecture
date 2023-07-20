/// <reference types="cypress" />

describe("share location", () => {
  it("should fetch the user location", () => {
    cy.visit("/").then((win) => {
      // then에서 작업 하는 이유는 window 객체에 접근하지 못할 수 있어서 직업 받을 수 있는 then에서 작업한다.
      // stub는 첫번째 인자롤 사용할 개체, 두번째 인자로 대체할 메서드명을 입력한다.
      // 이렇게 하면 getCurrentPosition메서드가 빈 메소드로 대체 된다.
      // cy.stub(win.navigator.geolocation, "getCurrentPosition").as(
      //   "getUserPosition"
      // );

      // getCurrentPosition 메서드를 가짜로 구현하고 싶으면 resolve, return, callFake를 이용한다. 여기서는 callback이 필요하다
      cy.stub(win.navigator.geolocation, "getCurrentPosition")
        .as("getUserPosition")
        .callsFake((cb) => {
          // 원래 함수가 딜레이가 있어야 하느로 setTimeout으로 딜레이를 준다.
          setTimeout(() => {
            cb({
              coords: {
                latitude: 37.5,
                longtitude: 48.01,
              },
            });
          }, 100);
        });
    });
    cy.get('[data-cy="get-loc-btn"]').click();
    // alias는 요소를 주는것 말고 데이터도 가능하다
    cy.get("@getUserPosition").should("have.been.called");

    cy.get('[data-cy="get-loc-btn"]').should("be.disabled");
    cy.get('[data-cy="actions"]').should("contain", "Location fetched"); // contains랑 동일
  });
});

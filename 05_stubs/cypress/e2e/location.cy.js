/// <reference types="cypress" />

describe("share location", () => {
  beforeEach(() => {
    cy.clock(); // 시계는 test 가동전에 시간을 조정하는게 좋다.
    cy.fixture("user-location.json").as("userLocation");
    cy.visit("/").then((win) => {
      // then에서 작업 하는 이유는 window 객체에 접근하지 못할 수 있어서 직업 받을 수 있는 then에서 작업한다.
      // stub는 첫번째 인자롤 사용할 개체, 두번째 인자로 대체할 메서드명을 입력한다.
      // 이렇게 하면 getCurrentPosition메서드가 빈 메소드로 대체 된다.
      // cy.stub(win.navigator.geolocation, "getCurrentPosition").as(
      //   "getUserPosition"
      // );

      cy.get("@userLocation").then((fakePosition) => {
        // getCurrentPosition 메서드를 가짜로 구현하고 싶으면 resolve, return, callFake를 이용한다. 여기서는 callback이 필요하다
        cy.stub(win.navigator.geolocation, "getCurrentPosition")
          .as("getUserPosition")
          .callsFake((cb) => {
            // 원래 함수가 딜레이가 있어야 하느로 setTimeout으로 딜레이를 준다.
            setTimeout(() => {
              cb(fakePosition);
            }, 100);
          });
      });

      // wirteText가 promise를 반환하기 때문에 resolves를 사용한다.
      cy.stub(win.navigator.clipboard, "writeText")
        .as("saveToClipboard")
        .resolves();

      cy.spy(win.localStorage, "setItem").as("storeLocation");
      cy.spy(win.localStorage, "getItem").as("getStroedLocation");
    });
  });
  it("should fetch the user location", () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    // alias는 요소를 주는것 말고 데이터도 가능하다
    cy.get("@getUserPosition").should("have.been.called");

    cy.get('[data-cy="get-loc-btn"]').should("be.disabled");
    cy.get('[data-cy="actions"]').should("contain", "Location fetched"); // contains랑 동일
  });

  it("should share a location URL", () => {
    cy.get('[data-cy="name-input"]').type("John Doe");
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("@saveToClipboard").should("have.been.called");

    cy.get("@userLocation").then((fakePosition) => {
      const { latitue, longitude } = fakePosition.coords;
      // 올바른 값으로 전달되었는지 테스트
      cy.get("@saveToClipboard").should(
        "have.been.calledWithMatch",
        new RegExp(`${latitue}.*${longitude}.*${encodeURI("John Doe")}`)
      );

      // 실제 값이 올바르게 호출되었는지
      cy.get("@storeLocation").should(
        "have.been.calledWithMatch",
        /John Doe/,
        new RegExp(`${latitue}.*${longitude}.*${encodeURI("John Doe")}`)
      );
    });

    // setItme이 호출되었는지 확인
    cy.get("@storeLocation").should("have.been.called");
    // getItem도 제대로 호출되었는지 확인. 실제 브라우저 API가 정상동작하는지까지는 테스트 안해도 됨.
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("@getStoreLocation").should("have.been.called");

    // 팝업이 호출되었는지 확인 2초 보이다 사라짐
    cy.get('[data-cy="info-massage"]').should("be.visible");
    cy.get('[data-cy="info-massage"]').should("have.class", "visible");

    cy.tick(2000); // 2초를 앞당긴다.
    // 팝업이 사라지는 테스트가 성공한다. 왜냐하면 cypress가 기본적으로 4초를 기다리기 때문메
    cy.get('[data-cy="info-massage"]').should("not.be.visible");
  });
});

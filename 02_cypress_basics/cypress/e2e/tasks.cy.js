/// <reference types="Cypress" />

describe("tasks management", () => {
  it("should open and close the new task modal", () => {
    cy.visit("http://localhost:5173/");
    // Add Task 라는 글자가 포함된 Element를 선택하고 클릭한다.
    cy.contains("Add Task").click();

    // Modal 이 뜨고 모달 외 배경화면을 클릭하면 Modal이 사라진다.
    cy.get(".backdrop").click({ force: true }); // 그냥 클릭하면 동작하지 않는다. force를 true 해줘야한다.

    // 실제 사라졌는지 확인
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
  });
});

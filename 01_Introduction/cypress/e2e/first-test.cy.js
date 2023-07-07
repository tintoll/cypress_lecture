describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    // get은 특정 DOM 요소를 검색한다. 인자로 css selector를 넣어주면된다.
    // should는 기대치를 검증, 첫번째인자는 기대치를 검증할 항목, 두번째인자는 값
    cy.get("li").should("have.length", 6);
  });
});

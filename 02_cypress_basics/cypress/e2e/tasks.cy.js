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

    cy.contains("Add Task").click();
    cy.contains("Cancel").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
  });

  it("should create a new task", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();

    // input에 값 넣기
    cy.get("#title").type("New Task");
    // textarea에 값 넣기
    cy.get("#summary").type("Some description");

    // 저장 버튼 클릭
    cy.get(".modal").contains("Add Task").click();

    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");

    // 생성됬는지 확인
    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains("New Task");
    cy.get(".task p").contains("Some description");
  });

  it("should validate user input", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".modal").contains("Add Task").click();

    cy.contains("Please provide values");
  });

  it("should filter tasks", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("Some description");
    // select box 선택 (option의 value값으로 선택)
    cy.get("#category").select("urgent");

    cy.get(".modal").contains("Add Task").click();
    // 앞에서 모달이 닫히는거는 이전에 테스트를 했기 때문에 따로 하지 않는다.
    // 필터링에 필요한 검증 작업만 한다.
    cy.get(".task").should("have.length", 1);
    cy.get("#filter").select("moderate");
    cy.get(".task").should("have.length", 0);
    cy.get("#filter").select("urgent");
    cy.get(".task").should("have.length", 1);
  });

  it("should add multiple tasks", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get("#title").type("Task 1");
    cy.get("#summary").type("First task");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 1);

    cy.contains("Add Task").click();
    cy.get("#title").type("Task 2");
    cy.get("#summary").type("Second task");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 2);

    // first(), last(), eq(1)
    // 첫벤째인덱스, 마지막 인덱스, 원하는 인덱스
    cy.get(".task").eq(0).contains("First task"); //first()
    cy.get(".task").eq(1).contains("Second task"); //last()
  });
});

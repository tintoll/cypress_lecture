// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("submitForm", () => {
  cy.get('[data-cy="contact-btn-submit"]').click();
});

Cypress.Commands.addQuery("getById", (id) => {
  // now함수는 커스컴쿼리에서만 사용해야 한다.
  const getFn = cy.now("get", `[data-cy="${id}"]`);
  return () => {
    return getFn();
  };
});

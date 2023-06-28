// https://on.cypress.io/api

describe('Sanity Test', () => {
  it('visits the app root url', () => {
    cy.visit('/');
    cy.contains('.text-2xl.font-bold', 'JSongs');
  });
});

describe('Audio Player', () => {
  it('plays audio', () => {
    cy.visit('/');
    cy.get('.song-card:first-child a').click();
    cy.get('main button[type=button]').click();
    cy.wait(5000);
  });
});

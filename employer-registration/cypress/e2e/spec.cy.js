describe('Formulaire d\'inscription', () => {
  it('Soumet un formulaire avec des données valides', () => {
    cy.visit('/');

    cy.get('input[name="firstName"]').type('Ali');
    cy.get('input[name="lastName"]').type('Ben');
    cy.get('input[name="email"]').type('ali.ben@example.com');
    cy.get('input[name="birthDate"]').type('1990-01-01');
    cy.get('input[name="city"]').type('Toulouse');
    cy.get('input[name="postalCode"]').type('31000');

    cy.contains(/submit/i).click();

cy.contains(/réussie/i).should('exist');
  });
});

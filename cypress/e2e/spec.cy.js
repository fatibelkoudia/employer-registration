describe('Formulaire d\'inscription', () => {
  it('Soumet un formulaire avec des données valides', () => {
    // Définir la taille de la fenêtre pour un affichage plein écran
    cy.viewport(1920, 1080);
    cy.visit('/');
    
    // Attendre que la page soit complètement chargée
    cy.get('input[name="firstName"]').should('be.visible');
    
    // Utiliser force: true pour éviter les problèmes d'overlay
    cy.get('input[name="firstName"]').type('Ali', { force: true });
    cy.get('input[name="lastName"]').type('Ben', { force: true });
    cy.get('input[name="email"]').type('ali.ben@example.com', { force: true });
    cy.get('input[name="birthDate"]').type('1990-01-01', { force: true });
    cy.get('input[name="city"]').type('Toulouse', { force: true });
    cy.get('input[name="postalCode"]').type('31000', { force: true });

    cy.contains(/submit/i).click({ force: true });

    cy.contains(/réussie/i, { timeout: 10000 }).should('exist');
  });
});

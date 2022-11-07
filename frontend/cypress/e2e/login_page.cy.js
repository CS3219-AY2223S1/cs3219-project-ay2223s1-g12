describe('Login page', () => {
    const validNewUser = {
        username: 'newUser',
        password: 'newPassword1'
    }

    // remember needs to connect to DB

    it('successfully loads', () => {
        cy.visit('http://localhost:3000');
    });

    it('throw correct error when not connected to database', () => {
        cy.visit('http://localhost:3000/signup');

        cy.get('.userInputUsername')
            .type(validNewUser.username);

        cy.get('.userInputPassword')
            .type(validNewUser.password);

        cy.get('.signupButton')
            .click();

        // error pops up should exist
    });

    // it('successfully sign up with valid username and password', () => {
        
    // });
});

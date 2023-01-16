describe("First test",() => {
    beforeEach("should visit the unlogged homepage", function () {
        cy.visit(Cypress.env("url_Frontend"))
        const element = cy.get('.info > :nth-child(2) > a')
        expect(element).equal.toString('register');
    });

    it("should click the hamburger menu and go to the register page", function () {
        const menu = cy.get(".hamburger2");
        menu.click();
        cy.get('ul > :nth-child(2) > a').click()
        const element = cy.get('.register__registerBorder--registerTitle')
        expect(element).equal.toString('Register');

    })

    it("should click the hamburger menu and go to the login page", function () {
        const menu = cy.get(".hamburger2");
        menu.click();
        cy.get('ul > :nth-child(1) > a').click()
        const element = cy.get('.login__loginBorder--loginTitle')
        expect(element).equal.toString('Login');

    })
})
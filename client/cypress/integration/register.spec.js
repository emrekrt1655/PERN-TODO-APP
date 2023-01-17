import { registerData } from "../fixtures/mockData";

describe("Register test suite", function() {
    it("should register", function() {
        const url = "http://localhost:3000/api/register";
        cy.visit(Cypress.env("url_Frontend")+"register")
        cy.intercept({ method: "POST", url: url }, (req) => {
            expect(req.body.userName).to.include(registerData.userName);
            req.continue((res) => {
              let text = res.body.message;
              expect(text).to.include("registered");
            });
          }).as(`register`);
        cy.fillForm("userName", registerData.userName);
        cy.fillForm("email", registerData.email);
        cy.fillForm("password", registerData.password);
        cy.get('.registerForm__registerButton').click()  
        cy.wait(`@register`, { timeout: 15000 })
        cy.get(".toast-header").then((text) => {
            const successMsg = text.text();
            expect(successMsg.includes("Success")).to.be.true
        })

    })
})


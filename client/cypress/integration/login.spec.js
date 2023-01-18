import { loginData } from "../fixtures/mockData";

describe("Login test suite", function () {
  it("should login with data", function () {
    const url = "http://localhost:3000/api/login";
    cy.visit(Cypress.env("url_Frontend") + "login");
    cy.intercept({ method: "POST", url: url }, (req) => {
      expect(req.body.email).to.include(loginData.email);
      req.continue((res) => {
        let text = res.body.message;
        expect(text).to.include("successfully");
      });
    }).as(`login`);
    cy.fillForm("email", loginData.email);
    cy.fillForm("password", loginData.password);
    cy.get(".loginForm__registerTextAccount").then((el) => {
      let text = el.text();
      expect(text).to.include("Don't you have an account?");
    });
    cy.get(".loginForm__loginButton").click();
    cy.wait(`@login`, { timeout: 15000 });

    cy.get(".toast-header").then((text) => {
      const successMsg = text.text();
      expect(successMsg.includes("Success")).to.be.true;
    });
  });
});

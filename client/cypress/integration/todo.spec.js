import { todoData, loginData } from "../fixtures/mockData";

describe("Todo funtions Test Suite", function () {
  before("It logins to the api", function () {
    cy.request("POST", Cypress.env("url_Backend") + "login", {
      email: loginData.email,
      password: loginData.password,
    }).then((response) => {
      cy.checkPostApiMessage(response.body, "Login successfully completed!");
      expect(response.body).to.have.property("access_token");
      this.token = response.body["access_token"];
      this.userId = response.body["user"].userId;
      this.userName = response.body["user"].userName;
    });
  });

  beforeEach("test it should logins to the api", function () {
    cy.visit(Cypress.env("url_Frontend") + "login");
    cy.fillForm("email", loginData.email);
    cy.fillForm("password", loginData.password);
    cy.get(".loginForm__loginButton").click();
    cy.get(".toast-header").then((text) => {
      const successMsg = text.text();
      expect(successMsg.includes("Success")).to.be.true;
    });
  });

  it("todo test funtions it should login", function () {
    cy.visit(Cypress.env("url_Frontend"));
    cy.get("#text");
    cy.fillForm("text", todoData.text).type("{enter}");
    cy.get(".toast-header").then((text) => {
      const successMsg = text.text();
      expect(successMsg.includes("Success")).to.be.true;
    });
    cy.get(":nth-child(1) > .singleTodo__todoText").then((el) => {
      const todoText = el.text();
      expect(todoText).to.equal(todoData.text);
    });
  });
});

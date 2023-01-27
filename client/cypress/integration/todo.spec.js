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

  it("should login create a todo", function () {
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

  it("should delete the todo", function () {
    cy.visit(Cypress.env("url_Frontend"));
    cy.get(":nth-child(1) > .singleTodo__todoText").then((el) => {
      this.text = el.text();
    });
    cy.get(".todoListContainer__listContainer > :nth-child(1)").then((el) => {
      cy.get("#delete").click();
    });
    cy.get(":nth-child(1) > .singleTodo__todoText").then((el) => {
      expect(el.text()).not.to.equal(this.text);
    });
  });

  it("should check and uncheck todo", function () {
    cy.visit(Cypress.env("url_Frontend"));
    cy.get(".todoListContainer__listContainer > :nth-child(1)").then((el) => {
      cy.get("#done").click();
    });

    cy.get(".todoListContainer__listContainer > :last-child > #todoText").then(
      (text) => {
        const className = text[0].className;
        expect(className.includes("todoDoneText")).to.be.true;
        cy.get(
          ".todoListContainer__listContainer > :last-child > .singleTodo__iconContainer > #done"
        ).click();
      }
    );
    cy.get(
      ".todoListContainer__listContainer > :nth-child(1) > #todoText"
    ).then((text) => {
      const className = text[0].className;
      cy.log(className);
      expect(className.includes("todoText")).to.be.true;
    });
  });
  
  it("should edit a todo", function () {
    cy.visit(Cypress.env("url_Frontend"));
    cy.get(".todoListContainer__listContainer > :nth-child(1)").then((el) => {
      cy.get("#edit").click();
      cy.get(":nth-child(1) > #text").type(" updated").type("{enter}");
    });
  });
});

import { loginData } from "../fixtures/mockData";

describe("Logged User homepage", function () {

  before("before getting todos, it should login", function () {
    cy.visit(Cypress.env("url_Frontend") + "login");
    cy.fillForm("email", loginData.email);
    cy.fillForm("password", loginData.password);
    cy.get(".loginForm__loginButton").click();
    cy.get(".toast-header").then((text) => {
      const successMsg = text.text();
      expect(successMsg.includes("Success")).to.be.true;
    });
  });

  it("It logins to the api", function () {
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

  

  it("should get the user's todo list", function () {
    const options = {
      method: "GET",
      url: `${Cypress.env("url_Backend")}todo/get/${this.userId}`,
    };
    cy.request(options).then(() => (response) => {
      cy.checkPostApiMessage(response.body, "All todos found");
      expect(response.body).to.have.property("status", "success");
      this.todoList = response.body["data"]
    });
  });

  it("should getting todos if todoList exists", function () {
    this.todoList && cy.get(".singleTodo").then((todo) => {
      expect(todo).to.exist;
    });
  });

  it("should come userName in the hamburgermenu", function () {
    cy.get('.menu2 > ul > :nth-child(2)').then(el => {
      let text = el.text().trim()
      expect(text).to.equal(this.userName)
    })
  })
});

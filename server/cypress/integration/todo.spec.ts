import { loginData, todoData } from "../fixtures/todoData";

import {
  IResponseLogin,
  ITodoResponse,
} from "../support/interfaces";

describe("Backend Login API Test Suite", () => {
  describe("Backend Login", () => {
    it("It logins to the api", function () {
      cy.request("POST", Cypress.env("url_Backend") + "login", {
        email: loginData[0].email,
        password: loginData[0].password,
      }).then((response: IResponseLogin) => {
        cy.checkPostApiMessage(response.body, "Login successfully completed!");
        expect(response.body).to.have.property("access_token");
        this.token = response.body["access_token"];
        this.userId = response.body["user"].userId;
      });
    });
    it("should get the user's todo list", function () {
      const options = {
        method: "GET",
        url: `${Cypress.env("url_Backend")}todo/get/${this.userId}`,
      };
      cy.request(options).then(() => (response: ITodoResponse) => {
        cy.checkPostApiMessage(response.body, "All todos found");
        expect(response.body).to.have.property("status", "success");
      });
    });

    it("should create a new todo", function () {
      const options = {
        method: "POST",
        url: `${Cypress.env("url_Backend")}todo/create`,
        headers: {
          token: this.token,
        },
        body: {
          todoId: new Date(),
          todoUserId: this.userId,
          text: todoData[0].text + new Date(),
          todoDone: todoData[0].todoDone,
        },
      };
      cy.request(options).then((response: any) => {
        cy.checkPostApiMessage(response.body, "Todo is created");
        this.todoId = response.body["data"].todoId;
      });
    });

    it("should update the text of the todo", function () {
      const options = {
        method: "PUT",
        url: `${Cypress.env("url_Backend")}todo/update/${this.todoId}`,
        headers: {
          token: this.token,
        },
        body: {
          todoId: this.todoId,
          todoUserId: this.userId,
          text: "updated" + new Date(),
          todoDone: todoData[0].todoDone,
        },
      };
      cy.request(options).then((response: any) => {
        cy.checkPostApiMessage(response.body, "Todo Text updated successfully");
        expect(response.body).to.have.property("status", "OK");
      });
    });
    it("should check the todo", function () {
      const options = {
        method: "PUT",
        url: `${Cypress.env("url_Backend")}todo/done/${this.todoId}`,
        headers: {
          token: this.token,
        },
        body: {
          todoId: this.todoId,
          todoUserId: this.userId,
          text: todoData[0].text + new Date(),
          todoDone: todoData[0].todoDone === "todo" ? "done" : "todo",
        },
      };
      cy.request(options).then((response: any) => {
        cy.checkPostApiMessage(response.body, "Todo Done updated successfully");
        expect(response.body).to.have.property("status", "OK");
      });
    });

    it("should delete the todo", function () {
      const options = {
        method: "DELETE",
        url: `${Cypress.env("url_Backend")}todo/delete/${this.todoId}`,
        headers: {
          token: this.token,
        },
      };
      cy.request(options).then((response: any) => {
        cy.checkPostApiMessage(
          response.body,
          `${this.todoId} deleted successfully`
        );
      });
    });
  });
});

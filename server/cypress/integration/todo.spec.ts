

import { loginData } from "../fixtures/loginData";


import {
    IUserData,
    IResponseLogin,
    IResponseRegister,
    IUserResponse,
    ITodo,
    ITodosBody,
    ITodoResponse
  } from "../support/interfaces";


describe("Backend Login API Test Suite", () => {
      describe("Backend Login", () => {
        it("It logins to the api", function () {
          cy.request("POST", Cypress.env("url_Backend") + "login", {
            email: loginData[0].email,
            password: loginData[0].password,
          }).then((response: IResponseLogin) => {
            cy.checkPostApiMessage(
              response.body,
              "Login successfully completed!"
            );
            expect(response.body).to.have.property("access_token");
            this.token = response.body["access_token"];
            this.userId = response.body["user"].userId;
          });
        });
        it("should get the user's todo list", () => {
          const options = {
            method: "GET",
            url: `${Cypress.env("url_Backend")}todo/get/$`
          }
          cy.request(options).then(() => (response: ITodoResponse) => {
           cy.checkPostApiMessage(response.body, "All todos found")
           expect(response.body).to.have.property("status", "success")
          })
        })
       
      })
    })
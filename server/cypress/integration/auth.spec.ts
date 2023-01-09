import { registerData } from "../fixtures/registerData";
import { loginData } from "../fixtures/loginData";

import {
  IUserData,
  IResponseLogin,
  IResponseRegister,
  IUserResponse,
} from "../support/interfaces";

describe("Backend Auth API Test Suite", () => {
  for (let i = 0; i < 5; i++) {
    describe("Register user", () => {
      it("it should save the user", () => {
        cy.request("POST", Cypress.env("url_Backend") + "register", {
          userName: registerData[i].userName,
          email: registerData[i].email,
          password: registerData[i].password,
        }).then((response: IResponseRegister) => {
          cy.checkPostApiMessage(response.body, "Account has been registered");
        });
      });
    });
  }
});

describe("Backend Login API Test Suite", () => {
  for (let i = 0; i < 5; i++) {
    describe("Backend Login", () => {
      before("it should login", () => {
        cy.request("POST", Cypress.env("url_Backend") + "login", {
          email: loginData[i].email,
          password: loginData[i].password,
        }).then((response: IResponseLogin) => {
          cy.checkPostApiMessage(
            response.body,
            "Login successfully completed!"
          );

          expect(response.body).to.have.property("access_token");
        });
      });
      it("it gets users", function () {
        const options = {
          method: "GET",
          url: `${Cypress.env("url_Backend")}users`,
        };

        cy.request(options).then(function (response: IUserResponse) {
          cy.checkPostApiMessage(response.body, "All users found");
          expect(response.body).to.have.property("status", "success");
        });
      });
    });
  }
});

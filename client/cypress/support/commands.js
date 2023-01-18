Cypress.Commands.add("fillForm", (selector, value) => {
    cy.get(`#${selector}`).type(value)
})

Cypress.Commands.add("checkPostApiMessage", (body,  value) => {
    expect(body).to.have.property("message", value)
})
Cypress.Commands.add("fillForm", (selector, value) => {
    cy.get(`#${selector}`).type(value)
})
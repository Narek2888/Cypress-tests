require('cypress-plugin-tab');

describe("Mocking transaction history", () => {
    beforeEach("Filling the reg form", () => {
        cy.visit("https://staging-skindemo.draft10.com/");
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.get("button.loginButton span").click()
        cy.get("input[name='username']").type("ng8888")
            .tab().type("ng8888")
        cy.get('form').submit()

    })

    it("Checking the Transaction pagination", () => {

        cy.intercept("GET", "**api_v2/bc/getMovements?type=movement&limit=8*", { fixture: "transaction.json" }).as("transaction_response")

        cy.get("#user_icon").click()

        cy.get(".user_settings > ul > :nth-child(4) > button").click()
        cy.wait("@transaction_response")

    })
})    
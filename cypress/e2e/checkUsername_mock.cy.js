require('cypress-plugin-tab');

describe("Mocking registration errors cases", () => {
    beforeEach("Filling the reg form", () => {
        cy.visit("https://staging-papigames.draft10.com");
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.get("button.registerButton span").click()
        cy.get("input[name='cpf']").type("12984565875")
        cy.get("button.primaryButton span").click()
    })


    it.only("Checking the username error in case of duplicate username", () => {

        const duplicate_username_response = {
            "success": true,
            "result": {
                "duplicateUsername": true,
                "isAccountExist": true
            },
            "timeElapsed": 3
        }

        cy.get("input[name='username']").type("ng2889000")
        cy.intercept("GET", "**/api_v2/checkUsername?skinId=572221*", duplicate_username_response).as("getresponse")
        cy.tab()
        cy.wait("@getresponse")

    })
})
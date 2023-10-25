require('cypress-plugin-tab');

describe("Mocking registration errors cases", () => {
    beforeEach("Filling the reg form", () => {
        cy.visit("https://staging-papigames.draft10.com");
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.get("button.registerButton span").click()
    })

    it("Checking the CPF error in case of missing cpf", () => {

        const no_cpf_response = {
            "statusCode": 400,
            "body": {
                "success": false,
                "message": {
                    "key": "missing_parameter",
                    "params": [
                        "nationalId"
                    ]
                },
                "requestTrackId": "ba49b18c-0195-4840-a887-967686a990f6",
                "timeElapsed": 3
            }
        }

        cy.intercept("POST", "**/api_v2/validateCPF", no_cpf_response).as("@no_cpf_response")
        cy.get("input[name='cpf']").type("12984565875")
        cy.wait("@no_cpf_response")

    })

    it.only("Checking the CPF error in case of wrong cpf", () => {

        const wrong_cpf_response = {
            "stasusCode": 503,
            "body": {
                "success": false,
                "message": {
                    "key": "invalid_cpf",
                    "params": [
                        "cpf",
                        {
                            "cpf": "1298456587575",
                            "message": "CPF informado é inválido - COD: 1032"
                        }
                    ]
                },
                "requestTrackId": "46938055-3411-4ad8-b2eb-703580d2a967",
                "errorTrackId": "eee3118d-a627-47c7-ad1e-a76ce880dbe4",
                "timeElapsed": 385
            }
        }

        cy.intercept("POST", "**/api_v2/validateCPF", wrong_cpf_response).as("wrong_cpf_response")
        cy.get("input[name='cpf']").type("12984565875")
        cy.wait("@wrong_cpf_response")

    })

})
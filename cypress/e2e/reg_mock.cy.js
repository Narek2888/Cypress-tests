const { it } = require("mocha");
require('cypress-plugin-tab');

describe("Mocking registration errors cases", () => {
    beforeEach("Filling the reg form", () => {
        cy.visit("https://staging-papigames.draft10.com");
        cy.intercept({resourceType: /xhr|fetch/}, {log: false})
        cy.get("button.registerButton span").click()
    })

    it("Checking the CPF error in case of missing cpf", () => {
        
        const no_cpf_response = {
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

        cy.intercept("POST", "**/api_v2/validateCPF", no_cpf_response)
        cy.get("input[name='cpf']").type("12984565875")

    })

    it("Checking the CPF error in case of wrong cpf", () => {
        
        const wrong_cpf_response = {
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

        cy.intercept("POST", "**/api_v2/validateCPF", wrong_cpf_response)
        cy.get("input[name='cpf']").type("12984565875")

    })

    it("Checking the CPF error in case of wrong skinId", () => {
        
        const wrong_skinId_response = {
            "success": false,
            "message": {
                "key": "document_not_found",
                "params": [
                    "Account",
                    {}
                ]
            },
            "requestTrackId": "571a7473-ba4f-49fc-9a94-20a6f9cf2afd",
            "timeElapsed": 3
        }

        cy.intercept("POST", "**/api_v2/validateCPF", wrong_skinId_response)
        cy.get("input[name='cpf']").type("12984565875")

    })

    // it.only("Checking the username error in case of duplicate username", () => {
        
    //     const duplicate_username_response = {
    //         "success": true,
    //         "result": {
    //             "duplicateUsername": true,
    //             "isAccountExist": true
    //         },
    //         "timeElapsed": 3
    //     }

    //     cy.get("input[name='cpf']").type("12984565875")
    //     cy.get("button.primaryButton span").click()

    //     cy.get("input[name='username']").type("ng2889")
    //     cy.intercept("GET", "https://stagingapi.draft10.com/api_v2/checkUsername?skinId=572221&username=ng2888&field=username", duplicate_username_response).as("getresponse")
    //     cy.wait("@getresponse")
    //     cy.tab()

    // })

    it("Checking the error in case of duplicate username", () => {
        
        // const duplicate_username_response = {
        //     "success": false,
        //     "message": {
        //         "key": "duplicate_document",
        //         "params": [
        //             "username",
        //             {
        //                 "username": "ngstaging1234",
        //                 "skinId": 572221
        //             }
        //         ]
        //     },
        //     "requestTrackId": "5eb4217d-4968-4d84-a0d5-70a2edbf2594",
        //     "error": "{\"message\":\"Account with username ngstaging1234 already exists!\"}",
        //     "timeElapsed": 13
        // }

        cy.intercept("POST", "**/api_v2/playerRegistration", {fixture: "duplicate_username.json"})

        cy.get("input[name='cpf']").type("12984565875")
        cy.get("button.primaryButton span").click()
        cy.get("input[name='username']")
        .type("ng2889").tab()
        .type("ng2889").tab()
        .type("ng2889").tab()
        .type("1234").tab()
        .type("ng@2889.com")
        cy.get("[type='checkbox']").check({force:true})
        cy.get("[id^=registration-submit-btn]").click({ multiple: true }, {force: true})
    })

    it("Checking the error in case of missing skinId", () => {
        
        const no_skinId_response = {
            "success": false,
            "message": {
                "key": "missing_parameter",
                "params": [
                    "skinId"
                ]
            },
            "requestTrackId": "7882f873-7d32-4711-9179-2bfaa9399716",
            "timeElapsed": 1
        }

        cy.intercept("POST", "**/api_v2/playerRegistration", no_skinId_response)

        cy.get("input[name='cpf']").type("12984565875")
        cy.get("button.primaryButton span").click()
        cy.get("input[name='username']")
        .type("ng2889").tab()
        .type("ng2889").tab()
        .type("ng2889").tab()
        .type("1234").tab()
        .type("ng@2889.com")
        cy.get("[type='checkbox']").check({force:true})
        cy.get("[id^=registration-submit-btn]").click({ multiple: true }, {force: true})
    })

    it("Checking the error in case of missing username", () => {
        
        const no_username_response = {
            "success": false,
            "message": {
                "key": "missing_parameter",
                "params": [
                    "username"
                ]
            },
            "requestTrackId": "b742652b-ae37-4467-97df-f137c9930a84",
            "timeElapsed": 12
        }

        cy.intercept("POST", "**/api_v2/playerRegistration", no_username_response)

        cy.get("input[name='cpf']").type("12984565875")
        cy.get("button.primaryButton span").click()
        cy.get("input[name='username']")
        .type("ng2889").tab()
        .type("ng2889").tab()
        .type("ng2889").tab()
        .type("1234").tab()
        .type("ng@2889.com")
        cy.get("[type='checkbox']").check({force:true})
        cy.get("[id^=registration-submit-btn]").click({ multiple: true }, {force: true})
    })

    it("Checking the error in case of missing password", () => {
        
        var no_password_response = {
            "success": false,
            "message": {
                "key": "missing_parameter",
                "params": [
                    "password"
                ]
            },
            "requestTrackId": "cf6c366d-31ff-4159-8c43-b4d3e8e12d3f",
            "timeElapsed": 10
        }

        cy.intercept("POST", "**/api_v2/playerRegistration", no_password_response)

        cy.get("input[name='cpf']").type("12984565875")
        cy.get("button.primaryButton span").click()
        cy.get("input[name='username']")
        .type("ng2889").tab()
        .type("ng2889").tab()
        .type("ng2889").tab()
        .type("1234").tab()
        .type("ng@2889.com")
        cy.get("[type='checkbox']").check({force:true})
        cy.get("[id^=registration-submit-btn]").click({ multiple: true }, {force: true})
    })

    it.only("Checking the error in case of missing phone number", () => {
        
        var no_phone_response = {
            "success": false,
            "message": {
                "key": "missing_parameter",
                "params": [
                    "phoneNumber"
                ]
            },
            "requestTrackId": "6eccd2b4-c997-470a-9747-0f942c9aee92",
            "timeElapsed": 17
        }

        cy.intercept("POST", "**/api_v2/playerRegistration", no_phone_response)

        cy.get("input[name='cpf']").type("12984565875")
        cy.get("button.primaryButton span").click()
        cy.get("input[name='username']")
        .type("ng2989").tab()
        .type("ng2889").tab()
        .type("ng2889").tab()
        .type("1234").tab()
        .type("ng@2889.com")
        cy.get("[type='checkbox']").check({force:true})
        
        cy.get("[id^=registration-submit-btn]").click({ multiple: true }, {force: true})
    })

    it("Checking the error in case of duplicate email", () => {
        
        var duplicate_email_response = {
            "success": false,
            "message": {
                "key": "duplicate_document",
                "params": [
                    "Account",
                    [
                        "email"
                    ]
                ]
            },
            "requestTrackId": "7abe9aa1-d5fc-45fe-b597-846313028caf",
            "error": "{\"message\":\"Duplicate email!\"}",
            "timeElapsed": 124
        }

        cy.intercept("POST", "**/api_v2/playerRegistration", duplicate_email_response).as("dup_email_response")

        cy.get("input[name='cpf']").type("12984565875")
        cy.get("button.primaryButton span").click()
        cy.get("input[name='username']")
        .type("ng2989").tab()
        .type("ng2889").tab()
        .type("ng2889").tab()
        .type("1234").tab()
        .type("ng@2889.com")
        cy.get("[type='checkbox']").check({force:true})
        
        // cy.wait("@dup_email_response")
        cy.get("[id^=registration-submit-btn]").click({ multiple: true }, {force: true})
    })
})
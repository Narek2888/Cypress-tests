require('cypress-plugin-tab');

describe("Mocking registration errors cases", () => {
    beforeEach("Filling the reg form", () => {
        cy.visit("https://staging-papigames.draft10.com");
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.get("button.registerButton span").click()
        cy.get("input[name='cpf']").type("12984565875")
        cy.get("button.primaryButton span").click()
        cy.get("input[name='username']")
            .type("ng288900").tab()
            .type("ng28890").tab()
            .type("ng28890").tab()
            .type("1234").tab()
            .type("ng@28890.com")
        cy.get("[type='checkbox']").check({ force: true })
    })

    it("Checking the error in case of duplicate username", () => {

        const duplicate_username_response = {
            "statusCode": 409,
            "body": {
                "success": false,
                "message": {
                    "key": "duplicate_document",
                    "params": [
                        "username",
                        {
                            "username": "ngstaging1234",
                            "skinId": 572221
                        }
                    ]
                },
                "requestTrackId": "5eb4217d-4968-4d84-a0d5-70a2edbf2594",
                "error": "{\"message\":\"Account with username ngstaging1234 already exists!\"}",
                "timeElapsed": 13
            }
        }

        cy.intercept("POST", "**/api_v2/playerRegistration", duplicate_username_response).as("duplicate_response")
        cy.get("[id^=registration-submit-btn]").click({ multiple: true }, { force: true })
        cy.wait("@duplicate_response")
    })

    it("Checking the error in case of missing skinId", () => {

        const no_skinId_response = {
            "statusCode": 400,
            "body": {
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
        }

        cy.intercept("POST", "**/api_v2/playerRegistration", no_skinId_response).as("no_skinId_resp")
        cy.get("[id^=registration-submit-btn]").click({ multiple: true }, { force: true })
        cy.wait("@no_skinId_resp")
    })

    it("Checking the error in case of missing username", () => {

        const no_username_response = {
            "statusCode": 400,
            "body": {
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
        }

        cy.intercept("POST", "**/api_v2/playerRegistration", no_username_response).as("no_username_resp")
        cy.get("[id^=registration-submit-btn]").click({ multiple: true }, { force: true })
        cy.wait("@no_username_resp")
    })

    it("Checking the error in case of missing password", () => {

        var no_password_response = {
            "statusCode": 400,
            "body": {
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
        }

        cy.intercept("POST", "**/api_v2/playerRegistration", no_password_response).as("no_pwd_resp")
        cy.get("[id^=registration-submit-btn]").click({ multiple: true }, { force: true })
        cy.wait("@no_pwd_resp")
    })

    it("Checking the error in case of missing phone number", () => {

        var no_phone_response = {
            "statusCode": 400,
            "body": {
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
        }

        cy.intercept("POST", "**/api_v2/playerRegistration", no_phone_response).as("no_phone_resp")
        cy.get("[id^=registration-submit-btn]").click({ multiple: true }, { force: true })
        cy.wait("@no_phone_resp")
    })

    it("Checking the error in case of duplicate email", () => {

        var duplicate_email_response = {
            "statusCode": 409,
            "body": {
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
        }

        cy.intercept("POST", "**/api_v2/playerRegistration", duplicate_email_response).as("dup_email_response")
        cy.get("[id^=registration-submit-btn]").click({ multiple: true }, { force: true })
        cy.wait("@dup_email_response")
    })

})
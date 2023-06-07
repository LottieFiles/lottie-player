/**
 * Copyright 2022 Design Barn Inc.
 */

context("Lottie-interactivity compatibility check", () => {

    beforeEach(() => {
        cy.visit("http://localhost:8000/interactivity.html", {
            onBeforeLoad(win) {
                cy.stub(win.console, 'log').as('consoleLog')
                cy.stub(win.console, 'error').as('consoleError')
              }
        });
    });

    it("Should not have any errors on the page loading lottie-interactivity", function () {
        cy.get('@consoleError').should('not.be.calledOnce');
    });
});

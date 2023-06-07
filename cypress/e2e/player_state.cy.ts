/**
 * Copyright 2022 Design Barn Inc.
 */

context("Player state", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/player-state.html");
  });

  it("Player-one should be autoplaying and looping.", function (done) {
    cy.get("#player-one").then(($el) => {
      const playerOne = $el.get(0);

      playerOne.addEventListener("ready", () => {
        expect(playerOne.currentState).to.eq("playing");
        expect(playerOne.loop).to.eq(true);
        done();
      });
    });
  });

  it("Player-two should not be autoplaying.", function (done) {
    cy.get("#player-two").then(($el) => {
      const playerTwo = $el.get(0);

      playerTwo.addEventListener("ready", () => {
        expect(playerTwo.currentState).to.eq("loading");
        done();
      });
    });
  });

  it("Player-three should be paused.", function (done) {
    cy.get("#player-three").then(($el) => {
      const playerThree = $el.get(0);

      playerThree.addEventListener("ready", () => {
        playerThree.pause();
        expect(playerThree.currentState).to.eq("paused");
        done();
      });
    });
  });

  it("Player-four should resume playing.", function (done) {
    cy.get("#player-four").then(($el) => {
      const playerFour = $el.get(0);

      playerFour.addEventListener("ready", () => {
        playerFour.pause();
        playerFour.play();
        expect(playerFour.currentState).to.eq("playing");
        done();
      });
    });
  });

  it("Player-five should be destroyed.", function (done) {
    cy.get("#player-five").then(($el) => {
      const playerFive = $el.get(0);

      playerFive.addEventListener("destroyed", (e) => {
        expect(playerFive.currentState).to.eq("destroyed");
        done();
      });

      playerFive.destroy();
    });
  });

  it("Player-six should have an error (bad url).", function (done) {
    cy.get("#player-six").then(($el) => {
      const playerSix = $el.get(0);

      playerSix.addEventListener(
        "error",
        () => {
          expect(playerSix.currentState).to.eq("error");
          done();
        },
        { once: true }
      );
    });
  });

  it("Player-seven should have an error (invalid json).", function (done) {
    cy.get("#player-seven").then(($el) => {
      const playerSeven = $el.get(0);

      playerSeven.addEventListener(
        "error",
        () => {
          expect(playerSeven.currentState).to.eq("error");
          done();
        },
        { once: true }
      );
    });
  });

  it("Player-eight should play on hover.", function (done) {
    cy.get("#player-eight").then(($el) => {
      const playerEight = $el.get(0);

      playerEight.addEventListener("play", () => {
        expect(playerEight.currentState).to.eq("playing");
        done();
      });
    });
    cy.get("#player-eight").trigger("mouseenter");
  });
});

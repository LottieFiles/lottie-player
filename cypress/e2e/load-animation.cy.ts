/**
 * Copyright 2023 Design Barn Inc.
 */

import { LottiePlayer } from 'lottie-web';

context('Player component DOM check', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/');
  });

  it('Loads an animation using the "load" method of the player.', () => {
    cy.get('#player-one').should('have.length', 1);
  });

  it('Loads an animation using the "load" method of the player with invalid json.', function (done) {
    cy.get('#player-two').then(($el) => {
      const playerTwo = $el.get(0) as unknown as HTMLElement & LottiePlayer;

      playerTwo.addEventListener(
        'error',
        () => {
          expect(playerTwo.currentState).to.eq('error');
          done();
        },
        { once: true },
      );
    });
  });

  it('Loads an animation using the "load" method of the player with invalid url.', function (done) {
    cy.get('#player-three').then(($el) => {
      const playerThree = $el.get(0);

      playerThree.addEventListener(
        'error',
        () => {
          console.log('error');
          expect(playerThree.currentState).to.eq('error');
          done();
        },
        { once: true },
      );
    });
    cy.on('uncaught:exception', (err, runnable) => {
      done();
    });
  });

  it('looks inside shadow-dom div for animation-container class', () => {
    cy.get('#player-one lottie-player').shadow().find('#animation-container').should('have.class', 'main');
  });

  it('looks inside shadow-dom for aria-label', () => {
    cy.get('#player-one lottie-player').shadow().find('#animation-container').should('have.attr', 'aria-label');
  });

  it('looks inside shadow-dom for controls', () => {
    cy.get('#player-one lottie-player')
      .shadow()
      .find('#animation-container')
      .find('#lottie-controls')
      .should('have.attr', 'aria-label');
  });
});

/**
 * Copyright 2023 Design Barn Inc.
 */

import { PlayerState } from '../../dist/lottie-player.mjs';
import { html } from 'lit';
import * as squid from '../fixtures/squid.json';

describe('Controls', () => {
  it('should not render controls by default', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          autoplay
          loop
          style="height: 200px;"
          src=${JSON.stringify(squid)}
        >
        </lottie-player>
      `,
    );

    cy.get('[data-testid="testPlayer"]').shadow().find('[aria-label="lottie-animation-controls"]').should('not.exist');
  });

  it('should render controls when controls = `true`', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          autoplay
          loop
          controls
          style="height: 200px;"
          src=${JSON.stringify(squid)}
        >
        </lottie-player>
      `,
    );

    cy.get('[data-testid="testPlayer"]').shadow().find('[aria-label="lottie-animation-controls"]').should('exist');
  });

  it('should start to play when play button is pressed.', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          controls
          loop
          style="height: 200px;"
          src=${JSON.stringify(squid)}
        >
        </lottie-player>
      `,
    );

    cy.wait(3000);
    // Not playing initially
    cy.get('[name="currentState"]').should('have.value', PlayerState.Ready);

    cy.get('[data-testid="testPlayer"]').shadow().find('[aria-label="play-pause"]').click();
    cy.get('[name="currentState"]').should('have.value', PlayerState.Playing);
  });

  it('should be able to pause', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          autoplay
          loop
          controls
          style="height: 200px;"
          src=${JSON.stringify(squid)}
        >
        </lottie-player>
      `,
    );

    // Playing initially
    cy.get('[name="currentState"]').should('have.value', PlayerState.Playing);

    cy.get('[data-testid="testPlayer"]').shadow().find('[aria-label="play-pause"]').click();
    cy.get('[name="currentState"]').should('have.value', PlayerState.Paused);
  });

  it('should be able to stop', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          autoplay
          loop
          controls
          style="height: 200px;"
          src=${JSON.stringify(squid)}
        >
        </lottie-player>
      `,
    );

    // Playing initially
    cy.get('[name="currentState"]').should('have.value', PlayerState.Playing);

    cy.get('[data-testid="testPlayer"]').shadow().find('[aria-label="stop"]').click();
    cy.get('[name="currentState"]').should('have.value', PlayerState.Stopped);
  });

  it('should be able toggle looping', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          autoplay
          loop
          controls
          style="height: 200px;"
          src=${JSON.stringify(squid)}
        >
        </lottie-player>
      `,
    );

    cy.get('[name="currentState"]').should('have.value', PlayerState.Playing);

    // Loop is true initially
    // cy.get('[data-testid="testPlayer"]').shadow().find('[aria-label="loop-toggle"]').should('have.class', 'active');
    cy.get('[name="loop"]').should('have.value', 'true');

    cy.get('[data-testid="testPlayer"]').shadow().find('[aria-label="loop-toggle"]').click();
    cy.get('[name="loop"]').should('have.value', 'false');
    // cy.get('[data-testid="testPlayer"]').shadow().find('[aria-label="loop-toggle"]').should('not.have.class', 'active');
  });
});

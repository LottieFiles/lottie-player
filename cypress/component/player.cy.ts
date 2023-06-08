/**
 * Copyright 2023 Design Barn Inc.
 */

import { PlayerState } from '../../dist/lottie-player.mjs';
import { html } from 'lit';
import * as squid from '../fixtures/squid.json';

describe('Player', () => {
  it('should mount', () => {
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

    cy.get('[data-testid="testPlayer"]').shadow().find('#animation').should('exist');
  });

  it('should be able to play .json', () => {
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

    cy.wait(3000);
    cy.get('[name="currentState"]').should('have.value', PlayerState.Playing);
  });

  it.skip('shows error when url is invalid', () => {
    try{
      cy.mount(
        html`
          <lottie-player data-testid="testPlayer" loop controls style="height: 200px;" src="https://invalid.lottie">
          </lottie-player>
        `,
      );

      cy.get('[name="currentState"]').should('have.value', PlayerState.Error);
      cy.get('[data-testid="testPlayer"]').shadow().find('.error').should('exist');
    } catch (error) {

    }
  });
});

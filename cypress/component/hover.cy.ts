/**
 * Copyright 2023 Design Barn Inc.
 */

import { html } from 'lit';
import { PlayerState } from '../../dist/lottie-player.mjs';
import * as squid from '../fixtures/squid.json';

describe('Hover', () => {
  it('hover should default to `false`', () => {
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

    cy.get('[name="hover"]').should('have.value', 'false');
  });

  it('should not play when `hover` = `true`', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          hover
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
    cy.get('[name="hover"]').should('have.value', 'true');
    cy.get('[name="currentState"]').should('have.value', PlayerState.Ready);
    cy.get('[name="currentState"]').should('not.have.value', PlayerState.Playing);
  });

  it('should play on hover when `hover` is enabled', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          hover
          autoplay
          loop
          controls
          style="height: 200px;"
          src=${JSON.stringify(squid)}
        >
        </lottie-player>
      `,
    );

    cy.wait(1);
    cy.get('[name="currentState"]').should('not.have.value', PlayerState.Playing);

    cy.get('[data-testid="testPlayer"]').shadow().find('#animation > *').trigger('mouseenter');
    cy.get('[name="currentState"]').should('have.value', PlayerState.Playing);

    cy.get('[data-testid="testPlayer"]').shadow().find('#animation > *').trigger('mouseleave');
    cy.get('[name="currentState"]').should('have.value', PlayerState.Stopped);
  });
});

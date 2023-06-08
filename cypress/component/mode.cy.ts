/**
 * Copyright 2023 Design Barn Inc.
 */

import { PlayMode } from '../../dist/lottie-player.mjs';
import { html } from 'lit';
import * as squid from '../fixtures/squid.json';

describe('Mode', () => {
  it('mode should default to `normal`', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          autoplay
          controls
          style="height: 200px;"
          src=${JSON.stringify(squid)}
        >
        </lottie-player>
      `,
    );

    cy.get('[name="playMode"]').should('have.value', PlayMode.Normal);
  });

  it('should be able to change mode to `bounce`', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          mode=${PlayMode.Bounce}
          autoplay
          controls
          style="height: 200px;"
          src=${JSON.stringify}
        >
        </lottie-player>
      `,
    );

    cy.get('[name="playMode"]').should('have.value', PlayMode.Bounce);
  });

  it('should be able to change mode to `normal`', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          mode=${PlayMode.Normal}
          autoplay
          controls
          style="height: 200px;"
          src=${JSON.stringify}
        >
        </lottie-player>
      `,
    );

    cy.get('[name="playMode"]').should('have.value', PlayMode.Normal);
  });
});

/**
 * Copyright 2023 Design Barn Inc.
 */

import { html } from 'lit';
import * as squid from '../fixtures/squid.json';

describe('Intermission', () => {
  it('intermission should default to `0`', () => {
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

    cy.wait(1000);
    cy.get('[name="intermission"]').should('have.value', 0);
  });

  it('should be able to set intermission', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          intermission=${1000}
          autoplay
          loop
          controls
          style="height: 200px;"
          src=${JSON.stringify}
        >
        </lottie-player>
      `,
    );

    cy.wait(1000);
    cy.get('[name="intermission"]').should('have.value', 1000);
  });
});

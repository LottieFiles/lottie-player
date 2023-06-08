/**
 * Copyright 2023 Design Barn Inc.
 */

import { html } from 'lit';
import * as squid from '../fixtures/squid.json';

describe('Speed', () => {
  it('default speed should be 1', () => {
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
    cy.get('[name="speed"]').should('have.value', 1);
  });

  it('should be able to change speed to 2', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          speed=${2}
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
    cy.get('[name="speed"]').should('have.value', 2);
  });
});

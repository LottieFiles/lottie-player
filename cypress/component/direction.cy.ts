/**
 * Copyright 2023 Design Barn Inc.
 */

import { html } from 'lit';
import * as squid from '../fixtures/squid.json';

describe('Direction', () => {
  it('direction should default to 1', () => {
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
    cy.get('[name="direction"]').should('have.value', 1);
  });

  it('should be able to change direction to 1', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          direction=1
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
    cy.get('[name="direction"]').should('have.value', 1);
  });

  it('should be able to change direction to -1', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          direction="-1"
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
    cy.get('[name="direction"]').should('have.value', '-1');
  });
});

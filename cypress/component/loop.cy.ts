/**
 * Copyright 2023 Design Barn Inc.
 */

import { html } from 'lit';
import * as squid from '../fixtures/squid.json';

describe('Loop', () => {
  it('should default to `false`', () => {
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

    cy.wait(1000);
    cy.get('[name="loop"]').should('have.value', 'false');
  });

  it('should be able to set `loop` = `true`', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          loop
          autoplay
          controls
          style="height: 200px;"
          src=${JSON.stringify}
        >
        </lottie-player>
      `,
    );

    cy.wait(1000);
    cy.get('[name="loop"]').should('have.value', 'true');
  });

  it('should be able to set number loops', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          loop="true"
          count=3
          autoplay
          controls
          style="height: 200px;"
          src=${JSON.stringify}
        >
        </lottie-player>
      `,
    );

    cy.wait(1000);
    cy.get('[name="count"]').should('have.value', 3);
  });
});

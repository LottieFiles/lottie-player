/**
 * Copyright 2023 Design Barn Inc.
 */

import { html } from 'lit';
import * as squid from '../fixtures/squid.json';

describe('Background', () => {
  it('should able set background color', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          background="rgb(26, 189, 70)"
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
    cy.get('[data-testid="testPlayer"]')
      .shadow()
      .find('.animation')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(26, 189, 70)');
  });
});

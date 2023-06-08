/**
 * Copyright 2023 Design Barn Inc.
 */

// import { PlayerState } from 'lottie-player';
import { html } from 'lit';
import { PlayerState } from '../../dist/lottie-player.mjs';
import * as squid from '../fixtures/squid.json';

describe('Autoplay', () => {
  it('should play with `autoplay` prop', () => {
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
    cy.get('[name="currentState"]').should('have.value', PlayerState.Playing);
  });

  it('should not play when `autoplay` = `false`', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          controls
          style="height: 200px;"
          src=${JSON.stringify(squid)}
        >
        </lottie-player>
      `,
    );

    cy.wait(1000);
    cy.get('[name="currentState"]').should('have.value', PlayerState.Ready);
    cy.get('[name="currentState"]').should('not.have.value', PlayerState.Playing);
  });

  it('should not play when `playOnHover` = `true` even though `autoplay` = `true`', () => {
    cy.mount(
      html`
        <lottie-player
          data-testid="testPlayer"
          autoplay
          hover
          loop
          controls
          style="height: 200px;"
          src=${JSON.stringify(squid)}
        >
        </lottie-player>
      `,
    );

    cy.wait(1000);
    cy.get('[name="currentState"]').should('have.value', PlayerState.Ready);
    cy.get('[name="currentState"]').should('not.have.value', PlayerState.Playing);
  });
});

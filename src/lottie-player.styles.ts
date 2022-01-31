/**
 * Copyright 2021 Design Barn Inc.
 */

import { css } from "lit";

export default css`
  * {
    box-sizing: border-box;
  }

  :host {
    --lottie-player-toolbar-height: 35px;
    --lottie-player-toolbar-background-color: transparent;
    --lottie-player-toolbar-icon-color: #999;
    --lottie-player-toolbar-icon-hover-color: #222;
    --lottie-player-toolbar-icon-active-color: #555;
    --lottie-player-seeker-track-color: #ccc;
    --lottie-player-seeker-thumb-color: rgba(0, 107, 120, 0.8);
    --lottie-player-seeker-display: block;

    display: block;
    width: 100%;
    height: 100%;
  }

  .main {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .animation {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .animation.controls {
    height: calc(100% - 35px);
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-items: center;
    background-color: var(--lottie-player-toolbar-background-color);
    margin: 0 5px;
    height: 35px;
  }

  .toolbar button {
    cursor: pointer;
    fill: var(--lottie-player-toolbar-icon-color);
    display: flex;
    background: none;
    border: 0;
    padding: 0;
    outline: none;
    height: 100%;
  }

  .toolbar button:hover {
    fill: var(--lottie-player-toolbar-icon-hover-color);
  }

  .toolbar button.active {
    fill: var(--lottie-player-toolbar-icon-active-color);
  }

  .toolbar button.active:hover {
    fill: var(--lottie-player-toolbar-icon-hover-color);
  }

  .toolbar button:focus {
    outline: 1px dotted var(--lottie-player-toolbar-icon-active-color);
  }

  .toolbar button svg {
  }

  .toolbar button.disabled svg {
    display: none;
  }

  .seeker {
    -webkit-appearance: none;
    width: 95%;
    outline: none;
    background-color: var(--lottie-player-toolbar-background-color);
    display: var(--lottie-player-seeker-display);
  }

  .seeker::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: var(--lottie-player-seeker-track-color);
    border-radius: 3px;
  }
  .seeker::-webkit-slider-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: var(--lottie-player-seeker-thumb-color);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
  }
  .seeker:focus::-webkit-slider-runnable-track {
    background: #999;
  }
  .seeker::-moz-range-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: var(--lottie-player-seeker-track-color);
    border-radius: 3px;
  }
  .seeker::-moz-range-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: var(--lottie-player-seeker-thumb-color);
    cursor: pointer;
  }
  .seeker::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  .seeker::-ms-fill-lower {
    background: var(--lottie-player-seeker-track-color);
    border-radius: 3px;
  }
  .seeker::-ms-fill-upper {
    background: var(--lottie-player-seeker-track-color);
    border-radius: 3px;
  }
  .seeker::-ms-thumb {
    border: 0;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: var(--lottie-player-seeker-thumb-color);
    cursor: pointer;
  }
  .seeker:focus::-ms-fill-lower {
    background: var(--lottie-player-seeker-track-color);
  }
  .seeker:focus::-ms-fill-upper {
    background: var(--lottie-player-seeker-track-color);
  }

  .error {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
  }
`;

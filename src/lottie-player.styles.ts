import { css } from 'lit-element';

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
  --lottie-player-seeker-track-color: #CCC;
  --lottie-player-seeker-thumb-color: rgba(0, 107, 120, 0.8);

  display: block;
  width: 100%;
  height: 100%;
}

.main {
  box-sizing: border-box;
  display: inline-grid;
  grid-auto-columns: auto;
  grid-template-rows: auto;
  position: relative;
  height: inherit;
  width: inherit;
}

.main.controls {
  grid-template-rows: 1fr var(--lottie-player-toolbar-height);
}

.animation {
  overflow: hidden;
  height: calc(1fr - var(--lottie-player-toolbar-height));
}

.toolbar {
  display: grid;
  grid-template-columns: 32px 32px 1fr 32px;
  align-items: center;
  justify-items: center;
  background-color: var(--lottie-player-toolbar-background-color);
  margin: 0 5px;
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

.toolbar button svg {
}

.toolbar button.disabled svg {
  display: none;
}

.seeker {
  -webkit-appearance: none;
  width: 95%;
  outline: none;
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

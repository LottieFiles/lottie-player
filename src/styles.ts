import { css } from 'lit-element';

export default css`
* {
  box-sizing: border-box;
}

:host {
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Droid Sans", "Helvetica Neue", sans-serif;
  --font-size: 13px;
  --text-color: #555;
  --toolbar-height: 35px;
  --toolbar-background-color: transparent;
  --toolbar-icon-color: #999;
  --toolbar-icon-hover-color: #222;
  --toolbar-icon-active-color: #555;
  --drawer-background-color: #FFF;
  --seeker-track-color: #CCC;
  --seeker-thumb-color: rgba(0, 107, 120, 0.8);

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
  grid-template-rows: 1fr var(--toolbar-height);
}

.animation {
  overflow: hidden;
  height: calc(1fr - var(--toolbar-height));
}

.toolbar {
  display: grid;
  grid-template-columns: 32px 32px 1fr 32px 32px;
  align-items: center;
  justify-items: center;
  background-color: var(--toolbar-background-color);
}

.toolbar button {
  cursor: pointer;
  fill: var(--toolbar-icon-color);
  display: flex;
  background: none;
  border: 0;
  padding: 0;
  outline: none;
  height: 100%;
}

.toolbar button:hover {
  fill: var(--toolbar-icon-hover-color);
}

.toolbar button.active {
  fill: var(--toolbar-icon-active-color);
}

.toolbar button svg {
}

.toolbar button.disabled svg {
  display: none;
}

.toolbar a {
  filter: grayscale(100%);
  display: flex;
  transition: filter .5s, opacity 0.5s;
  opacity: 0.4;
  height: 100%;
  align-items: center;
}

.toolbar a:hover {
  filter: none;
  display: flex;
  opacity: 1;
}

.toolbar a svg {
}

.drawer {
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  background-color: var(--drawer-background-color);
  position: absolute;
  height: 50%;
  bottom: 30px;
  opacity: 0;
  width: 100%;
  transition: opacity .5s 0s;
  z-index: 10;
  box-shadow: 0 -12px 6px 6px rgba(0, 0,0, 0.2);
}

.drawer.visible {
  opacity: 1;
  z-index: 100;
}

.drawer-close {
  font-size: 18px;
  cursor: pointer;
  padding: 10px 15px;
  color: rgba(0, 0, 0, 0.5);
  transition: opacity .25s;
  position: absolute;
  right: 5px;
  top: 0;
  display: flex;
  height: 30px;
  align-items: center;
}
.drawer-close:hover {
  color: rgba(0, 0, 0, 1);
}

.drawer-title {
  border-bottom: 1px #ccc solid;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-content {
  padding: 20px;
}

.drawer-content h3 {
  margin-top: 0;
}

.avatar {
  float: right;
  width: 100px;
  height: 100px;
}

.created, .updated {
  font-size: 12px;
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
  background: var(--seeker-track-color);
  border-radius: 3px;
}
.seeker::-webkit-slider-thumb {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: var(--seeker-thumb-color);
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
  background: var(--seeker-track-color);
  border-radius: 3px;
}
.seeker::-moz-range-thumb {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: var(--seeker-thumb-color);
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
  background: var(--seeker-track-color);
  border-radius: 3px;
}
.seeker::-ms-fill-upper {
  background: var(--seeker-track-color);
  border-radius: 3px;
}
.seeker::-ms-thumb {
  border: 0;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: var(--seeker-thumb-color);
  cursor: pointer;
}
.seeker:focus::-ms-fill-lower {
  background: var(--seeker-track-color);
}
.seeker:focus::-ms-fill-upper {
  background: var(--seeker-track-color);
}

.error {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
}
`;

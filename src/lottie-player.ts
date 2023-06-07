/**
 * Copyright 2023 Design Barn Inc.
 */

import { CSSResult, LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { TemplateResult } from 'lit/html.js';
import { AnimationItem } from 'lottie-web';
import * as lottie from 'lottie-web/build/player/lottie_worker.min.js';

import pkg from '../package.json';

import styles from './lottie-player.styles';

// Define valid player states
export enum PlayerState {
  Destroyed = 'destroyed',
  Error = 'error',
  Frozen = 'frozen',
  Loading = 'loading',
  Paused = 'paused',
  Playing = 'playing',
  Stopped = 'stopped',
}

// Define play modes
export enum PlayMode {
  Bounce = 'bounce',
  Normal = 'normal',
}

// Define player events
export enum PlayerEvents {
  Complete = 'complete',
  Destroyed = 'destroyed',
  Error = 'error',
  Frame = 'frame',
  Freeze = 'freeze',
  Load = 'load',
  Loop = 'loop',
  Pause = 'pause',
  Play = 'play',
  Ready = 'ready',
  Rendered = 'rendered',
  Stop = 'stop',
}

export interface Versions {
  lottiePlayerVersion: string;
  lottieWebVersion: string;
}

/**
 * Parse a resource into a JSON object or a URL string
 */
export function parseSrc(src: string | AnimationItem): string | AnimationItem {
  if (typeof src === 'object') {
    return src;
  }

  try {
    return JSON.parse(src);
  } catch (_error) {
    // Try construct an absolute URL from the src URL
    const srcUrl: URL = new URL(src, window.location.href);

    return srcUrl.toString();
  }
}

function isLottie(json: Record<string, any>): boolean {
  const mandatory: string[] = ['v', 'ip', 'op', 'layers', 'fr', 'w', 'h'];

  return mandatory.every((field: string) => Object.prototype.hasOwnProperty.call(json, field));
}

async function fromURL(url: string): Promise<Record<string, any>> {
  if (typeof url !== 'string') {
    throw new Error(`The url value must be a string`);
  }

  let json;

  try {
    // Try construct an absolute URL from the src URL
    const srcUrl: URL = new URL(url);

    // Fetch the JSON file from the URL
    const result: any = await fetch(srcUrl.toString());

    json = await result.json();
  } catch (err) {
    throw new Error(`An error occurred while trying to load the Lottie file from URL`);
  }

  return json;
}
/**
 * LottiePlayer web component class
 *
 */
@customElement('lottie-player')
export class LottiePlayer extends LitElement {
  /**
   * Autoplay animation on load.
   */
  @property({ type: Boolean })
  public autoplay: boolean = false;

  /**
   * Background color.
   */
  @property({ type: String, reflect: true })
  public background?: string = 'transparent';

  /**
   * Show controls.
   */
  @property({ type: Boolean })
  public controls: boolean = false;

  /**
   * Number of times to loop animation.
   */
  @property({ type: Number })
  public count?: number;

  /**
   * Player state.
   */
  @property({ type: String })
  public currentState: PlayerState = PlayerState.Loading;

  /**
   * Animation description for screen readers.
   */
  @property({ type: String })
  public description: string = 'Lottie animation';

  /**
   * Direction of animation.
   */
  @property({ type: Number })
  public direction: number = 1;

  /**
   * Disable checking if the Lottie is valid before loading
   */
  @property({ type: Boolean })
  public disableCheck?: boolean = false;

  /**
   * Disable using shadow dom as the root
   */
  @property({ type: Boolean })
  public disableShadowDOM: boolean = false;

  /**
   * Whether to play on mouse hover
   */
  @property({ type: Boolean })
  public hover: boolean = false;

  /**
   * Intermission
   */
  @property()
  public intermission: number = 1;

  /**
   * Whether to loop animation.
   */
  @property({ type: Boolean, reflect: true })
  public loop: boolean = false;

  /**
   * Play mode.
   */
  @property()
  public mode: PlayMode = PlayMode.Normal;

  /**
   * Aspect ratio to pass to lottie-web.
   */
  @property({ type: String })
  public preserveAspectRatio: string = 'xMidYMid meet';

  /**
   * Renderer to use.
   */
  @property({ type: String })
  public renderer: 'svg' | 'canvas' = 'svg';

  /**
   * seeker
   */
  @state()
  public seeker: number = 0;

  /**
   * Animation speed.
   */
  @property({ type: Number })
  public speed: number = 1;

  /**
   * Bodymovin JSON data or URL to JSON.
   */
  @property({ type: String })
  public src?: string;

  /**
   * Viewbox size for renderer settings
   */
  @property({ type: String })
  public viewBoxSize?: string;

  /**
   * Enable web workers
   */
  @property({ type: Boolean })
  public webworkers?: boolean;

  /**
   * Animation container.
   */
  @query('#animation')
  protected container!: HTMLElement;

  private _counter: number = 1;

  private _io: IntersectionObserver | null = null;

  // private _ro: ResizeObserver | undefined = undefined;
  private _lottie?: any;

  /**
   * Destroy animation and lottie-player element.
   */
  public destroy(): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.destroy();
    this._lottie = null;
    this.currentState = PlayerState.Destroyed;
    this.dispatchEvent(new CustomEvent(PlayerEvents.Destroyed));
    this.remove();
  }

  // public override dispatchEvent(event: Event): boolean {
  //   this.requestUpdate();

  //   return super.dispatchEvent(event);
  // }

  /**
   * Cleanup on component destroy.
   */
  public disconnectedCallback(): void {
    // Don't clean up if node is still connected to the context (i.e. this is a move).
    if (this.isConnected) return;

    // Remove intersection observer for detecting component being out-of-view.
    if (this._io) {
      this._io.disconnect();
      this._io = null;
    }

    // Remove resize observer for detecting resize/reflow events affecting element.
    // if (this._ro) {
    //   this._ro.disconnect();
    //   this._ro = undefined;
    // }

    // Remove the attached Visibility API's change event listener.
    document.removeEventListener('visibilitychange', () => this._onVisibilityChange());

    // Destroy the animation instance and element
    this.destroy();
  }

  /**
   * Returns the lottie-web instance used in the component.
   */
  public getLottie(): any {
    return this._lottie;
  }

  /**
   * Returns the lottie-web version and this player's version
   */
  public getVersions(): Versions {
    return {
      lottieWebVersion: `${pkg.dependencies['lottie-web']}`,
      lottiePlayerVersion: `${pkg.version}`,
    };
  }

  /**
   * Configure and initialize lottie-web player instance.
   */
  public async load(src: string | AnimationItem): Promise<void> {
    const options: any = {
      container: this.container,
      loop: false,
      autoplay: false,
      renderer: this.renderer,
      rendererSettings: {
        preserveAspectRatio: this.preserveAspectRatio,
        clearCanvas: false,
        progressiveLoad: true,
        hideOnTransparent: true,
        ...(this.viewBoxSize && { viewBoxSize: this.viewBoxSize }),
      },
    };

    // Load the resource information
    try {
      const srcParsed = parseSrc(src);
      let jsonData = {};
      let srcAttrib = typeof srcParsed === 'string' ? 'path' : 'animationData';

      // Clear previous animation, if any
      if (this._lottie) {
        this._lottie.destroy();
      }

      if (this.webworkers) {
        lottie.useWebWorker(true);
      }

      // Initialize lottie player and load animation
      this._lottie = lottie.loadAnimation({
        ...options,

        [srcAttrib]: srcParsed,
      });

      // Attach the event listeners before we check the requested json file for errors
      this._attachEventListeners();

      if (!this.disableCheck) {
        // Fetch resource if src is a remote URL
        if (srcAttrib === 'path') {
          jsonData = await fromURL(srcParsed as string);
          srcAttrib = 'animationData';
        } else {
          jsonData = srcParsed;
        }

        if (!isLottie(jsonData)) {
          this.currentState = PlayerState.Error;
          this.dispatchEvent(new CustomEvent(PlayerEvents.Error));
        }
      }
    } catch (err) {
      this.currentState = PlayerState.Error;
      this.dispatchEvent(new CustomEvent(PlayerEvents.Error));
    }
  }

  /**
   * Pause animation play.
   */
  public pause(): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.pause();
    this.currentState = PlayerState.Paused;

    this.dispatchEvent(new CustomEvent(PlayerEvents.Pause));
  }

  /**
   * Start playing animation.
   */
  public play(): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.play();
    this.currentState = PlayerState.Playing;

    this.dispatchEvent(new CustomEvent(PlayerEvents.Play));
  }

  public override render(): TemplateResult | void {
    const className: string = this.controls ? 'main controls' : 'main';
    const animationClass: string = this.controls ? 'animation controls' : 'animation';

    return html` <div id="animation-container" class=${className} lang="en" aria-label=${this.description} role="img">
      <div id="animation" class=${animationClass} style="background:${this.background};">
        ${this.currentState === PlayerState.Error ? html`<div class="error">⚠️</div>` : []}
      </div>
      ${this.controls && !this.disableShadowDOM ? this.renderControls() : []}
    </div>`;
  }

  /**
   * Resize animation.
   */
  public resize(): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.resize();
  }

  /**
   * Seek to a given frame.
   */
  public seek(value: number | string): void {
    if (!this._lottie) return;

    let frameValue = value;

    if (typeof frameValue === 'number') {
      frameValue = Math.round(frameValue);
    }

    // Extract frame number from either number or percentage value
    const matches = /^(\d+)(%?)$/u.exec(frameValue.toString());

    if (!matches) {
      return;
    }

    // Calculate and set the frame number
    const nextFrame = matches[2] === '%' ? (this._lottie.totalFrames * Number(matches[1])) / 100 : matches[1];

    // Set seeker to new frame number
    if (nextFrame === undefined) return;
    // Send lottie player to the new frame
    this._lottie.goToAndPlay(nextFrame, true);
    if (this.currentState === PlayerState.Playing) {
      this.play();
    } else if (this.currentState === PlayerState.Frozen) {
      this._freeze();
    } else {
      this.pause();
    }
    this.requestUpdate();
  }

  /**
   * Animation play direction.
   *
   * @param value - Direction values.
   */
  public setDirection(value: number): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.setDirection(value);
  }

  /**
   * Sets the looping of the animation.
   *
   * @param value - Whether to enable looping. Boolean true enables looping.
   */
  public setLooping(value: boolean): void {
    if (this._lottie) {
      this.loop = value;
      this._lottie.loop = value;
    }
  }

  /**
   * Sets animation play speed.
   *
   * @param value - Playback speed.
   */
  public setSpeed(value: number = 1): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.setSpeed(value);
  }

  /**
   * Snapshot the current frame as SVG.
   *
   * If 'download' argument is boolean true, then a download is triggered in browser.
   */
  public snapshot(download: boolean = true): string {
    if (!this.shadowRoot) return '';

    // Get SVG element and serialize markup
    const svgElement = this.shadowRoot.querySelector('.animation svg') as Node;
    const data = new XMLSerializer().serializeToString(svgElement);

    // Trigger file download
    if (download) {
      const element = document.createElement('a');

      element.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(data)}`;
      element.download = `download_${this.seeker}.svg`;
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }

    return data;
  }

  /**
   * Stops animation play.
   */
  public stop(): void {
    if (!this._lottie) {
      return;
    }

    this._counter = 1;

    // Theres a bug with worker script that causes the animation to not go straight to frame 0
    this._lottie.stop();
    this._lottie.goToAndStop(0, true);

    this.currentState = PlayerState.Stopped;
    this.dispatchEvent(new CustomEvent(PlayerEvents.Stop));
  }

  /**
   * Toggles animation looping.
   */
  public toggleLooping(): void {
    this.setLooping(!this.loop);
  }

  /**
   * Toggle playing state.
   */
  public togglePlay(): void {
    this.currentState === PlayerState.Playing ? this.pause() : this.play();

    this.requestUpdate();
  }

  /**
   * Returns the styles for the component.
   */
  public static get styles(): CSSResult {
    return styles;
  }

  protected createRenderRoot(): Element | ShadowRoot {
    if (this.disableShadowDOM) this.style.display = 'block';

    return this.disableShadowDOM ? this : super.createRenderRoot();
  }

  /**
   * Initialize everything on component first render.
   */
  protected override async firstUpdated(): Promise<void> {
    this.container = this.disableShadowDOM
      ? (this.querySelector('#animation') as HTMLElement)
      : (this.shadowRoot?.querySelector('#animation') as HTMLElement);

    // Add intersection observer for detecting component being out-of-view.
    if ('IntersectionObserver' in window && this.container) {
      this._io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          if (this.currentState === PlayerState.Frozen) {
            this.play();
          }
        } else if (this.currentState === PlayerState.Playing) {
          this._freeze();
        }
      });

      this._io.observe(this.container);
    }

    // Add listener for Visibility API's change event.
    if (typeof document.hidden !== 'undefined') {
      document.addEventListener('visibilitychange', () => this._onVisibilityChange());
    }

    // Setup lottie player
    if (this.src && this.container) {
      this.load(this.src);
    }
    this.dispatchEvent(new CustomEvent(PlayerEvents.Rendered));
  }

  protected renderControls(): TemplateResult {
    const isPlaying: boolean = this.currentState === PlayerState.Playing;
    const isPaused: boolean = this.currentState === PlayerState.Paused;
    const isStopped: boolean = this.currentState === PlayerState.Stopped;

    return html`
      <div id="lottie-controls" aria-label="lottie-animation-controls" class="toolbar">
        <button
          id="lottie-play-button"
          @click=${(): void => this.togglePlay()}
          class=${isPlaying || isPaused ? 'active' : ''}
          style="align-items:center;"
          tabindex="0"
          aria-label="play-pause"
        >
          ${isPlaying
            ? html`<svg width="24" height="24" aria-hidden="true" focusable="false">
                <path d="M14.016 5.016H18v13.969h-3.984V5.016zM6 18.984V5.015h3.984v13.969H6z" />
              </svg>`
            : html`<svg width="24" height="24" aria-hidden="true" focusable="false">
                <path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z" />
              </svg>`}
        </button>
        <button
          id="lottie-stop-button"
          @click=${(): void => this.stop()}
          class=${isStopped ? 'active' : ''}
          style="align-items:center;"
          tabindex="0"
          aria-label="stop"
        >
          <svg width="24" height="24" aria-hidden="true" focusable="false">
            <path d="M6 6h12v12H6V6z" />
          </svg>
        </button>
        <input
          id="lottie-seeker-input"
          class="seeker"
          type="range"
          min="0"
          step="1"
          max="100"
          .value=${this.seeker}
          @input=${(event: Event): void => this._handleSeekChange(event)}
          @mousedown=${(): void => {
            this._freeze();
          }}
          @mouseup=${(): void => {
            this.play();
          }}
          aria-valuemin="1"
          aria-valuemax="100"
          role="slider"
          aria-valuenow=${this.seeker}
          tabindex="0"
          aria-label="lottie-seek-input"
        />
        <button
          id="lottie-loop-toggle"
          @click=${(): void => this.toggleLooping()}
          class=${this.loop ? 'active' : ''}
          style="align-items:center;"
          tabindex="0"
          aria-label="loop-toggle"
        >
          <svg width="24" height="24" aria-hidden="true" focusable="false">
            <path
              d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031H5.015v-6h12v-3l3.984 3.984-3.984 3.984v-3H6.984z"
            />
          </svg>
        </button>
      </div>
    `;
  }

  private _attachEventListeners(): void {
    this._lottie.addEventListener('enterFrame', () => {
      this.seeker = (this._lottie.currentFrame / this._lottie.totalFrames) * 100;

      this.requestUpdate();
      this.dispatchEvent(
        new CustomEvent(PlayerEvents.Frame, {
          detail: {
            frame: this._lottie.currentFrame,
            seeker: this.seeker,
          },
        }),
      );
    });

    // Handle animation play complete
    this._lottie.addEventListener('complete', () => {
      if (this.currentState !== PlayerState.Playing) {
        this.dispatchEvent(new CustomEvent(PlayerEvents.Complete));

        return;
      }

      if (!this.loop || (this.count && this._counter >= this.count)) {
        this.dispatchEvent(new CustomEvent(PlayerEvents.Complete));

        if (this.mode === PlayMode.Bounce) {
          if (this._lottie.currentFrame === 0) {
            return;
          }
        } else {
          return;
        }
      }

      if (this.mode === PlayMode.Bounce) {
        if (this.count) {
          this._counter += 0.5;
        }

        setTimeout(() => {
          this.dispatchEvent(new CustomEvent(PlayerEvents.Loop));

          if (this.currentState === PlayerState.Playing) {
            this._lottie.setDirection(this._lottie.playDirection * -1);
            this._lottie.play();
          }
        }, this.intermission);
      } else {
        if (this.count) {
          this._counter += 1;
        }

        window.setTimeout(() => {
          this.dispatchEvent(new CustomEvent(PlayerEvents.Loop));

          if (this.currentState === PlayerState.Playing) {
            if (this.direction === -1) {
              // Prevents flickering
              this.seek('99%');
              this.play();
            } else {
              this._lottie.stop();
              this._lottie.play();
            }
          }
        }, this.intermission);
      }
    });

    // Handle lottie-web ready event
    this._lottie.addEventListener('DOMLoaded', () => {
      // Set initial playback speed and direction
      this.setSpeed(this.speed);
      this.setDirection(this.direction);

      // Start playing if autoplay is enabled
      if (this.autoplay) {
        if (this.direction === -1) this.seek('100%');
        this.play();
      }

      this.dispatchEvent(new CustomEvent(PlayerEvents.Ready));
    });

    // Handle animation data load complete
    this._lottie.addEventListener('data_ready', () => {
      this.dispatchEvent(new CustomEvent(PlayerEvents.Load));
    });

    // Set error state when animation load fail event triggers
    this._lottie.addEventListener('data_failed', () => {
      this.currentState = PlayerState.Error;

      this.dispatchEvent(new CustomEvent(PlayerEvents.Error));
    });

    // Set handlers to auto play animation on hover if enabled
    this.container.addEventListener('mouseenter', () => {
      if (this.hover && this.currentState !== PlayerState.Playing) {
        this.play();
      }
    });
    this.container.addEventListener('mouseleave', () => {
      if (this.hover && this.currentState === PlayerState.Playing) {
        this.stop();
      }
    });
  }

  /**
   * Freeze animation play.
   * This internal state pauses animation and is used to differentiate between
   * user requested pauses and component instigated pauses.
   */
  private _freeze(): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.pause();
    this.currentState = PlayerState.Frozen;

    this.dispatchEvent(new CustomEvent(PlayerEvents.Freeze));
  }

  /**
   * Handles click and drag actions on the progress track.
   */
  private _handleSeekChange(event: Event): void {
    const target = event.currentTarget as HTMLInputElement;

    try {
      const value = parseInt(target.value, 10);

      const frame: number = (value / 100) * this._lottie.totalFrames;

      this.seek(frame);
    } catch (error) {
      throw new Error('Error while seeking animation');
    }
  }

  /**
   * Handle visibility change events.
   */
  private _onVisibilityChange(): void {
    if (document.hidden === true && this.currentState === PlayerState.Playing) {
      this._freeze();
    } else if (this.currentState === PlayerState.Frozen) {
      this.play();
    }
  }
}

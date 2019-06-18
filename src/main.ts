import { customElement, LitElement, html, property, query, TemplateResult } from 'lit-element';
import * as lottie from 'lottie-web/build/player/lottie_svg';

import styles from './styles';

// Define valid player states
enum PlayerState {
  Loading = 'loading',
  Playing = 'playing',
  Paused = 'paused',
  Stopped = 'stopped',
  Frozen = 'frozen',
  Error = 'error'
};

enum PlayMode {
  Normal = 'normal',
  Bounce = 'bounce'
}

/**
 * LottiePlayer web component class
 *
 * @export
 * @class LottiePlayer
 * @extends {LitElement}
 */
@customElement('lottie-player')
export class LottiePlayer extends LitElement {
  /**
   * Animation container.
   */
  @query('.animation')
  protected container!: HTMLElement;

  /**
   * Play mode.
   */
  @property()
  public mode: PlayMode = PlayMode.Normal;

  /**
   * Autoplay animation on load.
   */
  @property({ type: Boolean })
  public autoplay = false;

  /**
   * Background color.
   */
  @property({ type: String, reflect: true })
  public background?: string = 'transparent';

  /**
   * Show controls.
   */
  @property({ type: Boolean })
  public controls = false;

  /**
   * Number of times to loop animation.
   */
  @property({ type: Number })
  public count?: number;

  /**
   * Direction of animation.
   */
  @property({ type: Number })
  public direction = 1;

  /**
   * Whether to play on mouse hover
   */
  @property({ type: Boolean })
  public hover = false;

  /**
   * Whether to loop animation.
   */
  @property({ type: Boolean, reflect: true })
  public loop = false;

  /**
   * Renderer to use.
   */
  @property({ type: String })
  public renderer: 'svg' = 'svg';

  /**
   * Animation speed.
   */
  @property({ type: Number })
  public speed = 1;

  /**
   * Bodymovin JSON data or URL to JSON.
   */
  @property({ type: String })
  public src!: string;

  /**
   * Player state.
   */
  @property({ type: String })
  public currentState: PlayerState = PlayerState.Loading;

  @property()
  public seeker: any;

  @property()
  public intermission: number = 1;

  private io?: any;
  private lottie?: any;
  private prevState?: any;
  private counter = 0;

  /**
   * Add intersection observer for detecting component being out-of-view.
   */
  private addIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    this.io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        if (this.currentState === PlayerState.Frozen) {
          this.play();
        }
      } else if (this.currentState === PlayerState.Playing) {
        this.freeze();
      }
    });

    this.io.observe(this.container);
  }

  /**
   * Remove intersection observer for detecting component being out-of-view.
   */
  private removeIntersectionObserver(): void {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  /**
   * Add listener for Visibility API's change event.
   */
  private addVisibilityListener(): void {
    if (typeof document.hidden !== 'undefined') {
      document.addEventListener('visibilitychange', () => this.onVisibilityChange());
    }
  }

  /**
   * Remove the attached Visibility API's change event listener.
   */
  private removeVisibilityListener(): void {
    document.removeEventListener('visibilitychange', () => this.onVisibilityChange());
  }

  /**
   * Handle visibility change events.
   */
  private onVisibilityChange(): void {
    if (document.hidden === true && this.currentState === PlayerState.Playing) {
      this.freeze();
    } else if (this.currentState === PlayerState.Frozen) {
      this.play();
    }
  }

  /**
   * Configure and initialize lottie-web player instance.
   */
  private setupLottie(): void {
    if (!this.shadowRoot) {
      return;
    }

    const options: any = {
      container: this.container,
      loop: false,
      autoplay: false,
      renderer: this.renderer,
      rendererSettings: {
        scaleMode: 'noScale',
        clearCanvas: false,
        progressiveLoad: true,
        hideOnTransparent: true,
      },
    };

    // Load the resource information
    try {
      // Try construct an absolute URL from the src URL
      const srcUrl: URL = new URL(this.src, window.location.href);

      // Initialize lottie player and load animation
      this.lottie = lottie.loadAnimation({ ...options, path: srcUrl.toString() });
    } catch (err) {
      this.currentState = PlayerState.Error;
      return;
    }

    if (this.lottie) {
      // Calculate and save the current progress of the animation
      this.lottie.addEventListener('enterFrame', () => {
        this.seeker = (this.lottie.currentFrame / this.lottie.totalFrames) * 100;
      });

      // Handle animation play complete
      this.lottie.addEventListener('complete', () => {
        if (this.currentState !== PlayerState.Playing) {
          return;
        }

        if (!this.loop || (this.count && this.counter >= this.count)) {
          return;
        }

        if (this.mode === PlayMode.Bounce) {
          if (this.count) {
            this.counter += 0.5;
          }

          setTimeout(() => {
            if (this.currentState === PlayerState.Playing) {
              this.lottie.setDirection(this.lottie.playDirection * -1);
              this.lottie.play();
            }
          }, this.intermission);
        } else {
          if (this.count) {
            this.counter += 1;
          }

          window.setTimeout(() => {
            if (this.currentState === PlayerState.Playing) {
              this.lottie.stop();
              this.lottie.play();
            }
          }, this.intermission);
        }
      });

      // Set error state when animation load fail event triggers
      this.lottie.addEventListener('data_failed', () => {
        this.currentState = PlayerState.Error;
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

      // Set initial playback speed and direction
      this.setSpeed(this.speed);
      this.setDirection(this.direction);

      // Start playing if autoplay is enabled
      if (this.autoplay) {
        this.play();
      }
    }
  }

  /**
   * Handles click and drag actions on the progress track.
   */
  private handleSeekChange(e: any): void {
    if (!this.lottie || isNaN(e.target.value)) {
      return;
    }

    const frame: number = ((e.target.value / 100) * this.lottie.totalFrames);

    this.seek(frame);
  }

  /**
   * Returns the lottie-web instance used in the component.
   */
  public getLottie(): any {
    return this.lottie;
  }

  /**
   * Start playing animation.
   */
  public play() {
    if (!this.lottie) {
      return
    }

    this.lottie.play();
    this.currentState = PlayerState.Playing;
  }

  /**
   * Pause animation play.
   */
  public pause(): void {
    if (!this.lottie) {
      return
    }

    this.lottie.pause();
    this.currentState = PlayerState.Paused;
  }

  /**
   * Stops animation play.
   */
  public stop(): void {
    if (!this.lottie) {
      return
    }

    this.counter = 0;
    this.lottie.stop();
    this.currentState = PlayerState.Stopped;
  }

  /**
   * Seek to a given frame.
   */
  public seek(value: number | string): void {
    if (!this.lottie) {
      return;
    }

    // Extract frame number from either number or percentage value
    const matches = value.toString().match(/^([0-9]+)(%?)$/);
    if (!matches) {
      return;
    }

    // Calculate and set the frame number
    const frame = matches[2] === '%'
      ? this.lottie.totalFrames * Number(matches[1]) / 100
      : matches[1];

    // Set seeker to new frame number
    this.seeker = frame;
    
    // Send lottie player to the new frame
    if (this.currentState === PlayerState.Playing) {
      this.lottie.goToAndPlay(frame, true);
    } else {
      this.lottie.goToAndStop(frame, true);
      this.lottie.pause();
    }
  }

  /**
   * Snapshot the current frame as SVG.
   * 
   * If 'download' argument is boolean true, then a download is triggered in browser.
   */
  public snapshot(download: boolean = true): string | void {
    if (!this.shadowRoot) return;

    // Get SVG element and serialize markup
    const svgElement = this.shadowRoot.querySelector('.animation svg') as Node;
    const data = (new XMLSerializer()).serializeToString(svgElement);

    // Trigger file download
    if (download) {
      const element = document.createElement('a');
      element.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data);
      element.download = 'download_' + this.seeker + '.svg';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }

    return data;
  }

  /**
   * Freeze animation play.
   * This internal state pauses animation and is used to differentiate between
   * user requested pauses and component instigated pauses.
   */
  private freeze(): void {
    if (!this.lottie) {
      return
    }

    this.lottie.pause();
    this.currentState = PlayerState.Frozen;
  }

  /**
   * Sets animation play speed.
   *
   * @param value Playback speed.
   */
  public setSpeed(value = 1): void {
    if (!this.lottie) {
      return;
    }

    this.lottie.setSpeed(value);
  }

  /**
   * Animation play direction.
   *
   * @param value Direction values.
   */
  public setDirection(value: number): void {
    if (!this.lottie) {
      return;
    }

    this.lottie.setDirection(value);
  }

  /**
   * Sets the looping of the animation.
   *
   * @param value Whether to enable looping. Boolean true enables looping.
   */
  public setLooping(value: boolean): void {
    if (this.lottie) {
      this.loop = value;
      this.lottie.loop = value;
    }
  }

  /**
   * Toggle playing state.
   */
  public togglePlay(): void {
    return this.currentState === PlayerState.Playing
      ? this.pause()
      : this.play();
  }

  /**
   * Toggles animation looping.
   */
  public toggleLooping(): void {
    this.setLooping(!this.loop);
  }

  /**
   * Returns the styles for the component.
   */
  static get styles() {
    return styles;
  }

  /**
   * Initialize everything on component first render.
   */
  protected firstUpdated(): void {
    // Setup global event handlers
    this.addIntersectionObserver();
    this.addVisibilityListener();

    // Setup lottie player
    this.setupLottie();
  }

  /**
   * Cleanup on component destroy.
   */
  public disconnectedCallback(): void {
    this.removeIntersectionObserver();
    this.removeVisibilityListener();
  }

  protected renderControls() {
    const isPlaying = this.currentState === PlayerState.Playing;
    const isPaused = this.currentState === PlayerState.Paused;
    const isStopped = this.currentState === PlayerState.Stopped;
    const isFrozen = this.currentState === PlayerState.Frozen;

    return html`
      <div class="toolbar">
        <button @click=${this.togglePlay} class=${isPlaying || isPaused ? 'active' : ''}>
          ${isPlaying
        ? html`<svg width="24" height="24"><path d="M14.016 5.016H18v13.969h-3.984V5.016zM6 18.984V5.015h3.984v13.969H6z"/></svg>`
        : html`<svg width="24" height="24"><path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z"/></svg>`
      }
        </button>
        <button @click=${this.stop} class=${isStopped ? 'active' : ''}>
          <svg width="24" height="24"><path d="M6 6h12v12H6V6z" /></svg>
        </button>
        <input class="seeker" type="range" min="0" step="1" max="100" .value=${this.seeker}
          @input=${this.handleSeekChange} 
          @mousedown=${() => { this.prevState = this.currentState; this.freeze(); }}
          @mouseup=${() => { this.prevState === PlayerState.Playing && this.play(); }}
        />
        <button @click=${this.toggleLooping} class=${this.loop ? 'active' : ''}>
          <svg width="24" height="24">
            <path d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031H5.015v-6h12v-3l3.984 3.984-3.984 3.984v-3H6.984z"/>
          </svg>  
        </button>
        <a href="https://www.lottiefiles.com/" target="_blank">
          <svg width="24" height="24" viewBox="0 0 320 320" fill-rule="nonzero"><rect fill="#adadad" x=".5" y=".5" width="100%" height="100%" rx="26.73"/><path d="M251.304 65.44a16.55 16.55 0 0 1 13.927 18.789c-1.333 9.04-9.73 15.292-18.762 13.954-15.992-2.37-39.95 22.534-66.77 73.74-34.24 65.37-66.113 96.517-99.667 94.032-9.102-.674-15.93-8.612-15.258-17.723s8.592-15.96 17.695-15.286c16.57 1.227 40.908-24.737 67.97-76.4 34.46-65.79 66.764-96.157 100.866-91.105z" fill="#fff"/></svg>
        </a>
      </div>
    `;
  }

  render(): TemplateResult | void {
    return html`
      <div class=${'main ' + this.controls ? ' controls' : ''}>
        <div class="animation" style=${'background:' + this.background }>
          ${this.currentState === PlayerState.Error ? html`<div class="error">⚠️</div>` : undefined}
        </div>
        ${this.controls ? this.renderControls() : undefined}
      </div>`
  }
}

// eslint-disable-next-line header/header
import {
  customElement,
  LitElement,
  html,
  property,
  query,
  TemplateResult,
} from "lit-element";
import * as lottie from "lottie-web/build/player/lottie";

// import ResizeObserver from "resize-observer-polyfill";
import styles from "./lottie-player.styles";

// Define valid player states
export enum PlayerState {
  Destroyed = "destroyed",
  Error = "error",
  Frozen = "frozen",
  Loading = "loading",
  Paused = "paused",
  Playing = "playing",
  Stopped = "stopped",
}

// Define play modes
export enum PlayMode {
  Bounce = "bounce",
  Normal = "normal",
}

// Define player events
export enum PlayerEvents {
  Complete = "complete",
  Destroyed = "destroyed",
  Error = "error",
  Frame = "frame",
  Freeze = "freeze",
  Load = "load",
  Loop = "loop",
  Pause = "pause",
  Play = "play",
  Ready = "ready",
  Rendered = "rendered",
  Stop = "stop",
}

/**
 * Parse a resource into a JSON object or a URL string
 */
export function parseSrc(src: string | object): string | object {
  if (typeof src === "object") {
    return src;
  }

  try {
    return JSON.parse(src);
  } catch (e) {
    // Try construct an absolute URL from the src URL
    const srcUrl: URL = new URL(src, window.location.href);

    return srcUrl.toString();
  }
}

function isLottie(json: Record<string, any>): boolean {
  const mandatory: string[] = ["v", "ip", "op", "layers", "fr", "w", "h"];

  return mandatory.every((field: string) =>
    Object.prototype.hasOwnProperty.call(json, field)
  );
}

async function fromURL(url: string): Promise<Record<string, any>> {
  if (typeof url !== "string") {
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
    throw new Error(
      `An error occurred while trying to load the Lottie file from URL`
    );
  }

  return json;
}
/**
 * LottiePlayer web component class
 *
 * @export
 * @class LottiePlayer
 * @extends {LitElement}
 */
@customElement("lottie-player")
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
  public background?: string = "transparent";

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
   * Animation speed.
   */
  @property({ type: String })
  public description: string = "Lottie animation";

  /**
   * Direction of animation.
   */
  @property({ type: Number })
  public direction: number = 1;

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
  public preserveAspectRatio: string = "xMidYMid meet";

  /**
   * Renderer to use.
   */
  @property({ type: String })
  public renderer: "svg" = "svg";

  /**
   * seeker
   */

  @property()
  public seeker: any;

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
   * Enable web workers
   */
  @property({ type: Boolean })
  public webworkers?: boolean;

  /**
   * Animation container.
   */
  @query(".animation")
  protected container!: HTMLElement;

  private _io: IntersectionObserver | undefined = undefined;

  // private _ro: ResizeObserver | undefined = undefined;
  private _lottie?: any;

  private _prevState?: any;

  private _counter: number = 1;

  private readonly workerString: string =
    'var _workerSelf=self;self.onmessage=function(e){if(_workerSelf.dataManager||(_workerSelf.dataManager=function(){function e(r,n){var o,l,f,c,i,k,p,d=r.length;for(l=0;l<d;l+=1)if("ks"in(o=r[l])&&!o.completed){if(o.completed=!0,o.tt&&(r[l-1].td=o.tt),o.hasMask){var u=o.masksProperties;for(c=u.length,f=0;f<c;f+=1)if(u[f].pt.k.i)a(u[f].pt.k);else for(k=u[f].pt.k.length,i=0;i<k;i+=1)u[f].pt.k[i].s&&a(u[f].pt.k[i].s[0]),u[f].pt.k[i].e&&a(u[f].pt.k[i].e[0])}0===o.ty?(o.layers=s(o.refId,n),e(o.layers,n)):4===o.ty?t(o.shapes):5===o.ty&&(0!==(p=o).t.a.length||"m"in p.t.p||(p.singleShape=!0))}}function s(e,s){for(var t=0,a=s.length;t<a;){if(s[t].id===e)return s[t].layers.__used?JSON.parse(JSON.stringify(s[t].layers)):(s[t].layers.__used=!0,s[t].layers);t+=1}return null}function t(e){var s,r,n;for(s=e.length-1;s>=0;s-=1)if("sh"===e[s].ty)if(e[s].ks.k.i)a(e[s].ks.k);else for(n=e[s].ks.k.length,r=0;r<n;r+=1)e[s].ks.k[r].s&&a(e[s].ks.k[r].s[0]),e[s].ks.k[r].e&&a(e[s].ks.k[r].e[0]);else"gr"===e[s].ty&&t(e[s].it)}function a(e){var s,t=e.i.length;for(s=0;s<t;s+=1)e.i[s][0]+=e.v[s][0],e.i[s][1]+=e.v[s][1],e.o[s][0]+=e.v[s][0],e.o[s][1]+=e.v[s][1]}function r(e,s){var t=s?s.split("."):[100,100,100];return e[0]>t[0]||!(t[0]>e[0])&&(e[1]>t[1]||!(t[1]>e[1])&&(e[2]>t[2]||!(t[2]>e[2])&&null))}var n,o=function(){var e=[4,4,14];function s(e){var s,t,a,r=e.length;for(s=0;s<r;s+=1)5===e[s].ty&&(t=e[s],a=void 0,a=t.t.d,t.t.d={k:[{s:a,t:0}]})}return function(t){if(r(e,t.v)&&(s(t.layers),t.assets)){var a,n=t.assets.length;for(a=0;a<n;a+=1)t.assets[a].layers&&s(t.assets[a].layers)}}}(),l=(n=[4,7,99],function(e){if(e.chars&&!r(n,e.v)){var s,t,o,l,f,c=e.chars.length;for(s=0;s<c;s+=1)if(e.chars[s].data&&e.chars[s].data.shapes)for(o=(f=e.chars[s].data.shapes[0].it).length,t=0;t<o;t+=1)(l=f[t].ks.k).__converted||(a(f[t].ks.k),l.__converted=!0)}}),f=function(){var e=[5,7,15];function s(e){var s,t,a,r=e.length;for(s=0;s<r;s+=1)5===e[s].ty&&(t=e[s],a=void 0,"number"==typeof(a=t.t.p).a&&(a.a={a:0,k:a.a}),"number"==typeof a.p&&(a.p={a:0,k:a.p}),"number"==typeof a.r&&(a.r={a:0,k:a.r}))}return function(t){if(r(e,t.v)&&(s(t.layers),t.assets)){var a,n=t.assets.length;for(a=0;a<n;a+=1)t.assets[a].layers&&s(t.assets[a].layers)}}}(),c=function(){var e=[4,1,9];function s(e){var t,a,r,n=e.length;for(t=0;t<n;t+=1)if("gr"===e[t].ty)s(e[t].it);else if("fl"===e[t].ty||"st"===e[t].ty)if(e[t].c.k&&e[t].c.k[0].i)for(r=e[t].c.k.length,a=0;a<r;a+=1)e[t].c.k[a].s&&(e[t].c.k[a].s[0]/=255,e[t].c.k[a].s[1]/=255,e[t].c.k[a].s[2]/=255,e[t].c.k[a].s[3]/=255),e[t].c.k[a].e&&(e[t].c.k[a].e[0]/=255,e[t].c.k[a].e[1]/=255,e[t].c.k[a].e[2]/=255,e[t].c.k[a].e[3]/=255);else e[t].c.k[0]/=255,e[t].c.k[1]/=255,e[t].c.k[2]/=255,e[t].c.k[3]/=255}function t(e){var t,a=e.length;for(t=0;t<a;t+=1)4===e[t].ty&&s(e[t].shapes)}return function(s){if(r(e,s.v)&&(t(s.layers),s.assets)){var a,n=s.assets.length;for(a=0;a<n;a+=1)s.assets[a].layers&&t(s.assets[a].layers)}}}(),i=function(){var e=[4,4,18];function s(e){var t,a,r;for(t=e.length-1;t>=0;t-=1)if("sh"===e[t].ty)if(e[t].ks.k.i)e[t].ks.k.c=e[t].closed;else for(r=e[t].ks.k.length,a=0;a<r;a+=1)e[t].ks.k[a].s&&(e[t].ks.k[a].s[0].c=e[t].closed),e[t].ks.k[a].e&&(e[t].ks.k[a].e[0].c=e[t].closed);else"gr"===e[t].ty&&s(e[t].it)}function t(e){var t,a,r,n,o,l,f=e.length;for(a=0;a<f;a+=1){if((t=e[a]).hasMask){var c=t.masksProperties;for(n=c.length,r=0;r<n;r+=1)if(c[r].pt.k.i)c[r].pt.k.c=c[r].cl;else for(l=c[r].pt.k.length,o=0;o<l;o+=1)c[r].pt.k[o].s&&(c[r].pt.k[o].s[0].c=c[r].cl),c[r].pt.k[o].e&&(c[r].pt.k[o].e[0].c=c[r].cl)}4===t.ty&&s(t.shapes)}}return function(s){if(r(e,s.v)&&(t(s.layers),s.assets)){var a,n=s.assets.length;for(a=0;a<n;a+=1)s.assets[a].layers&&t(s.assets[a].layers)}}}();var k={completeData:function(s){s.__complete||(c(s),o(s),l(s),f(s),i(s),e(s.layers,s.assets),s.__complete=!0)}};return k.checkColors=c,k.checkChars=l,k.checkPathProperties=f,k.checkShapes=i,k.completeLayers=e,k}()),_workerSelf.assetLoader||(_workerSelf.assetLoader=function(){function e(e){var s=e.getResponseHeader("content-type");return s&&"json"===e.responseType&&-1!==s.indexOf("json")?e.response:e.response&&"object"==typeof e.response?e.response:e.response&&"string"==typeof e.response?JSON.parse(e.response):e.responseText?JSON.parse(e.responseText):null}return{load:function(s,t,a,r){var n,o=new XMLHttpRequest;try{o.responseType="json"}catch(e){}o.onreadystatechange=function(){if(4===o.readyState)if(200===o.status)n=e(o),a(n);else try{n=e(o),a(n)}catch(e){r&&r(e)}};try{o.open("GET",s,!0)}catch(e){o.open("GET",t+"/"+s,!0)}o.send()}}}()),"loadAnimation"===e.data.type)_workerSelf.assetLoader.load(e.data.path,e.data.fullPath,function(s){_workerSelf.dataManager.completeData(s),_workerSelf.postMessage({id:e.data.id,payload:s,status:"success"})},function(){_workerSelf.postMessage({id:e.data.id,status:"error"})});else if("complete"===e.data.type){var s=e.data.animation;_workerSelf.dataManager.completeData(s),_workerSelf.postMessage({id:e.data.id,payload:s,status:"success"})}else"loadData"===e.data.type&&_workerSelf.assetLoader.load(e.data.path,e.data.fullPath,function(s){_workerSelf.postMessage({id:e.data.id,payload:s,status:"success"})},function(){_workerSelf.postMessage({id:e.data.id,status:"error"})})};';

  /**
   * Configure and initialize lottie-web player instance.
   */
  public async load(src: string | object) {
    if (!this.shadowRoot) {
      return;
    }

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
      },
    };

    // Load the resource information
    try {
      const srcParsed = parseSrc(src);
      let jsonData = {};
      let srcAttrib = typeof srcParsed === "string" ? "path" : "animationData";

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

      // Fetch resource if src is a remote URL
      if (srcAttrib === "path") {
        jsonData = await fromURL(srcParsed as string);
        srcAttrib = "animationData";
      } else {
        jsonData = srcParsed;
      }

      if (!isLottie(jsonData)) {
        this.currentState = PlayerState.Error;
        this.dispatchEvent(new CustomEvent(PlayerEvents.Error));
      }
    } catch (err) {
      this.currentState = PlayerState.Error;
      this.dispatchEvent(new CustomEvent(PlayerEvents.Error));
    }
  }

  /**
   * Returns the lottie-web instance used in the component.
   */
  public getLottie(): any {
    return this._lottie;
  }

  /**
   * Start playing animation.
   */
  public play() {
    if (!this._lottie) {
      return;
    }

    this._lottie.play();
    this.currentState = PlayerState.Playing;

    this.dispatchEvent(new CustomEvent(PlayerEvents.Play));
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
   * Stops animation play.
   */
  public stop(): void {
    if (!this._lottie) {
      return;
    }

    this._counter = 1;
    this._lottie.stop();
    this.currentState = PlayerState.Stopped;

    this.dispatchEvent(new CustomEvent(PlayerEvents.Stop));
  }

  /**
   * Destroy animation and lottie-player element.
   */
  public destroy(): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.destroy();
    this.currentState = PlayerState.Destroyed;
    this.dispatchEvent(new CustomEvent(PlayerEvents.Destroyed));
    this.remove();
  }

  /**
   * Seek to a given frame.
   */
  public seek(value: number | string): void {
    if (!this._lottie) {
      return;
    }

    // Extract frame number from either number or percentage value
    const matches = /^(\d+)(%?)$/.exec(value.toString());

    if (!matches) {
      return;
    }

    // Calculate and set the frame number
    const frame =
      matches[2] === "%"
        ? (this._lottie.totalFrames * Number(matches[1])) / 100
        : Number(matches[1]);

    // Set seeker to new frame number
    this.seeker = frame;

    // Send lottie player to the new frame
    if (this.currentState === PlayerState.Playing) {
      this._lottie.goToAndPlay(frame, true);
    } else {
      this._lottie.goToAndStop(frame, true);
      this._lottie.pause();
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
    const svgElement = this.shadowRoot.querySelector(".animation svg") as Node;
    const data = new XMLSerializer().serializeToString(svgElement);

    // Trigger file download
    if (download) {
      const element = document.createElement("a");

      element.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        data
      )}`;
      element.download = `download_${this.seeker}.svg`;
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }

    return data;
  }

  /**
   * Sets animation play speed.
   *
   * @param value Playback speed.
   */
  public setSpeed(value = 1): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.setSpeed(value);
  }

  /**
   * Animation play direction.
   *
   * @param value Direction values.
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
   * @param value Whether to enable looping. Boolean true enables looping.
   */
  public setLooping(value: boolean): void {
    if (this._lottie) {
      this.loop = value;
      this._lottie.loop = value;
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
   * Resize animation.
   */
  public resize() {
    if (!this._lottie) {
      return;
    }

    this._lottie.resize();
  }

  /**
   * Returns the styles for the component.
   */
  static get styles() {
    return styles;
  }

  /**
   * Cleanup on component destroy.
   */
  public disconnectedCallback(): void {
    // Remove intersection observer for detecting component being out-of-view.
    if (this._io) {
      this._io.disconnect();
      this._io = undefined;
    }

    // Remove resize observer for detecting resize/reflow events affecting element.
    // if (this._ro) {
    //   this._ro.disconnect();
    //   this._ro = undefined;
    // }

    // Remove the attached Visibility API's change event listener.
    document.removeEventListener("visibilitychange", () =>
      this._onVisibilityChange()
    );

    // Destroy the animation instance and element
    this.destroy();
  }

  public render(): TemplateResult | void {
    const className: string = this.controls ? "main controls" : "main";
    const animationClass: string = this.controls
      ? "animation controls"
      : "animation";

    return html` <div
      id="animation-container"
      class=${className}
      aria-label=${this.description}
    >
      <div
        id="animation"
        class=${animationClass}
        style="background:${this.background};"
      >
        ${this.currentState === PlayerState.Error
          ? html`<div class="error">⚠️</div>`
          : undefined}
      </div>
      ${this.controls ? this.renderControls() : undefined}
    </div>`;
  }

  /**
   * Initialize everything on component first render.
   */
  protected firstUpdated(): void {
    // Add intersection observer for detecting component being out-of-view.
    if ("IntersectionObserver" in window) {
      this._io = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (entries[0].isIntersecting) {
            if (this.currentState === PlayerState.Frozen) {
              this.play();
            }
          } else if (this.currentState === PlayerState.Playing) {
            this.freeze();
          }
        }
      );

      this._io.observe(this.container);
    }

    // Add listener for Visibility API's change event.
    if (typeof document.hidden !== "undefined") {
      document.addEventListener("visibilitychange", () =>
        this._onVisibilityChange()
      );
    }

    // Setup lottie player
    if (this.src) {
      this.load(this.src);
    }
    this.dispatchEvent(new CustomEvent(PlayerEvents.Rendered));
  }

  protected renderControls(): TemplateResult {
    const isPlaying: boolean = this.currentState === PlayerState.Playing;
    const isPaused: boolean = this.currentState === PlayerState.Paused;
    const isStopped: boolean = this.currentState === PlayerState.Stopped;

    return html`
      <div
        id="lottie-controls"
        aria-label="lottie-animation-controls"
        class="toolbar"
      >
        <button
          id="lottie-play-button"
          @click=${this.togglePlay}
          class=${isPlaying || isPaused ? "active" : ""}
          style="align-items:center;"
          role="button"
          tabindex="0"
          aria-label="play-pause"
        >
          ${isPlaying
            ? html`<svg width="24" height="24">
                <path
                  d="M14.016 5.016H18v13.969h-3.984V5.016zM6 18.984V5.015h3.984v13.969H6z"
                />
              </svg>`
            : html`<svg width="24" height="24">
                <path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z" />
              </svg>`}
        </button>
        <button
          id="lottie-stop-button"
          @click=${this.stop}
          class=${isStopped ? "active" : ""}
          style="align-items:center;"
          role="button"
          tabindex="1"
          aria-label="stop"
        >
          <svg width="24" height="24"><path d="M6 6h12v12H6V6z" /></svg>
        </button>
        <input
          id="lottie-seeker-input"
          class="seeker"
          type="range"
          min="0"
          step="1"
          max="100"
          .value=${this.seeker}
          @input=${this._handleSeekChange}
          @mousedown=${() => {
            this._prevState = this.currentState;
            this.freeze();
          }}
          @mouseup=${() => {
            this._prevState === PlayerState.Playing && this.play();
          }}
          aria-valuemin="1"
          aria-valuemax="100"
          role="slider"
          aria-valuenow=${this.seeker}
          tabindex="2"
          aria-label="lottie-seek-input"
        />
        <button
          id="lottie-loop-toggle"
          @click=${this.toggleLooping}
          class=${this.loop ? "active" : ""}
          style="align-items:center;"
          role="button"
          tabindex="3"
          aria-label="loop-toggle"
        >
          <svg width="24" height="24">
            <path
              d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031H5.015v-6h12v-3l3.984 3.984-3.984 3.984v-3H6.984z"
            />
          </svg>
        </button>
      </div>
    `;
  }

  /**
   * Handle visibility change events.
   */
  private _onVisibilityChange(): void {
    if (document.hidden === true && this.currentState === PlayerState.Playing) {
      this.freeze();
    } else if (this.currentState === PlayerState.Frozen) {
      this.play();
    }
  }

  /**
   * Handles click and drag actions on the progress track.
   */
  private _handleSeekChange(e: any): void {
    if (!this._lottie || isNaN(e.target.value)) {
      return;
    }

    const frame: number = (e.target.value / 100) * this._lottie.totalFrames;

    this.seek(frame);
  }

  private _attachEventListeners(): void {
    this._lottie.addEventListener("enterFrame", () => {
      this.seeker =
        (this._lottie.currentFrame / this._lottie.totalFrames) * 100;

      this.dispatchEvent(
        new CustomEvent(PlayerEvents.Frame, {
          detail: {
            frame: this._lottie.currentFrame,
            seeker: this.seeker,
          },
        })
      );
    });

    // Handle animation play complete
    this._lottie.addEventListener("complete", () => {
      if (this.currentState !== PlayerState.Playing) {
        this.dispatchEvent(new CustomEvent(PlayerEvents.Complete));

        return;
      }

      if (!this.loop || (this.count && this._counter >= this.count)) {
        this.dispatchEvent(new CustomEvent(PlayerEvents.Complete));

        return;
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
            this._lottie.stop();
            this._lottie.play();
          }
        }, this.intermission);
      }
    });

    // Handle lottie-web ready event
    this._lottie.addEventListener("DOMLoaded", () => {
      // Set initial playback speed and direction
      this.setSpeed(this.speed);
      this.setDirection(this.direction);

      // Start playing if autoplay is enabled
      if (this.autoplay) {
        this.play();
      }

      this.dispatchEvent(new CustomEvent(PlayerEvents.Ready));
    });

    // Handle animation data load complete
    this._lottie.addEventListener("data_ready", () => {
      this.dispatchEvent(new CustomEvent(PlayerEvents.Load));
    });

    // Set error state when animation load fail event triggers
    this._lottie.addEventListener("data_failed", () => {
      this.currentState = PlayerState.Error;

      this.dispatchEvent(new CustomEvent(PlayerEvents.Error));
    });

    // Set handlers to auto play animation on hover if enabled
    this.container.addEventListener("mouseenter", () => {
      if (this.hover && this.currentState !== PlayerState.Playing) {
        this.play();
      }
    });
    this.container.addEventListener("mouseleave", () => {
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
  private freeze(): void {
    if (!this._lottie) {
      return;
    }

    this._lottie.pause();
    this.currentState = PlayerState.Frozen;

    this.dispatchEvent(new CustomEvent(PlayerEvents.Freeze));
  }
}

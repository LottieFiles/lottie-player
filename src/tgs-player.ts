/**
 * Copyright 2022 Design Barn Inc.
 */

import { customElement, property } from "lit/decorators.js";
import * as pako from "pako";

import { LottiePlayer, parseSrc, PlayerEvents } from "./lottie-player";
import styles from "./tgs-player.styles";

/**
 * Load a resource from a path URL.
 */
async function fetchPath(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", path, true);
    xhr.responseType = "arraybuffer";
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        try {
          // Attempt to convert it to JSON as is:

          // @ts-ignore
          const data = String.fromCharCode.apply(
            null,
            new Uint8Array(xhr.response as ArrayBuffer)
          );

          return resolve(JSON.parse(data));
        } catch (err) {
          // Attempt to ungzip response and convert to JSON:

          try {
            const data = pako.inflate(xhr.response, { to: "string" });

            return resolve(JSON.parse(data));
          } catch (err) {
            return reject(err);
          }
        }
      }
    };
  });
}

/**
 * TGSPlayer web component class
 *
 * @export
 * @class TGSPlayer
 * @extends {LottiePlayer}
 */
@customElement("tgs-player")
export class TGSPlayer extends LottiePlayer {
  /**
   * Strict format checks for TGS.
   */
  @property({ type: Boolean })
  public strict = true;

  /**
   * Configure and initialize lottie-web player instance.
   */
  public async load(src: string | object): Promise<void> {
    let srcParsed: string | object = parseSrc(src);
    const srcAttrib: string =
      typeof srcParsed === "string" ? "path" : "animationData";

    // Fetch resource if src is a remote URL
    if (srcAttrib === "path") {
      srcParsed = await fetchPath(srcParsed as string);
    }

    // Strict checks
    if (this.strict === true) {
      const errors = this.formatCheck(srcParsed);

      if (errors.length !== 0) {
        this.dispatchEvent(
          new CustomEvent(PlayerEvents.Error, { detail: errors })
        );
      }
    }

    // Remove the "tgs" attribute from JSON
    // @ts-ignore
    delete srcParsed.tgs;

    return super.load(srcParsed);
  }

  /**
   * Returns the styles for the component.
   */
  static get styles() {
    return styles;
  }

  protected formatCheck(data: any): string[] {
    const errors: string[] = [];

    if (!("tgs" in data) || data.tgs !== 1) {
      errors.push("Must be marked as a TGS Lottie variant");
    }

    if ((data.op - data.ip) / data.fr > 3.0) {
      errors.push("Longer than 3 seconds");
    }

    if (data.w != 512 || data.h != 512) {
      errors.push("Dimensions should be exactly 512pxx512px");
    }

    if (data.ddd != null && data.ddd != 0) {
      errors.push("Must not have 3D layers");
    }

    if ("markers" in data) {
      errors.push("Must not have markers");
    }

    if (data.assets != null) {
      data.assets.forEach((asset: any) => {
        errors.concat(this.checkLayer(asset.layers));
      });
    }

    data.layers.forEach((layer: any) => {
      errors.concat(this.checkLayer(layer));
    });

    return errors;
  }

  private checkLayer(layer: any): string[] {
    const errors: string[] = [];

    if (layer.ddd != null && layer.ddd != 0) {
      errors.push("Composition should not include any 3D Layers");
    }

    if (layer.sr != null && layer.sr != 1) {
      errors.push("Composition should not include any Time Stretching");
    }

    if (layer.tm != null) {
      errors.push("Composition should not include any Time Remapping");
    }

    if (layer.ty === 1) {
      errors.push("Composition should not include any Solids");
    }

    if (layer.ty === 2) {
      errors.push("Composition should not include any Images");
    }

    if (layer.ty === 5) {
      errors.push("Composition should not include any Texts");
    }

    if (layer.hasMask === true || layer.masksProperties != null) {
      errors.push("Composition should not include any Masks");
    }

    if (layer.tt != null) {
      errors.push("Composition should not include any Mattes");
    }

    if (layer.ao === 1) {
      errors.push("Composition should not include any Auto-Oriented Layers");
    }

    if (layer.ef != null) {
      errors.push("Composition should not include any Layer Effects");
    }

    errors.concat(this.checkItems(layer.shapes, true));

    return errors;
  }

  private checkItems(items: any, shapes: any): string[] {
    const errors: string[] = [];

    if (items != null) {
      items.forEach((item: any) => {
        if (item.ty == "rp") {
          errors.push("Composition should not include any Repeaters");
        }

        if (item.ty == "sr") {
          errors.push("Composition should not include any Star Shapes");
        }

        if (item.ty == "mm") {
          errors.push("Composition should not include any Merge Paths");
        }

        if (item.ty == "gs") {
          errors.push("Composition should not include any Gradient Strokes");
        }

        if (shapes === true) {
          errors.concat(this.checkItems(item.it, false));
        }
      });
    }

    return errors;
  }
}

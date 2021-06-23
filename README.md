## lottie-player Web Component

This is a Web Component for easily embedding and playing Lottie animations and the Lottie-based Telegram Sticker (tgs) animations in websites.

[![npm](https://img.shields.io/npm/v/@lottiefiles/lottie-player.svg)](https://www.npmjs.com/package/@lottiefiles/lottie-player)
[![webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@lottiefiles/lottie-player)

## Demo

![screencast](https://i.imgur.com/miLzIkJ.gif)

- [Basic usage examples](https://codesandbox.io/s/y2nxyvomyj)
- [Scrolling effects demo](https://ypxk7zvpq1.codesandbox.io/)

## Documentation

- [View documentation](https://lottiefiles.github.io/lottie-player/)

## Installation

#### In HTML, import from CDN or from the local Installation:

##### Lottie Player:

- Import from CDN.

```html
<script src="https://unpkg.com/@lottiefiles/lottie-player@0.4.0/dist/lottie-player.js"></script>
```

- Import from local node_modules directory.

```html
<script src="/node_modules/@lottiefiles/lottie-player/dist/lottie-player.js"></script>
```

##### Telegram Sticker (TGS) Player:

- Import from CDN.

```html
<script src="https://unpkg.com/@lottiefiles/lottie-player@0.4.0/dist/tgs-player.js"></script>
```

- Import from local node_modules directory.

```html
<script src="/node_modules/@lottiefiles/lottie-player/dist/tgs-player.js"></script>
```

#### In Javascript or TypeScript:

1. Install package using npm or yarn.

```shell
npm install --save @lottiefiles/lottie-player
```

2. Import package in your code.

```javascript
import "@lottiefiles/lottie-player";
```

## Usage

### Lottie-Player

Add the element `lottie-player` and set the `src` property to a URL pointing to a valid Bodymovin JSON.

```html
<lottie-player
  autoplay
  controls
  loop
  mode="normal"
  src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
  style="width: 320px"
>
</lottie-player>
```

You may set and load animations programatically as well.

```html
<lottie-player autoplay controls loop mode="normal" style="width: 320px">
</lottie-player>
```

```js
const player = document.querySelector("lottie-player");
player.load("https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json");

// or load via a Bodymovin JSON string/object
player.load(
  '{"v":"5.3.4","fr":30,"ip":0,"op":38,"w":315,"h":600,"nm":"new", ... }'
);
```


For dynamically inserted elements into the DOM from Javascript, you will need the latest version of lottie-player and have to hook onto the "rendered" event before trying to load animations.

```html
  <div id="test"></div>
```


```js
 $('#test').html('<lottie-player autoplay controls loop mode="normal" style="width: 320px"></lottie-player>');

  const player = document.querySelector("lottie-player");
  
  player.addEventListener("rendered", (e) => {
  player.load("https://assets2.lottiefiles.com/packages/lf20_jjui4rud.json");

  })
```


### TGS-Player

Add the element `tgs-player` and set the `src` property to a URL pointing to a valid TGS JSON.

```html
<tgs-player autoplay loop mode="normal" src="https//domain/example.tgs">
</tgs-player>
```

### ReactJS & VueJS

Import the player either as

```js
import * as LottiePlayer from "@lottiefiles/lottie-player";
```

or

```js
require("@lottiefiles/lottie-player");
```

Use as follows

```html
<lottie-player
  autoplay
  controls
  loop
  mode="normal"
  src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
  style="width: 320px"
></lottie-player>
```

### Typescript ReactJS

Import the player either as

```js
import * as LottiePlayer from "@lottiefiles/lottie-player";
```

or

```js
require("@lottiefiles/lottie-player");
```

Use as follows

```html
<lottie-player
  autoplay
  controls
  loop
  mode="normal"
  src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
  style="width: 320px"
></lottie-player>
```


For typescript projects an added step is required. The component must be declared as a JSX intrinsic element. Create a file 'declarations.d.ts' in the root of your project and add the code below to the file.

```js
declare namespace JSX {
  interface IntrinsicElements {
    "lottie-player": any;
  }
}
```

### NuxtJS

The process for NuxtJS is slightly different. Create a lottie-player.js file in project root inside a folder named 'plugins'. Add the code below to the file

```js
import * as LottiePlayer from "@lottiefiles/lottie-player";
```

Open nuxt.config.js file and adjust the plugins array as shown below

```js
plugins: [{ src: "~/plugins/lottie-player.js", mode: "client" }],
```

You would then be able to use the player as follows inside any component

```html
<lottie-player
  autoplay
  controls
  loop
  style="width:400px"
  src="https://assets3.lottiefiles.com/packages/lf20_RItkEz.json"
  speed="1"
  debug
></lottie-player>
```

This is because the player script needs to be rendered on the browser/client side and we must configure nuxtjs to load the script on the client side only.

### NextJS

The process to import in NextJS is similar to NuxtJS in the sense that on SSR mode, the library must be declared as a client side module. To do this, import the library within a react useEffect hook.

```javascript
import React, { useRef } from "react";

export default function Home() {
  const ref = useRef(null);
  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <lottie-player
          id="firstLottie"
          ref={ref}
          autoplay
          controls
          loop
          mode="normal"
          src="https://assets4.lottiefiles.com/packages/lf20_gb5bmwlm.json"
          style={{ width: "300px", height: "300px" }}
        ></lottie-player>
      </main>
    </div>
  );
}
```

Do add a declaration file named declaration.d.ts to the root of the project as well

```javascript
declare namespace JSX {
  interface IntrinsicElements {
    "lottie-player": any;
  }
}
```

## Properties

| Property              | Attribute             | Description                         | Type                                 | Default           |
| --------------------- | --------------------- | ----------------------------------- | ------------------------------------ | ----------------- |
| `autoplay`            | `autoplay`            | Autoplay animation on load.         | `boolean`                            | `false`           |
| `background`          | `background`          | Background color.                   | `string`                             | `undefined`       |
| `controls`            | `controls`            | Show controls.                      | `boolean`                            | `false`           |
| `count`               | `count`               | Number of times to loop animation.  | `number`                             | `undefined`       |
| `direction`           | `direction`           | Direction of animation.             | `number`                             | `1`               |
| `hover`               | `hover`               | Whether to play on mouse hover.     | `boolean`                            | `false`           |
| `loop`                | `loop`                | Whether to loop animation.          | `boolean`                            | `false`           |
| `mode`                | `mode`                | Play mode.                          | `PlayMode.Bounce \| PlayMode.Normal` | `PlayMode.Normal` |
| `preserveAspectRatio` | `preserveAspectRatio` | Valid preserve aspect ratio value.  | `string`                             | `'xMidYMid meet'` |
| `renderer`            | `renderer`            | Renderer to use.                    | `"svg"                               | "canvas"`         |
| `speed`               | `speed`               | Animation speed.                    | `number`                             | `1`               |
| `src` _(required)_    | `src`                 | Bodymovin JSON data or URL to JSON. | `string`                             | `undefined`       |

*Direction value options are 1 and -1*

## Methods

### `getLottie() => Promise<any>`

Returns the instance of lottie player used in the component.

#### Returns

Type: `Promise<any>`

### `load(src: string | object) => void`

Load (and play) a given Bodymovin animation.

#### Parameters

| Name  | Type                 | Description                                                    |
| ----- | -------------------- | -------------------------------------------------------------- |
| `src` | `string` or `object` | URL, or a JSON string or object representing a Bodymovin JSON. |

#### Returns

Type: `void`

### `pause() => void`

Pause animation play.

#### Returns

Type: `void`

### `play() => void`

Start playing animation.

#### Returns

Type: `void`

### `setDirection(value: number) => void`

Animation play direction.

#### Parameters

| Name    | Type     | Description       |
| ------- | -------- | ----------------- |
| `value` | `number` | Direction values. |

#### Returns

Type: `void`

### `setLooping(value: boolean) => void`

Sets the looping of the animation.

#### Parameters

| Name    | Type      | Description                                              |
| ------- | --------- | -------------------------------------------------------- |
| `value` | `boolean` | Whether to enable looping. Boolean true enables looping. |

#### Returns

Type: `void`

### `setSpeed(value?: number) => void`

Sets animation play speed.

#### Parameters

| Name    | Type     | Description     |
| ------- | -------- | --------------- |
| `value` | `number` | Playback speed. |

#### Returns

Type: `void`

### `stop() => void`

Stops animation play.

#### Returns

Type: `void`

### `seek(value: number | string) => void`

Seek to a given frame. Frame value can be a number or a percent string (e.g. 50%).

#### Returns

Type: `void`

### `snapshot(download?: boolean) => string`

Snapshot the current frame as SVG.
If 'download' argument is boolean true, then a download is triggered in browser.

#### Returns

Type: `string`

### `toggleLooping() => void`

Toggles animation looping.

#### Returns

Type: `void`

### `togglePlay() => void`

Toggle playing state.

#### Returns

Type: `void`

### `resize() => void`

Resize animation stage and elements in response to changes in component.

#### Returns

Type: `void`

## Events

The following events are exposed and can be listened to via `addEventListener` calls.

| Name       | Description                                                               |
| ---------- | ------------------------------------------------------------------------- |
| `load`     | Animation data is loaded.                                                 |
| `error`    | An animation source cannot be parsed, fails to load or has format errors. |
| `ready`    | Animation data is loaded and player is ready.                             |
| `play`     | Animation starts playing.                                                 |
| `pause`    | Animation is paused.                                                      |
| `stop`     | Animation is stopped.                                                     |
| `freeze`   | Animation is paused due to player being invisible.                        |
| `loop`     | An animation loop is completed.                                           |
| `complete` | Animation is complete (all loops completed).                              |
| `frame`    | A new frame is entered.                                                   |

## Styling

| Custom property                           | Description               | Default                |
| ----------------------------------------- | ------------------------- | ---------------------- |
| --lottie-player-toolbar-height            | Toolbar height            | 35px                   |
| --lottie-player-toolbar-background-color  | Toolbar background color  | transparent            |
| --lottie-player-toolbar-icon-color        | Toolbar icon color        | #999                   |
| --lottie-player-toolbar-icon-hover-color  | Toolbar icon hover color  | #222                   |
| --lottie-player-toolbar-icon-active-color | Toolbar icon active color | #555                   |
| --lottie-player-seeker-track-color        | Seeker track color        | #CCC                   |
| --lottie-player-seeker-thumb-color        | Seeker thumb color        | rgba(0, 107, 120, 0.8) |

## License

MIT License © LottieFiles.com

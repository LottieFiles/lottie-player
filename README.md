## lottie-player Web Component

This is a Web Component for easily embedding and playing Lottie animations and the Lottie-based Telegram Sticker (tgs) animations in websites.

[![npm](https://img.shields.io/npm/v/@lottiefiles/lottie-player.svg)](https://www.npmjs.com/package/@lottiefiles/lottie-player)
[![webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@lottiefiles/lottie-player)

## Demo

![screencast](https://i.imgur.com/miLzIkJ.gif)

[Basic usage examples](https://codesandbox.io/s/y2nxyvomyj)

## Documentation

For full documentation, visit [docs.lottiefiles.com/lottie-player](https://docs.lottiefiles.com/lottie-player/)

## Installation

#### In HTML, import from CDN or from the local Installation:

##### Lottie Player:

- Import from CDN.

```html
<script src="https://unpkg.com/@lottiefiles/lottie-player@1.5.7/dist/lottie-player.js"></script>
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
player.addEventListener("rendered", (e) => {
  //Load via URL
  player.load("https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json");
  // or load via a Bodymovin JSON string/object
  player.load(
    '{"v":"5.3.4","fr":30,"ip":0,"op":38,"w":315,"h":600,"nm":"new", ... }'
  );
});
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

### Nuxt 2

Create a `lottie-player.js` file inside the `/plugins` folder and add the below code to the file:

```js
import * as LottiePlayer from "@lottiefiles/lottie-player";
```  
\
Open `nuxt.config.js` file and add the following entry to register the newly created plugin:

```js
export default {
  plugins: [{ src: "~/plugins/lottie-player.js", mode: "client" }]
}
```

This is because the player script needs to be rendered on the browser/client side and we must configure Nuxt to load the script on the client side only.  
\
You would then be able to use the player as follows inside any component:

```html
<lottie-player
  autoplay
  controls
  loop
  style="width:400px"
  src="https://assets3.lottiefiles.com/packages/lf20_RItkEz.json"
  speed="1"
  debug
/>
```

### Nuxt 3

The process for Nuxt 3 is slightly different.  
Create a `lottie-player.client.ts` file inside the `/plugins` folder and add the below code to the file:

```js
import * as LottiePlayer from "@lottiefiles/lottie-player";

export default LottiePlayer;
```
\
Your plugin will be automatically available throughout your Nuxt application thanks to the [plugin auto-registration](https://v3.nuxtjs.org/guide/directory-structure/plugins). Note the `client` suffix in the name of the plugin - this tells Nuxt to load it only on the client side, as the Lottie Player script can only be rendered in the browser.

You would then be able to use the player as follows inside any component:

```html
<lottie-player
  autoplay
  controls
  loop
  style="width:400px"
  src="https://assets3.lottiefiles.com/packages/lf20_RItkEz.json"
  speed="1"
  debug
/>
```

### NextJS

The process to import in NextJS is similar to Nuxt in the sense that on SSR mode, the library must be declared as a client side module. To do this, import the library within a react useEffect hook.

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

Full documentation on player properties, methods, events and styling for the Lottie-player are available [here](https://docs.lottiefiles.com/lottie-player).

## Community & Support

- [Github issues.](https://github.com/LottieFiles/lottie-player/issues) For bugs and errors you encounter using this player.
- [Discord.](https://lottiefiles.com/discord) For hanging out with the community and sharing your awesome Lottie animations!

## Our other Lottie related libraries

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Project</th>
    <th>Description</th>
  </tr>
  <!-- TEMPLATE FOR NEW ROW -->
  <!-- START ROW
  <tr>
    <td>lang</td>
    <td><a href="" target="_blank" rel="noopener noreferrer">supabase-lang</a></td>
  </tr>
  END ROW -->
  <tr>
    <td><a href="https://github.com/LottieFiles/lottie-react" target="_blank" rel="noopener noreferrer">lottie-react</a></td>
    <td>
    A React component for the Lottie Web player.
    </td>
  </tr>
  <tr>
    <td><a href="https://github.com/LottieFiles/lottie-vue" target="_blank" rel="noopener noreferrer">lottie-vue</a></td>
    <td>
    A Vue component for the Lottie player.
    </td>
  </tr>
  <tr>
    <td><a href="https://github.com/LottieFiles/svelte-lottie-player" target="_blank" rel="noopener noreferrer">svelte-lottie-player</a></td>
    <td>
    Lottie player component for use with Svelte.
    </td>
  </tr>
  <tr>
    <td><a href="https://github.com/LottieFiles/jlottie" target="_blank" rel="noopener noreferrer">jLottie</a></td>
    <td>
    jLottie is suitable as a general purpose lottie player, though implements a subset of the features in the core player - this approach leads to a tiny footprint and great performance.
    </td>
  </tr>
  <tr>
    <td><a href="https://github.com/LottieFiles/lottie-interactivity" target="_blank" rel="noopener noreferrer">lottie-interactivity</a></td>
    <td>
    This is a small library to add scrolling, cursor interactivity and interaction chaining to your Lottie Animations.
    </td>
  </tr>
  <tr>
    <td><a href="https://github.com/orgs/dotlottie/repositories" target="_blank" rel="noopener noreferrer">dotLottie</a></td>
    <td>
    dotLottie is an open-source file format that aggregates one or more Lottie files and their associated resources into a single file. They are ZIP archives compressed with the Deflate compression method and carry the file extension of ".lottie".
    </td>
  </tr>
  <tr>
    <td><a href="https://github.com/LottieFiles/lottie-js" target="_blank" rel="noopener noreferrer">lottie-js</a></td>
    <td>
    The library consists of methods to map the Lottie JSON to the object model and interact with properties as well as manipulate them.
    </td>
  </tr>
  <tr>
    <td><a href="https://github.com/LottieFiles/lottie-theming" target="_blank" rel="noopener noreferrer">lottie-theming</a></td>
    <td>
    A library to extract themable properties and apply different themes to a given Lottie
    </td>
  </tr>

</table>

## License

MIT License © LottieFiles.com

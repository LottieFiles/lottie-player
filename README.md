## lottie-player Web Component

This is a Web Component for easily embedding and playing Lottie animations in websites.

[![npm](https://img.shields.io/npm/v/@lottiefiles/lottie-player.svg)](https://www.npmjs.com/package/@lottiefiles/lottie-player)
[![webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@lottiefiles/lottie-player)

## Demo
![screencast](https://i.imgur.com/miLzIkJ.gif)

View editable examples on [CodeSandBox](https://codesandbox.io/s/y2nxyvomyj)

## Installation

#### In HTML, import from CDN or from the local Installation:

- Import from CDN.
```html
<script src="https://unpkg.com/@lottiefiles/lottie-player@0.0.4/dist/lottie-player.js"></script>
```

- Import from local node_modules directory.
```html
<script src="/node_modules/@lottiefiles/lottie-player/dist/lottie-player.js"></script>
```

#### In Javascript or TypeScript:

1. Install package using npm or yarn.
```shell
npm install --save @lottiefiles/lottie-player
```

2. Import package in your code.
```javascript
import '@lottiefiles/lottie-player';
```

## Usage
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

## Properties

| Property           | Attribute    | Description                         | Type                                 | Default           |
| ------------------ | ------------ | ----------------------------------- | ------------------------------------ | ----------------- |
| `autoplay`         | `autoplay`   | Autoplay animation on load.         | `boolean`                            | `false`           |
| `background`       | `background` | Background color.                   | `string`                             | `undefined`       |
| `controls`         | `controls`   | Show controls.                      | `boolean`                            | `false`           |
| `count`            | `count`      | Number of times to loop animation.  | `number`                             | `undefined`       |
| `direction`        | `direction`  | Direction of animation.             | `number`                             | `1`               |
| `hover`            | `hover`      | Whether to play on mouse hover.     | `boolean`                            | `false`           |
| `loop`             | `loop`       | Whether to loop animation.          | `boolean`                            | `false`           |
| `mode`             | `mode`       | Play mode.                          | `PlayMode.Bounce \| PlayMode.Normal` | `PlayMode.Normal` |
| `renderer`         | `renderer`   | Renderer to use.                    | `"svg"`                              | `'svg'`           |
| `speed`            | `speed`      | Animation speed.                    | `number`                             | `1`               |
| `src` _(required)_ | `src`        | Bodymovin JSON data or URL to JSON. | `string`                             | `undefined`       |


## Methods

### `getLottie() => Promise<any>`

Returns the instance of lottie player used in the component.

#### Returns

Type: `Promise<any>`



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



### `toggleLooping() => void`

Toggles animation looping.

#### Returns

Type: `void`



### `togglePlay() => void`

Toggle playing state.

#### Returns

Type: `void`

## Styling

Custom property | Description | Default
----------------|-------------|---------
--lottie-player-toolbar-height | Toolbar height | 35px
--lottie-player-toolbar-background-color | Toolbar background color | transparent
--lottie-player-toolbar-icon-color | Toolbar icon color | #999
--lottie-player-toolbar-icon-hover-color| Toolbar icon hover color | #222
--lottie-player-toolbar-icon-active-color | Toolbar icon active color | #555
--lottie-player-seeker-track-color | Seeker track color | #CCC
--lottie-player-seeker-thumb-color | Seeker thumb color | rgba(0, 107, 120, 0.8)

## License

MIT License © LottieFiles.com
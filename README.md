# lottie-player Web Component

This is a Web Component for easily embedding Lottie animations in websites.

[![Published on npm](https://img.shields.io/npm/v/@lottiefiles/lottie-player.svg)](https://www.npmjs.com/package/@lottiefiles/lottie-player)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/owner/my-element)


## Using this component

```html
<!doctype html>
<html>
  <head>
    <script type="module" src="https://unpkg.com/@lottiefiles/lottie-player@0.0.2/dist/lottie-player.js"></script>
  </head>

  <body>
    <lottie-player
      autoplay
      controls
      loop
      mode="normal"
      src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
      style="width: 320px"
    >
    </lottie-player>
  </body>
</html>
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

## License

MIT License © LottieFiles.com
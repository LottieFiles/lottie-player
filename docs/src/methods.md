## Methods

### `getLottie() => Promise<any>`

Returns the instance of lottie player used in the component.

#### Returns

Type: `Promise<any>`


### `load(src: string | object) => void`

Load (and play) a given Bodymovin animation.

#### Parameters

| Name    | Type     | Description       |
| ------- | -------- | ----------------- |
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

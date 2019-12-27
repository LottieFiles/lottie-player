## Events

The following events are exposed and can be listened to via `addEventListener` calls.

| Name        | Description       |
| ----------- | ----------------- |
| `load`      | Animation data is loaded. |
| `error`     | An animation source cannot be parsed, fails to load or has format errors. |
| `ready`     | Animation data is loaded and player is ready. |
| `play`      | Animation starts playing. |
| `pause`     | Animation is paused. |
| `stop`      | Animation is stopped. |
| `freeze`    | Animation is paused due to player being invisible. |
| `loop`      | An animation loop is completed. |
| `complete`  | Animation is complete (all loops completed). |
| `frame`     | A new frame is entered. |


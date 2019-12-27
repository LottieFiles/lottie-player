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
<lottie-player
    autoplay
    controls
    loop
    mode="normal"
    style="width: 320px"
>
</lottie-player>
```
```js
const player = document.querySelector('lottie-player');
player.load('https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json');

// or load via a Bodymovin JSON string/object
player.load('{"v":"5.3.4","fr":30,"ip":0,"op":38,"w":315,"h":600,"nm":"new", ... }');
```

### TGS-Player
Add the element `tgs-player` and set the `src` property to a URL pointing to a valid TGS JSON. 
```html
<tgs-player
    autoplay
    loop
    mode="normal"
    src="https//domain/example.tgs"
>
</tgs-player>
```

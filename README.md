This an implementation of my [playable interface](https://github.com/adinan-cenci/playable) around HTML's native multimedia embedding elements.

Example:

```js
import AudioPlayer from 'playable-html-wrapper';
customElements.define('audio-player', AudioPlayer);

var player = document.createElement('audio-player');
player.src = 'my-music/never-gonna-give-you-up.mp3';

player.appendTo(document.body).then( => 
{
   player.play();
});
```


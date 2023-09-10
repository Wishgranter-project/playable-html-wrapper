This an implementation of my [multimedia player interface](https://github.com/adinan-cenci/js-multimedia-player-interface) around HTML's native multimedia embedding elements.

Example:

```js
import AudioPlayer from 'html-multimedia-wrapper';
customElements.define('audio-player', AudioPlayer);

var player = document.createElement('audio-player');
player.src = 'my-music/never-gonna-give-you-up.mp3';

player.appendTo(document.body).then( => 
{
   player.play();
});
```


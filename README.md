This an implementation of my [multimedia player interface](https://github.com/adinan-cenci/js-multimedia-player-interface) around HTML's native multimedia embedding elements.

Example:

```js
var AudioPlayer = require('html-multimedia-wrapper');
var audio       = new AudioPlayer();

player.setData({src: 'never-gonna-give-you-up.mp3'}).then( => 
{
   player.play();
});
```


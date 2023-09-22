import PlayerAudio from './PlayerAudio.js';

class PlayerVideo extends PlayerAudio
{
    createMedia()
    {
        return document.createElement('video');
    }
}

export default PlayerVideo;

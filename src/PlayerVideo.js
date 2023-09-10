import PlayerAudio from './PlayerAudio.js';

class PlayerVideo extends PlayerAudio
{
    createMedia()
    {
        return document.createElement('video');
    }
}

PlayerVideo.prototype.defaults =
{
    wrapperId: null
};

export default PlayerVideo;

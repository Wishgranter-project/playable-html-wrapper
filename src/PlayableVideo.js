import PlayableAudio from './PlayableAudio.js';

class PlayableVideo extends PlayableAudio
{
    createMedia()
    {
        return document.createElement('video');
    }
}

export default PlayableVideo;

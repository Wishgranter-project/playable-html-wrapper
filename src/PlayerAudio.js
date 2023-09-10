import { Foundation } from 'multimedia-player-interface';

class PlayerAudio extends Foundation
{
    constructor() 
    {
        super();
        this.settings = {
            src: null
        };
        // this.settings = {...PlayerYouTube.defaults, ...settings};
    }

    connectedCallback() 
    {
        this.mediaP = this.createMedia();
        this.mediaP.src = this.settings.src;

        this.append(this.mediaP);

        this.mediaP.addEventListener('play', (evt) =>
        {
            this.state.isPaused       = false;
            this.state.isPlaying      = true;
            this.state.isWaiting      = false;
            this.fireEvent('player:play');
        });

        this.mediaP.addEventListener('pause', (evt) =>
        {
            this.state.isPlaying      = false;
            this.state.isPaused       = true;
            this.state.isReproducing  = false;
            this.fireEvent('player:pause');
        });

        this.mediaP.addEventListener('timeupdate', (evt) =>
        {
            this.state.isReproducing  = true;
            this.fireEvent('player:timeupdate');
        });

        this.mediaP.addEventListener('ended', (evt) =>
        {
            this.state.isPlaying      = false;
            this.state.isPaused       = true;
            this.state.isReproducing  = false;
            this.state.isWaiting      = false;
            this.fireEvent('player:ended');
        });

        this.mediaP.addEventListener('error', (evt) =>
        {
            this.fireEvent('player:error', {errorCode: 0, errorMessage: 'Resource could not be loaded'});
        });

        this.mediaP.addEventListener('loadstart', (evt) => // start to load resource
        {
            this.state.isBuffering    = true;
        });

        this.mediaP.addEventListener('progress', (evt) => // fires as it loads the resource
        {
            this.state.isBuffering    = true;
        });

        this.mediaP.addEventListener('waiting', (evt) => // stoped for buffering
        {
            this.state.isReproducing  = false;
            this.state.isBuffering    = true;
            this.state.isWaiting      = true;
            this.fireEvent('player:waiting');
        });

        this.mediaP.addEventListener('playing', (evt) => // buffering is done, can play again
        {
            this.state.isWaiting      = false;
            this.fireEvent('player:playing');
        });

        this.mediaP.addEventListener('canplaythrough', (evt) =>
        {
            this.state.isBuffering    = false;
            this.state.isWaiting      = false;
        });

        this.mediaP.addEventListener('canplay', (evt) =>
        {
            this.state.isBuffering    = false;
            this.state.isWaiting      = false;
        });

        this.mediaP.addEventListener('suspend', (evt) => // not loaded, maybe becaus loading is finished
        {
            this.state.isBuffering    = false;
        });

        this.mediaP.addEventListener('abort', (evt) => // not fully loaded, but not an error
        {
            this.state.isBuffering    = false;
        });

        this.mediaP.addEventListener('stalled', (evt) => // Failed to fetch data, but trying
        {
            this.state.isBuffering    = false;
        });
    }

    set src(src) 
    {
        this.settings.src = src;
    }

    /**
     * @inheritdoc
     */
    get currentTime()
    {
        return this.mediaP.currentTime;
    }

    /**
     * @inheritdoc
     */
    get duration()
    {
        return this.mediaP.duration;
    }

    /**
     * @inheritdoc
     */
    play(time = this.currentTime)
    {
        this.seek(time);
        return this.mediaP.play();
    }

    /**
     * @inheritdoc
     */
    pause()
    {
        this.mediaP.pause();
    }

    /**
     * @inheritdoc
     */
    seek(time)
    {
        var seconds = this.sanitizeGetSeconds(time);
        this.mediaP.currentTime = seconds;
    }

    /**
     * @inheritdoc
     */
    setVolume(vol)
    {
        this.state.volume = vol;

        if (vol > 1) {
            vol /= 100;
        }

        this.mediaP.volume = vol;
    }

    createMedia()
    {
        return new Audio();
    }
}

export default PlayerAudio;

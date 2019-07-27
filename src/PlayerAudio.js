var Player = require('multimedia-player-interface');

class PlayerAudio extends Player
{
    constructor(settings = null)
    {
        super();

        if (settings == null) {
            this.settings = this.defaults;
        } else {
            this.settings = {...this.defaults, ...settings};
        }

        this.source         = null;
        this.mediaP         = this.createMedia();
        this.mediaP.addEventListener('play', (evt) =>
        {
            this.state.paused       = false;
            this.state.playing      = true;
            this.state.waiting      = false;
            this.dispatchEvent('play');
        });

        this.mediaP.addEventListener('pause', (evt) =>
        {
            this.state.playing      = false;
            this.state.paused       = true;
            this.state.reproducing  = false;
            this.dispatchEvent('pause');
        });

        this.mediaP.addEventListener('timeupdate', (evt) =>
        {
            this.state.reproducing  = true;
            this.dispatchEvent('timeupdate');
        });

        this.mediaP.addEventListener('ended', (evt) =>
        {
            this.state.playing      = false;
            this.state.paused       = true;
            this.state.reproducing  = false;
            this.state.waiting      = false;
            this.dispatchEvent('ended');
        });

        this.mediaP.addEventListener('error', (evt) =>
        {
            this.dispatchEvent('error', {errorCode: 0, errorMessage: 'Resource could not be loaded'});
        });

        this.mediaP.addEventListener('loadstart', (evt) => // start to load resource
        {
            this.state.buffering    = true;
        });

        this.mediaP.addEventListener('progress', (evt) => // fires as it loads the resource
        {
            this.state.buffering    = true;
        });

        this.mediaP.addEventListener('waiting', (evt) => // stoped for buffering
        {
            this.state.reproducing  = false;
            this.state.buffering    = true;
            this.state.waiting      = true;
            this.dispatchEvent('waiting');
        });

        this.mediaP.addEventListener('playing', (evt) => // buffering is done, can play again
        {
            this.state.waiting      = false;
            this.dispatchEvent('playing');
        });

        this.mediaP.addEventListener('canplaythrough', (evt) =>
        {
            this.state.buffering    = false;
            this.state.waiting      = false;
        });

        this.mediaP.addEventListener('canplay', (evt) =>
        {
            this.state.buffering    = false;
            this.state.waiting      = false;
        });

        this.mediaP.addEventListener('suspend', (evt) => // not loaded, maybe becaus loading is finished
        {
            this.state.buffering    = false;
        });

        this.mediaP.addEventListener('abort', (evt) => // not fully loaded, but not an error
        {
            this.state.buffering    = false;
        });

        this.mediaP.addEventListener('stalled', (evt) => // Failed to fetch data, but trying
        {
            this.state.buffering    = false;
        });
    }

    mediaListen(evt, listener)
    {
        this.mediaP.addEventListener(evt, listener);
        return this;
    }

    createMedia()
    {
        return new Audio();
    }

    get currentTime()
    {
        return this.mediaP.currentTime;
    }

    get duration()
    {
        return this.mediaP.duration;
    }

    get buffered()
    {
        return this.mediaP.buffered;
    }

    setData(data)
    {
        this.data = data;
        this.newSource(data.file || data.src);

        return new Promise((success, fail) =>
        {
            success();
        });
    }

    play(time = this.currentTime)
    {
        this.seek(time);
        return this.mediaP.play();
    }

    pause()
    {
        this.mediaP.pause();
    }

    seek(time)
    {
        var seconds = this.sanitizeGetSeconds(time);
        this.mediaP.currentTime = seconds;
    }

    setVolume(vol)
    {
        this.state.volume = vol;

        if (vol > 1) {
            vol /= 100;
        }

        this.mediaP.volume = vol;
    }

    newSource(source)
    {
        this.pause();

        this.source         = source;
        this.mediaP.src     = source;
        this.mediaP.load();
        this.state.waiting = true;
    }
}

PlayerAudio.prototype.defaults = {};
module.exports = PlayerAudio;

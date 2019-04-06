var Player = require('multimedia-player');

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

        this.currentTime    = 0;
        this.mediaP         = this.createMedia();
        this.source         = null;
        this.mediaP.addEventListener('play',            this.evtPlay.bind(this));
        this.mediaP.addEventListener('pause',           this.evtPause.bind(this));
        this.mediaP.addEventListener('timeupdate',      this.evtTimeupdate.bind(this));
        this.mediaP.addEventListener('ended',           this.evtEnded.bind(this));
        this.mediaP.addEventListener('error',           this.evtError.bind(this));
        this.mediaP.addEventListener('loadstart',       this.evtLoadStart.bind(this)); // start to load resource
        this.mediaP.addEventListener('progress',        this.evtProgress.bind(this)); // fires as it loads the resource
        this.mediaP.addEventListener('waiting',         this.evtWaiting.bind(this)); // stoped for buffering
        this.mediaP.addEventListener('canplaythrough',  this.evtCanPlayThrough.bind(this));
        this.mediaP.addEventListener('canplay',         this.evtCanPlay.bind(this));
        this.mediaP.addEventListener('suspend',         this.evtSuspend.bind(this)); // not loaded, maybe becaus loading is finished
        this.mediaP.addEventListener('abort',           this.evtAbort.bind(this)); // not fully loaded, but not an error
        this.mediaP.addEventListener('stalled',         this.evtStalled.bind(this)); // Failed to fetch data, but trying
        //loadeddata
        //seeking
        //seeked
        //durationchange
    }

    createMedia()
    {
        return new Audio();
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
        this.newSource(data.file);

        return new Promise((success, fail) =>
        {
            success();
        });
    }

    play(time = this.currentTime)
    {
        this.setCurrentTime(time);
        return this.mediaP.play();
    }

    pause()
    {
        this.mediaP.pause();
    }

    setCurrentTime(time)
    {
        var seconds = this.sanitizeGetSeconds(time);
        this.mediaP.currentTime = seconds;
    }

    setVolume(value)
    {
        if (value > 1 && value < 10) {
            value /= 10
        } else if (value >= 10) {
            value /= 100
        }

        this.mediaP.volume = value;
    }

    newSource(source)
    {
        this.pause();

        this.source     = source;
        this.mediaP.src = source;
        //this.mediaP.load();
    }

    evtTimeupdate(evt)
    {
        this.reproducing    = true;
        this.currentTime    = this.mediaP.currentTime;
        this.onTimeupdate(evt);
    }

    evtPause(evt)
    {
        this.playing        = false;
        this.paused         = true;
        this.reproducing    = false;
        this.onStateChange();
    }

    evtPlay(evt)
    {
        this.paused         = false;
        this.playing        = true;
        this.waiting        = false;
        this.onStateChange();
    }

    evtEnded(evt)
    {
        this.playing        = false;
        this.paused         = true;
        this.reproducing    = false;
        this.waiting        = false;
        this.onEnded(evt);
        this.onStateChange();
    }

    evtError(evt)
    {
        this.onError();
    }

    evtLoadStart(evt)
    {
        this.buffering      = true;
        this.onStateChange();
    }

    evtProgress(evt)
    {
        this.buffering      = true;
        this.onStateChange();
    }

    evtWaiting(evt)
    {
        this.reproducing    = false;
        this.buffering      = true;
        this.waiting        = true;
        this.onStateChange();
    }

    evtCanPlayThrough(evt)
    {
        this.buffering      = false;
        this.waiting        = false;
        this.onStateChange();
    }

    evtCanPlay(evt)
    {
        this.buffering      = false;
        this.waiting        = false;
        this.onStateChange();
    }

    evtSuspend(evt)
    {
        this.buffering      = false;
        this.onStateChange();
    }

    evtAbort(evt)
    {
        this.buffering      = false;
        this.onStateChange();
    }

    evtStalled()
    {
        this.buffering      = false;
        this.onStateChange();
    }

    onStateChange() {}
}

PlayerAudio.prototype.defaults = {};
module.exports = PlayerAudio;

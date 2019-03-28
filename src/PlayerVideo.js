var PlayerAudio = require('./PlayerAudio.js');

class PlayerVideo extends PlayerAudio
{
    createMedia()
    {
        var v = document.createElement('video');
        var wrapper = this.settings.wrapperId ?
            document.getElementById(this.settings.wrapperId) :
            document.body;

        wrapper.append(v);
        return v;
    }
}

PlayerVideo.prototype.defaults =
{
    wrapperId: null
};

module.exports = PlayerVideo;

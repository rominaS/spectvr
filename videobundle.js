var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-vr');

var player = videojs('my-video');

player.vr({projection: '360'});

requestAnimationFrame = function() {
return requestAnimationFrame ||
    webkitRequestAnimationFrame ||
    mozRequestAnimationFrame ||
    msRequestAnimationFrame ||
    oRequestAnimationFrame ||
    function(f) {
        setTimeout(f, 1e3/60);
    };
}();

/**
 * handles the game loop, pause and resum
 *
 * @class engine
 * @static
 */
var engine = {
    _fps:      null,
    _now:      null,
    _then:     null,
    _interval: null,
    _delta:    null,
    _counter:  0,
    _paused:   false,

    init: function() {
        this._fps = config.fps;
        this._interval = 1000 / this._fps;
        this._then = Date.now();
        this._boundUpdate = this._update.bind(this);

        this._update();
    },

    /**
     * calculates the proper time - based on fps - to trigger the rAF and new frame
     *
     * @fires newframe - triggers on every frame
     */
    _update: function() {
        if (!this._paused) {
            requestAnimationFrame(this._boundUpdate);
        }
        
        this._now = Date.now();
        this._delta = this._now - this._then;
        
        if (this._delta > this._interval) {
            // trim @then if it's more than @interval
            this._then = this._now - (this._delta % this._interval);
            this._counter += 1;

            radio.broadcast('newframe', {
                frame: this._counter
            });
        }
    },

    /**
     * Pauses the game by stopping the engine
     */
    pause: function() {
        this._paused = true;
    },

    /**
     * Resumes the game engine
     */
    resume: function() {
        this._paused = false;
        this._update();
    }
};
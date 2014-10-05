/**
 * initializes classes, loads initial state/data after dom ready
 *
 * @class game
 * @static
 */
var game = {
    start: function(state, data, options) {
        this._state = state;
        this._data = data;
        this._options = options;

        radio.tuneIn(window, 'load', this._onWindowLoad, this);
    },

    _onWindowLoad: function() {
        radio.tuneOut(window, 'load', this._onWindowLoad);
        
        // bootstrap
        domControl.init();
        draw.init();
        stateControl.init();
        engine.init();

        stateControl.load(this._state, this._data, this._options);
    }
};
var game = {
    start: function(state, data, options) {
        this._state = state;
        this._data = data;
        this._options = options;

        radio.tuneIn(window, 'load', this._onWindowLoad, this);
    },

    _onWindowLoad: function() {
        radio.tuneOut(window, 'load');
        
        // bootstrap
        engine.init();
        stateControl.init();

        stateControl.load(this._state, this._data, this._options);
    }
};
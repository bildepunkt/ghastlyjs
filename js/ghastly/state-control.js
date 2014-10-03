/**
 * sets up state objects
 *
 * @class stateControl
 * @static
 */
var stateControl = {
    states: [],

    init: function() {
        radio.tuneIn('newframe', this.update, this);
        radio.tuneIn('dataparsed', this._onDataParsed, this);
    },

    update: function() {
        radio.broadcast('update', this.states);

        for(var i = 0; i < this.states.length; i += 1) {
            if (!this.states[i]._config.frozen) {
                this.states[i].update();
            }
        }

        radio.broadcast('render', this.states);
    },

    pop: function() {
        // top stack
        var currentState = this.states[-1];
        currentState.destroy();
        this.states.pop();

        // next in stack
        currentState = this.states[-1];
        currentState._config.frozen = false;
        currentState.init();
    },

    _onDataParsed: function(e) {
        var data = e.detail.data;
        var currentState = this.states[-1];

        if (this._options) {
            if (this._options.remove) {
                this.pop();
            }
            if (this._options.freeze) {
                currentState.destroy();
                currentState._config.frozen = true;
            }
        }

        // init method called from constructor
        currentState = new this._State();

        for(var prop in data) {
            currentState[prop] = data[prop];
        }

        this.states.push(currentState);
    },

    /**
     * @param {constructor} State
     * @param {object}      data      - parsed data
     * @param {object}      [options] - key/val options
     */
    load: function(State, data, options) {
        this._State = State;
        this._options = options;

        dataControl.load(data);
    }
};
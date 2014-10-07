/**
 * the base state to extend from
 *
 * @class State
 */
var State = protos.create({
    /** 
     * @member {string} State.prototype.name - the unique name necessary for proto's inheritance
     */
    _protosName: 'state',

    init: function() {
        /**
         * stores config data
         * @member {object} _config
         */
        this._config = {};

        // create and expose canvas entity
        this._createCanvasEntity();
        this._onWindowResize();
    },

    _createCanvasEntity: function() {
        this.canvas = new Shade();
        radio.tuneIn(window, 'resize', this._onWindowResize, this);
    },

    _onWindowResize: function() {
        this.canvas.width(window.innerWidth);
        this.canvas.height(window.innerHeight);
    },

    /**
     * for use when a new state is loaded and user wants to freeze this one
     * @method State.prototype.freeze
     */
    freeze: function() {},

    /**
     * for use to return a state from its frozen state
     * @method State.prototype.thaw
     */
    thaw: function() {},

    /**
     * updates all layers' entity's velocities, camera input, and determines visibility
     * @method State.prototype.update
     */
    update: function() {
        var layer;
        var i;

        for(layer in this.layers) {

            for(i = 0; i < this.layers[layer].entities.length; i += 1) {
                entity = this.layers[layer].entities[i].entity;

                entity._x += entity._vx;
                entity._y += entity._vy;

                if (!layer.hud) {
                    entity._x -= this.camera._vx;
                    entity._y -= this.camera._vy;
                }

                // set render x/y
                entity._screenX = entity._x;
                entity._screenY = entity._y;

                // determine visibility
                if (!layer.hud) {
                        if (entity._screenX + entity._width <= 0 || entity._screenX >= config.width ||
                        entity._screenY + entity._height <= 0 || entity._screenY >= config.height) {
                        entity.visible(false);
                    } else {
                        entity.visible(true);
                    }
                }
            }
        }
    },

    /**
     * @method State.prototype.destroy
     */
    destroy: function() {
        radio.tuneOut(window, 'resize', this._onWindowResize);
    }
});
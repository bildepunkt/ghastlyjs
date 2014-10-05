/**
 * the base state to extend from
 *
 * @class State
 */
var State = protos.create({
    _protosName: 'state',
    /**
     * stores config data
     * @member {object} _config
     */
    _config: {},

    init: function() {
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

    destroy: function() {
        radio.tuneOut(window, 'resize', this._onWindowResize);
    }
});
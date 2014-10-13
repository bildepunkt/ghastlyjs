/**
 * Draw renders entities on the canvas. Handles rotation scale etc.
 * 
 * @class draw
 * @static
 */
var draw = {
    /**
     * @private
     */
    init: function() {
        this._canvas = domControl.getCanvas();
        this._context = domControl.getContext();

        radio.tuneIn('render', this._render, this);
    },

    /**
     * @private
     */
    _render: function(e) {
        var states = e.detail.states;
        var statesLen = states.length;
        var state;
        var stateIndex;
        var layer;
        var entities;
        var entitiesLen;
        var entityIndex;
        var entity;
        var x, y;

        if (!states.length) {
            return;
        }

        for (stateIndex = 0; stateIndex < statesLen; stateIndex += 1) {
            state = states[stateIndex];

            this.clear().fill(state.backgroundColor);

            for (layer in state.layers) {
                entities = state.layers[layer].entities;
                entitiesLen = entities.length;

                for (entityIndex = 0; entityIndex < entitiesLen; entityIndex += 1) {
                    entity = entities[entityIndex].entity;

                    this._context.save();

                    if (entity.visible()) {

                        this._context.globalAlpha = entity._opacity;

                        if (entity._scale !== 1) {
                            this._context.scale = entity._scale;
                        }

                        if (entity._rotation !== 0) {
                             this._context.translate(entity._screenX + entity._halfWidth, entity._screenY + entity._halfHeight);
                             this._context.rotate(entity._rotation);
         
                             x = -entity._halfWidth;
                             y = -entity._halfHeight;
                         } else {
                             x = entity._screenX;
                             y = entity._screenY;
                         }

                        this._context.drawImage(
                            entity._img,
                            entity._srcX,
                            entity._srcY,
                            entity._srcWidth,
                            entity._srcHeight,
                            x, y,
                            entity._width,
                            entity._height
                        );
                    }

                    this._context.restore();
                }
            }
        }
    },

    /**
     * clears the entire canvas
     *
     * @returns {draw}
     */
    clear: function() {
        this._context.clearRect(0, 0, config.width, config.height);
        return this;
    },

    /**
     * fills the entire canvas
     *
     * @param color - the color to fill the canvas
     * @returns {draw}
     */
    fill: function(color) {
        this._context.fillStyle = color;
        this._context.fillRect(0, 0, config.width, config.height);

        return this;
    }
};
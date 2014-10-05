/**
 * the base state to extend from
 *
 * @class State
 */
var State = protos.create({
    _name: 'state',
    /**
     * stores config data
     * @member {object} _config
     */
    _config: {},

    /**
     * @param {object} layer
     * @param {object} entity
     */
    addEntity: function(layer, entity) {
        dataControl.parseEntity(layer, entity);
    },

    /**
     * @param {object} layer
     * @param {object} entity
     */
    removeEntity: function(layer, entity) {
        var len = layer.length;
        var i;

        for (i = 0; i < len; i += 1) {
            if (entity._uid === layer[i]._uid) {
                layer[i] = null;
                layer.splice(i, 1);
                break;
            }
        }
    },

    /**
     * changes an entity's depth
     *
     * @param {Sprite} entity
     * @param {enum}   directive - allowed values: bringforward, sendback, bringtofront, sendtoback
     */
    changeEntityDepth: function(layer, entity, directive) {
        var len = layer.length;
        var depth;
        var i;

        for (i = 0; i < len; i += 1) {
            if (layer[i]._uid === entity._uid) {
                depth = i;
                break;
            }
        }

        if ((directive === 'bringforward' || directive === 'bringtofront') && depth === layer.length -1) {
            return;
        }
        if ((directive === 'sendbackward' || directive === 'sendtoback') && depth === 0) {
            return;
        }

        layer.splice(depth, 1);

        switch(directive) {
            case 'bringforward':
                depth += 1;
            break;
            case 'bringToFront':
                depth = layer.length - 1;
            break;
            case 'sendbackward':
                depth -= 1;
            break;
            case 'sendtoback':
                depth = 0;
            break;
        }

        if (depth >= layer.length) {
            layer.push(entity);
        } else {
            layer.splice(depth, 0, entity);
        }
    },

    update: function() {
        var layer;

        for(layer in this.layers) {

            for(i = 0; i < this.layers[layer].length; i += 1) {
                entity = this.layers[layer][i].entity;

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
    }
});
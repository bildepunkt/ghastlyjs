/**
 *
 */
var Layer = protos.create({
    _protosName: 'layer',

    entities: [],

    getEntity: function(name) {
        var len = this.entities.length;
        var i;

        for(i = 0; i < len; i += 1) {
            if (this.entities[i].name == name) {
                return this.entities[i].entity;
            }
        }
    },

    /**
     * @param {Sprite} entity
     */
    addEntity: function(entity) {
        dataControl.parseEntity(this, entity);
    },

    /**
     * @param {object} layer
     * @param {Sprite} entity
     */
    removeEntity: function(entity) {
        var len = this.entities.length;
        var i;

        for (i = 0; i < len; i += 1) {
            if (entity._uid === this.entities[i]._uid) {
                this.entities[i] = null;
                this.entities.splice(i, 1);
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
    changeEntityDepth: function(entity, directive) {
        var len = this.entities.length;
        var depth;
        var i;

        for (i = 0; i < len; i += 1) {
            if (this.entities[i]._uid === entity._uid) {
                depth = i;
                break;
            }
        }

        if ((directive === 'bringforward' || directive === 'bringtofront') && depth === this.entities.length -1) {
            return;
        }
        if ((directive === 'sendbackward' || directive === 'sendtoback') && depth === 0) {
            return;
        }

        this.entities.splice(depth, 1);

        switch(directive) {
            case 'bringforward':
                depth += 1;
            break;
            case 'bringToFront':
                depth = this.entities.length - 1;
            break;
            case 'sendbackward':
                depth -= 1;
            break;
            case 'sendtoback':
                depth = 0;
            break;
        }

        if (depth >= this.entities.length) {
            this.entities.push(entity);
        } else {
            this.entities.splice(depth, 0, entity);
        }
    },
});
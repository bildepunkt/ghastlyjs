/**
 * loads assets and parses data objects
 *
 * @class dataControl
 * @static
 */
var dataControl = {
    /**
     * @param {object} group
     * @param {object} entity
     */
    parseEntity: function(group, entity) {
        var entityName = entity.name || entity.type + entityCount++;
        var createdEntity {
            name: entityName,
            entity: new entity.type()
        };
        var setupProp;

        for(setupProp in entity.setup) {
            if (typeof createdEntity[setupProp] === 'function') {
                createdEntity[setupProp](entity[setupProp]);
            } else {
                throw new Error(entityName + ' has no method called ' + setupProp);
            }
        }

        group.push(createdEntity);
    },

    _onWindowResize: function() {
        this._canvasEntity.width(window.innerWidth);
        this._canvasEntity.height(window.innerHeight);
    },

    _createCanvasEntity: function() {
        this._canvasEntity = new Shade();
        this._onWindowResize();
        radio.tuneIn(window, 'resize', this._onWindowResize, this);
    },


    // first step in preparing data
    load: function(data) {
        this._data = data;
        
        if (data.assets.length) {
            radio.tuneIn(document, 'preloader/assetsloaded', this._onAssetsLoaded, this);
            preloader.load(data.assets);
        } else {
            this._onAssetsLoaded();
        }
    },

    /**
     * exposes and does setup for entities
     */
    _onAssetsLoaded: function() {
        var parsed = {};
        var entityCount = 1;
        var data = this._data;
        var entityIndex;
        var layer;

        radio.tuneOut(document, 'preloader/assetsloaded', this._onAssetsLoaded);

        // create (if needed) and expose canvas entity
        if (!this._canvasEntity) {
            this._createCanvasEntity();
        }
        parsed.canvasEntity = this._canvasEntity;

        for(layer in data.layers) {
            parsed[layer] = [];

            for(entityIndex = 0; entityIndex < data.layers[layer].length; entityIndex += 1) {
                this.parseEntity(parsed[layer], data.layers[layer][entityIndex]);
            }
        }

        radio.broadcast('dataparsed', {
            data: parsed
        });
    }
};
/**
 * loads assets and parses data objects
 *
 * @class dataControl
 * @static
 */
var dataControl = {
    _entityCount: null,

    /**
     * @param {object} layer
     * @param {object} entity
     * @param {integer} [depth]  
     */
    parseEntity: function(layer, dataEntity) {
        var entityName = dataEntity.name || dataEntity.type + this._entityCount++;
        var entityObject = {
            name: entityName,
            entity: new dataEntity.type()
        };
        var setupProp;

        for(setupProp in dataEntity.setup) {
            if (typeof entityObject.entity[setupProp] === 'function') {
                entityObject.entity[setupProp](dataEntity.setup[setupProp]);
            } else {
                throw new Error(entityName + ' has no method called ' + setupProp);
            }
        }

        layer.entities.push(entityObject);
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
        var parsed = {
            layers: {},
            camera: new Camera()
        };
        var data = this._data;
        var entityIndex;
        var layer;

        // reset for each state
        this._entityCount = 1;

        radio.tuneOut(document, 'preloader/assetsloaded', this._onAssetsLoaded);

        parsed.backgroundColor = data.backgroundColor;

        parsed.scroll = data.scroll;

        for(layer in data.layers) {
            parsed.layers[layer] = new Layer();

            parsed.layers[layer].scrollDepth = data.layers[layer].scrollDepth;

            for(entityIndex = 0; entityIndex < data.layers[layer].entities.length; entityIndex += 1) {
                this.parseEntity(parsed.layers[layer], data.layers[layer].entities[entityIndex]);

                // if not yet found/converted and name is a match
                if (typeof parsed.scroll.trigger === 'string' &&
                    parsed.layers[layer].entities[entityIndex].name == parsed.scroll.trigger)
                {
                    parsed.scroll.trigger = parsed.layers[layer].entities[entityIndex].entity;
                }

                if (typeof parsed.scroll.base === 'string' &&
                    parsed.layers[layer].entities[entityIndex].name == parsed.scroll.base)
                {
                    parsed.scroll.base = parsed.layers[layer].entities[entityIndex].entity;
                }
            }
        }

        radio.broadcast('dataparsed', {
            data: parsed
        });
    }
};
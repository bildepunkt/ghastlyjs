/**
 * loads assets and parses data objects
 *
 * @class dataControl
 * @static
 */
var dataControl = {
    /**
     * @param {object} layer
     * @param {object} entity
     * @param {integer} [depth]  
     */
    parseEntity: function(layer, dataEntity, depth) {
        var entityName = dataEntity.name || dataEntity.type + entityCount++;
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

        if (typeof depth === 'number') {
            layer.splice(depth, 0, entityObject);
        } else {
            layer.push(entityObject);
        }
    },

    _onWindowResize: function() {
        this._canvasEntity.width(window.innerWidth);
        this._canvasEntity.height(window.innerHeight);
    },

    _createCanvasEntity: function() {
        this._canvasEntity = new Shade();
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
        this._onWindowResize();
        parsed.canvas = this._canvasEntity;

        parsed.camera = new Camera();

        parsed.layers = {};

        for(layer in data.layers) {
            parsed.layers[layer] = [];

            for(entityIndex = 0; entityIndex < data.layers[layer].length; entityIndex += 1) {
                this.parseEntity(parsed.layers[layer], data.layers[layer][entityIndex]);
            }
        }

        radio.broadcast('dataparsed', {
            data: parsed
        });
    }
};
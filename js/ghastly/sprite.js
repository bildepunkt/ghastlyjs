/**
 * objects with visual representation and depth sorting
 *
 * @class   Sprite
 * @extends Shade
 */
var Sprite = Shade.extend({
    /** 
     * @member {string} Sprite.prototype.name - the unique name necessary for proto's inheritance
     */
    _protosName: 'sprite',

    init: function() {
        this.$shade.init.call(this);

        this._srcX = 0;
        this._srcY = 0;
        this._srcWidth = 0;
        this._srcHeight = 0;
        this._size = 0;
        this._scale = 1;
        this._rotation = 0;
        this._opacity = 1;
        this._img = null;
        this._src = null;
        this._z = null;
        this._visible = true;
    },

    _onLoad: function() {
        radio.tuneOut(this._img, 'load', this._onLoad);

        if (!this._srcWidth && !this._srcWidth) {
            this._srcWidth = this._img.width;
            this._srcHeight = this._img.height;
        }

        if (!this._width && !this._height) {
            this._width = this._img.width;
            this._height = this._img.height;
        }

        radio.broadcast('entityready', {
            entity: this
        });
    },

    /**
     * Create object's img and set the source. On image load, @method _onLoad is called which fires an event, adding this entity to the entity pool in @module entityManager
     * @method Sprite.prototype.setImage
     * @param {string} src - the image source
     * @return {Sprite}
     */
    setImage: function(src) {
        this._img = new Image();
        radio.tuneIn(this._img, 'load', this._onLoad, this);
        this._src = src;
        this._img.src = this._src;
        return this;
    },

    /**
     * If parameter passed set srcWidth, else srcWidth is returned
     * @method Sprite.prototype.srcWidth
     * @return {Sprite|number}
     */
    srcWidth: function(n) {
        if (n !== undefined) {
            this._srcWidth = n;
            return this;
        } else {
            return this._srcWidth;
        }
    },

    /**
     * If parameter passed set srcHeight, else srcHeight is returned
     * @method Sprite.prototype.srcHeight
     * @return {Sprite|number}
     */
    srcHeight: function(n) {
        if (n !== undefined) {
            this._srcHeight = n;
            return this;
        } else {
            return this._srcHeight;
        }
    },

    /**
     * If parameter passed set opacity, else opacity is returned
     * @method Sprite.prototype.opacity
     * @return {Sprite|number}
     */
    opacity: function(n) {
        if (n !== undefined) {
            this._opacity = n;
            return this;
        } else {
            return this._opacity;
        }
    },

    /**
     * If parameter passed set scale (rendering handled by @draw), else scale is returned
     * @method Sprite.prototype.scale
     * @return {Sprite|number}
     */
    scale: function(n) {
        if (n !== undefined) {
            this._scale = n;
            return this;
        } else {
            return this._scale;
        }
    },

    /**
     * If parameter passed set rotation (rendering handled by @draw), else rotation is returned
     * @method Sprite.prototype.rotate
     * @return {Sprite|number}
     */
    rotate: function(degrees) {
        if (degrees) {
            this._rotation += (degrees * Math.PI / 180);
            return this;
        } else {
            return this._rotation;
        }
    },

    /**
     * If parameter passed sets entities visibility, else visibility is returned
     * @method Sprite.prototype.visible
     * @param {boolean} visible - the new value
     * @return {Sprite|number}
     */
    visible: function(visible) {
        if (visible) {
            this._visible = visible;
            return this;
        } else {
            return this._visible;
        }
    }
});
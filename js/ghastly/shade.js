/**
 * A base class for movable objects
 * @class Shade
 */
Shade = protos.create({
    /** 
     * @member {string} Shade.prototype.name - the unique name necessary for proto's inheritance
     */
    name: 'shade',

    init: function() {
        this._x = 0;
        this._y = 0;
        this._vx = 0;
        this._vy = 0;
        this._screenX = 0;
        this._screenY = 0;
        this._width = 0;
        this._height = 0;
        this._halfWidth = 0;
        this._halfHeight = 0;
    },

    _update: function() {
        // apply velocity
        this._x += this._vx;
        this._y += this._vy;
        // set render x/y
        this._screenX = this._x;
        this._screenY = this._y;
    },

    _parseVal: function(n, key) {
        if (typeof n === 'number') {
            this[key] = n;
        // matches '+=n' or '-=n' or '+=n.n'
        } else if (/^\+|\-\=[0-9\.]+$/.test(n)) {
            this[key] += parseFloat(n.match(/[0-9\.]+/), 10);
        }
    },

    /**
     * If parameter passed sets or adds to the object's x coordinate otherwise returns the current value
     * @method Shade.prototype.x
     * @param {number|string} x - a number sets the value, a string value of '+=x' or '-=x' adds or subtracts the current value resprectively
     * @returns {Shade|number}
     */
    x: function(x) {
        if (x) {
            this._parseVal(x, '_x');
            return this;
        } else {
            return this._x;
        }
    },

    /**
     * If parameter passed sets or adds to the object's y coordinate otherwise returns the current value
     * @method Shade.prototype.y
     * @param {number|string} y - a number sets the value, a string value of '+=y' or '-=y' adds or subtracts the current value resprectively
     * @returns {Shade|number}
     */
    y: function(y) {
        if (y) {
            this._parseVal(y, '_y');
            return this;
        } else {
            return this._y;
        }
    },

    /**
     * If parameter passed sets or adds to the object's vx coordinate otherwise returns the current value
     * @method Shade.prototype.vx
     * @param {number|string} vx - a number sets the value, a string value of '+=vx' or '-=vx' adds or subtracts the current value resprectively
     * @returns {Shade|number}
     */
    vx: function(vx) {
        if (vx) {
            this._parseVal(vx, '_vx');
            return this;
        } else {
            return this._vx;
        }
    },

    /**
     * If parameter passed sets or adds to the object's vy coordinate otherwise returns the current value
     * @method Shade.prototype.vy
     * @param {number|string} vy - a number sets the value, a string value of '+=vy' or '-=vy' adds or subtracts the current value resprectively
     * @returns {Shade|number}
     */
    vy: function(vy) {
        if (vy) {
            this._parseVal(vy, '_vy');
            return this;
        } else {
            return this._vy;
        }
    },

    /**
     * If parameter passed sets the object's width value otherwise returns the current value
     * @method Shade.prototype.width
     * @param {number} width - the new width value
     * @returns {Shade|number}
     */
    width: function(width) {
        if (width) {
            this._parseVal(width, '_width');
            this._halfWidth = this._width / 2;
            return this;
        } else {
            return this._width;
        }
    },

    /**
     * If parameter passed sets the object's height value otherwise returns the current value
     * @method Shade.prototype.height
     * @param {number} height - the new height value
     * @returns {Shade|number}
     */
    height: function(height) {
        if (height) {
            this._parseVal(height, '_height');
            this._halfHeight = this._height / 2;
            return this;
        } else {
            return this._height;
        }
    }
});
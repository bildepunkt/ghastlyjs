/**
 * base class for movable objects
 *
 * @class Shade
 */
var Shade = protos.create({
    /** 
     * @member {string} Shade.prototype.name - the unique name necessary for proto's inheritance
     */
    _protosName: 'shade',

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

        this._factor = 1;
        this._canvas = null;
        this._bindings = {};
    },

    _parseVal: function(n, key) {
        if (typeof n === 'number') {
            this[key] = n;
        // matches '+=n' or '-=n' or '+=n.n'
        } else if (/^\+|\-|\/|\*\=[0-9\.]+$/.test(n)) {
            if        (/^\+\=[0-9\.]+$/.test(n)) {
                this[key] += parseFloat(n.match(/[0-9\.]+/), 10);
            } else if (/^\-\=[0-9\.]+$/.test(n)) {
                this[key] -= parseFloat(n.match(/[0-9\.]+/), 10);
            } else if (/^\/\=[0-9\.]+$/.test(n)) {
                this[key] /= parseFloat(n.match(/[0-9\.]+/), 10);
            } else if (/^\*\=[0-9\.]+$/.test(n)) {
                this[key] *= parseFloat(n.match(/[0-9\.]+/), 10);
            }
        }
    },

    /**
     * If parameter passed sets or adds to the object's x coordinate otherwise returns the current value
     * @method Shade.prototype.x
     * @param {number|string} x - a number sets the value, a string value of '+=x' or '-=x' adds or subtracts the current value resprectively
     * @returns {Shade|number}
     */
    x: function(x) {
        if (x !== undefined) {
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
        if (y !== undefined) {
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
        if (vx !== undefined) {
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
        if (vy !== undefined) {
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
        if (width !== undefined) {
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
        if (height !== undefined) {
            this._parseVal(height, '_height');
            this._halfHeight = this._height / 2;
            return this;
        } else {
            return this._height;
        }
    },

    /**
     * @param {number} x - mouse/touch position
     * @param {number} y - mouse/touch position
     */
    _hitPoint: function(x, y) {
        var canvasCssWidth;

        if (this._canvas.style.width) {
            canvasCssWidth = parseInt(this._canvas.style.width, 10);
            this._factor = canvasCssWidth / this._canvas.width;
        }

        if (x >= this._x * this._factor &&
            x <= this._x * this._factor + this._width * this._factor &&
            y >= this._y * this._factor &&
            y <= this._y * this._factor + this._height * this._factor) {
            return true;
        }
        return false;
    },

    /**
     * 
     */
    _handler: function(e) {
        var typeLen = this._bindings[e.type].length;
        var i;

        for(i = 0; i < typeLen; i += 1) {
            if (this._hitPoint(e.offsetX, e.offsetY)) {
                if (this._bindings[e.type][i].boundEntityHandler) {
                    this._bindings[e.type][i].boundEntityHandler(e);
                } else {
                    this._bindings[e.type][i].entityHandler(e);
                }
            }
        }
    },

    /**
     * @param {string} type - any DOM input event
     * @param {function} entityHandler - the event handler
     * @param {object} [context] - the scope for the entityHandler
     */
    bind: function(type, entityHandler, context) {
        if (!this._canvas) {
            this._canvas = domControl.getCanvas();
        }

        if (typeof(this._bindings[type]) === 'undefined' || !this._bindings[type].length) {
            this._bindings[type] = [];
            // we add this here so that there is only one dom binding for each event
            radio.tuneIn(this._canvas, type, this._handler, this);
        }

        this._bindings[type].push({
            entityHandler: entityHandler,
            boundEntityHandler: context ? entityHandler.bind(context) : null
        });
    },

    /**
     * if handler omitted, all bindings will be removed
     *
     * @param {string} type - the dom event to unbind
     * @param {function} [entityHandler] - the event handler
     */
    unbind: function(type, entityHandler) {
        var i;

        if (!this._bindings[type].length) {
            return false;
        }

        switch(arguments.length) {
            case 1:
                for(i = 0; i < this._bindings[type].length; i += 1) {
                    this._bindings[type].splice(i, 1);
                    i -= 1;
                }
            break;
            case 2:
                // can't use pre-assigned length because of splicing :P
                for(i = 0; i < this._bindings[type].length; i += 1) {
                    if (entityHandler === this._bindings[type][i].entityHandler) {
                        this._bindings[type].splice(i, 1);
                        break;
                    }
                }
            break;
        }

        // if last binding, remove dom binding
        if (!this._bindings[type].length) {
            radio.tuneOut(this._canvas, type, this._handler);
        }
    },

    destroy: function() {
        for (var type in this.bindings) {
            this.unbind(type);
        }
    }
});
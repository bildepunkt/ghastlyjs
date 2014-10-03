/**
 * 
 */
var Sprite = function(canvas) {
    this._x = 0;
    this._y = 0;
    this._width = 64;
    this._height = 64;

    this._factor = 1;
    this._canvas = canvas;
    this._bindings = {};
};

/**
 * @param {number} x - mouse/touch position
 * @param {number} y - mouse/touch position
 */
Sprite.prototype._hitPoint = function(x, y) {
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
};

/**
 * 
 */
Sprite.prototype._handler = function(e) {
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
};

/**
 * 
 */
Sprite.prototype.bind = function(type, entityHandler, context) {
    if (typeof(this._bindings[type]) === 'undefined' || !this._bindings[type].length) {
        this._bindings[type] = [];
        // we add this here so that there is only one dom binding for each event
        radio.tuneIn(this._canvas, type, this._handler, this);
    }

    this._bindings[type].push({
        entityHandler: entityHandler,
        boundEntityHandler: context ? entityHandler.bind(context) : null
    });
};

/**
 * if handler omitted, all bindings will be removed
 */
Sprite.prototype.unbind = function(type, entityHandler) {
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
        radio.tuneIn(this._canvas, type, this._handler);
    }
}; 

Sprite.prototype.x = function(x) {
    if (x) {
        this._x = x;
        return this;
    } else {
        return this._x;
    }
};

Sprite.prototype.y = function(y) {
    if (y) {
        this._y = y;
        return this;
    } else {
        return this._y;
    }
};

Sprite.prototype.vx = function(vx) {
    if (vx) {
        this._vx = vx;
        return this;
    } else {
        return this._vx;
    }
};

Sprite.prototype.vy = function(vy) {
    if (vy) {
        this._vy = vy;
        return this;
    } else {
        return this._vy;
    }
};

Sprite.prototype.width = function(width) {
    if (width) {
        this._width = width;
        return this;
    } else {
        return this._width;
    }
};

Sprite.prototype.height = function(height) {
    if (height) {
        this._height = height;
        return this;
    } else {
        return this._height;
    }
};
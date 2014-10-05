/**
 * controls what is shown on the canvas
 */
var Camera = Shade.extend({
    _protosName: 'camera',

    _zoom: 1,

    zoom: function(n) {
        if (n) {
            this._zoom = n;
            return this;
        } else {
            return this._zoom;
        }
    }
});
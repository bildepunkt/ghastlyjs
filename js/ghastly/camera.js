/**
 * controls what is shown on the canvas
 * @class Camera
 */
var Camera = Shade.extend({
    /** 
     * @member {string} Camera.prototype.name - the unique name necessary for proto's inheritance
     */
    _protosName: 'camera',

    _zoom: 1,

    /** 
     * @method Camera.prototype.zoom
     */
    zoom: function(n) {
        if (n) {
            this._zoom = n;
            return this;
        } else {
            return this._zoom;
        }
    }
});
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
     * @member {boolean} Camera.prototype.scrolling - use to turn off scrolling if other camera moves needed
     */
    _scrolling: true,

    init: function() {
        this.$shade.init.apply(this, arguments);

        this.width(config.width);
        this.height(config.height);
    },

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
    },

    scroll: function(trigger, base, regions) {
        if (!this._scrolling) {
            return false;
        }

        this.vx(0);
        this.vy(0);

        if (trigger.vx() < 0 &&
            trigger.x() < regions.left && base.x() < 0)
        {
            this.vx( (trigger.vx()) );
        }

        if (trigger.vx() > 0 &&
            trigger.x() + trigger.width() > regions.right &&
            base.x() > this.width() - base.width())
        {
            this.vx( (trigger.vx()) );
        }

        if (trigger.vy() < 0 &&
            trigger.y() < regions.top && base.y() < 0)
        {
            this.vy( (trigger.vy()) );
        }

        if (trigger.vy() > 0 &&
            trigger.y() + trigger.height() > regions.bottom &&
            base.y() > this.height() - base.height())
        {
            this.vy( (trigger.vy()) );
        }
    },

    contain : function(player) {
        var position = {};

        if (player.x() < 0) {
            player.x(0);
        } else if (player.x() + player.width() > this.width()) {
            player.x(this.width() - player.width());
        }

        if (player.y() < 0) {
            player.y(0);
        } else if (player.y() + player.height() > this.height()) {
            player.y(this.height() - player.height());
        }
    }
});
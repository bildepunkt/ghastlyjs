var LevelState = State.extend({
    _protosName: 'levelstate',

    init: function(data) {
        this.$state.init.call(this, data);

        this.right = true;
        this.player = this.layers.actors.getEntity('player');

        this.canvas.bind('mousedown', this.onPlayerMD, this);
        this.canvas.bind('mouseup', this.onPlayerMU, this);
    },

    onPlayerMD: function(e) {
        if (e.pageX < this.player.x()) {
            this.player.movingLt = true;
        } else if (e.pageX > this.player.x()) {
            this.player.movingRt = true;
        }
    },

    onPlayerMU: function() {
        this.player.movingRt = false;
        this.player.movingLt = false;
        this.player.movingUp = false;
        this.player.movingDn = false;
    },

    update: function() {
        this.$state.update.call(this);
 
        this.camera.contain(this.player);
        this.player.move();
    },

    destroy: function() {
        this.$state.destroy.call(this);
    }
});
var levelState = State.extend({
    _protosName: 'levelstate',

    init: function(data) {
        this.$state.init.call(this, data);

        this.right = true;
        this.player = this.layers.actors.getEntity('player');

        this.player.bind('mousedown', this.onPlayerClick, this);
    },

    onPlayerClick: function() {
        if (this.right) {
            this.right = false;
            this.player.vx(2);
        } else {
            this.right = true;
            this.player.vx(-2);
        }
    },

    update: function() {
        this.$state.update.call(this);
    },

    destroy: function() {
        this.$state.destroy.call(this);
    }
});
var TitleState = State.extend({
    _protosName: 'titlestate',

    init: function(data) {
        this.$state.init.call(this, data);

        this.sign = this.layers.bg.getEntity('sign');

        this.sign.bind('click', this.onStart, this);
    },

    onStart: function() {
        stateControl.load(LevelState, levelData, {
            removePrevious: true
        });
    },

    update: function() {
        this.$state.update.call(this);
    },

    destroy: function() {
        this.sign.unbind('click', this.onStart);
        this.$state.destroy.call(this);
    }
});
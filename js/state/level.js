var levelState = State.extend({
    _protosName: 'levelstate',

    init: function() {
        this.$state.init.call(this);
    },
    update: function() {
        this.$state.update.call(this);
        
        //console.log('level state update');
    },
    destroy: function() {
        this.$state.destroy.call(this);
    }
});
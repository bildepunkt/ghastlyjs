var levelState = State.extend({
    _name: 'levelstate',

    init: function() {
        console.log('level state init');
    },
    update: function() {
        this.$state.update.call(this);
        
        //console.log('level state update');
    },
    destroy: function() {}
});
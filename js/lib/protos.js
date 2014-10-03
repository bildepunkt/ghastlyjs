var protos = {
    _uidCounter: 1,

    // deep copy an object
    clone: function(src) {
        // check for arrays too!
        var obj = (src.hasOwnProperty('length')) ? [] : {},
            prop;

        for (prop in src) {
            if (typeof src[prop] === 'object' && src[prop] !== null) {
                obj[prop] = protos.clone(src[prop]);
            } else {
                obj[prop] = src[prop];
            }
        }
        return obj;
    },

    create: function(members, _super) {
        var Alpha = function(args) {
            this._uid = protos._uidCounter++;
            if (this.init) {
                this.init(args);
            }
        };
        var superName;
        var prop;

        if (!members.name) {
            throw new Error('All protos objects need a "name" property for working inheritance');
        }

        if (_super) {
            superName = '$' + _super.name;
            members[superName] = {};

            for(prop in _super) {
                if (members[prop]) {
                    members[superName][prop] = _super[prop];
                } else {
                    members[prop] = _super[prop];
                }
            }
        }

        for(prop in members) {
            Alpha.prototype[prop] =
                (typeof members[prop] === 'object' && members[prop] !== null) ?
                protos.clone(members[prop]) :
                members[prop];
        }

        Alpha.extend = protos.extend;

        return Alpha;
    },

    extend: function(members) {
        return protos.create(members, new this());
    }
};
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
        var Alpha = function(options) {
            var prop;

            for (prop in this) {
                if (typeof this[prop] === 'object' && this[prop] !== null) {
                    this[prop] = protos.clone(this[prop]);
                }
            }

            for (prop in options) {
                this[prop] = options[prop];
            }

            this._uid = protos._uidCounter++;

            if (this.init) {
                this.init(options);
            }
        };
        var superName;
        var prop;

        if (!members._protosName) {
            throw new Error('All protos objects need a "_protosName" property for working inheritance');
        }

        if (_super) {
            superName = '$' + _super._protosName;
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
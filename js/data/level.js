var levelData = {
    assets: [
        'img/Player.png',
        'img/Baddie.png',
        'img/Fire.png',
        'img/Ghost.png'
    ],
    layers: {
        bg: {
            hud: false,
            entities: [
                {
                    name: 'bg',
                    type: Sprite,
                    setup: {
                        x: 0,
                        y: 0,
                        setImage: 'img/Fire.png',
                        width: 800,
                        height: 600,
                        srcWidth: 800,
                        srcHeight: 600
                    }
                }
            ]
        },
        actors: {
            entities: [
                {
                    name: 'player',
                    type: Sprite,
                    setup: {
                        x: 64,
                        y: 64,
                        setImage: 'img/Player.png',
                        width: 64,
                        height: 64,
                        srcWidth: 64,
                        srcHeight: 64
                    }
                },
                {
                    name: 'ghost',
                    type: Sprite,
                    setup: {
                        x: 128,
                        y: 64,
                        setImage: 'img/Ghost.png',
                        width: 64,
                        height: 64,
                        srcWidth: 64,
                        srcHeight: 64
                    }
                },
                {
                    name: 'baddie',
                    type: Sprite,
                    setup: {
                        x: 192,
                        y: 64,
                        setImage: 'img/Baddie.png',
                        width: 64,
                        height: 64,
                        srcWidth: 64,
                        srcHeight: 64
                    }
                }
            ]
        }
    },
    config: {}
};
var levelData = {
    assets: [
        'img/Player.png',
        'img/Baddie1.png',
        'img/Fire.png',
        'img/Ghost.png'
    ],
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
    scroll: {
        trigger: 'player',
        base: 'bg',
        regions: {
            left: 100,
            right: 700,
            top: 100,
            bottom: 500
        }
    },
    layers: {
        bg: {
            scrollDepth: 1,
            entities: [
                {
                    name: 'bg',
                    type: Sprite,
                    setup: {
                        x: 0,
                        y: 0,
                        setImage: 'img/Fire.png',
                        width: 1200,
                        height: 1200,
                        srcWidth: 800,
                        srcHeight: 600
                    }
                }
            ]
        },
        actors: {
            scrollDepth: 1,
            entities: [
                {
                    name: 'player',
                    type: Sprite,
                    setup: {
                        x: 512,
                        y: 32,
                        setImage: 'img/Player.png',
                        width: 32,
                        height: 32,
                        srcWidth: 32,
                        srcHeight: 32
                    }
                },
                {
                    name: 'ghost',
                    type: Sprite,
                    setup: {
                        x: 128,
                        y: 32,
                        setImage: 'img/Ghost.png',
                        width: 32,
                        height: 32,
                        srcWidth: 32,
                        srcHeight: 32
                    }
                },
                {
                    name: 'baddie',
                    type: Sprite,
                    setup: {
                        x: 192,
                        y: 32,
                        setImage: 'img/Baddie1.png',
                        width: 32,
                        height: 32,
                        srcWidth: 32,
                        srcHeight: 32
                    }
                }
            ]
        }
    },
    config: {}
};
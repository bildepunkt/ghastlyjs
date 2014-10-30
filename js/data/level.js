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
            left: 200,
            right: 760,
            top: 200,
            bottom: 400
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
                        src: 'img/Fire.png',
                        width: 1200,
                        height: 1200
                    }
                }
            ]
        },
        actors: {
            scrollDepth: 1,
            entities: [
                {
                    name: 'player',
                    type: Phantasm,
                    setup: {
                        x: 512,
                        y: 32,
                        src: 'img/Player.png'
                    }
                },
                {
                    name: 'ghost',
                    type: Sprite,
                    setup: {
                        x: 256,
                        y: 32,
                        src: 'img/Ghost.png'
                    }
                },
                {
                    name: 'baddie',
                    type: Sprite,
                    setup: {
                        x: 512,
                        y: 32,
                        src: 'img/Baddie1.png'
                    }
                }
            ]
        }
    },
    config: {}
};
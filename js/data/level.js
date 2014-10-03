var levelData = {
    assets: [],
    layers: {
        bg: [
            {
                name: 'bg',
                type: Sprite,
                setup: {
                    x: 0, y: 0,
                    width: 800,
                    height: 800
                }
            }
        ],
        actors: [
            {
                name: 'player',
                type: Sprite,
                setup: {
                    x: 64, y: 64,
                    width: 64,
                    height: 64
                }
            },
            {
                name: 'npc',
                type: Sprite,
                setup: {
                    x: 512, y: 512,
                    width: 64,
                    height: 64
                }
            }
        ]
    },
    config: {}
};
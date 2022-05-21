class Naming extends Phaser.Scene {

    constructor() {
        super({
            key: 'naming'
        });
    }
    create() {
        var element = this.add.dom(600, 600).createFromCache('form');

        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'loginButton')
            {
                var nameGame = this.getChildByName('name');

                //  Have they entered anything?
                if (nameGame.value !== '')
                {
                    this.scene.launch('saving', {name:nameGame});
                    this.scene.stop('naming');
                }
            }

        });
    }

}

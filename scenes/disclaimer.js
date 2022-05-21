class Disclaimer extends Phaser.Scene {

    constructor() {
        super({
            key: 'disclaimerScene'
        });
    }

    init(data){
        this.esc = data.esc;
    }

    preload() {

    }

    create() {
        if(this.esc) {
            /*this.scene.start('mapScene');
            this.scene.stop('disclaimerScene');*/
            this.scene.get('cinematiqueScene1').musique.stop();
            this.scene.start('tutoScene');
            this.scene.launch('menuScene');
            this.scene.launch('headerScene');
            this.scene.stop('disclaimerScene');
        }
        const txt = this.make.text({
            x: 0,
            y: 0,
            text: 'Un simple avertissement pour vous dire que ce n\'est pas un jeu avec des tracteurs qui volent. Quand nous parlons de ferme du futur, c’est pour une échéance de 5 à 10 ans, avec les objectifs cités précédemment. \n\nConcernant le bien-être animal, certains peuvent être choqués, cependant nous sommes factuels. Le débat n\'est pas de dire si tous le monde doit devenir végétarien mais bien de protéger aux mieux les animaux dans l\'état actuel des choses. \n\nDe nombreux autres points ne sont pas abordés, (gestion des sols, culture hors-sol, production animales dérivées) mais nous ne prétendons pas faire une liste exhaustive de tout ce qu’il faut améliorer dans le futur. Nous présentons simplement certaines choses que nous pouvons améliorer, des solutions qui parfois existes déjà mais qui doivent être plus répandues, et surtout nous ouvrons la porte à votre réflexion et à votre curiosité pour creuser le sujet. \n\n\nMais après tout ce n’est qu’un jeu donc Have Fun ! ',
            style:{
                fontSize:20,
                fontFamily:'MC',
                align:'center',
                wordWrap:{
                    width:window.innerWidth-40
                },
                lineSpacing:10
            }
        });
        Phaser.Display.Align.In.Center(txt, this.add.zone(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight));

        this.input.once('pointerdown', this.start, this);
        this.input.keyboard.once('keydown_ESC', this.start, this);
    }

    start() {
        this.scene.get('cinematiqueScene1').musique.stop();
        this.scene.start('tutoScene');
        this.scene.launch('menuScene');
        this.scene.launch('headerScene');
        this.scene.stop('disclaimerScene');
    }

}
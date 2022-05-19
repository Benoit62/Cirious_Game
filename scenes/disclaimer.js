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
            this.scene.start('tutoScene');
            this.scene.launch('menuScene');
            this.scene.launch('headerScene');
            this.scene.stop('disclaimerScene');
        }
        const txt = this.make.text({
            x: 0,
            y: 0,
            text: 'Si vous vous attendez à un jeu avec des champs qui volent, vous n’avez peut-être pas choisi le bon jeu. Quand nous parlons de ferme du futur, c’est pour une échéance de 5 à 10 ans, avec les objectifs cités précédemment. \n\nConcernant le bien-être animal, certains peuvent être choqué, mais nous parlons de la réalité, et il est utopique de penser que d’ici 10 ans, plus personne ne mangera de viande. Notre consommation globale de viande doit baisser, car sa production est très polluante, cependant la souffrance animale existe et nous devons la réduire le plus possible. \n\nDe nombreux autres points ne sont pas abordés, (gestion des sols, culture hors-sol, production animales) mais nous ne prétendons pas faire une liste exhaustive de tout ce qu’il faut améliorer dans le futur. Nous présentons simplement certaines choses que nous pouvons améliorer, des solutions qui parfois existes déjà mais qui doivent êtres plus répandues, et surtout nous ouvrons la porte à votre réflexion et à votre curiosité pour creuser le sujet. \n\n\nMais puis après tout ce n’est qu’un jeu donc Have Fun ! ',
            style:{
                fontSize:20,
                fontFamily:'monospace',
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
        this.scene.start('tutoScene');
        this.scene.launch('menuScene');
        this.scene.launch('headerScene');
        this.scene.stop('disclaimerScene');
    }

}
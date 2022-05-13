//loading par le S
class Loading extends Phaser.Scene {

    constructor() {
        super({
            key: 'loading'
        });
    }
    preload() {
        //Cinematique
        this.load.image('bg', 'assets/cinematique/clouds.png');
        this.load.image('seedySlt', 'assets/cinematique/seedy_salut.png');
        this.load.image('seedySaut', 'assets/cinematique/seedy_saut.png');
        this.load.spritesheet('tiles', 'assets/cinematique/fantasy-tiles.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('sellier', 'assets/cinematique/selliersheet.png', { frameWidth: 67.6, frameHeight: 105 });
        this.load.spritesheet('scient', 'assets/cinematique/eddisonsheet.png', { frameWidth: 32, frameHeight: 48 });


        // Maps et icones
        this.load.image('map', 'assets/map.png');
        this.load.image('europeile', 'assets/europeile.png');
        this.load.image('desertile', 'assets/desertile.png');
        this.load.image('foretile', 'assets/foretile.png');
        this.load.image('glaceile', 'assets/glaceile.png');
        this.load.image('europe', 'assets/europe.png');
        this.load.image('header', 'assets/header.png');


        this.load.image('build', 'assets/build.png');
        this.load.image('error', 'assets/error.png');
        
        // Batiments ferme
        this.load.spritesheet('pig', 'assets/pig_spritesheet.png', { frameWidth: 416, frameHeight: 416 });
        this.load.spritesheet('cow', 'assets/cow_spritesheet.png', { frameWidth: 416, frameHeight: 416 });
        this.load.spritesheet('sheep', 'assets/sheep_spritesheet.png', { frameWidth: 416, frameHeight: 416 });
        this.load.spritesheet('tank', 'assets/tank.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('solaire', 'assets/solaire.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('house', 'assets/house.png', { frameWidth: 384, frameHeight: 256 });
        

        // Champs et cultures
        this.load.spritesheet('labor', 'assets/labor.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('water', 'assets/water.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('carrot', 'assets/carrot.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('mais', 'assets/mais.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('ble', 'assets/ble.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('riz', 'assets/riz.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('colza', 'assets/colza.png', { frameWidth: 288, frameHeight: 416 });
        

        //Player
        //this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('farmer', 'assets/farmer.png', { frameWidth: 41.3, frameHeight: 86 });


        // Chargement des assets du header
        this.load.image("animal-care", "assets/header/animal.png");
        this.load.image("ecology-care", "assets/header/ecology.png");
        this.load.image("hunger-care", "assets/header/hunger.png");
        this.load.image("dollar", "assets/header/dollar.png");
        this.load.image('off', 'assets/header/off.png');
        this.load.image('globe', 'assets/header/globe.png');


        // Chargement des icons du Menu
        this.load.image("search", "assets/menu/search.png");
        this.load.image("builder", "assets/menu/build.png");
        this.load.image("planter", "assets/menu/planter.png");
        this.load.image("recolter", "assets/menu/recolter.png");
        this.load.image("feed", "assets/menu/pet-food.png");
        this.load.image("upgrade", "assets/menu/upgrade.png"); 
        
        this.load.image("cow-button", "assets/menu/cow.png"); 
        this.load.image("pig-button", "assets/menu/pig.png"); 
        this.load.image("sheep-button", "assets/menu/sheep.png"); 
        this.load.image("bison-button", "assets/menu/bison.png"); 
        this.load.image("chamel-button", "assets/menu/chameau.png"); 
        this.load.image("renne-button", "assets/menu/rennes.png"); 

        this.load.image("labor-button", "assets/menu/labourer.png"); 
        this.load.image("water-button", "assets/menu/water.png"); 
        this.load.image("tank-button", "assets/menu/tank.png"); 
        this.load.image("solaire-button", "assets/menu/solaire.png"); 
        
        this.load.image("carrot-button", "assets/menu/carrot.png"); 
        this.load.image("ble-button", "assets/menu/ble.png"); 
        this.load.image("avoine-button", "assets/menu/avoine.png"); 
        this.load.image("champi-button", "assets/menu/champignons.png"); 
        this.load.image("colza-button", "assets/menu/colza.png"); 
        this.load.image("herbe-button", "assets/menu/herb.png"); 
        this.load.image("lichen-button", "assets/menu/lichens.png"); 
        this.load.image("mais-button", "assets/menu/mais.png"); 
        this.load.image("pdt-button", "assets/menu/pdt.png"); 
        this.load.image("saxaoul-button", "assets/menu/saxaoul.png"); 
        this.load.image("soja-button", "assets/menu/soja.png"); 
        this.load.image("tamaris-button", "assets/menu/tamaris.png"); 
        this.load.image("riz-button", "assets/menu/riz.png"); 
        // Chargement des autres assets du menu
        this.load.image("circle", "assets/menu/circle.png"); 
        this.load.image("menu", "assets/menu/menu.png"); 
        this.load.image("card", "assets/menu/card.png"); 
        this.load.image("savoirPlus", "assets/menu/savoirPlus.png"); 
    }
    create() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading.',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);


        var tmp = 'Loading';
        //update bar et txt loading
        //magie noire
        function progress(value) {
            percentText.setText(parseInt(value) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 3 * value, 30);
            if (value % 20 == 12) {
                var points = '';
                for (let j = 0; j <= value % 3; j++) {
                    points += '.';
                }
                loadingText.setText(tmp + points);
                //console.log(value);
            }
            
        };
        //event loop pour l'update
        var i = 0;
        var timedEvent = this.time.addEvent({
            delay: 25,
            callback: onEvent,
            callbackScope: this,
            loop: true
        });
        //callBack
        function onEvent() {
            //si la bar est full
            if (i == 100) {
                timedEvent.remove(false);
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                this.scene.start('mapScene');
            } else {
                progress(i);
                i+=10;
            }
        }
    }

}
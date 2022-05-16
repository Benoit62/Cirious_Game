//loading par le S
class Loading extends Phaser.Scene {

    constructor() {
        super({
            key: 'loading'
        });
    }
    preload() {
        //Cinematique
        this.load.image('mapmonde', 'assets/cinematique/map.png');
        this.load.image('bg', 'assets/cinematique/clouds.png');
        this.load.image('seedySlt', 'assets/cinematique/seedy_salut.png');
        this.load.image('seedySaut', 'assets/cinematique/seedy_saut.png');
        this.load.spritesheet('tiles', 'assets/cinematique/fantasy-tiles.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('sellier', 'assets/cinematique/selliersheet.png', { frameWidth: 67.6, frameHeight: 105 });
        this.load.spritesheet('scient', 'assets/cinematique/eddisonsheet.png', { frameWidth: 32, frameHeight: 48 });


        // Musique
        this.load.audio('game_musique', 'assets/musique/game_musique.mp3');
        this.load.audio('map_musique', 'assets/musique/map_musique.mp3');
        //this.load.audio('cinematiq_musique', 'assets/musique/cinematiq_musique.mp3');

        // Maps et icones
        this.load.image('map', 'assets/map/map.png');
        this.load.image('europeile', 'assets/map/europeile.png');
        this.load.image('desertile', 'assets/map/desertile.png');
        this.load.image('foretile', 'assets/map/foretile.png');
        this.load.image('glaceile', 'assets/map/glaceile.png');
        this.load.image('europe', 'assets/map/europe.png');
        this.load.image('cadenas', 'assets/map/cadenas.png');

        
        // Batiments ferme
        this.load.spritesheet('labor', 'assets/build/labor.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('water', 'assets/build/water.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('tank', 'assets/build/tank.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('solaire', 'assets/build/solaire.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('house', 'assets/build/house.png', { frameWidth: 384, frameHeight: 256 });
        this.load.spritesheet('river', 'assets/build/river.png', { frameWidth: 384, frameHeight: 256 });
        this.load.image('build', 'assets/build/build.png');



        //Animaux
        this.load.spritesheet('animaldead', 'assets/build/animaldead.png', { frameWidth: 416, frameHeight: 416 });
        this.load.spritesheet('pig', 'assets/build/pig_spritesheet.png', { frameWidth: 416, frameHeight: 416 });
        this.load.spritesheet('cow', 'assets/build/cow_spritesheet.png', { frameWidth: 416, frameHeight: 416 });
        this.load.spritesheet('sheep', 'assets/build/sheep_spritesheet.png', { frameWidth: 416, frameHeight: 416 });
        this.load.spritesheet('salmon', 'assets/build/salmon.png', { frameWidth: 416, frameHeight: 416 });
        this.load.spritesheet('renne', 'assets/build/renne.png', { frameWidth: 416, frameHeight: 416 });
        this.load.spritesheet('chamel', 'assets/build/chamel.png', { frameWidth: 416, frameHeight: 416 });
        

        // Champs et cultures
        this.load.spritesheet('weeds', 'assets/culture/weeds.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('carrot', 'assets/culture/carrot.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('mais', 'assets/culture/mais.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('ble', 'assets/culture/ble.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('riz', 'assets/culture/riz.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('colza', 'assets/culture/colza.png', { frameWidth: 288, frameHeight: 416 });
        

        //Player
        //this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('farmer', 'assets/farmer.png', { frameWidth: 41.3, frameHeight: 86 });


        // Chargement des assets du header
        this.load.image('header', 'assets/header/header.png');
        this.load.image("animal-care", "assets/header/animal.png");
        this.load.image("ecology-care", "assets/header/ecology.png");
        this.load.image("hunger-care", "assets/header/hunger.png");
        this.load.image("dollar", "assets/header/dollar.png");
        this.load.image('off', 'assets/header/off.png');
        this.load.image('globe', 'assets/header/globe.png');
        this.load.image('search', 'assets/header/search.png');


        // Chargement des icons du Menu
        this.load.image("builder", "assets/menu/build.png");
        this.load.image("planter", "assets/menu/planter.png");
        this.load.image("recolter", "assets/menu/recolter.png");
        this.load.image("feed", "assets/menu/pet-food.png");
        this.load.image("upgrade", "assets/menu/upgrade.png"); 
        this.load.image("fertility", "assets/menu/fertility.png"); 
        this.load.image('health', 'assets/search/health.png');
        
        this.load.image("cow-button", "assets/menu/cow.png"); 
        this.load.image("pig-button", "assets/menu/pig.png"); 
        this.load.image("sheep-button", "assets/menu/sheep.png"); 
        this.load.image("bison-button", "assets/menu/bison.png"); 
        this.load.image("chamel-button", "assets/menu/chameau.png"); 
        this.load.image("renne-button", "assets/menu/rennes.png");
        this.load.image('salmon-button', 'assets/menu/salmon.png');

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


        this.load.image('fumier-button', 'assets/menu/fumier.png');
        this.load.image('compost-button', 'assets/menu/compost.png');
        this.load.image('vert-button', 'assets/menu/vert.png');
        this.load.image('chimique-button', 'assets/menu/chimique.png');

        this.load.image('lutte_chimique-button', 'assets/menu/lutte_chimique.png');
        this.load.image('physique-button', 'assets/menu/lutte_physique.png');
        this.load.image('drone-button', 'assets/menu/drone.png');
        this.load.image('drone2-button', 'assets/menu/drone2.png');
        this.load.image('humain-button', 'assets/menu/humain.png');
        this.load.image('biologic-button', 'assets/menu/lutte_bio.png');
        this.load.image('biopesticid-button', 'assets/menu/biopesticides.png');


        // Chargement des autres assets du menu
        this.load.image("circle", "assets/menu/circle.png"); 
        this.load.image("menu", "assets/menu/menu.png"); 
        this.load.image("card", "assets/menu/card.png");
        this.load.image("card2", "assets/menu/card2.png");
        this.load.image("card3", "assets/menu/card3.png");
        this.load.image("savoirPlus", "assets/menu/savoirPlus.png"); 
        this.load.image('error', 'assets/menu/error.png');



        //Chargement ds icones de recherche
        this.load.image('fertility-search', 'assets/search/fertility.png');
        this.load.image('fumier-search', 'assets/search/fumier.png');
        this.load.image('compost-search', 'assets/search/compost.png');
        this.load.image('vert-search', 'assets/search/vert.png');
        this.load.image('chimique-search', 'assets/search/chimique.png');

        this.load.image('health-search', 'assets/search/health.png');
        this.load.image('lutte_chimique-search', 'assets/search/lutte_chimique.png');
        this.load.image('physique-search', 'assets/search/lutte_physique.png');
        this.load.image('drone-search', 'assets/search/drone.png');
        this.load.image('drone2-search', 'assets/search/drone2.png');
        this.load.image('humain-search', 'assets/search/humain.png');
        this.load.image('biologic-search', 'assets/search/lutte_bio.png');
        this.load.image('biopesticid-search', 'assets/search/biopesticides.png');


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



        // Création des donnée globales du jeu
        this.registry.set('search1', {
            type:'search',
            tag:'fertility',
            name:'Engrais',
            children:getByType('fertility'),
            desc:'La fertilité des sols est une notion importante dans les domaines de l\'agriculture et de l\'agronomie, désignant l\'aptitude d\'un sol à produire dans les conditions actuelles de culture. Elle est une des composantes de la qualité des sols.',
            info:''
        });
        this.registry.set('search2', {
            type:'search',
            tag:'health',
            name:'Protection des plantes',
            children:getByType('health'),
            desc:'Veiller à la santé des végétaux et des terres, c’est contribuer à la production agricole et à la sécurité alimentaire, favoriser le développement économique (emplois, production, export) et protéger l’environnement. La protection des plantes constitue un enjeu crucial.',
            info:''
        });
    }

}
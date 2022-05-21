//loading par le S
class Loading extends Phaser.Scene {

    constructor() {
        super({
            key: 'loading'
        });
    }
    preload() {
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        var progressBar = this.add.graphics();

        var width = window.innerWidth/4;
        var height = window.innerHeight/2;
        progressBox.fillRect(width, height - 25, 2*width, 50);

        var loadingText = this.make.text({
            x: 2*width,
            y: height - 55,
            text: 'Chargement',
            style: {
                font: '25px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: 2*width,
            y: height,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var progress = this.add.graphics();
        this.load.on('progress', function (value) {
            let percent = Math.round(value*100);
            percentText.setText(percent + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width, height - 25, 2*width*value, 50);
            if(percent > 48) percentText.setTint(0x000000)
            let points = '';
            if(percent > 25) points+='.';
            if(percent > 50) points+='.';
            if(percent > 75) points+='.';
            loadingText.setText('Chargement' + points);
        }, this);
    
        this.load.on('complete', function () {
            if(!sav) {
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
                this.registry.set('search3', {
                    type:'search',
                    tag:'meal',
                    name:'Nourriture pour animaux',
                    children:getByType('meal'),
                    desc:'Faut bien nourrir les vaches',
                    info:''
                });
                this.registry.set('search4', {
                    type:'search',
                    tag:'sell',
                    name:'Abbattages des animaux',
                    children:getByType('sell'),
                    desc:'Miam la viande',
                    info:''
                });
                this.registry.set('search5', {
                    type:'search',
                    tag:'struct',
                    name:'Gestion des ressources',
                    children:getByType('struct'),
                    desc:'Valorisez les ressources que vous produisez en recherchant de nouvelles technologies',
                    info:''
                });

                // Data
                this.registry.set('unlock', ['europe']);
                this.registry.set('lock', ['aride', 'tropic', 'polaire']);

                this.registry.set('money', 20000);

                getByType('climat').forEach(function(climat){
                    this.registry.set('ecology'+climat.tag, 20);
                    this.registry.set('animalCare'+climat.tag, 50);
                    this.registry.set('hunger'+climat.tag, 20);
                }, this);

                console.log('on set les data');
                console.log(this.registry.values);
                console.log(this.registry.get('unlock'));
            }
            else {
                let datas = registryData;
                for(let i in datas) {
                    if(typeof datas[i] == 'object' && i.type == 'search') {
                        i.children = getByType(i.tag);
                    }
                }
                for(let i in datas) {
                    this.registry.set(i, datas[i]);
                }
                console.log(this.registry.values);
                console.log(this.registry.get('unlock'));
            }
            


            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            if(!sav) this.scene.start('playScene');
            if(sav) this.scene.start('mapScene');
        }, this);


        //Cinematique
        this.load.image('mapmonde', 'assets/cinematique/map.png');
        this.load.image('bg', 'assets/cinematique/clouds.png');
        this.load.image('seedySlt', 'assets/cinematique/seedy_salut.png');
        this.load.image('seedySaut', 'assets/cinematique/seedy_saut.png');
        this.load.spritesheet('tiles', 'assets/cinematique/fantasy-tiles.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('sellier', 'assets/cinematique/selliersheet.png', { frameWidth: 67.6, frameHeight: 106 });
        this.load.spritesheet('scient', 'assets/cinematique/eddisonsheet.png', { frameWidth: 32, frameHeight: 48 });


        // Musique
        this.load.audio('cinematique_musique', 'assets/musique/cinematique_musique.mp3');
        this.load.audio('map_musique', 'assets/musique/map_musique.mp3');
        this.load.audio('tuto_musique', 'assets/musique/tuto_musique.mp3');
        this.load.audio('aride_musique', 'assets/musique/aride_musique.mp3');
        this.load.audio('europe_musique', 'assets/musique/europe_musique.mp3');
        this.load.audio('tropic_musique', 'assets/musique/tropic_musique.mp3');
        this.load.audio('polaire_musique', 'assets/musique/polaire_musique.mp3');
        //this.load.audio('cinematiq_musique', 'assets/musique/cinematiq_musique.mp3');

        // Maps et icones
        this.load.image('map', 'assets/map/map.png');
        this.load.image('europeile', 'assets/map/europeile.png');
        this.load.image('desertile', 'assets/map/desertile.png');
        this.load.image('foretile', 'assets/map/foretile.png');
        this.load.image('glaceile', 'assets/map/glaceile.png');
        this.load.image('tuto', 'assets/map/tuto.png');
        this.load.image('europe', 'assets/map/europe.png');
        this.load.image('desert', 'assets/map/desert.png');
        this.load.image('tropic', 'assets/map/tropic.png');
        this.load.image('polaire', 'assets/map/polaire.png');
        this.load.image('cadenas', 'assets/map/cadenas.png');
        this.load.image('errorLock', 'assets/map/errorLock.png');

        //Tuto
        // Batiments ferme
        this.load.spritesheet('labortuto', 'assets/tuto/build/labor.png', { frameWidth: 288, frameHeight: 416 });
        this.load.spritesheet('housetuto', 'assets/tuto/build/house.png', { frameWidth: 384, frameHeight: 256 });
        this.load.image('buildtuto', 'assets/tuto/build/build.png');
        this.load.spritesheet('tanktuto', 'assets/tuto/build/tank.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('cowtuto', 'assets/tuto/animal/cow.png', { frameWidth: 416, frameHeight: 416 });

        //Autres maps
        for(let z of getByType('climat')) {
            // Batiments ferme
            this.load.spritesheet('labor'+z.tag, 'assets/'+z.tag+'/build/labor.png', { frameWidth: 288, frameHeight: 416 });
            this.load.spritesheet('water'+z.tag, 'assets/'+z.tag+'/build/water.png', { frameWidth: 288, frameHeight: 416 });
            this.load.spritesheet('house'+z.tag, 'assets/'+z.tag+'/build/house.png', { frameWidth: 384, frameHeight: 256 });
            this.load.spritesheet('river'+z.tag, 'assets/'+z.tag+'/build/river.png', { frameWidth: 384, frameHeight: 256 });
            this.load.image('build'+z.tag, 'assets/'+z.tag+'/build/build.png');

            for(let i of getByType('struct')) {
                this.load.spritesheet(i.tag+z.tag, 'assets/'+z.tag+'/build/'+i.tag+'.png', { frameWidth: 192, frameHeight: 192 });
            }


            //Animaux
            for(let i of getByType('animal')) {
                this.load.spritesheet(i.tag+z.tag, 'assets/'+z.tag+'/animal/'+i.tag+'.png', { frameWidth: 416, frameHeight: 416 });
            }
        }

        // Champs et cultures
        this.load.spritesheet('weeds', 'assets/culture/weeds.png', { frameWidth: 288, frameHeight: 416 });
        for(let i of getByType('plant')) {
            this.load.spritesheet(i.tag, 'assets/culture/'+i.tag+'.png', { frameWidth: 288, frameHeight: 416 });
        }
        

        //Player
        //this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('farmer', 'assets/farmer.png', { frameWidth: 41.3, frameHeight: 86 });
        this.load.spritesheet('tractor', 'assets/tractor.png', { frameWidth: 148, frameHeight: 148 });


        // Chargement des assets du header
        this.load.image('header', 'assets/header/header.png');
        this.load.image("animal-care", "assets/header/animal.png");
        this.load.image("ecology-care", "assets/header/ecology.png");
        this.load.image("hunger-care", "assets/header/hunger.png");
        this.load.image("dollar", "assets/header/dollar.png");
        this.load.image('off', 'assets/header/off.png');
        this.load.image('globe', 'assets/header/globe.png');
        this.load.image('search', 'assets/header/search.png');
        this.load.image('mute', 'assets/header/mute.png');
        this.load.image('sound', 'assets/header/sound.png');




        // Chargement des icons du Menu
        this.load.image("builder", "assets/menu/build.png");
        this.load.image("planter", "assets/menu/planter.png");
        this.load.image("recolter", "assets/menu/recolter.png");
        this.load.image("meal", "assets/menu/meal.png");
        this.load.image("upgrade", "assets/menu/upgrade.png"); 
        this.load.image("fertility", "assets/menu/fertility.png"); 
        this.load.image('health', 'assets/menu/health.png');
        this.load.image('sellAnimal', 'assets/menu/sellAnimal.png');

        
        this.load.image('bull-button', 'assets/menu/bull.png');
        

        //Boutton des animaux
        for(let i of getByType('animal')) {
            this.load.image(i.tag+'-button', 'assets/menu/'+i.tag+'.png');
        }

        /*this.load.image("labor-button", "assets/menu/labourer.png"); 
        this.load.image("water-button", "assets/menu/water.png"); 
        this.load.image("tank-button", "assets/menu/tank.png"); 
        this.load.image("solaire-button", "assets/menu/solaire.png"); */

        //Bouttons des structures
        for(let i of getByType('struct')) {
            this.load.image(i.tag+'-button', 'assets/menu/'+i.tag+'.png');
        }

        //Bouttons des champs
        for(let i of getByType('field')) {
            this.load.image(i.tag+'-button', 'assets/menu/'+i.tag+'.png');
        }
        
        
        //Boutton des cultures
        for(let i of getByType('plant')) {
            this.load.image(i.tag+'-button', 'assets/menu/'+i.tag+'.png');
        }


        //Boutton des engrais
        for(let i of getByType('fertility')) {
            this.load.image(i.tag+'-button', 'assets/menu/'+i.tag+'.png');
        }


        //Boutton des luttes
        for(let i of getByType('health')) {
            this.load.image(i.tag+'-button', 'assets/menu/'+i.tag+'.png');
        }


        //Boutton des nourritures
        for(let i of getByType('meal')) {
            this.load.image(i.tag+'-button', 'assets/menu/'+i.tag+'.png');
        }


        //Boutton des abbatages
        for(let i of getByType('sell')) {
            this.load.image(i.tag+'-button', 'assets/menu/'+i.tag+'.png');
        }


        // Chargement des autres assets du menu
        this.load.image("circle", "assets/menu/circle.png"); 
        this.load.image("menu", "assets/menu/menu.png"); 
        this.load.image("card", "assets/menu/card.png");
        this.load.image("card2", "assets/menu/card2.png");
        this.load.image("card3", "assets/menu/card3.png");
        this.load.image("savoirPlus", "assets/menu/savoirPlus.png"); 
        this.load.image('error', 'assets/menu/error.png');
        this.load.image('seedyAdvice', 'assets/menu/seedyAdvice.png');
        this.load.image('seedyAdvice2', 'assets/menu/seedyAdvice2.png');
        this.load.image('white', 'assets/menu/white.png');



        //Chargement ds icones de recherche

        //Boutton des engrais
        this.load.image('fertility-search', 'assets/search/fertility.png');
        for(let i of getByType('fertility')) {
            this.load.image(i.tag+'-search', 'assets/search/'+i.tag+'.png');
        }


        //Boutton des luttes
        this.load.image('health-search', 'assets/search/health.png');
        for(let i of getByType('health')) {
            this.load.image(i.tag+'-search', 'assets/search/'+i.tag+'.png');
        }


        //Boutton des nourritures
        this.load.image('meal-search', 'assets/search/meal.png');
        for(let i of getByType('meal')) {
            this.load.image(i.tag+'-search', 'assets/search/'+i.tag+'.png');
        }


        //Boutton des abbatages
        this.load.image('sell-search', 'assets/search/sellAnimal.png');
        for(let i of getByType('sell')) {
            this.load.image(i.tag+'-search', 'assets/search/'+i.tag+'.png');
        }

        //Boutton des abbatages
        this.load.image('struct-search', 'assets/search/struct.png');
        for(let i of getByType('struct')) {
            this.load.image(i.tag+'-search', 'assets/search/'+i.tag+'.png');
            for(let j of getByType(i.product)) {
                this.load.image(j.tag+'-search', 'assets/search/'+j.tag+'.png');
                
            }
        }


        //Formulaire
        
        this.load.html('form', 'assets/form.html');

    }
    create() {
        /*var progressBar = this.add.graphics();
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
                this.scene.start('playScene');
            } else {
                progress(i);
                i+=10;
            }
        }*/



        
    }

}

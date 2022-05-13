<?php
session_start();
if (!isset($_SESSION['autorisation']) && $_SESSION['autorisation'] != 'iseed') {
    header('location: connexion.php');
}

include("config/configbdd.php");
?>


<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="game.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <title>ISEED</title>
    <script src="http://cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"></script>
</head>

<body>
    <script type="text/javascript" src="cinematique.js"></script>
    <script type="text/javascript" src="data.js"></script>
    <script type="text/javascript" src="desert.js"></script>
    <script type="text/javascript" src="foret.js"></script>
    <script type="text/javascript" src="glace.js"></script>
    <script type="text/javascript" src="europe.js"></script>
    <script type="text/javascript">

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
                this.load.image('off', 'assets/off.png');
                this.load.image('globe', 'assets/globe.png');


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
                

                //Player
                //this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
                this.load.spritesheet('farmer', 'assets/farmer.png', { frameWidth: 41.3, frameHeight: 86 });


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

        //scenes par Benoit
        class Play extends Phaser.Scene {

            constructor() {
                super({
                    key: 'playScene'
                });
            }

            preload() {

            }

            create() {
                const txt = this.add.text(0, 0, 'Play').setFontSize(64);
                Phaser.Display.Align.In.Center(txt, this.add.zone(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight));

                this.input.once('pointerdown', this.start, this);

                console.log('Scale width', this.width, 'Scale height', this.height, 'Window height', window.innerHeight, 'Window width', window.innerWidth);
            }

            start() {
                this.scene.start('cinematiqueScene1');
            }

        }


        

        class Map extends Phaser.Scene {

            constructor ()
            {
                super({ key: 'mapScene' });
                this.europe;
                this.desert;
                this.glace;
                this.foret;
            }

            create ()
            {
                // Data
                this.data.set('unlock', ['europe']);
                this.data.set('lock', ['desert', 'foret', 'glace']);

                // Ajout de la map et centrage
                const map = this.add.image(0, 0, 'map');
                Phaser.Display.Align.In.Center(map, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                
                // Setup de la camera
                let zoom = 1;
                while(1632*zoom > window.innerHeight) zoom -= 0.01;
                this.cameras.main.zoom = zoom;




                this.foret = this.add.image(0, 0, 'foretile').setInteractive();
                Phaser.Display.Align.In.Center(this.foret, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                this.foret.setX(this.foret.x+780);
                this.foret.setY(this.foret.y+218);
                this.foret.on('pointerdown', function(){
                    if(this.data.get('unlock').includes('foret')) {
                        if(this.scene.isSleeping('foretScene')) {                        
                            this.scene.wake('foretScene');
                        }
                        else {
                            this.scene.start('foretScene');
                        }
                    }
                    else {
                        this.lockText();
                    }
                }, this);




                this.europe = this.add.image(0, 0, 'europeile').setInteractive();
                Phaser.Display.Align.In.Center(this.europe, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                this.europe.setX(this.europe.x-318);
                this.europe.setY(this.europe.y-250);
                this.europe.on('pointerdown', function(){
                    if(this.data.get('unlock').includes('europe')) {
                        if(this.scene.isSleeping('europeScene')) {                        
                            this.scene.wake('europeScene');

                            this.scene.sleep('mapScene');
                        }
                        else {
                            this.scene.start('europeScene');
                        }
                        this.scene.launch('menuScene');
                        this.scene.launch('headerScene');
                    }
                }, this);


                

                this.desert = this.add.image(0, 0, 'desertile').setInteractive();
                Phaser.Display.Align.In.Center(this.desert, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                this.desert.setX(this.desert.x-702);
                this.desert.setY(this.desert.y+446);
                this.desert.on('pointerdown', function(){
                    if(this.data.get('unlock').includes('desert')) {
                        if(this.scene.isSleeping('desertScene')) {                        
                            this.scene.wake('desertScene');
                        }
                        else {
                            this.scene.start('desertScene');
                        }
                    }
                    else {
                        this.lockText();
                    }
                }, this);

                


                this.glace = this.add.image(0, 0, 'glaceile').setInteractive();
                Phaser.Display.Align.In.Center(this.glace, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                this.glace.setX(this.glace.x+982);
                this.glace.setY(this.glace.y-772);
                this.glace.on('pointerdown', function(){
                    if(this.data.get('unlock').includes('glace')) {
                        if(this.scene.isSleeping('glaceScene')) {                        
                            this.scene.wake('glaceScene');
                        }
                        else {
                            this.scene.start('glaceScene');
                        }
                    }
                    else {
                        this.lockText();
                    }
                }, this);
            }

            lockText() {
                let text = this.add.text(602, 572, 'Not unlocked yet', { fontFamily: 'Arial', fontSize: 100, color: '#000000', fontWeight: 900 });
                Phaser.Display.Align.In.Center(text, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                setTimeout(() => {
                    text.destroy();
                }, 1000);
                console.log('Not unlocked')
            }

        }
        


        class Header extends Phaser.Scene {

            constructor ()
            {
                super({ key: 'headerScene' });
                this.turnOff;
                this.globe;
                this.moneyText;
                this.batOverlap;

                this.europeScene;
            }

            create ()
            {
                this.europeScene = this.scene.get('europeScene');

                this.add.image(0, 0, 'header');
                
                this.turnOff = this.add.image(window.innerWidth-25, 25, 'off').setInteractive().setScale(0.08);
                this.globe = this.add.image(window.innerWidth-75, 25, 'globe').setInteractive().setScale(0.08);

                this.turnOff.on('pointerup', function() {
                    window.location.href = 'profil.php';
                }, this);

                this.globe.on('pointerup', function() {
                    this.scene.sleep('europeScene');
                    this.scene.sleep('headerScene');
                    this.scene.sleep('menuScene');
                    if(this.scene.isSleeping('mapScene')) {
                        this.scene.wake('mapScene');
                    }
                    else {
                        this.scene.start('mapScene');
                    }
                }, this);

                this.moneyText = this.add.text(310, 20, '0');
                this.moneyPerTickText = this.add.text(400, 20, '0');

                //  Check the Registry and hit our callback every time the 'money' value is updated
                this.registry.events.on('changedata', function(){
                    this.moneyText.setText(this.registry.get('money')+'$');
                    this.moneyPerTickText.setText(this.registry.get('moneyPerTick')+'/s');
                }, this);


                // Barre de progressions
                var progressBox1 = this.add.graphics();
                var progressBar1 = this.add.graphics();
                var progressBox2 = this.add.graphics();
                var progressBar2 = this.add.graphics();
                var progressBox3 = this.add.graphics();
                var progressBar3 = this.add.graphics();
                progressBox1.fillStyle(0xffffff, 0.2);
                progressBox2.fillStyle(0xffffff, 0.2);
                progressBox3.fillStyle(0xffffff, 0.2);


                //width of bar
                var widthBar = 150;
                var heightBar = 30;
                //coords of bars
                var w1 = 500;
                var h1 = 10;
                var w2 = w1 + widthBar + 40;
                var h2 = 10;
                var w3 = w2 + widthBar + 40;
                var h3 = 10;
                progressBox1.fillRect(w1, h1, widthBar, heightBar);
                progressBox2.fillRect(w2, h2, widthBar, heightBar);
                progressBox3.fillRect(w3, h3, widthBar, heightBar);


                progressBar1.fillStyle(0x0080ff, 1);
                progressBar1.fillRect(w1, h1, widthBar*0.1, heightBar);
                progressBar2.fillStyle(0x01D758, 1);
                progressBar2.fillRect(w2, h2, widthBar*0.1, heightBar);
                progressBar3.fillStyle(0xffc0cb, 1);
                progressBar3.fillRect(w3, h3, widthBar*0.1, heightBar);

                var percentText1 = this.make.text({
                    x: w1 + widthBar/2,
                    y: h1 + 15,
                    text: '10%',
                    style: {
                        font: '18px monospace',
                        fill: '#ffffff'
                    }
                });
                percentText1.setOrigin(0.5, 0.5);

                var percentText2 = this.make.text({
                    x: w2 + widthBar/2,
                    y: h2 + 15,
                    text: '10%',
                    style: {
                        font: '18px monospace',
                        fill: '#ffffff'
                    }
                });
                percentText2.setOrigin(0.5, 0.5);

                var percentText3 = this.make.text({
                    x: w3 + widthBar/2,
                    y: h3 + 15,
                    text: '10%',
                    style: {
                        font: '18px monospace',
                        fill: '#ffffff'
                    }
                });
                percentText3.setOrigin(0.5, 0.5);

            }

            update() {

                
            }

            /*displayButton(bat){
                let button = this.add.image(500, 20, 'off').setInteractive();
                button.on('pointerdown', function(){
                    this.europeScene.upgradeBat(bat);
                }, this)
            }*/

        }


        class Menu extends Phaser.Scene {

            constructor ()
            {
                super({ key: 'menuScene' });
                this.europeScene;

                this.upgrade;
                this.build;
                this.planter;
                this.recolter;
                this.feed;
                this.search;

                this.animals = [];
                this.plants = [];
                this.fields = [];
                this.structs = [];

                this.circleBuild;
                this.circlePlanter;
                this.circleUpgrade;

                this.batOverlap = {
                    key:0,
                    x:0,
                    y:0,
                    type:'',
                    level:0,
                    name:'',
                    scale:0,
                    money:0,
                    plant:'',
                };


                this.textBat;
                this.textInfo;
                this.cardInfo;

                this.plus;
                this.backGroundPopup;
            }

            create ()
            {
                this.scene.bringToTop('menuScene');
                //this.scene.setVisible(false);
                this.europeScene = this.scene.get('europeScene');

                this.add.image(150, 1500, 'menu');

                this.textBat = this.add.text(8, 350, '', { lineSpacing:7, wordWrap: { width: 284 } });
                
                this.cardInfo = this.add.image(148, 290, 'card').setScale(0.35).setVisible(false);
                this.textInfo = this.add.text(14, 260, '', { lineSpacing:7, wordWrap: { width: 284 }, fontSize:15, color:'#000000' });

                this.plus = this.add.text(20, innerHeight - 20, 'En savoir plus').setInteractive().setVisible(false);
                this.plus.on('pointerdown', this.savoirPlus, this);

                this.backGroundPopup = this.add.graphics();
                this.backGroundPopup.fillStyle(0x70402a, 1);
                this.backGroundPopup.fillRoundedRect(window.innerWidth/2 - 300, window.innerHeight/2 - 200, 600, 400, 20);
                //this.backGroundPopup.setVisible(false);
                //Phaser.Display.Align.In.Center(this.backGroundPopup, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));


                // Bouton (512x512) en scale 0.1 (51.2x51.2) + 55 a chaque fois
                // Bouton (512x512) en scale 0.08 (40.96x40.96) + 45 a chaque fois

                let compt = 0;
                // Création des boutons Animaux
                let j = 0;
                for(let i of getByType('animal')) {
                    this.animals[i.tag] = this.add.image(35 +(j%5)*60, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false)/*.setVisible(false)*/;
                    this.animals[i.tag].on('pointerdown', function(){
                        if(this.batOverlap.type == 'animal' && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                            this.europeScene.buildBat(this.batOverlap, i);
                            for(let i of getByType('animal')) {
                                this.animals[i.tag].setVisible(false);
                            }
                        }
                    }, this);
                    this.animals[i.tag].on('pointermove', function(){
                        this.cardInfo.setVisible(true);
                        this.textInfo.setText('Animal : '+i.name+'\nPrix : '+i.buildCost);
                    }, this);
                    this.animals[i.tag].on('pointerout', function(){
                        this.cardInfo.setVisible(false);
                        this.textInfo.setText('');
                    }, this);
                    j++;
                    if(j%5==0)compt++;
                }


                // Création des boutons Plantes
                compt=0;
                let k = 0;
                for(let i of getByType('plant')) {
                    console.log(i);
                    this.plants[i.tag] = this.add.image(32 +(k%5)*55, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false)/*.setVisible(false)*/;
                    this.plants[i.tag].on('pointerdown', function(){
                        if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 1 && (this.batOverlap.tag == 'labor' || this.batOverlap.tag == 'water')) {
                            this.europeScene.plant(this.batOverlap, i);
                            for(let i of getByType('plant')) {
                                this.plants[i.tag].setVisible(false);
                            }
                        }
                    }, this);
                    this.plants[i.tag].on('pointermove', function(){
                        this.cardInfo.setVisible(true);
                        this.textInfo.setText('Culture : '+i.name+'\nPrix : '+i.costPlant+'\nDescription : '+i.desc);
                    }, this);
                    this.plants[i.tag].on('pointerout', function(){
                        this.cardInfo.setVisible(false);
                        this.textInfo.setText('');
                    }, this);
                    k++;
                    if(k%5==0)compt++;
                }
                console.log(this.plants);


                // Création des boutons Construction champ
                compt=0;
                let l = 0;
                for(let i of getByType('field')) {
                    this.fields[i.tag] = this.add.image(40 +(l%5)*60, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false)/*.setVisible(false)*/;
                    this.fields[i.tag].on('pointerdown', function(){
                        if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                            this.europeScene.buildBat(this.batOverlap, i);
                            for(let i of getByType('field')) {
                                this.fields[i.tag].setVisible(false);
                            }
                        }
                    }, this);
                    this.fields[i.tag].on('pointermove', function(){
                        this.cardInfo.setVisible(true);
                        this.textInfo.setText('Sol : '+i.name+'\nPrix : '+i.buildCost);
                    }, this);
                    this.fields[i.tag].on('pointerout', function(){
                        this.cardInfo.setVisible(false);
                        this.textInfo.setText('');
                    }, this);
                    l++;
                    if(l%5==0)compt++;
                }


                // Création des boutons Structures
                compt=0;
                let m = 0;
                for(let i of getByType('struct')) {
                    this.structs[i.tag] = this.add.image(40 +(m%5)*60, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false)/*.setVisible(false)*/;
                    this.structs[i.tag].on('pointerdown', function(){
                        if(this.batOverlap.type == 'struct' && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                            this.europeScene.buildBat(this.batOverlap, i);
                            for(let i of getByType('struct')) {
                                this.structs[i.tag].setVisible(false);
                            }
                        }
                    }, this);
                    this.structs[i.tag].on('pointermove', function(){
                        this.cardInfo.setVisible(true);
                        this.textInfo.setText('Batiment : '+i.name+'\nPrix : '+i.buildCost);
                    }, this);
                    this.structs[i.tag].on('pointerout', function(){
                        this.cardInfo.setVisible(false);
                        this.textInfo.setText('');
                    }, this);
                    m++;
                    if(m%5==0)compt++;
                }

                 
                // Bouton upgrade
                this.upgrade = this.add.image(50, 35, "upgrade").setScale(0.1).setInteractive();
                this.upgrade.on('pointerdown', function(){
                    if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'house') && this.batOverlap.level < this.batOverlap.ref.lvlMax && this.batOverlap.level != 0) {
                        this.europeScene.upgradeBat(this.batOverlap);
                    }
                }, this);
                
                this.upgrade.on('pointermove', function(){
                    if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'house') && this.batOverlap.level < this.batOverlap.ref.lvlMax && this.batOverlap.level != 0) {
                        this.cardInfo.setVisible(true);
                        this.textInfo.setText('Prix : '+this.batOverlap.ref.upgrade[this.batOverlap.level+1]);
                    }
                }, this);
                this.upgrade.on('pointerout', function(){
                    this.cardInfo.setVisible(false);
                    this.textInfo.setText('');
                }, this);
                
                
                this.input.keyboard.on('keydown_A', function(){
                    if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'house') && this.batOverlap.level < this.batOverlap.ref.lvlMax && this.batOverlap.level != 0) {
                        this.europeScene.upgradeBat(this.batOverlap);
                    }
                }, this);

                
                // Bouton construction
                this.build = this.add.image(115, 35, "builder").setScale(0.1).setInteractive();
                this.build.on('pointerdown', function(){
                    if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'field') && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                        if(this.batOverlap.type == 'animal') {
                            for(let i of getByType('animal')) {
                                this.animals[i.tag].setVisible(true);
                            }
                        }
                        if(this.batOverlap.type == 'field' && !this.batOverlap.plant) {
                            for(let i of getByType('field')) {
                                this.fields[i.tag].setVisible(true);
                            }
                        }
                        if(this.batOverlap.type == 'struct') {
                            for(let i of getByType('struct')) {
                                this.structs[i.tag].setVisible(true);
                            }
                        }
                    }
                    
                }, this);

                // Bouton planter
                this.planter = this.add.image(180, 35, "planter").setScale(0.1).setInteractive();
                this.planter.on('pointerdown', function(){
                    if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 1 && (this.batOverlap.tag == 'labor' || this.batOverlap.tag == 'water')) {
                        for(let i of getByType('plant')) {
                            this.plants[i.tag].setVisible(true);
                        }
                    }
                    
                }, this);

                // Bouton recolter
                this.recolter = this.add.image(245, 35, "recolter").setScale(0.1).setInteractive();
                this.recolter.on('pointerdown', function(){
                    if(this.batOverlap.type == 'field' && this.batOverlap.plant && this.batOverlap.level == 1 && this.batOverlap.tag != 'labor' && this.batOverlap.grow == this.batOverlap.seed.maxGrow) {
                        this.europeScene.recolte(this.batOverlap);
                    }
                    
                }, this);
                this.input.keyboard.on('keydown_Z', function(){
                    if(this.batOverlap.type == 'field' && this.batOverlap.plant && this.batOverlap.level == 1 && this.batOverlap.tag != 'labor' && this.batOverlap.grow == this.batOverlap.seed.maxGrow) {
                        this.europeScene.recolte(this.batOverlap);
                    }
                }, this);



                // Bouton Nourrir
                this.feed = this.add.image(50, 90, "feed").setScale(0.1).setInteractive();
                this.feed.on('pointerdown', function(){
                    if(this.batOverlap.type == 'animal' && this.batOverlap.level > 0) {
                        /*for(let i of getByType('plant')) {
                            this.plants[i.tag].setVisible(true);
                        }*/
                    }
                    
                }, this);
                

                
                this.circleUpgrade = this.add.image(this.upgrade.x, this.upgrade.y, "circle").setScale(0.1).setVisible(false);
                this.circleBuild = this.add.image(this.build.x, this.build.y, "circle").setScale(0.1).setVisible(false);
                this.circlePlanter = this.add.image(this.planter.x, this.planter.y, "circle").setScale(0.1).setVisible(false);
                this.circleRecolte = this.add.image(this.recolter.x, this.recolter.y, "circle").setScale(0.1).setVisible(false);
                this.circleFeed = this.add.image(this.feed.x, this.feed.y, "circle").setScale(0.1).setVisible(false);

            }

            update() {
                //Upgrade
                if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'house') && this.batOverlap.level < this.batOverlap.ref.lvlMax && this.batOverlap.level != 0) {
                    this.circleUpgrade.setVisible(true);
                }
                else {
                    this.circleUpgrade.setVisible(false);
                }

                //Build
                if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'field') && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                    this.circleBuild.setVisible(true);
                }
                else {
                    this.circleBuild.setVisible(false);
                }
                if(this.batOverlap.type != 'animal') {
                    for(let i of getByType('animal')) {
                        this.animals[i.tag].setVisible(false);
                    }
                }
                if(this.batOverlap.type != 'struct') {
                    for(let i of getByType('struct')) {
                        this.structs[i.tag].setVisible(false);
                    }
                }
                if(this.batOverlap.type != 'field') {
                    for(let i of getByType('field')) {
                        this.fields[i.tag].setVisible(false);
                    }
                }

                //Planter
                if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 1 && (this.batOverlap.tag == 'labor' || this.batOverlap.tag == 'water')) {
                    this.circlePlanter.setVisible(true);
                }
                else {
                    this.circlePlanter.setVisible(false);
                    for(let i of getByType('plant')) {
                        this.plants[i.tag].setVisible(false);
                    }
                }

                //Recolter
                if(this.batOverlap.type == 'field' && this.batOverlap.plant && this.batOverlap.level == 1 && this.batOverlap.tag != 'labor' && this.batOverlap.grow == this.batOverlap.seed.maxGrow) {
                    this.circleRecolte.setVisible(true);
                }
                else {
                    this.circleRecolte.setVisible(false);
                }

                //Nourrir
                if(this.batOverlap.type == 'animal' && this.batOverlap.level > 0) {
                    this.circleFeed.setVisible(true);
                }
                else {
                    this.circleFeed.setVisible(false);
                }


                
                if(this.batOverlap.key != 0) {
                    let tmpText = '';
                    if(this.batOverlap.ref.name) {
                        tmpText+='Nom : '+this.batOverlap.ref.name;
                    }
                    tmpText+='\nType : '+this.batOverlap.typeName;
                    if(this.batOverlap.type != 'field') {
                        tmpText+='\nNiveau : '+this.batOverlap.level;
                    }
                    if(this.batOverlap.ref.money && this.batOverlap.type != 'field') {
                        let moneyPerSec = this.batOverlap.ref.money[this.batOverlap.level];
                        tmpText+='\nGain : '+moneyPerSec+'/s';
                    }
                    if(this.batOverlap.type == 'field') {
                        if(this.batOverlap.plant) {
                            tmpText+='\nCulture : '+this.batOverlap.seed.name;
                            if(this.batOverlap.grow < this.batOverlap.seed.maxGrow){
                                tmpText+='\nCroissance : '+this.batOverlap.grow;
                            }
                            else {
                                tmpText+='\nCroissance : Max';
                            }
                            tmpText+='\nDescription : '+this.batOverlap.seed.desc;
                        }
                    }
                    if(this.batOverlap.tag != 'build') {
                        tmpText+='\nDescription : '+this.batOverlap.ref.desc;
                    }
                    this.plus.setVisible(true);
                    this.textBat.setText(tmpText);
                }
                
            }

            getBatOverlap(bat){
                this.batOverlap = bat;
            }

            errorText(errorTxt) {
                let container = this.add.image(0, 0, 'error');
                let text = this.add.text(602, 572, errorTxt, { fontFamily: 'Arial', fontSize: 20, color: '#000000', wordWrap: { width: 270 }, align: 'center' });
                Phaser.Display.Align.In.Center(text, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                Phaser.Display.Align.In.Center(container, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                text.setY(text.y + 100)
                setTimeout(() => {
                    text.destroy();
                    container.destroy();
                }, 2000);
                console.log('Not unlocked')
            }

            savoirPlus(){
                this.backGroundPopup.setVisible(true);
                this.input.on('pointerdown', function(){
                    this.backGroundPopup.setVisible(false);
                }, this);
            }

        }

        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: '#70402a',
            parent: 'phaser-example',
            physics: {
                default: 'arcade',
            },
            scene: [Loading, Play, Cinematique1, Cinematique2, Map, Europe, Desert, Glace, Header, Menu]
        };

        let game = new Phaser.Game(config);

        
        window.addEventListener('resize', ()=>{
            game.config.width = window.innerWidth;
            game.config.height = window.innerHeight;
            console.log(game.config.width, game.config.height);
        }, false)
    </script>
</body>

</html>
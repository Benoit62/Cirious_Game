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
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"></script>
    <link rel="shortcut icon" href="images/logo.png" type="image/x-icon">
    <link rel="icon" href="images/logo.png" type="image/x-icon">
</head>

<body>
    <script type="text/javascript" src="scenes/loading.js"></script>
    <script type="text/javascript" src="scenes/menu.js"></script>
    <script type="text/javascript" src="scenes/search.js"></script>
    <script type="text/javascript" src="scenes/cinematique.js"></script>
    <script type="text/javascript" src="scenes/data.js"></script>
    <script type="text/javascript" src="scenes/desert.js"></script>
    <script type="text/javascript" src="scenes/foret.js"></script>
    <script type="text/javascript" src="scenes/glace.js"></script>
    <script type="text/javascript" src="scenes/europe.js"></script>
    <script type="text/javascript">

        

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
                var music = this.sound.add('map_musique', {
                    mute: false,
                    volume: 0.1,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: true,
                    delay: 0
                });
                music.play();

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
                            this.scene.get('europeScene').musique.play();
                        }
                        else {
                            this.scene.start('europeScene');
                        }
                        this.scene.stop('mapScene');
                        this.scene.launch('menuScene');
                        this.scene.launch('headerScene');
                        music.stop();
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

                this.gameScene;
            }

            create ()
            {
                this.gameScene = this.scene.get(this.registry.get('climat')+'Scene');

                this.add.image(0, 0, 'header');
                
                this.turnOff = this.add.image(window.innerWidth-25, 25, 'off').setInteractive().setScale(0.08);
                this.globe = this.add.image(window.innerWidth-75, 25, 'globe').setInteractive().setScale(0.08);
                this.search = this.add.image(window.innerWidth-125, 25, 'search').setInteractive().setScale(0.08);

                this.turnOff.on('pointerup', function() {
                    window.location.href = 'profil.php';
                }, this);

                this.globe.on('pointerup', function() {
                    this.scene.sleep(this.registry.get('climat')+'Scene');
                    this.scene.stop('headerScene');
                    this.scene.stop('menuScene');
                    this.scene.start('mapScene');
                    this.gameScene.musique.stop();
                }, this);

                this.search.on('pointerup', function() {
                    //Update game same but no render
                    this.scene.setVisible(false, this.registry.get('climat')+'Scene');
                    this.scene.sleep('headerScene');
                    this.scene.sleep('menuScene');
                    this.scene.start('searchScene');
                }, this);

                // Money 
                //521px *0.05 => 25px
                this.add.image(315, 25, 'dollar').setScale(0.05);
                this.moneyText = this.add.text(330, 25, '0').setOrigin(0,0.5);
                this.moneyPerTickText = this.add.text(410, 25, '0').setOrigin(0,0.5);


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
                var widthBar = 140;
                var heightBar = 30;
                //coords of bars
                var w1 = 530;
                var h1 = 10;
                var w2 = w1 + widthBar + 70;
                var h2 = 10;
                var w3 = w2 + widthBar + 70;
                var h3 = 10;
                progressBox1.fillRect(w1, h1, widthBar, heightBar);
                progressBox2.fillRect(w2, h2, widthBar, heightBar);
                progressBox3.fillRect(w3, h3, widthBar, heightBar);

                var percentText1 = this.make.text({
                    x: w1 + widthBar/2,
                    y: h1 + 15,
                    text: '',
                    style: {
                        font: '18px monospace',
                        fill: '#ffffff'
                    }
                });
                percentText1.setOrigin(0.5, 0.5);

                var percentText2 = this.make.text({
                    x: w2 + widthBar/2,
                    y: h2 + 15,
                    text: '',
                    style: {
                        font: '18px monospace',
                        fill: '#ffffff'
                    }
                });
                percentText2.setOrigin(0.5, 0.5);

                var percentText3 = this.make.text({
                    x: w3 + widthBar/2,
                    y: h3 + 15,
                    text: '',
                    style: {
                        font: '18px monospace',
                        fill: '#ffffff'
                    }
                });
                percentText3.setOrigin(0.5, 0.5);

                //Icones des jauges Images de 512x512 à 0.08 => 41x41
                this.add.image(w1 - 25, 25, 'animal-care').setScale(0.08);
                this.add.image(w2 - 25, 25, 'ecology-care').setScale(0.08);
                this.add.image(w3 - 25, 25, 'hunger-care').setScale(0.08);


                //  Check the Registry and hit our callback every time the 'money' value is updated
                this.registry.events.on('changedata', function(){
                    this.moneyText.setText(this.registry.get('money')+'$');
                    this.moneyPerTickText.setText(this.registry.get('moneyPerTick')+'/s');
                    percentText1.setText(this.registry.get('animalCare')+'%');
                    percentText2.setText(this.registry.get('ecology')+'%');
                    percentText3.setText(this.registry.get('hunger')+'%');
                    progressBar1.clear();
                    progressBar1.fillStyle(0x0080ff, 1);
                    progressBar1.fillRect(w1, h1, widthBar*(this.registry.get('animalCare')/100), heightBar);
                    progressBar2.clear();
                    progressBar2.fillStyle(0x01D758, 1);
                    progressBar2.fillRect(w2, h2, widthBar*(this.registry.get('ecology')/100), heightBar);
                    progressBar3.clear();
                    progressBar3.fillStyle(0xffc0cb, 1);
                    progressBar3.fillRect(w3, h3, widthBar*(this.registry.get('hunger')/100), heightBar);
                }, this);

            }

            update() {

                
            }

            /*displayButton(bat){
                let button = this.add.image(500, 20, 'off').setInteractive();
                button.on('pointerdown', function(){
                    this.gameScene.upgradeBat(bat);
                }, this)
            }*/

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
            audio: {
                disableWebAudio: false
            },
            scene: [Loading, Play, Cinematique1, Cinematique2, Map, Europe, Desert, Glace, Header, Menu, Search]
        };

        let game = new Phaser.Game(config);

        
        window.addEventListener('resize', ()=>{
            game.config.width = window.innerWidth;
            game.config.height = window.innerHeight;
        }, false);       
    </script>
</body>

</html>
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
                // Maps et icones
                this.load.image('map', 'assets/map.png');
                this.load.image('europeile', 'assets/europeile.png');
                this.load.image('desertile', 'assets/desertile.png');
                this.load.image('foretile', 'assets/foretile.png');
                this.load.image('glaceile', 'assets/glaceile.png');
                this.load.image('europe', 'assets/europe.png');
                this.load.image('desert', 'assets/desert.png');
                this.load.image('header', 'assets/header.png');
                this.load.image('off', 'assets/off.png');
                this.load.image('globe', 'assets/globe.png');


                this.load.image('build', 'assets/build.png');
                
                // Batiments ferme
                this.load.spritesheet('pig', 'assets/pig_spritesheet.png', { frameWidth: 416, frameHeight: 416 });
                this.load.spritesheet('cow', 'assets/cow_spritesheet.png', { frameWidth: 416, frameHeight: 416 });
                this.load.spritesheet('sheep', 'assets/sheep_spritesheet.png', { frameWidth: 416, frameHeight: 416 });
                this.load.spritesheet('tank', 'assets/tank.png', { frameWidth: 192, frameHeight: 192 });
                this.load.spritesheet('house', 'assets/house.png', { frameWidth: 384, frameHeight: 256 });
                

                // Champs et cultures
                this.load.spritesheet('labor', 'assets/labor.png', { frameWidth: 288, frameHeight: 416 });
                this.load.spritesheet('sprout', 'assets/sprout.png', { frameWidth: 288, frameHeight: 416 });
                

                //Player
                this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
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
                        this.scene.start('sceneA');
                    } else {
                        progress(i);
                        i+=10;
                    }
                }
            }

        }

        //scenes par Benoit
        class SceneA extends Phaser.Scene {

            constructor() {
                super({
                    key: 'sceneA'
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
                this.scene.start('mapScene');
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
                
                /*this.input.once('pointerdown', function () {

                    if(this.scene.isSleeping('europeScene')) {                        
                        this.scene.wake('europeScene');
                    }
                    else {
                        this.scene.start('europeScene');
                    }
                }, this);*/
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
            }

            create ()
            {
                this.add.image(0, 0, 'header');
                
                this.turnOff = this.add.image(window.innerWidth-25, 25, 'off').setInteractive();
                this.globe = this.add.image(window.innerWidth-55, 25, 'globe').setInteractive();

                this.turnOff.on('pointerup', function() {
                    window.location.href = 'profil.php';
                }, this);

                this.globe.on('pointerup', function() {
                    this.scene.sleep('europeScene');
                    this.scene.sleep('headerScene');
                    if(this.scene.isSleeping('mapScene')) {
                        this.scene.wake('mapScene');
                    }
                    else {
                        this.scene.start('mapScene');
                    }
                }, this);

                this.moneyText = this.add.text(25, 20, 'Monitoring Registry');
                this.batOverlap = this.add.text(300, 20, 'Checking overlap');

                //  Check the Registry and hit our callback every time the 'money' value is updated
                this.registry.events.on('changedata', function(){
                    this.moneyText.setText(this.registry.get('money'));
                    this.batOverlap.setText(this.registry.get('bat'));
                }, this);
            }

            update() {

                
            }

        }

        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: '#000000',
            parent: 'phaser-example',
            physics: {
                default: 'arcade',
            },
            scene: [Loading, SceneA, Map, Europe, Desert, Glace, Header]
        };

        var game = new Phaser.Game(config);
    </script>
</body>

</html>
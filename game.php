<?php
session_start();
if (!isset($_SESSION['autorisation']) && $_SESSION['autorisation'] != 'iseed') {
    header('location: login.php');
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
    <script type="text/javascript" src="scenes/cinematique.js"></script>
    <script type="text/javascript" src="scenes/disclaimer.js"></script>
    <script type="text/javascript" src="scenes/tuto.js"></script>
    <script type="text/javascript" src="scenes/menu.js"></script>
    <script type="text/javascript" src="scenes/header.js"></script>
    <script type="text/javascript" src="scenes/search.js"></script>
    <script type="text/javascript" src="scenes/data.js"></script>
    <script type="text/javascript" src="scenes/desert.js"></script>
    <script type="text/javascript" src="scenes/foret.js"></script>
    <script type="text/javascript" src="scenes/glace.js"></script>
    <script type="text/javascript" src="scenes/europe.js"></script>
    <script type="text/javascript">
        let namePlayer = '<?=$_SESSION['pseudo']?>';

        

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
                this.mute;
                this.sound;
            }

            create ()
            {
                /*var music = this.sound.add('map_musique', {
                    mute: false,
                    volume: 0.1,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: true,
                    delay: 0
                });
                music.play();*/

                this.mute = this.add.image(window.innerWidth-25, 25, 'mute').setInteractive().setScale(2).setScrollFactor(0);
                this.sound = this.add.image(window.innerWidth-25, 25, 'sound').setInteractive().setScale(2).setVisible(false).setScrollFactor(0);
                this.mute.on('pointerdown', function(){
                    //this.mute.setFrame((this.mute.frame + 1)%2);
                    this.mute.visible = !this.mute.visible;
                    this.sound.visible = !this.sound.visible;
                    music.mute = !music.mute;
                }, this);
                this.sound.on('pointerdown', function(){
                    //this.mute.setFrame((this.mute.frame + 1)%2);
                    this.mute.visible = !this.mute.visible;
                    this.sound.visible = !this.sound.visible;
                    music.mute = !music.mute;
                }, this);
                console.log(this.mute, this.sound);

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
                if(!this.registry.get('unlock').includes('tropic')) {
                    this.add.image(this.foret.x, this.foret.y, 'cadenas').setScale(0.6);
                }
                this.foret.on('pointerdown', function(){
                    if(this.registry.get('unlock').includes('tropic')) {
                        if(this.scene.isSleeping('tropicScene')) {                        
                            this.scene.wake('tropicScene');
                            this.scene.get('tropicScene').musique.play();
                            this.registry.set('climat', 'tropic');
                            this.registry.set('gameScene', 'tropic');
                        }
                        else {
                            this.scene.start('tropicScene');
                        }
                        this.scene.stop('mapScene');
                        this.scene.launch('menuScene');
                        this.scene.launch('headerScene');
                    }
                    else {
                        this.errorText('Vous n\'avez pas encore débloqué cette île');
                    }
                }, this);




                this.europe = this.add.image(0, 0, 'europeile').setInteractive();
                Phaser.Display.Align.In.Center(this.europe, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                this.europe.setX(this.europe.x-318);
                this.europe.setY(this.europe.y-250);
                if(!this.registry.get('unlock').includes('europe')) {
                    this.add.image(this.europe.x, this.europe.y, 'cadenas').setScale(0.6);
                }
                this.europe.on('pointerdown', function(){
                    if(this.registry.get('unlock').includes('europe')) {
                        if(this.scene.isSleeping('europeScene')) {                        
                            this.scene.wake('europeScene');
                            this.scene.get('europeScene').musique.play();
                            this.registry.set('climat', 'europe');
                            this.registry.set('gameScene', 'europe');
                        }
                        else {
                            this.scene.start('europeScene');
                        }
                        this.scene.stop('mapScene');
                        this.scene.launch('menuScene');
                        this.scene.launch('headerScene');
                        //music.stop();
                    }
                }, this);


                

                this.desert = this.add.image(0, 0, 'desertile').setInteractive();
                Phaser.Display.Align.In.Center(this.desert, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                this.desert.setX(this.desert.x-702);
                this.desert.setY(this.desert.y+446);
                if(!this.registry.get('unlock').includes('aride')) {
                    this.add.image(this.desert.x, this.desert.y, 'cadenas').setScale(0.6);
                }
                this.desert.on('pointerdown', function(){
                    if(this.registry.get('unlock').includes('aride')) {
                        if(this.scene.isSleeping('arideScene')) {                        
                            this.scene.wake('arideScene');
                            this.scene.get('arideScene').musique.play();
                            this.registry.set('climat', 'aride');
                            this.registry.set('gameScene', 'aride');
                        }
                        else {
                            this.scene.start('arideScene');
                        }
                        this.scene.stop('mapScene');
                        this.scene.launch('menuScene');
                        this.scene.launch('headerScene');
                        //music.stop();
                    }
                    else {
                        this.errorText('Vous n\'avez pas encore débloqué cette île');
                    }
                }, this);

                


                this.glace = this.add.image(0, 0, 'glaceile').setInteractive();
                Phaser.Display.Align.In.Center(this.glace, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                this.glace.setX(this.glace.x+982);
                this.glace.setY(this.glace.y-772);
                if(!this.registry.get('unlock').includes('glace')) {
                    this.add.image(this.glace.x, this.glace.y, 'cadenas').setScale(0.6);
                }
                this.glace.on('pointerdown', function(){
                    if(this.registry.get('unlock').includes('glace')) {
                        if(this.scene.isSleeping('glaceScene')) {                        
                            this.scene.wake('glaceScene');
                        }
                        else {
                            this.scene.start('glaceScene');
                        }
                    }
                    else {
                        this.errorText('Vous n\'avez pas encore débloqué cette île');
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

            errorText(errorTxt) {
                //Width 1000px à 0.8 => 800  Height 350px à 0.8 => 280
                let container = this.add.image(0, 0, 'errorLock').setScale(3);
                let text = this.add.text(602, 572, errorTxt, { fontFamily: 'Arial', fontSize: 100, color: '#000000', wordWrap: { width: 1600 }, align: 'center' }).setOrigin(0.5,0.5);
                Phaser.Display.Align.In.Center(container, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                Phaser.Display.Align.In.Center(text, this.add.zone(container.x, container.y, container.width*0.8, container.height*0.8));
                text.setX(text.x+400).setY(text.y-100);
                setTimeout(() => {
                    text.destroy();
                    container.destroy();
                }, 2000);
                console.log('Error : ', errorTxt);
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
            audio: {
                disableWebAudio: false
            },
            scene: [Loading, Play, Cinematique1, Cinematique2, Map, Europe, Desert, Foret, Glace, Header, Menu, Search, Disclaimer, Tuto]
        };

        let game = new Phaser.Game(config);

        
        window.addEventListener('resize', ()=>{
            game.config.width = window.innerWidth;
            game.config.height = window.innerHeight;
        }, false);       
    </script>
</body>

</html>
<?php 
session_start();
if(!isset($_SESSION['autorisation']) && $_SESSION['autorisation'] != 'iseed') {
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
  <script type="text/javascript">
        class SceneA extends Phaser.Scene {

            constructor ()
            {
                super({ key: 'sceneA' });
            }

            preload ()
            {
                var progress = this.add.graphics();

                this.load.on('progress', function (value) {

                    progress.clear();
                    progress.fillStyle(0xffffff, 1);
                    progress.fillRect(0, 270, window.innerWidth * value, 60);

                });

                this.load.on('complete', function () {

                    progress.destroy();

                });

                this.load.image('map', 'assets/map.png');
                this.load.image('europe', 'assets/europe.png');
                this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
            }

            create ()
            {

                const txt = this.add.text(0, 0, 'Play').setFontSize(64);
                Phaser.Display.Align.In.Center(txt, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));

                this.input.once('pointerdown', this.start, this);
            }

            start() {
                this.scene.start('sceneB');
            }

        }

        class SceneB extends Phaser.Scene {

            constructor ()
            {
                super({ key: 'sceneB' });
            }

            create ()
            {
                // Ajout de la map et centrage
                const map = this.add.image(0, 0, 'map');
                Phaser.Display.Align.In.Center(map, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                
                // Setup de la camera
                let zoom = 1;
                while(1632*zoom > window.innerHeight) zoom -= 0.1;
                this.cameras.main.zoom = zoom;
                
                this.input.once('pointerdown', function () {

                    this.scene.start('sceneC', { id: 1, zone: 'europe' });

                }, this);
            }

        }

        class SceneC extends Phaser.Scene {

            constructor ()
            {
                super({ key: 'sceneC' });
                this.player;
                this.cursors;
            }

            create (data)
            {
                const farm = this.add.image(0, 0, data.zone);
                Phaser.Display.Align.In.Center(farm, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                this.cameras.main.zoom = 1;

                // Player
                this.player = this.physics.add.sprite(window.innerWidth/2, window.innerHeight/2, 'dude');
                Phaser.Display.Align.In.Center(this.player, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                //  Our player animations, turning, walking left and walking right.
                this.anims.create({
                    key: 'left',
                    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                    frameRate: 10,
                    repeat: -1
                });

                this.anims.create({
                    key: 'turn',
                    frames: [ { key: 'dude', frame: 4 } ],
                    frameRate: 20
                });

                this.anims.create({
                    key: 'right',
                    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                    frameRate: 10,
                    repeat: -1
                });

                this.anims.create({
                    key: 'up',
                    frames: [ { key: 'dude', frame: 4 } ],
                    frameRate: 20
                });

                this.anims.create({
                    key: 'down',
                    frames: [ { key: 'dude', frame: 4 } ],
                    frameRate: 20
                });


                this.cameras.main.setBounds(farm.x-farm.width/2, farm.y-farm.height/2, farm.width, farm.height);
                this.physics.world.setBounds(farm.x-farm.width/2, farm.y-farm.height/2, farm.width, farm.height);

                console.log(farm);

                this.cameras.main.startFollow(this.player);


                this.player.setCollideWorldBounds(true);

                //  Input Events
                this.cursors = this.input.keyboard.createCursorKeys();
            }

            update() {

                if (this.cursors.up.isDown)
                {
                    this.player.setVelocityY(-160);
                    //player.anims.play('up', true);
                }
                else if (this.cursors.down.isDown)
                {
                    this.player.setVelocityY(160);

                    //player.anims.play('down', true);
                }
                else
                {
                    this.player.setVelocityY(0);
                }

                if (this.cursors.left.isDown)
                {
                    this.player.setVelocityX(-160);

                    this.player.anims.play('left', true);
                }
                else if (this.cursors.right.isDown)
                {
                    this.player.setVelocityX(160);

                    this.player.anims.play('right', true);
                } 
                else
                {
                    this.player.setVelocityX(0);
                }

                if(!this.cursors.left.isDown && !this.cursors.right.isDown) {
                    
                    this.player.anims.play('turn', true);
                }
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
            scene: [ SceneA, SceneB, SceneC ]
        };

        var game = new Phaser.Game(config);

        
    </script>
  </body>

</html>
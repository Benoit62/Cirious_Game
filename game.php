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

        class Europe extends Phaser.Scene {

            constructor() {
                super({
                    key: 'europeScene'
                });
                this.player;
                this.cursors;
                this.animal1;
                this.animal2;
                this.struct1;
                this.struct2;
                this.field1;
                this.field2;

                this.images = [];

                this.money = 0;
            }

            create() {
                // Animaux
                this.data.set('bat1', {
                    key:1,
                    x:-16,
                    y:304,
                    type:'animal',
                    level:1,
                    name:'pig',
                    scale:0.7,
                    money:10
                });
                this.data.set('bat2', {
                    key:2,
                    x:-16,
                    y:-304,
                    type:'animal',
                    level:1,
                    name:'cow',
                    scale:0.7,
                    money:10
                });

                // Structures
                this.data.set('bat3', {
                    key:3,
                    x:352,
                    y:-192,
                    type:'struct',
                    level:1,
                    name:'tank',
                    scale:0.5,
                    money:5
                });
                this.data.set('bat4', {
                    key:4,
                    x:352,
                    y:-452,
                    type:'struct',
                    level:0,
                    name:'build',
                    scale:0.5,
                    money:0
                });

                //Champs
                this.data.set('bat5', {
                    key:5,
                    x:-784,
                    y:-303,
                    type:'field',
                    level:1,
                    name:'labor',
                    scale:0.8,
                    money:0
                });
                this.data.set('bat6', {
                    key:6,
                    x:-784,
                    y:175,
                    type:'field',
                    level:0,
                    name:'build',
                    scale:0.8,
                    money:0
                });



                // Maison/labo
                this.data.set('bat9', {
                    key:9,
                    x:768,
                    y:-404,
                    type:'house',
                    level:1,
                    name:'house',
                    scale:0.5,
                    money:0
                });

                /*
                this.data.set('bat7', {
                    key:7,
                    x:0,
                    y:0,
                    type:'field',
                    level:0,
                    name:'build'
                });
                this.data.set('bat8', {
                    key:8,
                    x:0,
                    y:0,
                    type:'field',
                    level:1,
                    name:'build'
                });*/
                


                const farm = this.add.image(0, 0, 'europe');
                //Phaser.Display.Align.In.Center(farm, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                this.cameras.main.zoom = 0.8;

                // Player
                this.player = this.physics.add.sprite(800, -250, 'dude').setDepth(2000);
                //Phaser.Display.Align.In.Center(this.player, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                //  Our player animations, turning, walking left and walking right.
                this.anims.create({
                    key: 'left',
                    frames: this.anims.generateFrameNumbers('dude', {
                        start: 0,
                        end: 3
                    }),
                    frameRate: 10,
                    repeat: -1
                });

                this.anims.create({
                    key: 'turn',
                    frames: [{
                        key: 'dude',
                        frame: 4
                    }],
                    frameRate: 20
                });

                this.anims.create({
                    key: 'right',
                    frames: this.anims.generateFrameNumbers('dude', {
                        start: 5,
                        end: 8
                    }),
                    frameRate: 10,
                    repeat: -1
                });

                this.anims.create({
                    key: 'up',
                    frames: [{
                        key: 'dude',
                        frame: 4
                    }],
                    frameRate: 20
                });

                this.anims.create({
                    key: 'down',
                    frames: [{
                        key: 'dude',
                        frame: 4
                    }],
                    frameRate: 20
                });


                // On décale la caméra par rapport à la hauteur du header
                this.cameras.main.setBounds(farm.x - farm.width / 2, farm.y - farm.height / 2 - 50, farm.width, farm.height + 50);
                this.physics.world.setBounds(farm.x - farm.width / 2, farm.y - farm.height / 2, farm.width, farm.height);

                console.log(farm);

                this.cameras.main.startFollow(this.player);


                this.player.setCollideWorldBounds(true);

                //  Input Events
                this.cursors = this.input.keyboard.createCursorKeys();


                for(let i in this.data.values) {
                    let bat = this.data.values[i];
                    console.log(bat, bat.x, bat.y, bat.name, bat.level-1);
                    if(bat.level > 0 && bat.name != 'build') {
                        this.images[i] = this.physics.add.image(bat.x, bat.y, bat.name, bat.level-1);
                    }
                    else {
                        this.images[i] = this.physics.add.image(bat.x, bat.y, 'build').setScale(bat.scale);
                    }
                    this.physics.add.overlap(this.player, this.images[i], this.overlapBat, function(){ return true; }, this);
                }
                console.log(this.images);

                /*this.struct1 = this.add.image(352, -192, 'build').setInteractive().setScale(0.5);
                this.struct1.setData('lvl', 0);
                this.struct1.on('pointerdown', function() {
                    if (this.struct1.getData('lvl') == 0) this.struct1 = this.add.image(352, -192, 'tank');
                }, this);


                this.animal1 = this.add.image(-16, 304, 'build').setInteractive().setScale(0.5);
                this.animal1.setData('lvl', 0);
                this.animal1.on('pointerdown', function() {
                    if (this.animal1.getData('lvl') == 0) this.animal1 = this.add.image(-16, 304, 'pig');
                }, this);*/



                //debug
                /*this.debug = this.add.graphics({
                    lineStyle: {
                        color: 0xffff00
                    }
                });*/
                //polygone des hitboxs
                var data = [-335, -530, -960, -530, -960, 540, -390, 540, -390, 470, -330, 470, -330, 400, -270, 400, -270, 140, -320, 125, -540, 125, -540, 300, -640, 390, -680, 390, -700, 430, -780, 430, -790, 460, -840, 460, -860, 490, -960, 490, -960, -80, -620, -80, -560, 5, -515, 20, -370, 20, -370, -50, -430, -100, -430, -385, -590, -385, -590, -210, -620, -210, -620, -80, -960, -80, -960, -530, -560, -530, -560, -490, -335, -490, -335, -530];
                // The boundary
                this.Bounds = new Phaser.Geom.Polygon(data);

                // Will represent the player body
                this.playerRect = new Phaser.Geom.Rectangle();

                // Will hold a per-step velocity (distance)
                this.tempVelocity = new Phaser.Math.Vector2();


                this.scene.launch('sceneD');
            }

            update() {
                if (this.cursors.up.isDown) {
                    this.player.setVelocityY(-160);
                    //player.anims.play('up', true);
                } else if (this.cursors.down.isDown) {
                    this.player.setVelocityY(160);

                    //player.anims.play('down', true);
                } else {
                    this.player.setVelocityY(0);
                }

                if (this.cursors.left.isDown) {
                    this.player.setVelocityX(-160);

                    this.player.anims.play('left', true);
                } else if (this.cursors.right.isDown) {
                    this.player.setVelocityX(160);

                    this.player.anims.play('right', true);
                } else {
                    this.player.setVelocityX(0);
                }

                if (!this.cursors.left.isDown && !this.cursors.right.isDown) {

                    this.player.anims.play('turn', true);
                }
                this.body = this.player.body;

                // Move the player rectangle ahead by one step of the provisional velocity
                this.projectRect(this.playerRect, this.body, 1 / this.physics.world.fps);

                // Check if the player rectangle is within the polygon and "block" the body on any corresponding axes
                this.setBlocked(this.body.blocked, this.playerRect, this.Bounds);

                // Limit the provisional velocity based on the blocked axes
                this.clampVelocity(this.body.velocity, this.body.blocked);

                // Draw the polygons
                //debug
                /*
                this.debug
                    .clear()
                    .strokePoints(this.Bounds.points)
                    .strokeRectShape(this.playerRect);*/


                // Calcul de l'argent
                for(let i in this.data.values) {
                    let bat = this.data.values[i];
                    if(bat.level > 0 && bat.name != 'build') {
                        this.money+=bat.money;
                    }
                }
                this.registry.set('money', this.money);
            }

            overlapBat(player, obj) {
                let returnBat;
                for(let i in this.data.values) {
                    let bat = this.data.values[i];
                    if(obj.x == bat.x && obj.y == bat.y) {
                        returnBat = bat;
                    }
                }
                this.registry.set('bat', 'x : '+returnBat.x+', y : '+returnBat.y+' Type : '+returnBat.name);
            }

            projectRect(rect, body, time) {
                this.tempVelocity.copy(body.velocity).scale(time);
                Phaser.Geom.Rectangle.CopyFrom(this.body, rect);
                Phaser.Geom.Rectangle.OffsetPoint(rect, this.tempVelocity);
            }

            clampVelocity(velocity, blocked) {
                if (blocked.left) velocity.x = Phaser.Math.Clamp(velocity.x, 0, Infinity);
                if (blocked.right) velocity.x = Phaser.Math.Clamp(velocity.x, -Infinity, 0);
                if (blocked.up) velocity.y = Phaser.Math.Clamp(velocity.y, 0, Infinity);
                if (blocked.down) velocity.y = Phaser.Math.Clamp(velocity.y, -Infinity, 0);
            }

            setBlocked(blocked, rect, bounds) {
                if (bounds.contains(rect.left, rect.top)) {
                    blocked.left = true;
                    blocked.up = true;
                }
                if (bounds.contains(rect.left, rect.bottom)) {
                    blocked.left = true;
                    blocked.down = true;
                }
                if (bounds.contains(rect.right, rect.top)) {
                    blocked.right = true;
                    blocked.up = true;
                }
                if (bounds.contains(rect.right, rect.bottom)) {
                    blocked.right = true;
                    blocked.down = true;
                }

                blocked.none = !blocked.left && !blocked.right && !blocked.up && !blocked.down;
            }

        }



        class Desert extends Phaser.Scene {

            constructor ()
            {
                super({ key: 'desertScene' });
                this.player;
                this.cursors;
                this.animal1;
                this.animal2;
                this.struct1;
                this.struct2;
                this.field1;
                this.field2;
            }

            create ()
            {
                const farm = this.add.image(0, 0, 'desert');
                //Phaser.Display.Align.In.Center(farm, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                this.cameras.main.zoom = 0.9;

                // Player
                this.player = this.physics.add.sprite(800, -270, 'dude').setDepth(2000);
                //Phaser.Display.Align.In.Center(this.player, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
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


                // On décale la caméra par rapport à la hauteur du header
                this.cameras.main.setBounds(farm.x-farm.width/2, farm.y-farm.height/2-50, farm.width, farm.height+50);
                this.physics.world.setBounds(farm.x-farm.width/2, farm.y-farm.height/2, farm.width, farm.height);

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


        class Glace extends Phaser.Scene {

            constructor ()
            {
                super({ key: 'glaceScene' });
                this.player;
                this.cursors;
                this.animal1;
                this.animal2;
                this.struct1;
                this.struct2;
                this.field1;
                this.field2;
            }

            create ()
            {
                const farm = this.add.image(0, 0, 'desert');
                //Phaser.Display.Align.In.Center(farm, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                this.cameras.main.zoom = 0.9;

                // Player
                this.player = this.physics.add.sprite(800, -270, 'dude').setDepth(2000);
                //Phaser.Display.Align.In.Center(this.player, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
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


                // On décale la caméra par rapport à la hauteur du header
                this.cameras.main.setBounds(farm.x-farm.width/2, farm.y-farm.height/2-50, farm.width, farm.height+50);
                this.physics.world.setBounds(farm.x-farm.width/2, farm.y-farm.height/2, farm.width, farm.height);

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



        class Foret extends Phaser.Scene {

            constructor ()
            {
                super({ key: 'foretScene' });
                this.player;
                this.cursors;
                this.animal1;
                this.animal2;
                this.struct1;
                this.struct2;
                this.field1;
                this.field2;
            }

            create ()
            {
                const farm = this.add.image(0, 0, 'desert');
                //Phaser.Display.Align.In.Center(farm, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
                this.cameras.main.zoom = 0.9;

                // Player
                this.player = this.physics.add.sprite(800, -270, 'dude').setDepth(2000);
                //Phaser.Display.Align.In.Center(this.player, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
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


                // On décale la caméra par rapport à la hauteur du header
                this.cameras.main.setBounds(farm.x-farm.width/2, farm.y-farm.height/2-50, farm.width, farm.height+50);
                this.physics.world.setBounds(farm.x-farm.width/2, farm.y-farm.height/2, farm.width, farm.height);

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
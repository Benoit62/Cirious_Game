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

        this.headerScene;
        this.menuScene;
    }

    create() {
        // Animaux
        this.data.set('bat1', {
            key:1,
            x:-16,
            y:304,
            type:'animal',
            level:1,
            maxlvl:3,
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
            maxlvl:3,
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
            maxlvl:3,
            name:'tank',
            scale:0.5,
            money:5
        });
        this.data.set('bat4', {
            key:4,
            x:352,
            y:-448,
            type:'struct',
            level:0,
            maxlvl:3,
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
            money:0,
            plant:'none',
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
            maxlvl:3,
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
        


        const farm = this.physics.add.image(0, 0, 'europe');
        
        this.cameras.main.zoom = 0.8;

        // Player
        this.player = this.physics.add.sprite(800, -250, 'dude').setDepth(2000);

        
        this.physics.add.overlap(this.player, farm, this.closeOverLap, function(){ return true; }, this);


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


        // On délimite la map aux bords de l'image
        // On décale la caméra par rapport à la hauteur du header
        this.cameras.main.setBounds(farm.x - farm.width / 2, farm.y - farm.height / 2 - 50, farm.width, farm.height + 50);
        this.physics.world.setBounds(farm.x - farm.width / 2, farm.y - farm.height / 2, farm.width, farm.height);

        // Pour suivre le joueur avec la camera
        this.cameras.main.startFollow(this.player);

        // Ajoute une collision entre le joueur et les bords de la map
        this.player.setCollideWorldBounds(true);

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        // Affiche tous les batiments prédéfinis dans la data
        let j = 0;
        for(let i in this.data.values) {
            let bat = this.data.values[i];
            console.log(bat, bat.x, bat.y, bat.name, bat.level-1);
            if(bat.level > 0 && bat.name != 'build') {
                this.images.push(this.physics.add.image(bat.x, bat.y, bat.name, bat.level-1));
            }
            else {
                this.images.push(this.physics.add.image(bat.x, bat.y, 'build').setScale(bat.scale));
            }
            this.physics.add.overlap(this.player, this.images[j], this.overlapBat, null, this);
            j++;
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

        // On recupère les scenes annexes
        this.headerScene = this.scene.get('headerScene');
        this.menuScene = this.scene.get('menuScene');
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
        this.registry.set('bat', 'x : '+returnBat.x+', y : '+returnBat.y+' Type : '+returnBat.type+' Name : '+returnBat.name+' Level : '+returnBat.level);
        
        this.menuScene.getBatOverlap(returnBat);
    }


    upgradeBat(bat) {
        console.log('Upgrade batiment : ', bat)
        if(bat.type == 'animal' || bat.type == 'struct') {
            if(bat.level < bat.maxlvl && bat.level != 0) {
                bat.level+=1;
                console.log('Upgraded !', bat.key, bat.level);
                this.images[bat.key-1].setFrame(bat.level-1);
            }
        }
    }
    buildBat(bat, type) {
        console.log('Construction batiment : ', bat);
        if(bat.level == 0 && bat.name == "build") {
            bat.level+=1;
            this.images[bat.key-1] = this.physics.add.image(bat.x, bat.y, type, bat.level-1);
        }
    }
    plant(bat) {
        console.log('Construction batiment : ', bat);
        if(bat.type == 'field' && bat.plant == "none" && bat.level == 1) {
            bat.plant = 'graine';
            this.images[bat.key-1] = this.physics.add.image(bat.x, bat.y, 'sprout');
        }
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
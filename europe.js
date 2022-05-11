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

        this.money = 5000000;

        this.headerScene;
        this.menuScene;

        this.timedEvent;
    }

    create() {
        // Animaux
        this.data.set('bat1', {
            key:1,
            x:-16,
            y:304,
            type:'animal',
            level:0,
            tag:'build',
            scale:0.7,
            ref:{}
        });
        this.data.set('bat2', {
            key:2,
            x:-16,
            y:-304,
            type:'animal',
            level:2,
            tag:'cow',
            scale:0.7,
            ref:{}
        });

        // Structures
        this.data.set('bat3', {
            key:3,
            x:352,
            y:-192,
            type:'struct',
            level:1,
            tag:'tank',
            scale:0.5,
            ref:{}
        });
        this.data.set('bat4', {
            key:4,
            x:352,
            y:-448,
            type:'struct',
            level:0,
            tag:'build',
            scale:0.5,
            ref:{}
        });

        //Champs
        this.data.set('bat5', {
            key:5,
            x:-784,
            y:-303,
            type:'field',
            level:1,
            tag:'labor',
            scale:0.8,
            money:0,
            ref:{},
            plant:false,
            seed:{}
        });
        this.data.set('bat6', {
            key:6,
            x:-784,
            y:175,
            type:'field',
            level:0,
            tag:'build',
            scale:0.8,
            money:0,
            ref:{},
            plant:false,
            seed:{}
        });



        // Maison/labo
        this.data.set('bat9', {
            key:9,
            x:768,
            y:-416,
            type:'house',
            level:1,
            maxlvl:3,
            tag:'house',
            scale:0.5,
            money:0,
            cost:200000
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
            tag:'build'
        });*/
        


        const farm = this.physics.add.image(0, 0, 'europe');
        
        this.cameras.main.zoom = 0.8;

        // Player
        this.player = this.physics.add.sprite(800, -250, 'farmer').setDepth(2000).setScale(0.7);

        
        this.physics.add.overlap(this.player, farm, this.closeOverLap, function(){ return true; }, this);


        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('farmer', {
                start: 3,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{
                key: 'farmer',
                frame: 0
            }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('farmer', {
                start: 9,
                end: 11
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: [{
                key: 'farmer',
                frame: 0
            }],
            frameRate: 20
        });

        this.anims.create({
            key: 'down',
            frames: [{
                key: 'farmer',
                frame: 0
            }],
            frameRate: 20
        });


        // On délimite la map aux bords de l'image
        // On décale la caméra par rapport à la hauteur du header
        this.cameras.main.setBounds(farm.x - farm.width / 2 - 250, farm.y - farm.height / 2 - 55, farm.width + 250, farm.height + 50);
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
            if(bat.level > 0 && bat.tag != 'build') {
                this.images.push(this.physics.add.image(bat.x, bat.y, bat.tag, bat.level-1));
                bat.ref = getByTag(bat.tag)[0];
            }
            else {
                this.images.push(this.physics.add.image(bat.x, bat.y, 'build').setScale(bat.scale));
            }
            this.physics.add.overlap(this.player, this.images[j], this.overlapBat, null, this);
            j++;
        }
        console.log(this.data.values);


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


        // Fonction de timer pour calcul toutes les 5 secondes
        //this.timedEvent = this.time.addEvent(100, this.calcul, [], this, true);
    }

    update() {
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-350);
            //player.anims.play('up', true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(350);

            //player.anims.play('down', true);
        } else {
            this.player.setVelocityY(0);
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-350);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(350);

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
        let moneyPerTick = 0;
        for(let i in this.data.values) {
            let bat = this.data.values[i];
            if(bat.level > 0 && bat.tag != 'build' && bat.type != 'labor') {
                if(typeof bat.ref.money[bat.level] == "number") {
                    moneyPerTick+=bat.ref.money[bat.level];
                }
            }
        }
        this.money+=moneyPerTick;
        this.registry.set('money', this.money);
        this.registry.set('moneyPerTick', moneyPerTick*100);

    }

    // Calcul de l'argent
    calcul() {
        let moneyPerTick = 0;
        for(let i in this.data.values) {
            let bat = this.data.values[i];
            if(bat.level > 0 && bat.tag != 'build' && bat.type != 'labor') {
                if(typeof bat.ref.money[bat.level] == "number") {
                    moneyPerTick+=bat.ref.money[bat.level];
                }
            }
        }
        this.money+=moneyPerTick;
        this.registry.set('money', this.money);
        this.registry.set('moneyPerTick', moneyPerTick*100);
    }

    overlapBat(player, obj) {
        let returnBat;
        for(let i in this.data.values) {
            let bat = this.data.values[i];
            if(obj.x == bat.x && obj.y == bat.y) {
                returnBat = bat;
            }
        }
        this.registry.set('bat', 'x : '+returnBat.x+', y : '+returnBat.y+' Type : '+returnBat.type+' Tag : '+returnBat.tag+' Level : '+returnBat.level);
        
        this.menuScene.getBatOverlap(returnBat);
    }


    upgradeBat(bat) {
        console.log('Upgrade batiment : ', bat)
        if(bat.type == 'animal' || bat.type == 'struct') {
            if(bat.level < bat.ref.lvlMax && bat.level != 0) {
                if(this.money >= bat.ref.buildCost) {
                    bat.level+=1;
                    this.money-=bat.ref.buildCost;
                    console.log('Upgraded !', bat);
                    this.images[bat.key-1].setFrame(bat.level-1);
                }
            }
        }
    }
    buildBat(bat, ref) {
        console.log('Construction batiment : ', bat);
        if(bat.level == 0 && bat.tag == "build") {
            if(this.money >= ref.buildCost) {
                bat.level+=1;
                bat.tag = ref.tag;
                bat.ref = ref;
                this.money -= ref.buildCost;
                console.log('Builded !', bat);
                this.images[bat.key-1] = this.physics.add.image(bat.x, bat.y, bat.tag, bat.level-1);
            }
        }
    }
    plant(bat, seed) {
        console.log('Plantation : ', bat);
        if(bat.type == 'field' && !bat.plant && bat.level == 1 && bat.tag == 'labor') {
            if(this.money >= seed.buildPlant) {
                bat.plant = true;
                bat.tag = seed.tag;
                bat.seed = seed;
                console.log('Planted !', bat);
                this.images[bat.key-1] = this.physics.add.image(bat.x, bat.y, seed.tag);
            }
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
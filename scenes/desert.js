class Desert extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'arideScene' });
        this.player;
        this.cursors;
        this.animal1;
        this.animal2;
        this.struct1;
        this.struct2;
        this.field1;
        this.field2;

        this.images = [];

        this.headerScene;
        this.menuScene;

        this.timedEvent;

        this.timerGrowth = 0;
        this.timer = 0;
        this.timerDead = 0;
        this.timerWeeds = 0;
        this.timerDeadanimal = 0;
        this.timerMeal = 0;
        this.timerHunger = 0;
        this.timerBirth = 0;

        this.climat = 'aride';
        this.gameScene = 'aride';

        this.musique;
    }

    create ()
    {
        this.musique = this.sound.add('game_musique', {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        this.musique.play();


        this.registry.set('climat', 'aride');
        this.registry.set('gameScene', 'aride');


        // Animaux
        this.data.set('bat1', {
            key: 1,
            x: -245,
            y: 338,
            dataType:'bat',
            type: 'animal',
            typeName:'Elevage',
            level: 0,
            tag: 'build',
            scale: 0.5,
            ref: {},
            dead:false,
            feed:100,
            qt:100
        });

        // Structures
        this.data.set('bat2', {
            key: 2,
            x: 260,
            y: 415,
            dataType:'bat',
            type: 'struct',
            typeName:'Infrastructure',
            level: 0,
            tag: 'build',
            scale: 0.3,
            ref: {}
        });
        this.data.set('bat3', {
            key: 3,
            x: 700,
            y: -448,
            dataType:'bat',
            type: 'struct',
            typeName:'Infrastructure',
            level: 0,
            tag: 'build',
            scale: 0.3,
            ref: {}
        });

        //Champs
        this.data.set('bat4', {
            key: 4,
            x: 280,
            y: -310,
            dataType:'bat',
            type: 'field',
            typeName:'Culture',
            level: 0,
            tag: 'build',
            scale: 0.5,
            ref: {},
            plant: false,
            seed: {},
            oldseed: [],
            grow: 0,
            dead:false,
            fertility:100,
            weeds:0,
            maxWeeds:10
        });
        this.data.set('bat5', {
            key: 5,
            x: -784,
            y: 298,
            dataType:'bat',
            type: 'field',
            typeName:'Culture',
            level: 0,
            tag: 'build',
            scale: 0.5,
            ref: {},
            plant: false,
            seed: {},
            oldseed: [],
            grow: 0,
            dead:false,
            fertility:100,
            weeds:0,
            maxWeeds:10
        });
        
        this.data.set('bat6', {
            key: 6,
            x: 710,
            y: -185,
            dataType:'bat',
            type: 'field',
            typeName:'Culture',
            level: 0,
            tag: 'build',
            scale: 0.5,
            ref: {},
            plant: false,
            seed: {},
            oldseed: [getByTag('carrot')[0]],
            grow: 0,
            dead:false,
            fertility:100,
            weeds:0,
            maxWeeds:10,
            rotate:true
        });


        // Maison/labo
        this.data.set('bat7', {
            key: 7,
            x: 676,// 432
            y: 352,// 304
            dataType:'bat',
            type: 'house',
            typeName:'Laboratoire',
            level: 1,
            tag: 'house',
            scale: 0.3,
            ref: {}
        });


        this.data.set('bat8', {
            key: 8,
            x: 0,
            y: 0,
            type: 'river',
            typeName:'Rivière',
            pollution: 0,
            tag: 'river',
            desc:''
        })




        const farm = this.physics.add.image(0, 0, 'desert');

        this.cameras.main.zoom = 0.8;

        // Player
        this.player = this.physics.add.sprite(800, -250, 'farmer').setDepth(2000).setScale(0.7);


        this.physics.add.overlap(this.player, farm, this.closeOverLap, function () { return true; }, this);


        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left_player',
            frames: this.anims.generateFrameNumbers('farmer', {
                start: 3,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn_player',
            frames: [{
                key: 'farmer',
                frame: 0
            }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right_player',
            frames: this.anims.generateFrameNumbers('farmer', {
                start: 9,
                end: 11
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up_player',
            frames: this.anims.generateFrameNumbers('farmer', {
                start: 6,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down_player',
            frames: this.anims.generateFrameNumbers('farmer', {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });


        // On délimite la map aux bords de l'image
        // On décale la caméra par rapport à la hauteur du header
        this.cameras.main.setBounds(farm.x - farm.width / 2 - 366, farm.y - farm.height / 2 - 60, farm.width + 366, farm.height + 60);
        this.physics.world.setBounds(farm.x - farm.width / 2, farm.y - farm.height / 2, farm.width, farm.height);

        // Pour suivre le joueur avec la camera
        this.cameras.main.startFollow(this.player);

        // Ajoute une collision entre le joueur et les bords de la map
        this.player.setCollideWorldBounds(true);

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        // Affiche tous les batiments prédéfinis dans la data
        let j = 0;
        for (let i in this.data.values) {
            let bat = this.data.values[i];
            if(bat.dataType == 'bat'){
                if (bat.level > 0 && bat.tag != 'build') {
                    if(bat.type != 'field' && bat.type != 'animal') {
                        this.images.push(this.physics.add.image(bat.x, bat.y, bat.tag+this.gameScene, bat.level - 1));
                        bat.ref = getByTag(bat.tag)[0];
                        if (bat.rotate) {
                            this.images[j].rotation = 3.141592 / 2;
                        }
                    }
                    if(bat.type == 'animal') {
                        this.images.push(this.physics.add.image(bat.x, bat.y, bat.tag+this.gameScene, bat.level - 1));
                        bat.ref = getByTag(bat.tag)[0];
                        if(bat.dead) {
                            this.images[j].setFrame((bat.level - 1) + bat.ref.lvlMax);
                        }
                        if (bat.rotate) {
                            this.images[j].rotation = 3.141592 / 2;
                        }
                    }
                    if(bat.type == 'field') {
                        if(!bat.plant) {
                            let arrayField = [];
                            arrayField['ground'] = this.physics.add.image(bat.x, bat.y, bat.tag+this.gameScene, bat.level - 1);
                            arrayField['weeds'] = this.add.image(bat.x, bat.y, 'weeds', bat.weeds);
                            arrayField['plant'] = null;
                            bat.ref = getByTag(bat.tag)[0];
                            this.images.push(arrayField);
                        }
                        else {
                            let seed = getByTag(bat.tag)[0];
                            bat.seed = seed;
                            let arrayField = [];
                            arrayField['ground'] = this.physics.add.image(bat.x, bat.y, seed.ground+this.gameScene, bat.level - 1);
                            arrayField['weeds'] = this.add.image(bat.x, bat.y, 'weeds', bat.weeds);
                            arrayField['plant'] = this.add.image(bat.x, bat.y, bat.tag, bat.grow);
                            bat.tag = seed.tag;
                            bat.ref = getByTag(bat.tag)[0];
                            bat.seed = seed;
                            this.images.push(arrayField);
                        }
                        if (bat.rotate) {
                            this.images[j]['ground'].rotation = 3.141592 / 2;
                            this.images[j]['weeds'].rotation = 3.141592 / 2;
                            if(this.images[j]['plant']) this.images[j]['plant'].rotation = 3.141592 / 2;
                        }
                    }
                }
                else if(bat.tag != 'river') {
                    this.images.push(this.physics.add.image(bat.x, bat.y, 'build'+this.gameScene).setScale(bat.scale));
                }
                if(bat.type == 'field' && bat.level > 0 && bat.tag != 'build'+this.gameScene) {
                    this.physics.add.overlap(this.player, this.images[j]['ground'], this.overlapBat, null, this);
                }
                else {
                    this.physics.add.overlap(this.player, this.images[j], this.overlapBat, null, this);
                }
                j++;
            }
        }
        console.log(this.images);
        console.log(this.data.values);


        //debug
        /*this.debug = this.add.graphics({
            lineStyle: {
                color: 0xffff00
            }
        });*/
        //polygone des hitboxs
        var dataRiv = [-880, -440, -630, -440, -610, -405, -355, -405, -355, -315, -250, -315, -250, -470, -50, -470, -50, -270, -15, -270, -15, -90, -290, -90, -290, -315, -355, -315, -355, -90, -465, -90, -465, -65, -850, -65, -850, -185, -910, -185, -910, -405, -880, -440];
        // The boundary
        this.Bounds = new Phaser.Geom.Polygon(dataRiv);

        // Will represent the player body
        this.playerRect = new Phaser.Geom.Rectangle();

        // Will hold a per-step velocity (distance)
        this.tempVelocity = new Phaser.Math.Vector2();

        // On recupère les scenes annexes
        this.headerScene = this.scene.get('headerScene');
        this.menuScene = this.scene.get('menuScene');
        this.scene.bringToTop('headerScene');
        this.scene.bringToTop('menuScene');


        //this.registry.set('money', 100000);
        this.registry.set('money', this.registry.get('money') || 100000);
        this.registry.set('moneyPerTick', 0);
        this.registry.set('mult', 1);


        this.registry.set('ecology'+this.gameScene, 10);
        this.registry.set('animalCare'+this.gameScene, 60);
        this.registry.set('hunger'+this.gameScene, 10);


        //Code triche
        this.input.keyboard.on('keydown_W', function(){
            this.registry.set('money', this.registry.get('money') + 10000);
        }, this);

        this.input.keyboard.on('keydown_I', function(){
            this.registry.set('animalCare'+this.gameScene, this.registry.get('animalCare'+this.gameScene) < 90 ? this.registry.get('animalCare'+this.gameScene) + 10 : this.registry.get('animalCare'+this.gameScene));
        }, this);

        this.input.keyboard.on('keydown_O', function(){
            this.registry.set('ecology'+this.gameScene, this.registry.get('ecology'+this.gameScene) < 90 ? this.registry.get('ecology'+this.gameScene) + 10 : this.registry.get('ecology'+this.gameScene));
        }, this);

        this.input.keyboard.on('keydown_P', function(){
            this.registry.set('hunger'+this.gameScene, this.registry.get('hunger'+this.gameScene) < 90 ? this.registry.get('hunger'+this.gameScene) + 10 : this.registry.get('hunger'+this.gameScene));
        }, this);
    }

    update() {
        if(this.registry.get('ecology'+this.gameScene) >= 90 && this.registry.get('animalCare'+this.gameScene) >= 90 && this.registry.get('hunger'+this.gameScene) >= 90 && !this.finish) {
            this.finish = true;
            this.menuScene.seedyAdvice('unlock');
            this.menuScene.unlock();
            console.log('unlock');
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-650);
            this.menuScene.closeSavoirPlus();
            this.player.anims.play('up_player', true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(650);
            this.menuScene.closeSavoirPlus();

            console.log('down');
            this.player.anims.play('down_player', true);
        } else {
            this.player.setVelocityY(0);
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-650);
            this.menuScene.closeSavoirPlus();

            this.player.anims.play('left_player', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(650);
            this.menuScene.closeSavoirPlus();

            this.player.anims.play('right_player', true);
        } else {
            this.player.setVelocityX(0);
        }

        if (!this.cursors.left.isDown && !this.cursors.right.isDown) {

            this.player.anims.play('turn_player', true);
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
        this.debug.clear().strokePoints(this.Bounds.points).strokeRectShape(this.playerRect);*/


        this.timerHunger++;
        if (this.timerHunger == 800) {
            console.log('Check weeds');
            this.updateJauge('hunger', -1);
            this.timerHunger = 0 - Phaser.Math.Between(0, 500);
        }

        this.timerWeeds++;
        if (this.timerWeeds == 2500) {
            console.log('Check weeds');
            this.weeds();
            this.timerWeeds = 0 - Phaser.Math.Between(0, 600);
        }

        this.timerGrowth++;
        if (this.timerGrowth == 500) {
            console.log('Check Pousse');
            this.grow();
            this.timerGrowth = 0 - Phaser.Math.Between(0, 200);
        }

        this.timerDead++;
        if (this.timerDead == 500) {
            console.log('Check rotten');
            this.rotten();
            this.timerDead = 0;
        }


        this.timerDeadanimal++;
        if (this.timerDeadanimal == 1500) {
            console.log('Check dead');
            this.dead();
            this.timerDeadanimal = 0 - Phaser.Math.Between(0, 500);
        }

        this.timerMeal++;
        if (this.timerMeal == 1000) {
            console.log('Check eat');
            this.eat();
            this.timerMeal = 0 - Phaser.Math.Between(0, 400);
        }

        this.timerBirth++;
        if (this.timerBirth == 1000) {
            console.log('Check birth');
            this.birth();
            this.timerBirth = 0 - Phaser.Math.Between(0, 400);
        }

        let mult = 1;
        if (this.timer % 60 == 0) {
            let moneyPerSec = 0;
            for (let i in this.data.values) {
                let bat = this.data.values[i];
                if (bat.level > 0 && bat.tag != 'build' && bat.type == 'struct') {
                    if (typeof bat.ref.passif[bat.level] == "number") {
                        moneyPerSec += bat.ref.passif[bat.level];
                        getByType(bat.ref.product).forEach(value => value.unlock ? moneyPerSec +=value.passif : moneyPerSec+=0);
                    }
                }
                if(bat.type == 'house') mult = bat.ref.mult[bat.level];
            }
            this.registry.set('moneyPerTick', moneyPerSec);
            moneyPerSec *= mult;
            this.registry.set('money', this.registry.get('money') + moneyPerSec);
            this.registry.set('mult', mult);
        }
        this.timer++;
    }

    // Calcul de l'argent
    calcul() {
        let moneyPerTick = 0;
        for (let i in this.data.values) {
            let bat = this.data.values[i];
            if (bat.level > 0 && bat.tag != 'build' && bat.type != 'labor') {
                if (typeof bat.ref.money[bat.level] == "number") {
                    moneyPerTick += bat.ref.money[bat.level];
                }
            }
        }
    }

    overlapBat(player, obj) {
        let returnBat;
        for (let i in this.data.values) {
            let bat = this.data.values[i];
            if (obj.x == bat.x && obj.y == bat.y) {
                returnBat = bat;
            }
        }
        this.registry.set('bat', 'x : ' + returnBat.x + ', y : ' + returnBat.y);

        this.menuScene.getBatOverlap(returnBat);
    }


    upgradeBat(bat) {
        console.log('Upgrade batiment : ', bat)
        if (bat.type == 'animal' || bat.type == 'struct' || bat.type == 'house') {
            if (bat.level < bat.ref.lvlMax && bat.level != 0) {
                if (this.money() >= bat.ref.upgrade[bat.level +1]) {
                    if(bat.type != 'animal') {
                        bat.level += 1;
                        this.registry.set('money', this.registry.get('money') - bat.ref.upgrade[bat.level]);
                        console.log('Upgraded !', bat);
                        this.images[bat.key - 1].setFrame(bat.level - 1);
                    }
                    else if(!bat.dead) {
                        bat.level += 1;
                        this.registry.set('money', this.registry.get('money') - bat.ref.upgrade[bat.level]);
                        console.log('Upgraded !', bat);
                        this.images[bat.key - 1].setFrame(bat.level - 1);
                    }
                    if(bat.type == 'animal') {
                        this.updateJauge('animalCare', 10 * bat.level);

                        let textMoney = this.add.text(bat.x, bat.y, '-'+bat.ref.upgrade[bat.level], { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                        let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);

                        let textAnimal = this.add.text(bat.x, textMoney.y + textMoney.height*0.8, '+'+(10 * bat.level).toString(), { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                        let animalButton = this.add.image(textAnimal.x + textAnimal.width / 1.5, textAnimal.y, 'animal-care').setScale(0.08).setOrigin(0,0.5);
                        console.log(textAnimal);
                        setTimeout(() => {
                            textMoney.destroy();
                            moneyButton.destroy();
                            textAnimal.destroy();
                            animalButton.destroy();
                        }, 3000);
                    }
                    else {
                        let textMoney = this.add.text(bat.x, bat.y, '-'+bat.ref.upgrade[bat.level], { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                        let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);

                        setTimeout(() => {
                            textMoney.destroy();
                            moneyButton.destroy();
                        }, 3000);
                    }
                }
                else {
                    console.log('Not enought money')
                    this.menuScene.errorText('Not enought money');
                }
            }
        }
    }
    buildBat(bat, ref) {
        console.log('Construction batiment : ', bat);
        if (bat.level == 0 && bat.tag == "build") {
            if (this.money() >= ref.buildCost) {
                bat.level += 1;
                bat.tag = ref.tag;
                bat.ref = ref;
                this.registry.set('money', this.registry.get('money') - ref.buildCost);
                if(bat.type != 'field') {
                    console.log('Builded !', bat);
                    this.images[bat.key - 1] = this.physics.add.image(bat.x, bat.y, bat.tag+this.gameScene, bat.level - 1);
                    if (bat.rotate) {
                        this.images[bat.key - 1].rotation = 3.141592 / 2;
                    }
                    if(bat.type == 'animal') {
                        this.updateJauge('animalCare', -30);

                        let textMoney = this.add.text(bat.x, bat.y, '-'+ref.buildCost, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                        let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);

                        let textAnimal = this.add.text(bat.x, textMoney.y + textMoney.height*0.8, '-40', { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                        let animalButton = this.add.image(textAnimal.x + textAnimal.width / 1.5, textAnimal.y, 'animal-care').setScale(0.08).setOrigin(0,0.5);

                        setTimeout(() => {
                            textMoney.destroy();
                            moneyButton.destroy();
                            textAnimal.destroy();
                            animalButton.destroy();
                        }, 3000);
                    }
                    else {
                        let textMoney = this.add.text(bat.x, bat.y, '-'+ref.buildCost, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                        let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);

                        setTimeout(() => {
                            textMoney.destroy();
                            moneyButton.destroy();
                        }, 3000);
                    }
                }
                else {
                    this.images[bat.key - 1]['ground'] = this.physics.add.image(bat.x, bat.y, ref.tag+this.gameScene, bat.level - 1);
                    this.images[bat.key - 1]['weeds'] = this.add.image(bat.x, bat.y, 'weeds', bat.weeds);
                    this.images[bat.key - 1]['plant'];
                    bat.ref = getByTag(bat.tag)[0];

                    let textMoney = this.add.text(bat.x, bat.y, '-'+ref.buildCost, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                    let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);

                    setTimeout(() => {
                        textMoney.destroy();
                        moneyButton.destroy();
                    }, 3000);
                }
            }
            else {
                console.log('Not enought money')
                this.menuScene.errorText('Not enought money');
            }
        }
    }
    plant(bat, seed) {
        console.log('Plantation : ', bat);
        if (bat.type == 'field' && !bat.plant && bat.level == 1 && (bat.tag == 'labor' || bat.tag == 'water')) {
            if (this.money() >= seed.costPlant) {
                if (bat.tag == seed.ground) {
                    this.registry.set('money', this.registry.get('money') - seed.costPlant);
                    bat.plant = true;
                    bat.tag = seed.tag;
                    bat.seed = seed;
                    console.log('Planted !', bat);
                    this.images[bat.key - 1]['plant'] = this.add.image(bat.x, bat.y, seed.tag, bat.grow);

                    let textMoney = this.add.text(bat.x, bat.y, '-'+seed.costPlant, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                    let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);

                    setTimeout(() => {
                        textMoney.destroy();
                        moneyButton.destroy();
                    }, 3000);

                    setTimeout(() => {
                        let nbOldSeed = 0;
                        while(bat.seed == bat.oldseed[nbOldSeed]){
                            nbOldSeed++;
                        }
                        if(nbOldSeed == 1) {
                            this.menuScene.seedyAdvice('sameSeed', bat.seed);
                        }
                        if(nbOldSeed == 2) {
                            this.menuScene.seedyAdvice('sameSeed2', bat.seed);
                        }
                        if(nbOldSeed >= 3) {
                            this.menuScene.seedyAdvice('toMuchSameSeed', bat.seed);
                        }
                    }, 4000);
                }
                else {
                    console.log('Can\'t plant riz on dirt or others on water');
                    this.menuScene.errorText('Vous ne pouvez pas planter cette culture sur ce type de champs');
                }
            }
            else {
                console.log('Not enought money')
                this.menuScene.errorText('Not enought money');
            }
        }
    }
    replant(bat) {
        console.log('Replantation : ', bat);
        if (bat.oldseed[0]) {
            console.log(bat.oldseed[0]);
            this.plant(bat, bat.oldseed[0]);
        }
    }
    grow() {
        for (let i in this.data.values) {
            let bat = this.data.values[i];
            if (bat.level == 1 && bat.type == 'field' && bat.tag != 'labor' && bat.plant) {
                if (bat.grow < bat.seed.maxGrow && !bat.dead) {
                    if (Phaser.Math.Between(1, 5) <= 3) {
                        bat.grow++;
                        this.images[bat.key - 1]['plant'].setFrame(bat.grow);
                    }
                }
            }
        }
    }
    rotten(){
        for (let i in this.data.values) {
            let bat = this.data.values[i];
            if (bat.level == 1 && bat.type == 'field' && (bat.tag != 'labor' || bat.tag != 'water') && bat.plant && !bat.dead) {
                if (!bat.seed.climat.includes(this.climat)) {
                    bat.dead = true;
                    console.log('Dead plant !', bat);
                    this.images[bat.key - 1]['plant'].setFrame(bat.seed.maxGrow + 1);
                    this.menuScene.seedyAdvice('deadPlantClimat', bat.seed);
                }
            }
        }
    }
    weeds(){
        for (let i in this.data.values) {
            let bat = this.data.values[i];
            if (bat.level == 1 && bat.type == 'field') {
                if (Phaser.Math.Between(1, 5) <= 2) {
                    bat.weeds++;
                    if(bat.weeds > bat.maxWeeds) bat.weeds = bat.maxWeeds;
                    console.log('Weeds !', bat);
                    this.images[bat.key - 1]['weeds'].setFrame(bat.weeds);


                    let textHealth = this.add.text(bat.x, bat.y, '-1', { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                    let healthButton = this.add.image(textHealth.x + textHealth.width / 1.5, textHealth.y, 'health').setScale(0.08).setOrigin(0,0.5);

                    setTimeout(() => {
                        textHealth.destroy();
                        healthButton.destroy();
                    }, 3000);
                }
                if(bat.weed == 8) {
                    
                    this.menuScene.seedyAdvice('weeds', bat.ref);
                }
                if(bat.weed == 10) {
                    
                    this.menuScene.seedyAdvice('fullWeeds', bat.ref);
                }
            }
        }
    }
    clean(bat, lutte){
        console.log('Cleaning : ', bat);
        if (bat.type == 'field' && bat.level == 1 && bat.weeds > 0) {
            bat.weeds -= lutte.health;
            if(bat.weeds < 0) bat.weeds = 0;
            console.log('Cleaned !', bat);
            this.images[bat.key - 1]['weeds'].setFrame(bat.weeds);

            this.updateJauge('ecology', lutte.ecology);

            this.registry.set('money', this.registry.get('money') - lutte.prix);

            let textMoney = this.add.text(bat.x, bat.y, '-'+lutte.prix, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
            let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);
            let textEcology = this.add.text(bat.x, textMoney.y + textMoney.height*0.8, lutte.ecology.toString(), { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
            let ecologyButton = this.add.image(textEcology.x + textEcology.width / 1.5, textEcology.y, 'ecology-care').setScale(0.08).setOrigin(0,0.5);
            let textHealth = this.add.text(bat.x, textEcology.y + textEcology.height*0.8, '+'+lutte.health, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
            let healthButton = this.add.image(textHealth.x + textHealth.width / 1.5, textHealth.y, 'health').setScale(0.08).setOrigin(0,0.5);
            console.log(textEcology);
            setTimeout(() => {
                textMoney.destroy();
                moneyButton.destroy();
                textEcology.destroy();
                ecologyButton.destroy();
                textHealth.destroy();
                healthButton.destroy();
            }, 3000);
        }
    }
    recolte(bat) {
        console.log('Recolte : ', bat);
        if (bat.type == 'field' && bat.plant && bat.level == 1 && (bat.tag != 'labor' || bat.tag != 'water') && (bat.grow == bat.seed.maxGrow || bat.dead)) {
            let percent = bat.fertility/100;
            let percent2 = (bat.maxWeeds - bat.weeds)/10;
            console.log(percent, percent2);
            let moneyWin = bat.seed.money*percent*percent2;
            let hungerWin = 5*percent*percent2;

            // Compte l'echainement des graines
            let looseFertility = 0;
            let nbOldSeed = 0;
            while(bat.seed == bat.oldseed[nbOldSeed]){
                nbOldSeed++;
                looseFertility += 10*nbOldSeed;
            }
            if(nbOldSeed == 0) {
                looseFertility += 5;
            }
            bat.fertility -= looseFertility;
            if(bat.fertility < 0) bat.fertility = 0;

            if(!bat.dead) {
                bat.plant = false;
                bat.oldseed.unshift(bat.seed);
                bat.tag = bat.seed.ground;
                bat.grow = 0;
                this.registry.set('money', this.registry.get('money') + moneyWin);
                this.updateJauge('hunger', hungerWin);
                console.log('Recolté !', bat);
                this.images[bat.key - 1]['plant'].destroy();

                

                setTimeout(() => {
                    if(moneyWin < bat.seed.money * 0.15) {
                    
                        this.menuScene.seedyAdvice('lowWinPlant', bat, bat.seed);
                    }
    
                    setTimeout(() => {
                        if(bat.fertility < 25 && bat.fertility >= 20) {
                        
                            this.menuScene.seedyAdvice('lowFertility', bat.fertility);
                        }
                        if(bat.fertility < 10) {
                            
                            this.menuScene.seedyAdvice('veryLowFertility', bat.fertility);
                        }
                        if(bat.fertility == 0) {
                            
                            this.menuScene.seedyAdvice('noFertility', bat.fertility);
                        }
                    }, 10000);
                }, 5000);

                bat.seed = {};

                let textMoney = this.add.text(bat.x, bat.y, '+'+moneyWin, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);
                let textHunger = this.add.text(bat.x, textMoney.y + textMoney.height*0.8, hungerWin, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                let hungerButton = this.add.image(textHunger.x + textHunger.width / 1.5, textHunger.y, 'hunger-care').setScale(0.08).setOrigin(0,0.5);
                let textHealth = this.add.text(bat.x, textHunger.y + textHunger.height*0.8, '-'+looseFertility, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                let healthButton = this.add.image(textHealth.x + textHealth.width / 1.5, textHealth.y, 'fertility').setScale(0.08).setOrigin(0,0.5);
                setTimeout(() => {
                    textMoney.destroy();
                    moneyButton.destroy();
                    textHunger.destroy();
                    hungerButton.destroy();
                    textHealth.destroy();
                    healthButton.destroy();
                }, 3000);
            }
            else {
                bat.plant = false;
                bat.oldseed.unshift(bat.seed);
                bat.tag = bat.seed.ground;
                bat.grow = 0;
                //this.money() += bat.seed.money;
                bat.seed = {};
                bat.dead = false;
                this.updateJauge('hunger', -10);
                console.log('Nettoyé !', bat);
                this.images[bat.key - 1]['plant'].destroy();


                let textHunger = this.add.text(bat.x, bat.y, '-10', { lineSpacing:10, fontSize:40, color:'#ffffff' }).setOrigin(0.5, 0.5);
                let hungerButton = this.add.image(textHunger.x + textHunger.width / 1.5, textHunger.y, 'hunger-care').setScale(0.08).setOrigin(0,0.5);
                setTimeout(() => {
                    textHunger.destroy();
                    hungerButton.destroy();
                }, 3000);
            }
        }
    }
    fertility(bat, engrais) {
        console.log('Fertilisation : ', bat);
        if (bat.type == 'field' && !bat.plant && bat.level == 1 && (bat.tag == 'labor' || bat.tag == 'water') && bat.fertility < 100) {
            bat.fertility += engrais.fertility;
            if(bat.fertility > 100) bat.fertility = 100;
            console.log('Fertilised !', bat);
            this.updateJauge('ecology', engrais.ecology);

            this.registry.set('money', this.registry.get('money') - engrais.prix);

            let textMoney = this.add.text(bat.x, bat.y, '-'+engrais.prix, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
            let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);
            let textEcology = this.add.text(bat.x, textMoney.y + textMoney.height*0.8, engrais.ecology.toString(), { lineSpacing:10, fontSize:40, color:'#ffffff' }).setOrigin(0.5, 0.5);
            let ecologyButton = this.add.image(textEcology.x + textEcology.width / 1.5, textEcology.y, 'ecology-care').setScale(0.08).setOrigin(0,0.5);
            let textFertility = this.add.text(bat.x, textEcology.y + textEcology.height*0.8, '+'+engrais.fertility, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
            let fertilityButton = this.add.image(textFertility.x + textFertility.width / 1.5, textFertility.y, 'fertility').setScale(0.08).setOrigin(0,0.5);
            console.log(textEcology);
            setTimeout(() => {
                textMoney.destroy();
                moneyButton.destroy();
                textEcology.destroy();
                ecologyButton.destroy();
                textFertility.destroy();
                fertilityButton.destroy();
            }, 3000);
        }
    }

    dead() {
        for (let i in this.data.values) {
            let bat = this.data.values[i];
            if (bat.level > 0 && bat.type == 'animal' && !bat.dead) {
                if (!bat.ref.climat.includes(this.climat)) {
                    bat.dead = true;
                    bat.qt = 0;
                    console.log('Dead animal !', bat);
                    this.images[bat.key - 1].setFrame((bat.level - 1) + bat.ref.lvlMax);

                    this.menuScene.seedyAdvice('deadAnimalClimat', bat.ref);

                    this.updateJauge('animalCare', -40);

                    let textAnimal = this.add.text(bat.x, bat.y, '-40', { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                    let animalButton = this.add.image(textAnimal.x + textAnimal.width / 1.5, textAnimal.y, 'animal-care').setScale(0.08).setOrigin(0,0.5);
                    setTimeout(() => {
                        textAnimal.destroy();
                        animalButton.destroy();
                    }, 3000);
                }
            }
        }
    }

    destroyBat(bat, destroyRef) {
        console.log('Destruction batiment : ', bat);
        if (bat.level > 0 && bat.tag != "build" && bat.type == 'animal' || bat.type == 'struct' || bat.type == 'field') {
            if (this.money() >= destroyRef.cost) {
                if(bat.type == 'animal') {
                    this.images[bat.key - 1].destroy();
                    this.images[bat.key - 1] = this.physics.add.image(bat.x, bat.y, 'build').setScale(bat.scale);
                    if(!bat.dead) {
                        //Si il vend le batiment des animaux pas mort il gagne un bonus bien-être
                        this.updateJauge('animalCare', 20);

                        let textMoney = this.add.text(bat.x, bat.y, '-'+destroyRef.cost, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                        let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);

                        let textAnimal = this.add.text(bat.x, textMoney.y + textMoney.height*0.8, +20, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                        let animalButton = this.add.image(textAnimal.x + textAnimal.width / 1.5, textAnimal.y, 'animal-care').setScale(0.08).setOrigin(0,0.5);
                        setTimeout(() => {
                            textMoney.destroy();
                            moneyButton.destroy();
                            textAnimal.destroy();
                            animalButton.destroy();
                        }, 3000);
                    }
                    bat.dead = false;
                    bat.feed = 90;
                    bat.qt = 90;
                }
                bat.level = 0;
                bat.tag = 'build';
                bat.ref = {};
                this.registry.set('money', this.registry.get('money') - destroyRef.cost);
                if(bat.type == 'field') {
                    console.log('Destroy field !', bat);
                    this.images[bat.key - 1]['ground'].destroy();
                    this.images[bat.key - 1]['weeds'].destroy();
                    if(bat.plant) {
                        this.images[bat.key - 1]['plant'].destroy();
                    }
                    this.images[bat.key - 1] = this.physics.add.image(bat.x, bat.y, 'build').setScale(bat.scale);
                    bat.seed = {};
                    bat.oldseed = [];
                    bat.dead = false;
                    bat.grow = 0;
                    bat.weeds = 0;
                    bat.plant = false;
                    bat.fertility = 100;

                    let textMoney = this.add.text(bat.x, bat.y, '-'+destroyRef.cost, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                    let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);

                    setTimeout(() => {
                        textMoney.destroy();
                        moneyButton.destroy();
                    }, 3000);
                }
                if(bat.type == 'struct') {
                    this.images[bat.key - 1].destroy();
                    this.images[bat.key - 1] = this.physics.add.image(bat.x, bat.y, 'build').setScale(bat.scale);

                    let textMoney = this.add.text(bat.x, bat.y, '-'+destroyRef.cost, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                    let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);

                    setTimeout(() => {
                        textMoney.destroy();
                        moneyButton.destroy();
                    }, 3000);
                }

                this.physics.add.overlap(this.player, this.images[bat.key - 1], this.overlapBat, null, this);
            }
            else {
                console.log('Not enought money')
                this.menuScene.errorText('Not enought money');
            }
        }
    }

    feed(bat, meal) {
        console.log('Feed : ', bat);
        if (bat.type == 'animal' && !bat.dead && bat.level > 0 && bat.feed < 100) {
            bat.feed += meal.feed;
            if(bat.feed > 100) bat.feed = 100;
            console.log('Feeded !', bat);
            this.updateJauge('animalCare', meal.care);

            this.registry.set('money', this.registry.get('money') - meal.prix);

            let textMoney = this.add.text(bat.x, bat.y, '-'+meal.prix, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
            let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);
            let textAnimal = this.add.text(bat.x, textMoney.y + textMoney.height*0.8, meal.care.toString(), { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
            let animalButton = this.add.image(textAnimal.x + textAnimal.width / 1.5, textAnimal.y, 'animal-care').setScale(0.08).setOrigin(0,0.5);
            console.log(textAnimal);
            setTimeout(() => {
                textMoney.destroy();
                moneyButton.destroy();
                textAnimal.destroy();
                animalButton.destroy();
            }, 3000);
        }
    }

    eat() {
        for (let i in this.data.values) {
            let bat = this.data.values[i];
            if (bat.level > 0 && bat.type == 'animal' && !bat.dead) {
                if (bat.feed > 0) {
                    if (Phaser.Math.Between(1, 5) <= 4) {
                        bat.feed -= 5;
                        console.log('Eat animal !', bat);

                        if(bat.feed <= 0) {
                            this.menuScene.seedyAdvice('noMeal');
                            bat.feed = 0;
                            setTimeout(() => {
                                bat.dead = true;
                                console.log('Dead animal !', bat);
                                this.images[bat.key - 1].setFrame((bat.level - 1) + bat.ref.lvlMax);

                                this.updateJauge('animalCare', -40);

                                let textAnimal = this.add.text(bat.x, bat.y, '-40', { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                                let animalButton = this.add.image(textAnimal.x + textAnimal.width / 1.5, textAnimal.y, 'animal-care').setScale(0.08).setOrigin(0,0.5);
                                setTimeout(() => {
                                    textAnimal.destroy();
                                    animalButton.destroy();
                                }, 3000);
                            }, 10000);
                        }
                        else if(bat.feed < 25) {
                            console.log('Hunger animal !', bat);

                            this.updateJauge('animalCare', -4);

                            let textAnimal = this.add.text(bat.x, bat.y, '-4', { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
                            let animalButton = this.add.image(textAnimal.x + textAnimal.width / 1.5, textAnimal.y, 'animal-care').setScale(0.08).setOrigin(0,0.5);
                            setTimeout(() => {
                                textAnimal.destroy();
                                animalButton.destroy();
                            }, 3000);

                            //Seedy Advice
                            if(bat.feed >= 5 && bat.feed < 10) {
                                this.menuScene.seedyAdvice('veryLowMeal');
                            }
                            if(bat.feed >= 20 && bat.feed < 25) {
                                this.menuScene.seedyAdvice('lowMeal');
                            }
                        }
                    }
                }
            }
        }
    }

    birth() {
        for (let i in this.data.values) {
            let bat = this.data.values[i];
            if (bat.level > 0 && bat.type == 'animal' && !bat.dead && bat.qt < 100) {
                if (bat.feed >= 35) {
                    if (Phaser.Math.Between(1, 10) <= 7) {
                        bat.qt += 5;
                        console.log('Birth animal !', bat);

                        if(bat.qt > 100) bat.qt = 100;
                        if(bat.qt <= 100) this.images[bat.key - 1].setFrame((bat.level - 1));
                        if(bat.qt < 75) this.images[bat.key - 1].setFrame((bat.level - 1) + 4 * bat.ref.lvlMax);
                        if(bat.qt < 50) this.images[bat.key - 1].setFrame((bat.level - 1) + 2 * bat.ref.lvlMax);
                        if(bat.qt < 25) this.images[bat.key - 1].setFrame((bat.level - 1) + 3 * bat.ref.lvlMax);
                    }
                }
                if(bat.feed < 35 && bat.feed >= 30) {
                    
                    this.menuScene.seedyAdvice('notEnoughtMeal', bat.ref);
                }

            }
        }
    }

    sell(bat, sell) {
        console.log('Sell : ', bat);
        if (bat.type == 'animal' && !bat.dead && bat.level > 0 && bat.qt > 40) {
            bat.qt -= 30;
            console.log('Selled !', bat);

            if(bat.qt <= 100) this.images[bat.key - 1].setFrame((bat.level - 1));
            if(bat.qt < 75) this.images[bat.key - 1].setFrame((bat.level - 1) + 4 * bat.ref.lvlMax);
            if(bat.qt < 50) this.images[bat.key - 1].setFrame((bat.level - 1) + 2 * bat.ref.lvlMax);
            if(bat.qt < 25) this.images[bat.key - 1].setFrame((bat.level - 1) + 3 * bat.ref.lvlMax);

            let moneyWin = sell.money*30;

            this.registry.set('money', this.registry.get('money') + moneyWin);
            this.updateJauge('hunger', sell.hunger);
            this.updateJauge('animalCare', sell.care);


            let textMoney = this.add.text(bat.x, bat.y, '+'+moneyWin, { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
            let moneyButton = this.add.image(textMoney.x + textMoney.width / 1.5, textMoney.y, 'dollar').setScale(0.08).setOrigin(0,0.5);

            let textAnimal = this.add.text(bat.x, textMoney.y + textMoney.height*0.8, sell.care.toString(), { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
            let animalButton = this.add.image(textAnimal.x + textAnimal.width / 1.5, textAnimal.y, 'animal-care').setScale(0.08).setOrigin(0,0.5);

            let texthunger = this.add.text(bat.x, textAnimal.y + textAnimal.height*0.8, sell.hunger.toString(), { lineSpacing:10, fontSize:40, color:'#ffffff ' }).setOrigin(0.5, 0.5);
            let hungerButton = this.add.image(texthunger.x + texthunger.width / 1.5, texthunger.y, 'hunger-care').setScale(0.08).setOrigin(0,0.5);
            console.log(textAnimal);
            setTimeout(() => {
                textMoney.destroy();
                moneyButton.destroy();
                textAnimal.destroy();
                animalButton.destroy();
                texthunger.destroy();
                hungerButton.destroy();
            }, 3000);
        }
    }


    updateJauge(jauge, value){
        let result = this.registry.get(jauge+this.gameScene) + value;
        if(result > 100) result = 100;
        if(result < 0) result = 0;
        this.registry.set(jauge+this.gameScene, result);
    }


    textGain(text){
        let textMoney = this.add.text(bat.x, bat.y, '+'+moneyWin+'$\n+'+hungerWin+' Nourriture', { lineSpacing:10, fontSize:40, color:'#ffffff' }).setOrigin(0.5, 0.5);
        setTimeout(() => {
            textWin.destroy();
        }, 2000);
    }


    money() {
        return this.registry.list.money;
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
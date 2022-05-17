class Tuto extends Phaser.Scene {

    constructor() {
        super({
            key: 'tutoScene'
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

        this.money = 35000;

        this.headerScene;
        this.menuScene;

        this.timedEvent;

        this.timerGrowth = 0;
        this.timer = 0;
        this.timerDead = 0;
        this.timerWeeds = 0;

        this.climat = 'europe';

        this.musique;
    }
    create() {
        this.scene.bringToTop('headerScene');
        this.scene.bringToTop('menuScene');

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


        this.registry.set('climat', 'europe');
        this.registry.set('gameScene', 'tuto');


        // Animaux
        this.data.set('bat1', {
            key: 1,
            x: 115,
            y: 160,
            dataType: 'bat',
            type: 'animal',
            typeName: 'Elevage',
            level: 1,
            tag: 'cow',
            scale: 0.5,
            ref: {}
        });


        this.data.set('bat2', {
            key: 2,
            x: -32,
            y: -240,
            dataType: 'bat',
            type: 'struct',
            typeName: 'Infrastructure',
            level: 0,
            tag: 'build',
            scale: 0.3,
            ref: {}
        });


        this.data.set('bat3', {
            key: 3,
            x: -368,
            y: -128,
            dataType: 'bat',
            type: 'field',
            typeName: 'Culture',
            level: 1,
            tag: 'labor',
            scale: 0.5,
            ref: {},
            plant: false,
            seed: {},
            oldseed: [getByTag('carrot')[0]],
            grow: 0,
            dead: false,
            fertility: 90,
            weeds: 0,
            maxWeeds: 3
        });


        // Maison/labo
        this.data.set('bat4', {
            key: 4,
            x: 700 / 2,
            y: -480 / 2,
            dataType: 'bat',
            type: 'house',
            typeName: 'Laboratoire',
            level: 1,
            tag: 'house',
            scale: 0.3,
            ref: {}
        });
        const farm = this.physics.add.image(0, 0, 'tuto');

        this.cameras.main.zoom = 1;

        // Player
        this.player = this.physics.add.sprite(415, -80, 'farmer').setDepth(2000).setScale(0.7);


        this.physics.add.overlap(this.player, farm, this.closeOverLap, function () { return true; }, this);


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
        this.cameras.main.setBounds(farm.x - farm.width / 2 - 366, farm.y - farm.height / 2 - 60, farm.width + 366, farm.height + 60);
        this.physics.world.setBounds(farm.x - farm.width / 2, farm.y - farm.height / 2, farm.width, farm.height);

        // Pour suivre le joueur avec la camera
        this.cameras.main.startFollow(this.player);

        // Ajoute une collision entre le joueur et les bords de la map
        this.player.setCollideWorldBounds(true);



        // Affiche tous les batiments prédéfinis dans la data
        let j = 0;
        for (let i in this.data.values) {
            let bat = this.data.values[i];
            if (bat.dataType == 'bat') {
                if (bat.level > 0 && bat.tag != 'build') {
                    if (bat.type != 'field') {
                        this.images.push(this.physics.add.image(bat.x, bat.y, bat.tag, bat.level - 1));
                        bat.ref = getByTag(bat.tag)[0];
                        if (bat.rotate) {
                            this.images[j].rotation = 3.141592 / 2;
                        }
                    }
                    else {
                        if (!bat.plant) {
                            let arrayField = [];
                            arrayField['ground'] = this.physics.add.image(bat.x, bat.y, bat.tag, bat.level - 1);
                            arrayField['weeds'] = this.add.image(bat.x, bat.y, 'weeds', bat.weeds);
                            arrayField['plant'] = null;
                            bat.ref = getByTag(bat.tag)[0];
                            this.images.push(arrayField);
                        }
                        else {
                            let seed = getByTag(bat.tag)[0];
                            bat.seed = seed;
                            let arrayField = [];
                            arrayField['ground'] = this.physics.add.image(bat.x, bat.y, seed.ground, bat.level - 1);
                            arrayField['weeds'] = this.add.image(bat.x, bat.y, 'weeds', bat.weeds);
                            arrayField['plant'] = this.add.image(bat.x, bat.y, bat.tag, bat.grow);
                            bat.tag = seed.tag;
                            bat.ref = getByTag(bat.tag)[0];
                            bat.seed = seed;
                            this.images.push(arrayField);
                        }
                    }
                }
                else if (bat.tag != 'river') {
                    this.images.push(this.physics.add.image(bat.x, bat.y, 'build').setScale(bat.scale));
                }
                if (bat.type == 'field' && bat.level > 0 && bat.tag != 'build') {
                    this.physics.add.overlap(this.player, this.images[j]['ground'], this.overlapBat, null, this);
                }
                else {
                    this.physics.add.overlap(this.player, this.images[j], this.overlapBat, null, this);
                }
                j++;
            }
        }

        // On recupère les scenes annexes
        this.headerScene = this.scene.get('headerScene');
        this.menuScene = this.scene.get('menuScene');


        this.registry.set('money', this.money);
        this.registry.set('moneyPerTick', 0);
        this.registry.set('ecology', 10);
        this.registry.set('animalCare', 60);
        this.registry.set('hunger', 10);

        this.introContext = false;
        this.introCow = false;
        this.introBat = false;
        this.introField = false;
        this.introM = false;
    }

    update() {
        //console.log(this.data.list.bat3.plant)
        if (this.data.list.bat3.plant) {
            console.log('ok');
            this.musique.destroy();
            this.scene.stop('tutoScene');
            this.scene.stop('headerScene');
            this.scene.stop('menuScene');
            this.scene.start('mapScene');
        }
        else {
            console.log('not ok');
        }
        //console.log(this.data.list);
        //console.log(this.player.x);
        //console.log(this.player.y);
        //console.log("");
        var This = this;
        if (!this.introContext) {
            this.introContext = true;
            This.dialBox = this.add.graphics();
            This.dialBox.fillStyle(0x70402a, 1);
            This.dialBox.fillRect(80, window.innerHeight - 75, window.innerWidth, 150);
            This.dialBox.setScrollFactor(0);
            This.seedi = this.add.sprite(230, 400, 'seedySlt').setScale(0.2);
            This.seedi.setScrollFactor(0);
            This.seedi.setOrigin(0, 0);
            var content = [
                "Nous voici arrivés",
                "comme tu peux le voir en haut de l'écran tu as 3 jauges,",
                "elles réprésentent le bien être animal, l'écologie, et la production de nourriture",
                "ton objectif est de remplir au maximum les 3 barres",
                "afin de représenter au mieux la ferme du futur.",
                "Maintenant je vais te présenter ma ferme",
                ""
            ];
            This.text0 = this.make.text({
                x: 300,
                y: 525,
                text: 'Seedy :',
            });
            This.text0.setTint(0xff0000);
            This.text1 = this.make.text({
                x: 300,
                y: 550,
                text: '',
                font: '64px Arial'
            });
            This.text2 = this.make.text({
                x: 300,
                y: 575,
                text: '',
                font: '128px Arial'
            });
            This.text0.setScrollFactor(0);
            This.text1.setScrollFactor(0);
            This.text2.setScrollFactor(0);
            var txt = 0;
            var tmp = '';
            var i = 0;
            var j = 0;
            var wait = 50;
            var bool = false;
            function loop() {
                setTimeout(function () {
                    wait = 50;
                    if (bool) {
                        This.text0.setText(content[i]);
                        This.text1.setText('');
                        This.text2.setText('');
                        if (i + 1 < content.length) i++;
                        bool = false;
                    }
                    tmp += content[i][j];
                    if (txt % 2 == 0) {
                        This.text1.setText(tmp);
                        This.text2.setText('');
                    }
                    else {
                        This.text2.setText(tmp);
                    }

                    j++;
                    if (j == content[i].length) {
                        j = 0;
                        txt += 1;
                        txt = txt % 2;
                        i++;
                        wait = 1000;
                        if (i < content.length && content[i].length == 0) {
                            i++;
                            wait = 1000;
                            txt = 0;
                            bool = true;
                        }
                        tmp = '';
                    }
                    if (i < content.length) {
                        // console.log(wait)
                        loop();
                    }
                    else {
                        setTimeout(function () {
                            This.introCow = true;
                        }, 1000);
                    }
                }, wait)
            }
            loop();
        }

        if (this.introCow) {
            This.dialBox.destroy();
            This.text0.destroy();
            This.text1.destroy();
            This.text2.destroy();
            This.seedi.destroy();
            if (this.player.y < 160)
                this.player.y += 3;
            else if (this.player.x >= 310) {
                this.player.anims.play('left', true);
                this.player.x -= 3;
            }
            else {
                this.player.anims.play('up', true);
                this.introCow = false;
            }
            if (!this.introCow) {
                This.dialBox = this.add.graphics();
                This.dialBox.fillStyle(0x70402a, 1);
                This.dialBox.fillRect(80, window.innerHeight - 75, window.innerWidth, 150);
                This.dialBox.setScrollFactor(0);
                This.seedi = this.add.sprite(230, 400, 'seedySlt').setScale(0.2);
                This.seedi.setScrollFactor(0);
                This.seedi.setOrigin(0, 0);
                var content = [
                    "ici se trouve un batiment d'élevage, tu peux élever différents animaux, mais fais bien atttention",
                    "à ne pas élever des animaux qui ne sont pas adaptés au climat de la ferme",
                    "tu peux améliorer le batiment en appuyant sur le premier bouton du menu",
                    "ou en appuyant sur la touche 'A' de ton clavier ",
                    "",
                ];
                This.text0 = this.make.text({
                    x: 300,
                    y: 525,
                    text: 'Seedy :',
                });
                This.text0.setTint(0xff0000);
                This.text1 = this.make.text({
                    x: 300,
                    y: 550,
                    text: '',
                });
                This.text2 = this.make.text({
                    x: 300,
                    y: 575,
                    text: '',
                });
                This.text0.setScrollFactor(0);
                This.text1.setScrollFactor(0);
                This.text2.setScrollFactor(0);
                var txt = 0;
                var tmp = '';
                var i = 0;
                var j = 0;
                var wait = 50;
                var bool = false;
                function loop() {
                    setTimeout(function () {
                        wait = 50;
                        if (bool) {
                            This.text0.setText(content[i]);
                            This.text1.setText('');
                            This.text2.setText('');
                            if (i + 1 < content.length) i++;
                            bool = false;
                        }
                        tmp += content[i][j];
                        if (txt % 2 == 0) {
                            This.text1.setText(tmp);
                            This.text2.setText('');
                        }
                        else {
                            This.text2.setText(tmp);
                        }

                        j++;
                        if (j == content[i].length) {
                            j = 0;
                            txt += 1;
                            txt = txt % 2;
                            i++;
                            wait = 1000;
                            if (i < content.length && content[i].length == 0) {
                                i++;
                                wait = 1000;
                                txt = 0;
                                bool = true;
                            }
                            tmp = '';
                        }
                        if (i < content.length) {
                            // console.log(wait)
                            loop();
                        }
                        else {
                            setTimeout(function () {
                                This.introBat = true;
                            }, 1000);
                        }
                    }, wait)
                }
                loop();
            }
        }
        if (this.introBat && this.data.list.bat1.level == 2) {
            This.dialBox.destroy();
            This.text0.destroy();
            This.text1.destroy();
            This.text2.destroy();
            This.seedi.destroy();
            if (this.player.x < 420 && this.player.y > -80) {
                this.player.x += 3;
                this.player.anims.play('right', true);
            }
            else if (this.player.y > -110) {
                this.player.y -= 3;
                this.player.anims.play('up', true);
            }

            else if (this.player.x > -30) {
                this.player.x -= 3;
                this.player.anims.play('left', true);
            }
            else if (this.player.y > -150) {
                this.player.y -= 3;
            }
            else {
                this.introBat = false;
                this.player.anims.play('up', true);
                this.money += 40000;
            }

            if (!this.introBat) {
                This.dialBox = this.add.graphics();
                This.dialBox.fillStyle(0x70402a, 1);
                This.dialBox.fillRect(80, window.innerHeight - 75, window.innerWidth, 150);
                This.dialBox.setScrollFactor(0);
                This.seedi = this.add.sprite(230, 400, 'seedySlt').setScale(0.2);
                This.seedi.setScrollFactor(0);
                This.seedi.setOrigin(0, 0);
                var content = [
                    "ici se trouve une zone de construction de batiments,",
                    "ces bâtiments permettent de générer un revenu passif à ta ferme",
                    "contruits un réservoir à eau en appuyant sur le deuxième boutton",
                    ""
                ];
                This.text0 = this.make.text({
                    x: 300,
                    y: 525,
                    text: 'Seedy :',
                });
                This.text0.setTint(0xff0000);
                This.text1 = this.make.text({
                    x: 300,
                    y: 550,
                    text: '',
                });
                This.text2 = this.make.text({
                    x: 300,
                    y: 575,
                    text: '',
                });
                This.text0.setScrollFactor(0);
                This.text1.setScrollFactor(0);
                This.text2.setScrollFactor(0);
                var txt = 0;
                var tmp = '';
                var i = 0;
                var j = 0;
                var wait = 50;
                var bool = false;
                function loop() {
                    setTimeout(function () {
                        wait = 50;
                        if (bool) {
                            This.text0.setText(content[i]);
                            This.text1.setText('');
                            This.text2.setText('');
                            if (i + 1 < content.length) i++;
                            bool = false;
                        }
                        tmp += content[i][j];
                        if (txt % 2 == 0) {
                            This.text1.setText(tmp);
                            This.text2.setText('');
                        }
                        else {
                            This.text2.setText(tmp);
                        }

                        j++;
                        if (j == content[i].length) {
                            j = 0;
                            txt += 1;
                            txt = txt % 2;
                            i++;
                            wait = 1000;
                            if (i < content.length && content[i].length == 0) {
                                i++;
                                wait = 1000;
                                txt = 0;
                                bool = true;
                            }
                            tmp = '';
                        }
                        if (i < content.length) {
                            // console.log(wait)
                            loop();
                        }
                        else {
                            setTimeout(function () {
                                This.dialBox.destroy();
                                This.text0.destroy();
                                This.text1.destroy();
                                This.text2.destroy();
                                This.seedi.destroy();
                                This.introField = true;
                            }, 1000);
                        }
                    }, wait)
                }
                loop();
            }


        }

        if (this.introField && this.data.list.bat2.level == 1) {
            if (this.player.y < -110) {
                this.player.y += 3;
            }
            else if (this.player.x > -300) {
                this.player.x -= 3;
                this.player.anims.play('left', true);
            }
            else {
                this.player.anims.play('up', true);
                this.introField = false;
                this.money += 5000;
            }
            if (!this.introField) {
                This.dialBox = this.add.graphics();
                This.dialBox.fillStyle(0x70402a, 1);
                This.dialBox.fillRect(80, window.innerHeight - 75, window.innerWidth, 150);
                This.dialBox.setScrollFactor(0);
                This.seedi = this.add.sprite(230, 400, 'seedySlt').setScale(0.2);
                This.seedi.setScrollFactor(0);
                This.seedi.setOrigin(0, 0);
                var content = [
                    "ici se trouve un champ,",
                    "tu peux panter différents types de cultures, mais attention,",
                    "comme pour les bâtiments d'élevage, tu dois bien faire attention au climat",
                    "tu peux aussi replanter la culture précédante en appuyant sur la touche 'E' de ton clavier,",
                    " tu peux aussi récolter le champ en appuyant sur la touche",
                    "'Z' de ton clavier",
                    ""
                ];
                This.text0 = this.make.text({
                    x: 300,
                    y: 525,
                    text: 'Seedy :',
                });
                This.text0.setTint(0xff0000);
                This.text1 = this.make.text({
                    x: 300,
                    y: 550,
                    text: '',
                });
                This.text2 = this.make.text({
                    x: 300,
                    y: 575,
                    text: '',
                });
                This.text0.setScrollFactor(0);
                This.text1.setScrollFactor(0);
                This.text2.setScrollFactor(0);
                var txt = 0;
                var tmp = '';
                var i = 0;
                var j = 0;
                var wait = 50;
                var bool = false;
                function loop() {
                    setTimeout(function () {
                        wait = 50;
                        if (bool) {
                            This.text0.setText(content[i]);
                            This.text1.setText('');
                            This.text2.setText('');
                            if (i + 1 < content.length) i++;
                            bool = false;
                        }
                        tmp += content[i][j];
                        if (txt % 2 == 0) {
                            This.text1.setText(tmp);
                            This.text2.setText('');
                        }
                        else {
                            This.text2.setText(tmp);
                        }

                        j++;
                        if (j == content[i].length) {
                            j = 0;
                            txt += 1;
                            txt = txt % 2;
                            i++;
                            wait = 1000;
                            if (i < content.length && content[i].length == 0) {
                                i++;
                                wait = 1000;
                                txt = 0;
                                bool = true;
                            }
                            tmp = '';
                        }
                        if (i < content.length) {
                            // console.log(wait)
                            loop();
                        }
                        else {
                            setTimeout(function () {
                                This.dialBox.destroy();
                                This.text0.destroy();
                                This.text1.destroy();
                                This.text2.destroy();
                                This.seedi.destroy();
                                This.introM = true;
                            }, 1000);
                        }
                    }, wait)
                }
                loop();
            }
            if (this.introM) {
                if (this.player.x < 415) {
                    this.player.anims.play('right', true);
                    this.player.x += 3;
                }
                else if (this.player.y > -110) {
                    this.player.anims.play('up', true);
                    this.player.y -= 3;
                }
                else {
                    this.introM = false;

                }
                if (!this.introM) {
                    This.dialBox = this.add.graphics();
                    This.dialBox.fillStyle(0x70402a, 1);
                    This.dialBox.fillRect(80, window.innerHeight - 75, window.innerWidth, 150);
                    This.dialBox.setScrollFactor(0);
                    This.seedi = this.add.sprite(230, 400, 'seedySlt').setScale(0.2);
                    This.seedi.setScrollFactor(0);
                    This.seedi.setOrigin(0, 0);
                    var content = [
                        "ici se trouve un champ,",
                        "tu peux cultiver différents types de cultures, mais attention,",
                        "comme pour les batiments d'élevages, tu dois bien faire attention au climat",
                        ""
                    ];
                    This.text0 = this.make.text({
                        x: 300,
                        y: 525,
                        text: 'Seedy :',
                    });
                    This.text0.setTint(0xff0000);
                    This.text1 = this.make.text({
                        x: 300,
                        y: 550,
                        text: '',
                    });
                    This.text2 = this.make.text({
                        x: 300,
                        y: 575,
                        text: '',
                    });
                    This.text0.setScrollFactor(0);
                    This.text1.setScrollFactor(0);
                    This.text2.setScrollFactor(0);
                    var txt = 0;
                    var tmp = '';
                    var i = 0;
                    var j = 0;
                    var wait = 50;
                    var bool = false;
                    function loop() {
                        setTimeout(function () {
                            wait = 50;
                            if (bool) {
                                This.text0.setText(content[i]);
                                This.text1.setText('');
                                This.text2.setText('');
                                if (i + 1 < content.length) i++;
                                bool = false;
                            }
                            tmp += content[i][j];
                            if (txt % 2 == 0) {
                                This.text1.setText(tmp);
                                This.text2.setText('');
                            }
                            else {
                                This.text2.setText(tmp);
                            }
                            j++;
                            if (j == content[i].length) {
                                j = 0;
                                txt += 1;
                                txt = txt % 2;
                                i++;

                                if (i < content.length && content[i].length == 0) {
                                    i++;
                                    wait = 1000;
                                    txt = 0;
                                    bool = true;
                                }
                                tmp = '';
                            }
                            if (i < content.length) {
                                // console.log(wait)
                                loop();
                            }
                            else {
                                setTimeout(function () {
                                    This.dialBox.destroy();
                                    This.text0.destroy();
                                    This.text1.destroy();
                                    This.text2.destroy();
                                    This.seedi.destroy();
                                }, 1000);
                            }
                        }, wait)
                    }
                    loop();
                }
            }
            
        }



        this.timerWeeds++;
        if (this.timerWeeds == 1500) {
            console.log('Check weeds');
            this.weeds();
            this.timerWeeds = 0 - Phaser.Math.Between(0, 300);
        }

        this.timerGrowth++;
        if (this.timerGrowth == 500) {
            this.grow();
            this.timerGrowth = 0 - Phaser.Math.Between(0, 200);
        }

        this.timerDead++;
        if (this.timerDead == 300) {
            this.rotten();
            this.timerDead = 0;
        }

        if (this.timer % 60 == 0) {
            let moneyPerSec = 0;
            for (let i in this.data.values) {
                let bat = this.data.values[i];
                if (bat.level > 0 && bat.tag != 'build' && bat.type != 'field' && bat.type != 'animal') {
                    if (typeof bat.ref.money[bat.level] == "number") {
                        moneyPerSec += bat.ref.money[bat.level];
                    }
                }
            }
            this.money += moneyPerSec;
            this.registry.set('money', this.money);
            this.registry.set('moneyPerTick', moneyPerSec);
        }
        this.timer++;
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
                if (this.money >= bat.ref.upgrade[bat.level]) {
                    bat.level += 1;
                    this.money -= bat.ref.upgrade[bat.level];
                    console.log('Upgraded !', bat);
                    this.images[bat.key - 1].setFrame(bat.level - 1);
                    if (bat.type == 'animal') {
                        this.updateJauge('animalCare', 10 * bat.level)
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
            if (this.money >= ref.buildCost) {
                bat.level += 1;
                bat.tag = ref.tag;
                bat.ref = ref;
                this.money -= ref.buildCost;
                if (bat.type != 'field') {
                    console.log('Builded !', bat);
                    this.images[bat.key - 1] = this.physics.add.image(bat.x, bat.y, bat.tag, bat.level - 1);
                    if (bat.rotate) {
                        this.images[bat.key - 1].rotation = 3.141592 / 2;
                    }
                    if (bat.type == 'animal') {
                        this.updateJauge('animalCare', -40);
                    }
                }
                else {
                    this.images[bat.key - 1]['ground'] = this.physics.add.image(bat.x, bat.y, ref.tag, bat.level - 1);
                    this.images[bat.key - 1]['weeds'] = this.add.image(bat.x, bat.y, 'weeds', bat.weeds);
                    this.images[bat.key - 1]['plant'];
                    bat.ref = getByTag(bat.tag)[0];
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
            if (this.money >= seed.costPlant) {
                if (bat.tag == seed.ground) {
                    this.money -= seed.costPlant;
                    bat.plant = true;
                    bat.tag = seed.tag;
                    bat.seed = seed;
                    console.log('Planted !', bat);
                    this.images[bat.key - 1]['plant'] = this.physics.add.image(bat.x, bat.y, seed.tag, bat.grow);
                }
                else {
                    console.log('Can\'t plant riz on dirt or others on water');
                    this.menuScene.errorText('Can\'t plant riz on dirt or others on water');
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
    rotten() {
        for (let i in this.data.values) {
            let bat = this.data.values[i];
            if (bat.level == 1 && bat.type == 'field' && (bat.tag != 'labor' || bat.tag != 'water') && bat.plant && !bat.dead) {
                if (!bat.seed.climat.includes(this.climat)) {
                    bat.dead = true;
                    console.log('Dead plant !', bat);
                    this.images[bat.key - 1]['plant'].setFrame(bat.seed.maxGrow + 1);
                }
            }
        }
    }
    weeds() {
        for (let i in this.data.values) {
            let bat = this.data.values[i];
            if (bat.level == 1 && bat.type == 'field') {
                if (Phaser.Math.Between(1, 5) <= 2) {
                    bat.weeds++;
                    if (bat.weeds > bat.maxWeeds) bat.weeds = bat.maxWeeds;
                    console.log('Weeds !', bat);
                    this.images[bat.key - 1]['weeds'].setFrame(bat.weeds);
                }
            }
        }
    }
    clean(bat, lutte) {
        console.log('Nettoyage : ', bat);
        if (bat.type == 'field' && bat.level == 1 && bat.weeds > 0) {
            bat.weeds -= lutte.health;
            if (bat.weeds < 0) bat.weeds = 0;
            console.log('Fertilised !', bat);
            this.images[bat.key - 1]['weeds'].setFrame(bat.weeds);
            this.updateJauge('ecology', lutte.ecology);
        }
    }
    recolte(bat) {
        console.log('Recolte : ', bat);
        if (bat.type == 'field' && bat.plant && bat.level == 1 && (bat.tag != 'labor' || bat.tag != 'water') && (bat.grow == bat.seed.maxGrow || bat.dead)) {
            let percent = bat.fertility / 100;
            let moneyWin = bat.seed.money * percent;
            let hungerWin = 5 * percent;

            // Compte l'echainement des graines
            let nbOldSeed = 0;
            while (bat.seed == bat.oldseed[nbOldSeed]) {
                nbOldSeed++;
                bat.fertility -= 10 * nbOldSeed;
                if (bat.fertility < 0) bat.fertility = 0;
            }
            if (nbOldSeed == 0) {
                bat.fertility -= 5;
                if (bat.fertility < 0) bat.fertility = 0;
            }
            if (!bat.dead) {
                bat.plant = false;
                bat.oldseed.unshift(bat.seed);
                bat.tag = bat.seed.ground;
                bat.grow = 0;
                this.money += moneyWin;
                bat.seed = {};
                this.updateJauge('hunger', hungerWin);
                console.log('Recolté !', bat);
                this.images[bat.key - 1]['plant'].destroy();
                let textWin = this.add.text(bat.x, bat.y, '+' + moneyWin + '$\n+' + hungerWin, { lineSpacing: 10, fontSize: 40, color: '#ffffff', align: 'center' }).setOrigin(0.5, 0.5);
                setTimeout(() => {
                    textWin.destroy();
                }, 2000);
            }
            else {
                bat.plant = false;
                bat.oldseed.unshift(bat.seed);
                bat.tag = bat.seed.ground;
                bat.grow = 0;
                //this.money += bat.seed.money;
                bat.seed = {};
                bat.dead = false;
                this.updateJauge('hunger', -10);
                console.log('Nettoyé !', bat);
                this.images[bat.key - 1]['plant'].destroy();
            }
        }
    }
    fertility(bat, engrais) {
        console.log('Fertilisation : ', bat);
        if (bat.type == 'field' && !bat.plant && bat.level == 1 && (bat.tag == 'labor' || bat.tag == 'water') && bat.fertility < 100) {
            bat.fertility += engrais.fertility;
            if (bat.fertility > 100) bat.fertility = 100;
            console.log('Fertilised !', bat);
            this.updateJauge('ecology', engrais.ecology);
        }
    }

    updateJauge(jauge, value) {
        let result = this.registry.get(jauge) + value;
        if (result > 100) result = 100;
        if (result < 0) result = 0;
        this.registry.set(jauge, result);
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
//Cinematique
class Cinematique1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'cinematiqueScene1'
        });
    }

    preload() {

    }

    create() {
        this.background = this.add.image(window.innerWidth / 2, window.innerHeight / 2 + 100, 'bg')
        
        Phaser.Display.Align.In.Center(this.background, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));

        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
        for (var i = 0; i < 20; i++) {
            this.add.image(64 * i, 536, 'tiles', 1).setOrigin(0);
        }

        this.Mathieu = this.add.sprite(window.innerWidth / 4, 490, 'sellier', 9);

        this.anims.create({
            key: 'walkE',
            frames: this.anims.generateFrameNumbers('scient', { frames: [7, 6, 5, 4] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkL',
            frames: this.anims.generateFrameNumbers('sellier', { frames: [5, 4] }),
            frameRate: 10,
            repeat: -1
        });

        this.eddison = this.add.sprite(window.innerWidth + 64, 498).setScale(2);
        this.eddison.play('walkE');
        this.bool = false;
        this.nextS = false;
        this.walkE = true;
        this.walkS = false;

        this.input.keyboard.on('keydown_ESC', function(){
            this.scene.stop('cinematiqueScene1')
            this.scene.start('cinematiqueScene2');
        }, this);
    }

    update() {
        var This = this;

        if (this.walkE) this.eddison.x -= 5;

        if (this.eddison.x <= 480 && this.walkE) {
            this.eddison.destroy();
            this.eddison = this.add.sprite(480, 502, 'scient', 4).setScale(2);
            this.walkE = false;
            var dialBox = this.add.graphics();
            dialBox.fillRect(0, 0, window.innerWidth, 100);
            dialBox.fillStyle(0x70402a, 1);
            var content = [
                "Salutation, je suis Qu Dongyu, directeur générale de de L'Organisation des Nations unies pour l’alimentation et l’agriculture",
                "(ONUAA), et je suis à la recherche du meilleur agriculteur du milieu ",
                "",
                "Mosbert :",
                "Bonjour Qu Dongyu, vous l’avez sous vos yeux. Je suis Mosbert, le meilleur des agriculteurs, pourquoi me cherchez-vous ?",
                "",
                "Qu Dongyu :",
                "Le monde va mal Mosbert. D’après nos recherches faites en 2009, il aurait fallu augmenter de 70% la production ",
                "agricole de la planète pour répondre aux besoins alimentaires de tous ses habitants mais nous en sommes encore loin !",
                "",
                "Mosbert :",
                "C’est inquiétant en effet, comment faire pour aider l’ONUAA et le monde ?",
                "",
                "Qu Dongyu :",
                "Nous nous devons devons de créer la ferme du futur !",
                "",
                "Mosbert :",
                "La ferme du futur ?",
                "",
                "Qu Dongyu :",
                "Oui une ferme qui respecte 3 objectifs : Le respect de l’environnement, Le respect du bien - être animal,",
                "Ainsi que Nourrir tous les habitants de la planète",
                "",
                "Mosbert :",
                "Ceci est un projet ambitieux auquel je veux faire partie",
                "",
                "Qu Dongyu :",
                "Parfait, faites vos bagages, votre guide vous attends déjà sur place ! ",
                "",
            ];
            var text0 = this.make.text({
                x: 0,
                y: 0,
                text: 'Qu Dongyu :'
            });
            text0.setTint(0xff0000);
            var text1 = this.make.text({
                x: 0,
                y: 30,
                text: ''
            });
            var text2 = this.make.text({
                x: 0,
                y: 60,
                text: ''
            });
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
                        text0.setText(content[i]);
                        text1.setText('');
                        text2.setText('');
                        if (i + 1 < content.length) i++;
                        bool = false;
                    }
                    tmp += content[i][j];
                    if (txt % 2 == 0) {
                        text1.setText(tmp);
                        text2.setText('');
                    }
                    else {
                        text2.setText(tmp);
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
                        dialBox.destroy();
                        text0.destroy();
                        text1.destroy();
                        text2.destroy();
                        This.nextS = true;
                    }
                }, wait)
            }
            loop();
        }
        //console.log(This.nextS)
        //console.log(this.walkS)

        if (this.nextS && !this.walkS) {
            this.eddison = this.add.sprite(480, 502, 'scient', 0).setScale(2);
            this.Mathieu.play('walkL');
            this.Mathieu.y += 10;
            this.walkS = true;
        }
        if (this.Mathieu.frame.name == 5 && this.bool == true) {
            this.Mathieu.x -= 30;
            this.bool = false;
        }
        else if (this.Mathieu.frame.name == 4) {
            this.bool = true;
        }
        if (this.Mathieu.x <= 0) {
            this.scene.stop('cinematiqueScene1')
            this.scene.start('cinematiqueScene2');
        }
    }

}

//Cinematique
class Cinematique2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'cinematiqueScene2'
        });
    }

    preload() {

    }

    create() {
        this.background = this.add.image(window.innerWidth / 2, window.innerHeight / 2 + 100, 'bg')
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
        for (var i = 0; i < 20; i++) {
            this.add.image(64 * i, 536, 'tiles', 1).setOrigin(0);
        }
        this.seedi = this.add.sprite(200, 480, 'seedySlt', 2).setScale(0.4);//assigner a la variable differentes 
        this.anims.create({
            key: 'walkL',
            frames: this.anims.generateFrameNumbers('sellier', { frames: [5, 4] }),
            frameRate: 10,
            repeat: -1
        });
        this.Mathieu = this.add.sprite(window.innerWidth + 60, 500);
        this.Mathieu.play('walkL');
        this.bool = false;
        this.nextS = false;
        this.walk = true;

        this.input.keyboard.on('keydown_ESC', function(){
            var music = this.sound.add('farming', {
                mute: false,
                volume: 0.1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            });
            music.play();
            this.scene.stop('cinematiqueScene2')
            this.scene.start('mapScene');
        }, this);
    }

    update() {
        var This = this;
        if (this.Mathieu.frame.name == 5 && this.bool == true) {
            this.Mathieu.x -= 30;
            this.bool = false;

        }
        else if (this.Mathieu.frame.name == 4) {
            this.bool = true;
        }

        if (this.Mathieu.x <= 290 && !this.nextS) {
            this.walk = false;
            this.Mathieu.destroy();
            this.Mathieu = this.add.sprite(320, 500, 'sellier', 3);
            var dialBox = this.add.graphics();
            dialBox.fillRect(0, 0, window.innerWidth, 100);
            dialBox.fillStyle(0x70402a, 1);
            var content = [
                "Salut ! Je m’appelle Seedy, celle qui détient toutes les connaissances nécessaires à la création de la ferme du futur. Je serais donc ta guide !",
                "",
                "Mosbert :",
                "Enchanté de faire ta connaissance Seedy, moi c’est Mosbert, Qu Donyu m’avait parler de toi",
                "",
                "Seedy :",
                "Parfait ! Maintenant que les présentations sont faites, suis-moi, nous allons débuter ton entrainement ! ",
                "",
            ];
            var text0 = this.make.text({
                x: 0,
                y: 0,
                text: 'Seedy :'
            });
            text0.setTint(0xff0000);
            var text1 = this.make.text({
                x: 0,
                y: 30,
                text: ''
            });
            var text2 = this.make.text({
                x: 0,
                y: 60,
                text: ''
            });
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
                        text0.setText(content[i]);
                        text1.setText('');
                        text2.setText('');
                        if (i + 1 < content.length) i++;
                        bool = false;
                    }
                    tmp += content[i][j];
                    if (txt % 2 == 0) {
                        text1.setText(tmp);
                        text2.setText('');
                    }
                    else {
                        text2.setText(tmp);
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
                        dialBox.destroy();
                        text0.destroy();
                        text1.destroy();
                        text2.destroy();
                        This.nextS = true;
                    }
                }, wait)
            }
            loop();


        }

        if (this.nextS && !this.walk) {
            var music = this.sound.add('farming', {
                mute: false,
                volume: 0.1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            });
            music.play();
            this.scene.stop('cinematiqueScene2')
            this.scene.start('mapScene');
        }

    }

}

//Cinematique
class Cinematique1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'cinematiqueScene1'
        });
        this.musique;
    }

    preload() {

    }

    create() {
        this.musique = this.sound.add('cinematique_musique', {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        this.musique.play();
        /*this.background = this.add.image(window.innerWidth / 2, window.innerHeight / 2 + 100, 'bg')
        
        Phaser.Display.Align.In.Center(this.background, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));

        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
        for (var i = 0; i < 20; i++) {
            this.add.image(64 * i, 536, 'tiles', 1).setOrigin(0);
        }*/

        this.background = this.add.image(0, 0, 'mapmonde').setScale(1.5);
        Phaser.Display.Align.In.Center(this.background, this.add.zone(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight));


        this.Mathieu = this.add.sprite(window.innerWidth / 2 - 100, window.innerHeight - 105/2, 'sellier', 9);

        this.anims.create({
            key: 'walkE1',
            frames: this.anims.generateFrameNumbers('scient', { frames: [7, 6, 5, 4] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkL1',
            frames: this.anims.generateFrameNumbers('sellier', { frames: [5, 4] }),
            frameRate: 10,
            repeat: -1
        });

        this.eddison = this.add.sprite(window.innerWidth + 64, window.innerHeight - 42).setScale(2);
        this.eddison.play('walkE1');
        this.bool = false;
        this.nextS = false;
        this.walkE = true;
        this.walkS = false;

        this.input.keyboard.on('keydown_ESC', function () {
            this.scene.stop('cinematiqueScene1')
            this.scene.start('cinematiqueScene2', { esc: true });
        }, this);
    }

    update(time, delta) {
        this.background.x -= 0.02 * delta;
        this.background.y += 0.015 * delta;

        if (this.background.y >= 630) {
            this.background.setPosition(1150, -190);
        }

        var This = this;

        if (this.walkE) this.eddison.x -= 5;

        if (this.eddison.x <= this.Mathieu.x + 200 && this.walkE) {
            this.eddison.destroy();
            this.eddison = this.add.sprite(this.Mathieu.x + 200, window.innerHeight - 42, 'scient', 4).setScale(2);
            this.walkE = false;
            var dialBox = this.add.graphics();
            dialBox.fillStyle(0x70402a, 1);
            dialBox.fillRect(0, 0, window.innerWidth, 130);
            var content = [
                /*"Bonjour "+namePlayer+", je suis Chênebleu, directeur général de l'Organisation des Nations Unies pour l’alimentation et l’agriculture",
                "J'ai besoin de ton aide pour une mission très importante.",
                "",
                ""+namePlayer+"",
                "Quelle est donc cette mission ?",
                "",
                "Chênebleu",
                "L'agriculture d'aujourd'hui va mal, il faut nourrir de plus en plus de monde et nos méthodes sont dépassées.",
                "J'ai besoin de toi pour produire plus de ressources agricoles et nourrir le monde.",
                "",
                ""+namePlayer+"",
                "J'accepte cette mission, mais nous devons aussi faire attention à l'écologie.",
                "La planète va mal et nous devons en même temps développer une ferme durable et penser aux générations futures.",
                "",
                "Chênebleu",
                "C'est vrai, tu as raison, nous devons aussi préserver la planète et tous ses écosystèmes.",
                "",
                ""+namePlayer+"",
                "Ainsi que le bien-être animal !",
                "",
                "Chênebleu",
                "Je vois que tu as bien compris les enjeux de ta mission,",
                "je t'envoie partout dans le monde pour aider toutes les populations à développer leur ferme du futur.",
                "Commence par l'Europe pour te faire la main et réaliser de nombreuses recherches qui te serviront ailleurs dans le monde.",
                "Va rejoindre Seedy qui sera ta guide dans cette aventure.",
                "",*/
                "Bonjour "+namePlayer+", je suis Chênebleu, directeur général de l'Organisation des Nations Unies pour l’alimentation et l’agriculture.",
                "L'agriculture d'aujourd'hui va mal, il faut nourrir de plus en plus de monde et nos méthodes sont dépassées.",
                "J'ai besoin de ton aide pour produire plus de ressources agricoles et nourrir le monde.",
                "",
                ""+namePlayer+"",
                "J'accepte cette mission, mais nous devons aussi faire attention à l'écologie.",
                "Il faut développer une agriculture durable en pensant aux générations futures.",
                "De même le bien-être animal est un sujet important et bien trop souvent négligé.",
                "",
                "Chênebleu",
                "Je vois que tu as bien compris les enjeux de ta mission,",
                "je t'envoie partout dans le monde pour aider toutes les populations à développer leur ferme du futur.",
                "Commence par l'Europe pour te faire la main et réaliser de nombreuses recherches qui te serviront ailleurs dans le monde.",
                "Va rejoindre Seedy qui sera ta guide dans cette aventure.",
                "",
            ];
            var text0 = this.make.text({
                x: 10,
                y: 10,
                text: 'Chênebleu :',
                style: {
                    font: '25px MC',
                    fill: '#ffffff'
                }
            });
            text0.setTint(0x0080ff );
            var text1 = this.make.text({
                x: 10,
                y: 50,
                text: '',
                style: {
                    font: '18px MC',
                    fill: '#ffffff'
                }
            });
            var text2 = this.make.text({
                x: 10,
                y: 90,
                text: '',
                style: {
                    font: '18px MC',
                    fill: '#ffffff'
                }
            });
            var txt = 0;
            var tmp = '';
            var i = 0;
            var j = 0;
            var wait = 70;
            var bool = false;
            function loop() {
                setTimeout(function () {
                    wait = 70;
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
                            wait = 1500;
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
                        setTimeout(function(){
                            dialBox.destroy();
                            text0.destroy();
                            text1.destroy();
                            text2.destroy();
                            This.nextS = true;
                        },2500)
                    }
                }, wait)
            }
            loop();
        }
        //console.log(This.nextS)
        //console.log(this.walkS)

        if (this.nextS && !this.walkS) {
            this.eddison = this.add.sprite(this.Mathieu.x + 200, window.innerHeight - 42, 'scient', 0).setScale(2);
            this.Mathieu.play('walkL1');
            this.Mathieu.y += 10;
            this.walkS = true;
        }
        if (this.Mathieu.frame.name == 5 && this.bool == true) {
            this.Mathieu.x -= 40;
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

    init(data) {
        this.esc = data.esc;
    }

    preload() {

    }

    create() {
        if (this.esc) {
            this.scene.stop('cinematiqueScene2')
            this.scene.start('disclaimerScene', { esc: true });
        }

        this.background = this.add.image(0, 0, 'mapmonde').setScale(1.5);
        Phaser.Display.Align.In.Center(this.background, this.add.zone(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight));


        // Taille 531x398 => 106.2x
        this.seedi = this.add.image(window.innerWidth/2 - 100, window.innerHeight - 106.2/2, 'seedySlt').setScale(0.2);//assigner a la variable differentes 
        this.anims.create({
            key: 'walkL2',
            frames: this.anims.generateFrameNumbers('sellier', { frames: [5, 4] }),
            frameRate: 10,
            repeat: -1
        });
        this.Mathieu = this.add.sprite(window.innerWidth + 60, window.innerHeight - 100/2);
        this.Mathieu.play('walkL2');
        this.bool = false;
        this.nextS = false;
        this.walk = true;

        this.input.keyboard.on('keydown_ESC', function () {
            this.scene.stop('cinematiqueScene2')
            this.scene.start('disclaimerScene');
        }, this);
    }

    update(time, delta) {
        this.background.x -= 0.02 * delta;
        this.background.y += 0.015 * delta;

        if (this.background.y >= 630) {
            this.background.setPosition(1150, -190);
        }



        var This = this;
        if (this.Mathieu.frame.name == 5 && this.bool == true) {
            this.Mathieu.x -= 40;
            this.bool = false;

        }
        else if (this.Mathieu.frame.name == 4) {
            this.bool = true;
        }

        if (this.Mathieu.x <= this.seedi.x + 200 && !this.nextS && this.walk) {
            this.walk = false;
            this.Mathieu.destroy();
            this.Mathieu = this.add.sprite(this.seedi.x + 200, window.innerHeight - 100/2, 'sellier', 3);
            var dialBox = this.add.graphics();
            dialBox.fillStyle(0x70402a, 1);
            dialBox.fillRect(0, 0, window.innerWidth, 130);
            var content = [
                /*"Salut moi c'est Seedy ! Je serai ta guide dans cette nouvelle aventure !",
                "",
                ""+namePlayer+"",
                "Enchanté de faire ta connaissance Seedy, moi c’est "+namePlayer+".",
                "",
                "Seedy :",
                "Parfait ! Maintenant que les présentations sont faites, suis-moi, nous allons débuter ta formation !",
                "",*/
                "Salut, moi c'est Seedy ! Je serai ta guide tout au long de ton parcours !",
                "Suis-moi, nous allons débuter ta formation !",
                "",
            ];
            var text0 = this.make.text({
                x: 10,
                y: 10,
                text: 'Seedy :',
                style: {
                    font: '25px MC',
                    fill: '#ffffff'
                }
            });
            text0.setTint(0x0080ff);
            var text1 = this.make.text({
                x: 10,
                y: 50,
                text: '',
                style: {
                    font: '18px MC',
                    fill: '#ffffff'
                }
            });
            var text2 = this.make.text({
                x: 10,
                y: 90,
                text: '',
                style: {
                    font: '18px MC',
                    fill: '#ffffff'
                }
            });
            var txt = 0;
            var tmp = '';
            var i = 0;
            var j = 0;
            var wait = 70;
            var bool = false;
            function loop() {
                setTimeout(function () {
                    wait = 70;
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
                            wait = 1500;
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
                            dialBox.destroy();
                            text0.destroy();
                            text1.destroy();
                            text2.destroy();
                            This.scene.start('disclaimerScene');
                        }, 2500);
                    }
                }, wait)
            }
            loop();
        }

       

    }

}

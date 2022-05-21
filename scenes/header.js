class Header extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'headerScene' });
        this.turnOff;
        this.globe;
        this.search;
        this.moneyText;
        this.batOverlap;
        this.mute;

        this.gameScene;
    }

    create ()
    {
        this.gameScene = this.scene.get(this.registry.get('gameScene')+'Scene');

        this.add.image(0, 0, 'header').setOrigin(0,0.5);
        
        this.turnOff = this.add.image(window.innerWidth-25, 25, 'off').setInteractive().setScale(0.08);
        this.globe = this.add.image(window.innerWidth-75, 25, 'globe').setInteractive().setScale(0.08);
        this.search = this.add.image(window.innerWidth-125, 25, 'search').setInteractive().setScale(0.08);

        this.turnOff.on('pointerup', function() {
            if(this.registry.get('gameScene') != 'tuto') {
                //window.location.href = 'profil.php';
                let registryData = '';
                //this.registry.values.forEach(value => registryData += value);
                console.log(this.registry.values);
                for(let i in this.registry.values) {
                    console.log(i, this.registry.values[i]);
                    console.log(typeof this.registry.values[i]);
                    if(typeof this.registry.values[i] == 'object') {
                        registryData+=i+'=';
                        for(let j in this.registry.values[i]) {
                            console.log(j, this.registry.values[i][j]);
                            if(j != 'children') {
                                registryData+=j+'='+this.registry.values[i][j]+','
                            }
                        }
                        registryData+='&';
                    }
                    else {
                        if(i != 'gameScene' && i != 'moneyPerTick' && i != 'mult' && i != 'climat') {
                            registryData+=i+'='+this.registry.values[i]+'&';
                        }
                    }

                    
                }
                console.log(registryData);
                
                let gameData = '';
                for(let i in this.registry.get('unlock')) {
                    console.log(i, this.registry.get('unlock')[i])
                    gameData+=this.registry.get('unlock')[i]+'='
                    for(let j in this.scene.get(this.registry.get('unlock')[i]+'Scene').data.values) {
                        console.log(j, this.scene.get(this.registry.get('unlock')[i]+'Scene').data.values[j]);
                        gameData+=j+'='
                        for(let k in this.scene.get(this.registry.get('unlock')[i]+'Scene').data.values[j]) {
                            console.log(k, this.scene.get(this.registry.get('unlock')[i]+'Scene').data.values[j][k]);
                            if(k == 'ref') {
                                gameData+=k+'='+this.scene.get(this.registry.get('unlock')[i]+'Scene').data.values[j][k].tag+',';
                            }
                            else if(k == 'ref') {
                                gameData+=k+'='+this.scene.get(this.registry.get('unlock')[i]+'Scene').data.values[j][k].tag+',';
                            }
                            else {
                                gameData+=k+'='+this.scene.get(this.registry.get('unlock')[i]+'Scene').data.values[j][k]+',';
                            }
                        }
                        gameData+='|';
                    }
                    gameData+=i+'&'
                }
                


                window.location.href = 'config/save.php?'+registryData+gameData;
            }
        }, this);

        this.globe.on('pointerup', function() {
            if(this.registry.get('gameScene') != 'tuto') {
                this.scene.sleep(this.registry.get('gameScene')+'Scene');
                this.scene.stop('headerScene');
                this.scene.stop('menuScene');
                this.scene.start('mapScene');
                this.gameScene.musique.stop();
            }
        }, this);

        this.search.on('pointerup', function() {
            //Update game same but no render
            if(this.registry.get('gameScene') != 'tuto') {
                this.scene.setVisible(false, this.registry.get('gameScene')+'Scene');
                this.scene.stop('headerScene');
                this.scene.stop('menuScene');
                this.scene.start('searchScene');
            }
        }, this);

        // Money 
        //521px *0.05 => 25px
        this.add.image(315, 18, 'dollar').setScale(0.05);
        this.moneyText = this.add.text(330, 18, '0', { fontSize:20, fontFamily:'MC' }).setOrigin(0,0.5);
        this.winText = this.add.text(338, 35, '0', { fontSize:12, fontFamily:'MC' }).setOrigin(0,0.5);
        this.moneyPerTickText = this.add.text(410, 15, '0', { fontSize:15, fontFamily:'MC' }).setOrigin(0,0.5);
        this.multText = this.add.text(410, 35, '0', { fontSize:15, fontFamily:'MC' }).setOrigin(0,0.5);
        this.climat = this.add.text(310, 65, 'Climat : '+getByTag(this.gameScene.climat)[0].name, { fontSize:18, fontFamily:'MC', color:'#dbdbdb' }).setOrigin(0,0.5);


        // Barre de progressions
        var progressBox1 = this.add.graphics();
        var progressBar1 = this.add.graphics();
        var progressBox2 = this.add.graphics();
        var progressBar2 = this.add.graphics();
        var progressBox3 = this.add.graphics();
        var progressBar3 = this.add.graphics();
        progressBox1.fillStyle(0xffffff, 0.2);
        progressBox2.fillStyle(0xffffff, 0.2);
        progressBox3.fillStyle(0xffffff, 0.2);


        //width of bar
        var widthBar = 140;
        var heightBar = 30;
        //coords of bars
        var w1 = 530;
        var h1 = 10;
        var w3 = window.innerWidth - 170 - widthBar;
        var h3 = 10;
        var w2 = (w3 + w1)/2;
        var h2 = 10;
        progressBox1.fillRect(w1, h1, widthBar, heightBar);
        progressBox2.fillRect(w2, h2, widthBar, heightBar);
        progressBox3.fillRect(w3, h3, widthBar, heightBar);

        var percentText1 = this.make.text({
            x: w1 + widthBar/2,
            y: h1 + 15,
            text: '',
            style: {
                font: '18px MC',
                fill: '#ffffff'
            }
        });
        percentText1.setOrigin(0.5, 0.5);

        var percentText2 = this.make.text({
            x: w2 + widthBar/2,
            y: h2 + 15,
            text: '',
            style: {
                font: '18px MC',
                fill: '#ffffff'
            }
        });
        percentText2.setOrigin(0.5, 0.5);

        var percentText3 = this.make.text({
            x: w3 + widthBar/2,
            y: h3 + 15,
            text: '',
            style: {
                font: '18px MC',
                fill: '#ffffff'
            }
        });
        percentText3.setOrigin(0.5, 0.5);

        //Icones des jauges Images de 512x512 à 0.08 => 41x41
        this.add.image(w1 - 25, 25, 'animal-care').setScale(0.08);
        this.add.image(w2 - 25, 25, 'ecology-care').setScale(0.08);
        this.add.image(w3 - 25, 25, 'hunger-care').setScale(0.08);


        //  Check the Registry and hit our callback every time the 'money' value is updated
        this.registry.events.on('changedata', function(){
            this.moneyText.setText(this.registry.get('money'));
            let win = this.registry.get('moneyPerTick')*this.registry.get('mult')
            this.winText.setText('+ '+win);
            this.moneyPerTickText.setText(this.registry.get('moneyPerTick')+'/s');
            this.multText.setText('x '+this.registry.get('mult'));
            percentText1.setText(this.registry.get('animalCare'+this.registry.get('gameScene'))+'%');
            percentText2.setText(this.registry.get('ecology'+this.registry.get('gameScene'))+'%');
            percentText3.setText(this.registry.get('hunger'+this.registry.get('gameScene'))+'%');
            progressBar1.clear();
            progressBar1.fillStyle(0x0080ff, 1);
            progressBar1.fillRect(w1, h1, widthBar*(this.registry.get('animalCare'+this.registry.get('gameScene'))/100), heightBar);
            progressBar2.clear();
            progressBar2.fillStyle(0x01D758, 1);
            progressBar2.fillRect(w2, h2, widthBar*(this.registry.get('ecology'+this.registry.get('gameScene'))/100), heightBar);
            progressBar3.clear();
            progressBar3.fillStyle(0xffc0cb, 1);
            progressBar3.fillRect(w3, h3, widthBar*(this.registry.get('hunger'+this.registry.get('gameScene'))/100), heightBar);
        }, this);


        this.mute = this.add.image(window.innerWidth-25, 75, 'mute').setInteractive().setScale(0.08);
        this.sound = this.add.image(window.innerWidth-25, 75, 'sound').setInteractive().setScale(0.08).setVisible(false);
        this.mute.on('pointerdown', function(){
            //this.mute.setFrame((this.mute.frame + 1)%2);
            this.mute.visible = !this.mute.visible;
            this.sound.visible = !this.sound.visible;
            this.gameScene.musique.mute = !this.gameScene.musique.mute;
        }, this);
        this.sound.on('pointerdown', function(){
            //this.mute.setFrame((this.mute.frame + 1)%2);
            this.mute.visible = !this.mute.visible;
            this.sound.visible = !this.sound.visible;
            this.gameScene.musique.mute = !this.gameScene.musique.mute;
        }, this);
    }

    update() {

        
    }

    /*displayButton(bat){
        let button = this.add.image(500, 20, 'off').setInteractive();
        button.on('pointerdown', function(){
            this.gameScene.upgradeBat(bat);
        }, this)
    }*/

}
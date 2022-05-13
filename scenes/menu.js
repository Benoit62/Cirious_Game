class Menu extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'menuScene' });
        this.europeScene;

        this.upgrade;
        this.build;
        this.planter;
        this.recolter;
        this.feed;
        this.search;

        this.animals = [];
        this.plants = [];
        this.fields = [];
        this.structs = [];

        this.circleBuild;
        this.circlePlanter;
        this.circleUpgrade;

        this.batOverlap = {
            key:0,
            x:0,
            y:0,
            type:'',
            level:0,
            name:'',
            scale:0,
            money:0,
            plant:'',
        };


        this.textBat;
        this.textInfo;
        this.cardInfo;

        this.plus;
        this.backGroundPopup;
        this.plusText;
    }

    create ()
    {
        this.scene.bringToTop('menuScene');
        //this.scene.setVisible(false);
        this.europeScene = this.scene.get('europeScene');

        this.add.image(150, 1500, 'menu');

        this.textBat = this.add.text(8, 350, '', { lineSpacing:7, wordWrap: { width: 284 } });
        
        this.cardInfo = this.add.image(148, 290, 'card').setScale(0.35).setVisible(false);
        this.textInfo = this.add.text(14, 260, '', { lineSpacing:7, wordWrap: { width: 284 }, fontSize:15, color:'#000000' });


        //En savoir plus
        //Bouton de largeur 146, hauteur 96
        this.plus = this.add.image(150, innerHeight - 50, 'savoirPlus').setInteractive().setVisible(false);
        this.plus.on('pointerdown', this.savoirPlus, this);

        this.backGroundPopup = this.add.graphics();
        this.backGroundPopup.fillStyle(0x70402a, 1);
        this.backGroundPopup.fillRoundedRect(window.innerWidth/2 - 350 + 150, window.innerHeight/2 - 200 + 25, 700, 400, 20);
        this.backGroundPopup.lineStyle(3, 0xffffff, 1);
        this.backGroundPopup.strokeRoundedRect(window.innerWidth/2 - 350 + 150, window.innerHeight/2 - 200 + 25, 700, 400, 20);
        this.plusText = this.add.text(window.innerWidth/2 - 350 + 150 + 20,  window.innerHeight/2 - 200 + 25 + 30, '', { lineSpacing:9, wordWrap: { width: 700 - 40 }, fontSize:17, color:'#ffffff' });
        this.backGroundPopup.setVisible(false);
        this.plusText.setVisible(false);


        // Bouton (512x512) en scale 0.1 (51.2x51.2) + 55 a chaque fois
        // Bouton (512x512) en scale 0.08 (40.96x40.96) + 45 a chaque fois

        let compt = 0;
        // Création des boutons Animaux
        let j = 0;
        for(let i of getByType('animal')) {
            this.animals[i.tag] = this.add.image(35 +(j%5)*60, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false)/*.setVisible(false)*/;
            this.animals[i.tag].on('pointerdown', function(){
                if(this.batOverlap.type == 'animal' && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                    this.europeScene.buildBat(this.batOverlap, i);
                    for(let i of getByType('animal')) {
                        this.animals[i.tag].setVisible(false);
                    }
                }
            }, this);
            this.animals[i.tag].on('pointermove', function(){
                this.cardInfo.setVisible(true);
                this.textInfo.setText('Animal : '+i.name+'\nPrix : '+i.buildCost);
            }, this);
            this.animals[i.tag].on('pointerout', function(){
                this.cardInfo.setVisible(false);
                this.textInfo.setText('');
            }, this);
            j++;
            if(j%5==0)compt++;
        }


        // Création des boutons Plantes
        compt=0;
        let k = 0;
        for(let i of getByType('plant')) {
            this.plants[i.tag] = this.add.image(32 +(k%5)*55, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false)/*.setVisible(false)*/;
            this.plants[i.tag].on('pointerdown', function(){
                if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 1 && (this.batOverlap.tag == 'labor' || this.batOverlap.tag == 'water')) {
                    this.europeScene.plant(this.batOverlap, i);
                    for(let i of getByType('plant')) {
                        this.plants[i.tag].setVisible(false);
                    }
                }
            }, this);
            this.plants[i.tag].on('pointermove', function(){
                this.cardInfo.setVisible(true);
                let climats = '';
                for(let clm in i.climat) {
                    climats+=getByTag(i.climat[clm])[0].name+' ';
                }
                this.textInfo.setText('Culture : '+i.name+'\nPrix : '+i.costPlant+'\nClimats : '+climats);
            }, this);
            this.plants[i.tag].on('pointerout', function(){
                this.cardInfo.setVisible(false);
                this.textInfo.setText('');
            }, this);
            k++;
            if(k%5==0)compt++;
        }


        // Création des boutons Construction champ
        compt=0;
        let l = 0;
        for(let i of getByType('field')) {
            this.fields[i.tag] = this.add.image(40 +(l%5)*60, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false)/*.setVisible(false)*/;
            this.fields[i.tag].on('pointerdown', function(){
                if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                    this.europeScene.buildBat(this.batOverlap, i);
                    for(let i of getByType('field')) {
                        this.fields[i.tag].setVisible(false);
                    }
                }
            }, this);
            this.fields[i.tag].on('pointermove', function(){
                this.cardInfo.setVisible(true);
                this.textInfo.setText('Sol : '+i.name+'\nPrix : '+i.buildCost);
            }, this);
            this.fields[i.tag].on('pointerout', function(){
                this.cardInfo.setVisible(false);
                this.textInfo.setText('');
            }, this);
            l++;
            if(l%5==0)compt++;
        }


        // Création des boutons Structures
        compt=0;
        let m = 0;
        for(let i of getByType('struct')) {
            this.structs[i.tag] = this.add.image(40 +(m%5)*60, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false)/*.setVisible(false)*/;
            this.structs[i.tag].on('pointerdown', function(){
                if(this.batOverlap.type == 'struct' && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                    this.europeScene.buildBat(this.batOverlap, i);
                    for(let i of getByType('struct')) {
                        this.structs[i.tag].setVisible(false);
                    }
                }
            }, this);
            this.structs[i.tag].on('pointermove', function(){
                this.cardInfo.setVisible(true);
                this.textInfo.setText('Batiment : '+i.name+'\nPrix : '+i.buildCost);
            }, this);
            this.structs[i.tag].on('pointerout', function(){
                this.cardInfo.setVisible(false);
                this.textInfo.setText('');
            }, this);
            m++;
            if(m%5==0)compt++;
        }

         
        // Bouton upgrade
        this.upgrade = this.add.image(50, 35, "upgrade").setScale(0.1).setInteractive();
        this.upgrade.on('pointerdown', function(){
            if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'house') && this.batOverlap.level < this.batOverlap.ref.lvlMax && this.batOverlap.level != 0) {
                this.europeScene.upgradeBat(this.batOverlap);
            }
        }, this);
        
        this.upgrade.on('pointermove', function(){
            if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'house') && this.batOverlap.level < this.batOverlap.ref.lvlMax && this.batOverlap.level != 0) {
                this.cardInfo.setVisible(true);
                this.textInfo.setText('Prix : '+this.batOverlap.ref.upgrade[this.batOverlap.level+1]);
            }
        }, this);
        this.upgrade.on('pointerout', function(){
            this.cardInfo.setVisible(false);
            this.textInfo.setText('');
        }, this);
        
        
        this.input.keyboard.on('keydown_A', function(){
            if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'house') && this.batOverlap.level < this.batOverlap.ref.lvlMax && this.batOverlap.level != 0) {
                this.europeScene.upgradeBat(this.batOverlap);
            }
        }, this);

        
        // Bouton construction
        this.build = this.add.image(115, 35, "builder").setScale(0.1).setInteractive();
        this.build.on('pointerdown', function(){
            if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'field') && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                if(this.batOverlap.type == 'animal') {
                    for(let i of getByType('animal')) {
                        this.animals[i.tag].setVisible(true);
                    }
                }
                if(this.batOverlap.type == 'field' && !this.batOverlap.plant) {
                    for(let i of getByType('field')) {
                        this.fields[i.tag].setVisible(true);
                    }
                }
                if(this.batOverlap.type == 'struct') {
                    for(let i of getByType('struct')) {
                        this.structs[i.tag].setVisible(true);
                    }
                }
            }
            
        }, this);

        // Bouton planter
        this.planter = this.add.image(180, 35, "planter").setScale(0.1).setInteractive();
        this.planter.on('pointerdown', function(){
            if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 1 && (this.batOverlap.tag == 'labor' || this.batOverlap.tag == 'water')) {
                for(let i of getByType('plant')) {
                    this.plants[i.tag].setVisible(true);
                }
            }
            
        }, this);
        //Replanter automatiquement
        this.input.keyboard.on('keydown_E', function(){
            if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 1 && (this.batOverlap.tag == 'labor' || this.batOverlap.tag == 'water') && this.batOverlap.oldseed.name) {
                this.europeScene.replant(this.batOverlap);
            }
        }, this);

        // Bouton recolter
        this.recolter = this.add.image(245, 35, "recolter").setScale(0.1).setInteractive();
        this.recolter.on('pointerdown', function(){
            if(this.batOverlap.type == 'field' && this.batOverlap.plant && this.batOverlap.level == 1 && this.batOverlap.tag != 'labor' && (this.batOverlap.grow == this.batOverlap.seed.maxGrow || this.batOverlap.dead)) {
                this.europeScene.recolte(this.batOverlap);
            }
            
        }, this);
        this.input.keyboard.on('keydown_Z', function(){
            if(this.batOverlap.type == 'field' && this.batOverlap.plant && this.batOverlap.level == 1 && this.batOverlap.tag != 'labor' && (this.batOverlap.grow == this.batOverlap.seed.maxGrow || this.batOverlap.dead)) {
                this.europeScene.recolte(this.batOverlap);
            }
        }, this);



        // Bouton Nourrir
        this.feed = this.add.image(50, 90, "feed").setScale(0.1).setInteractive();
        this.feed.on('pointerdown', function(){
            if(this.batOverlap.type == 'animal' && this.batOverlap.level > 0) {
                /*for(let i of getByType('plant')) {
                    this.plants[i.tag].setVisible(true);
                }*/
            }
            
        }, this);
        

        
        this.circleUpgrade = this.add.image(this.upgrade.x, this.upgrade.y, "circle").setScale(0.1).setVisible(false);
        this.circleBuild = this.add.image(this.build.x, this.build.y, "circle").setScale(0.1).setVisible(false);
        this.circlePlanter = this.add.image(this.planter.x, this.planter.y, "circle").setScale(0.1).setVisible(false);
        this.circleRecolte = this.add.image(this.recolter.x, this.recolter.y, "circle").setScale(0.1).setVisible(false);
        this.circleFeed = this.add.image(this.feed.x, this.feed.y, "circle").setScale(0.1).setVisible(false);

    }

    update() {
        //Upgrade
        if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'house') && this.batOverlap.level < this.batOverlap.ref.lvlMax && this.batOverlap.level != 0) {
            this.circleUpgrade.setVisible(true);
        }
        else {
            this.circleUpgrade.setVisible(false);
        }

        //Build
        if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'field') && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
            this.circleBuild.setVisible(true);
        }
        else {
            this.circleBuild.setVisible(false);
        }
        if(this.batOverlap.type != 'animal') {
            for(let i of getByType('animal')) {
                this.animals[i.tag].setVisible(false);
            }
        }
        if(this.batOverlap.type != 'struct') {
            for(let i of getByType('struct')) {
                this.structs[i.tag].setVisible(false);
            }
        }
        if(this.batOverlap.type != 'field') {
            for(let i of getByType('field')) {
                this.fields[i.tag].setVisible(false);
            }
        }

        //Planter
        if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 1 && (this.batOverlap.tag == 'labor' || this.batOverlap.tag == 'water')) {
            this.circlePlanter.setVisible(true);
        }
        else {
            this.circlePlanter.setVisible(false);
            for(let i of getByType('plant')) {
                this.plants[i.tag].setVisible(false);
            }
        }

        //Recolter
        if(this.batOverlap.type == 'field' && this.batOverlap.plant && this.batOverlap.level == 1 && this.batOverlap.tag != 'labor' && (this.batOverlap.grow == this.batOverlap.seed.maxGrow || this.batOverlap.dead)) {
            this.circleRecolte.setVisible(true);
        }
        else {
            this.circleRecolte.setVisible(false);
        }

        //Nourrir
        if(this.batOverlap.type == 'animal' && this.batOverlap.level > 0) {
            this.circleFeed.setVisible(true);
        }
        else {
            this.circleFeed.setVisible(false);
        }


        
        if(this.batOverlap.key != 0) {
            let tmpText = '';
            if(this.batOverlap.ref.name) {
                tmpText+='Nom : '+this.batOverlap.ref.name;
            }
            tmpText+='\nType : '+this.batOverlap.typeName;
            if(this.batOverlap.type != 'field') {
                if(this.batOverlap.level < this.batOverlap.ref.lvlMax){
                    tmpText+='\nNiveau : '+this.batOverlap.level+' / '+this.batOverlap.ref.lvlMax;
                }
                else {
                    tmpText+='\nNiveau : Max';
                }
            }
            if(this.batOverlap.ref.money && this.batOverlap.type != 'field') {
                let moneyPerSec = this.batOverlap.ref.money[this.batOverlap.level];
                tmpText+='\nGain : '+moneyPerSec+'/s';
            }
            if(this.batOverlap.type == 'field') {
                if(this.batOverlap.plant) {
                    tmpText+='\nCulture : '+this.batOverlap.seed.name;
                    if(!this.batOverlap.dead) {
                        if(this.batOverlap.grow < this.batOverlap.seed.maxGrow){
                            tmpText+='\nCroissance : '+this.batOverlap.grow+' / '+this.batOverlap.seed.maxGrow;
                        }
                        else {
                            tmpText+='\nCroissance : Max';
                        }
                    }
                    else {
                        tmpText+='\nCroissance : pourri';
                    }
                }
            }
            this.plus.setVisible(true);
            this.textBat.setText(tmpText);
        }
        
    }

    getBatOverlap(bat){
        this.batOverlap = bat;
    }

    errorText(errorTxt) {
        //Width 1000px à 0.8 => 800  Height 350px à 0.8 => 280
        let container = this.add.image(0, 0, 'error').setScale(0.8);
        let text = this.add.text(602, 572, errorTxt, { fontFamily: 'Arial', fontSize: 23, color: '#000000', wordWrap: { width: 600 }, align: 'center' });
        Phaser.Display.Align.In.Center(container, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
        Phaser.Display.Align.In.Center(text, this.add.zone(container.x, container.y, container.width*0.8, container.height*0.8));
        text.setX(text.x+100);
        setTimeout(() => {
            text.destroy();
            container.destroy();
        }, 2000);
        console.log('Error : ', errorTxt);
    }

    savoirPlus(){
        let tmpText = '';
        if(this.batOverlap.key != 0) {
            if(this.batOverlap.ref.name) {
                tmpText+='Nom : '+this.batOverlap.ref.name;
            }
            tmpText+='\nType : '+this.batOverlap.typeName;
            if(this.batOverlap.type != 'field') {
                if(this.batOverlap.level < this.batOverlap.ref.lvlMax){
                    tmpText+='\nNiveau : '+this.batOverlap.level+' / '+this.batOverlap.ref.lvlMax;
                }
                else {
                    tmpText+='\nNiveau : Max';
                }
            }
            if(this.batOverlap.ref.money && this.batOverlap.type != 'field') {
                let moneyPerSec = this.batOverlap.ref.money[this.batOverlap.level];
                tmpText+='\nGain : '+moneyPerSec+'/s';
            }
            if(this.batOverlap.tag != 'build') {
                tmpText+='\nDescription : '+this.batOverlap.ref.desc;
            }
            if(this.batOverlap.type == 'field') {
                if(this.batOverlap.plant) {
                    tmpText+='\nCulture : '+this.batOverlap.seed.name;
                    if(this.batOverlap.grow < this.batOverlap.seed.maxGrow){
                        tmpText+='\nCroissance : '+this.batOverlap.grow+' / '+this.batOverlap.seed.maxGrow;
                    }
                    else {
                        tmpText+='\nCroissance : Max';
                    }
                    let climats = '';
                    for(let clm in this.batOverlap.seed.climat) {
                        climats+=getByTag(this.batOverlap.seed.climat[clm])[0].name+' ';
                    }
                    tmpText+='\nClimats : '+climats;
                    tmpText+='\nDescription culture : '+this.batOverlap.seed.desc;
                }
            }
        }
        this.backGroundPopup.setVisible(true);
        this.plusText.setVisible(true);
        this.plusText.setText(tmpText);
        this.input.on('pointerdown', function() {
            this.backGroundPopup.setVisible(false);
            this.plusText.setVisible(false);
            this.plusText.setText('');
        }, this);
    }

    closeSavoirPlus() {
        this.backGroundPopup.setVisible(false);
        this.plusText.setVisible(false);
        this.plusText.setText('');
    }

}
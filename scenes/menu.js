class Menu extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'menuScene' });
        this.gameScene;

        this.upgrade;
        this.build;
        this.planter;
        this.recolter;
        this.feed;
        this.sell;
        this.search;
        this.health;

        this.animals = [];
        this.plants = [];
        this.fields = [];
        this.structs = [];

        this.engrais = [];
        this.luttes = [];

        this.meals = [];
        this.sells = [];

        this.bull = [];

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
        this.gameScene = this.scene.get(this.registry.get('climat')+'Scene');

        this.add.image(150, 1500, 'menu');

        this.textBat = this.add.text(8, 350, '', { lineSpacing:7, wordWrap: { width: 284 } });
        
        // Card 2 140 de haut
        this.cardInfo = this.add.image(148, 300, 'card3').setScale(0.35).setVisible(false);
        this.textInfo = this.add.text(14, 260, '', { lineSpacing:7, wordWrap: { width: 284 }, fontSize:15, color:'#000000' });


        //En savoir plus
        //Bouton de largeur 146, hauteur 96
        this.plus = this.add.image(150, innerHeight - 25, 'savoirPlus').setInteractive().setVisible(false).setScale(0.6);
        this.plus.on('pointerdown', this.savoirPlus, this);

        this.backGroundPopup = this.add.graphics();
        this.backGroundPopup.fillStyle(0x70402a, 1);
        this.backGroundPopup.fillRoundedRect(window.innerWidth/2 - 350 + 150, window.innerHeight/2 - 200 + 25, 700, 400, 20);
        this.backGroundPopup.lineStyle(3, 0xffffff, 1);
        this.backGroundPopup.strokeRoundedRect(window.innerWidth/2 - 350 + 150, window.innerHeight/2 - 200 + 25, 700, 400, 20);
        this.plusText = this.add.text(window.innerWidth/2 - 350 + 150 + 20,  window.innerHeight/2 - 200 + 25 + 15, '', { lineSpacing:9, wordWrap: { width: 700 - 40 }, fontSize:17, color:'#ffffff' });
        this.backGroundPopup.setVisible(false);
        this.plusText.setVisible(false);


        // Bouton (512x512) en scale 0.1 (51.2x51.2) + 55 a chaque fois
        // Bouton (512x512) en scale 0.08 (40.96x40.96) + 45 a chaque fois

        let compt = 0;
        // Création des boutons Animaux
        let j = 0;
        for(let i of getByType('animal')) {
            this.animals[i.tag] = this.add.image(32 +(j%5)*55, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false)/*.setVisible(false)*/;
            this.animals[i.tag].on('pointerdown', function(){
                if(this.batOverlap.type == 'animal' && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                    this.gameScene.buildBat(this.batOverlap, i);
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
                    this.gameScene.plant(this.batOverlap, i);
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
            this.fields[i.tag] = this.add.image(32 +(l%5)*55, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false)/*.setVisible(false)*/;
            this.fields[i.tag].on('pointerdown', function(){
                if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                    this.gameScene.buildBat(this.batOverlap, i);
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
            this.structs[i.tag] = this.add.image(32 +(m%5)*55, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false)/*.setVisible(false)*/;
            this.structs[i.tag].on('pointerdown', function(){
                if(this.batOverlap.type == 'struct' && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                    this.gameScene.buildBat(this.batOverlap, i);
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




        // Création des boutons Engrais
        compt=0;
        let n = 0;
        for(let i of getByType('fertility')) {
            this.engrais[i.tag] = this.add.image(32 +(n%5)*55, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false);
            if(!i.unlock) this.engrais[i.tag].setAlpha(0.4);
            this.engrais[i.tag].on('pointerdown', function(){
                if(i.unlock) {
                    this.gameScene.fertility(this.batOverlap, i);
                    for(let i of getByType('fertility')) {
                        this.engrais[i.tag].setVisible(false);
                    }
                }
            }, this);
            this.engrais[i.tag].on('pointermove', function(){
                if(i.unlock) {
                    this.cardInfo.setVisible(true);
                    this.textInfo.setText('Engrais : '+i.name+'\nApport : '+i.fertility+'\nEcologie : '+i.ecology);
                }
            }, this);
            this.engrais[i.tag].on('pointerout', function(){
                this.cardInfo.setVisible(false);
                this.textInfo.setText('');
            }, this);
            n++;
            if(n%5==0)compt++;
        }


        // Création des boutons Luttes
        compt=0;
        let o = 0;
        for(let i of getByType('health')) {
            this.luttes[i.tag] = this.add.image(35 +(o%5)*60, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false);
            if(!i.unlock) this.luttes[i.tag].setAlpha(0.4);
            this.luttes[i.tag].on('pointerdown', function(){
                if(i.unlock && this.batOverlap.level == 1 && this.batOverlap.type == 'field' && this.batOverlap.weeds > 0) {
                    this.gameScene.clean(this.batOverlap, i);
                    for(let i of getByType('health')) {
                        this.luttes[i.tag].setVisible(false);
                    }
                }
            }, this);
            this.luttes[i.tag].on('pointermove', function(){
                if(i.unlock) {
                    this.cardInfo.setVisible(true);
                    this.textInfo.setText('Lutte '+i.name+'\nApport : '+i.health+'\nEcologie : '+i.ecology);
                }
            }, this);
            this.luttes[i.tag].on('pointerout', function(){
                this.cardInfo.setVisible(false);
                this.textInfo.setText('');
            }, this);
            o++;
            if(o%5==0)compt++;
        }


        //Creation du bouton desctruction

        compt = 0;
        let p = 0;
        for(let i of getByType('destroy')) {
            this.bull[i.tag] = this.add.image(32 +(p%5)*55, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false)/*.setVisible(false)*/;
            this.bull[i.tag].on('pointerdown', function(){
                if(this.batOverlap.level > 0 && this.batOverlap.tag != 'build') {
                    this.gameScene.destroyBat(this.batOverlap, i);
                    for(let i of getByType('destroy')) {
                        this.bull[i.tag].setVisible(false);
                    }
                }
            }, this);
            this.bull[i.tag].on('pointermove', function(){
                this.cardInfo.setVisible(true);
                this.textInfo.setText(i.name+'\nPrix : '+i.buildCost);
            }, this);
            this.bull[i.tag].on('pointerout', function(){
                this.cardInfo.setVisible(false);
                this.textInfo.setText('');
            }, this);
            p++;
            if(p%5==0)compt++;
        }


        // Création des boutons Nourriture
        compt=0;
        let q = 0;
        for(let i of getByType('meal')) {
            this.meals[i.tag] = this.add.image(35 +(q%5)*60, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false);
            if(!i.unlock) this.meals[i.tag].setAlpha(0.4);
            this.meals[i.tag].on('pointerdown', function(){
                if(i.unlock && this.batOverlap.type == 'animal' && this.batOverlap.level > 0 && !this.batOverlap.dead && this.batOverlap.feed < 100) {
                    this.gameScene.feed(this.batOverlap, i);
                    for(let i of getByType('meal')) {
                        this.meals[i.tag].setVisible(false);
                    }
                }
            }, this);
            this.meals[i.tag].on('pointermove', function(){
                if(i.unlock) {
                    this.cardInfo.setVisible(true);
                    this.textInfo.setText('Nourriture '+i.name+'\nApport : '+i.feed+'\nBien-être : '+i.care);
                }
            }, this);
            this.meals[i.tag].on('pointerout', function(){
                this.cardInfo.setVisible(false);
                this.textInfo.setText('');
            }, this);
            q++;
            if(q%5==0)compt++;
        }


        // Création des boutons Vendre
        compt=0;
        let r = 0;
        for(let i of getByType('sell')) {
            this.sells[i.tag] = this.add.image(35 +(r%5)*60, 140 + 45*compt, i.tag+"-button").setScale(0.08).setInteractive().setVisible(false);
            if(!i.unlock) this.sells[i.tag].setAlpha(0.4);
            this.sells[i.tag].on('pointerdown', function(){
                if(i.unlock && this.batOverlap.type == 'animal' && this.batOverlap.level > 0 && !this.batOverlap.dead && this.batOverlap.qt > 40) {
                    this.gameScene.sell(this.batOverlap, i);
                    for(let i of getByType('sell')) {
                        this.sells[i.tag].setVisible(false);
                    }
                }
            }, this);
            this.sells[i.tag].on('pointermove', function(){
                if(i.unlock) {
                    this.cardInfo.setVisible(true);
                    this.textInfo.setText(i.name+'\nGain : '+i.money+' $\nBien-être : '+i.care);
                }
            }, this);
            this.sells[i.tag].on('pointerout', function(){
                this.cardInfo.setVisible(false);
                this.textInfo.setText('');
            }, this);
            r++;
            if(r%5==0)compt++;
        }

         

        // Bouton upgrade
        this.upgrade = this.add.image(50, 35, "upgrade").setScale(0.1).setInteractive();
        this.upgrade.on('pointerdown', function(){
            if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'house') && this.batOverlap.level < this.batOverlap.ref.lvlMax && this.batOverlap.level != 0) {
                if(this.batOverlap.type != 'animal') {
                    console.log('try1');
                    this.gameScene.upgradeBat(this.batOverlap);
                }
                else if(!this.batOverlap.dead) {
                    console.log('try2');
                    this.gameScene.upgradeBat(this.batOverlap);
                }
            }
        }, this);
        
        this.upgrade.on('pointermove', function(){
            if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'house') && this.batOverlap.level < this.batOverlap.ref.lvlMax && this.batOverlap.level != 0) {
                if(this.batOverlap.type != 'animal') {
                    this.cardInfo.setVisible(true);
                    this.textInfo.setText('Prix : '+this.batOverlap.ref.upgrade[this.batOverlap.level+1]);
                }
                else if(!this.batOverlap.dead) {
                    this.cardInfo.setVisible(true);
                    this.textInfo.setText('Prix : '+this.batOverlap.ref.upgrade[this.batOverlap.level+1]);
                }
            }
        }, this);
        this.upgrade.on('pointerout', function(){
            this.cardInfo.setVisible(false);
            this.textInfo.setText('');
        }, this);
        
        
        this.input.keyboard.on('keydown_A', function(){
            if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'house') && this.batOverlap.level < this.batOverlap.ref.lvlMax && this.batOverlap.level != 0) {
                if(this.batOverlap.type != 'animal') {
                    this.gameScene.upgradeBat(this.batOverlap);
                }
                else if(!this.batOverlap.dead) {
                    this.gameScene.upgradeBat(this.batOverlap);
                }
            }
        }, this);

        
        // Bouton construction
        this.build = this.add.image(115, 35, "builder").setScale(0.1).setInteractive();
        this.build.on('pointerdown', function(){
            if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'field') && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                this.closeButtons();
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
            if(this.batOverlap.level > 0 && this.batOverlap.tag != 'build') {
                console.log(this.batOverlap.dead);
                for(let i of getByType('destroy')) {
                    this.bull[i.tag].setVisible(true);
                }
            }
            
        }, this);

        
        // Bouton Nourrir
        this.feed = this.add.image(180, 35, "meal").setScale(0.1).setInteractive();
        this.feed.on('pointerdown', function(){
            if(this.batOverlap.type == 'animal' && this.batOverlap.level > 0 && !this.batOverlap.dead && this.batOverlap.feed < 100) {
                this.closeButtons();
                for(let i of getByType('meal')) {
                    this.meals[i.tag].setVisible(true);
                }
            }
            
        }, this);

        
        // Bouton Vendre
        this.sell = this.add.image(245, 35, "sellAnimal").setScale(0.1).setInteractive();
        this.sell.on('pointerdown', function(){
            if(this.batOverlap.type == 'animal' && this.batOverlap.level > 0 && !this.batOverlap.dead && this.batOverlap.qt > 40) {
                this.closeButtons();
                for(let i of getByType('sell')) {
                    this.sells[i.tag].setVisible(true);
                }
            }
            
        }, this);


        // Bouton planter
        this.planter = this.add.image(50, 90, "planter").setScale(0.1).setInteractive();
        this.planter.on('pointerdown', function(){
            if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 1 && (this.batOverlap.tag == 'labor' || this.batOverlap.tag == 'water')) {
                this.closeButtons();
                for(let i of getByType('plant')) {
                    this.plants[i.tag].setVisible(true);
                }
            }
            
        }, this);
        //Replanter automatiquement
        this.input.keyboard.on('keydown_E', function(){
            if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 1 && (this.batOverlap.tag == 'labor' || this.batOverlap.tag == 'water') && this.batOverlap.oldseed[0]) {
                this.gameScene.replant(this.batOverlap);
            }
        }, this);


        // Bouton recolter
        this.recolter = this.add.image(115, 90, "recolter").setScale(0.1).setInteractive();
        this.recolter.on('pointerdown', function(){
            if(this.batOverlap.type == 'field' && this.batOverlap.plant && this.batOverlap.level == 1 && this.batOverlap.tag != 'labor' && (this.batOverlap.grow == this.batOverlap.seed.maxGrow || this.batOverlap.dead)) {
                this.gameScene.recolte(this.batOverlap);
            }
            
        }, this);
        this.input.keyboard.on('keydown_Z', function(){
            if(this.batOverlap.type == 'field' && this.batOverlap.plant && this.batOverlap.level == 1 && this.batOverlap.tag != 'labor' && (this.batOverlap.grow == this.batOverlap.seed.maxGrow || this.batOverlap.dead)) {
                this.gameScene.recolte(this.batOverlap);
            }
        }, this);

        


        // Bouton Nettoyer
        this.health = this.add.image(180, 90, "health").setScale(0.1).setInteractive();
        this.health.on('pointerdown', function(){
            if(this.batOverlap.level == 1 && this.batOverlap.type == 'field' && this.batOverlap.weeds > 0) {
                this.closeButtons();
                for(let i of getByType('health')) {
                    this.luttes[i.tag].setVisible(true);
                }
            }
            
        }, this);


        // Bouton Fertiliser
        this.fertility = this.add.image(245, 90, "fertility").setScale(0.1).setInteractive();
        this.fertility.on('pointerdown', function(){
            if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 1 && (this.batOverlap.tag == 'labor' || this.batOverlap.tag == 'water') && this.batOverlap.fertility < 100) {
                this.closeButtons();
                for(let i of getByType('fertility')) {
                    this.engrais[i.tag].setVisible(true);
                }
            }
            
        }, this);
        

        
        this.circleUpgrade = this.add.image(this.upgrade.x, this.upgrade.y, "circle").setScale(0.1).setVisible(false);
        this.circleBuild = this.add.image(this.build.x, this.build.y, "circle").setScale(0.1).setVisible(false);
        this.circlePlanter = this.add.image(this.planter.x, this.planter.y, "circle").setScale(0.1).setVisible(false);
        this.circleRecolte = this.add.image(this.recolter.x, this.recolter.y, "circle").setScale(0.1).setVisible(false);
        this.circleFeed = this.add.image(this.feed.x, this.feed.y, "circle").setScale(0.1).setVisible(false);
        this.circleSell = this.add.image(this.sell.x, this.sell.y, "circle").setScale(0.1).setVisible(false);
        this.circleFertility = this.add.image(this.fertility.x, this.fertility.y, "circle").setScale(0.1).setVisible(false);
        this.circleHealth = this.add.image(this.health.x, this.health.y, "circle").setScale(0.1).setVisible(false);

    }

    update() {
        //Upgrade
        if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'house') && this.batOverlap.level < this.batOverlap.ref.lvlMax && this.batOverlap.level != 0) {
            if(this.batOverlap.type != 'animal') {
                this.circleUpgrade.setVisible(true);
            }
            else if(!this.batOverlap.dead) {
                this.circleUpgrade.setVisible(true);
            }
            else {
                this.circleUpgrade.setVisible(false);
            }
        }
        else {
            this.circleUpgrade.setVisible(false);
        }

        //Build
        if((this.batOverlap.type == 'animal' || this.batOverlap.type == 'struct' || this.batOverlap.type == 'field')) {
            if(this.batOverlap.type != 'animal' && this.batOverlap.level == 0 && this.batOverlap.tag == 'build') {
                this.circleBuild.setVisible(true);
            }
            else if(this.batOverlap.dead || (this.batOverlap.level == 0 && this.batOverlap.tag == 'build')) {
                this.circleBuild.setVisible(true);
            }
            else {
                this.circleBuild.setVisible(false);
            }
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
        if(this.batOverlap.type == 'build') {
            for(let i of getByType('destroy')) {
                this.bull[i.tag].setVisible(false);
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
        if(this.batOverlap.type == 'animal' && this.batOverlap.level > 0 && !this.batOverlap.dead && this.batOverlap.feed < 100) {
            this.circleFeed.setVisible(true);
        }
        else {
            this.circleFeed.setVisible(false);
            for(let i of getByType('meal')) {
                this.meals[i.tag].setVisible(false);
            }
        }

        //Vendre
        if(this.batOverlap.type == 'animal' && this.batOverlap.level > 0 && !this.batOverlap.dead && this.batOverlap.qt > 40) {
            this.circleSell.setVisible(true);
        }
        else {
            this.circleSell.setVisible(false);
            for(let i of getByType('sell')) {
                this.sells[i.tag].setVisible(false);
            }
        }


        //Fertiliser
        if(this.batOverlap.type == 'field' && !this.batOverlap.plant && this.batOverlap.level == 1 && (this.batOverlap.tag == 'labor' || this.batOverlap.tag == 'water') && this.batOverlap.fertility < 100) {
            this.circleFertility.setVisible(true);
        }
        else {
            this.circleFertility.setVisible(false);
            for(let i of getByType('fertility')) {
                this.engrais[i.tag].setVisible(false);
            }
        }


        //Nettoyer
        if(this.batOverlap.level == 1 && this.batOverlap.type == 'field' && this.batOverlap.weeds > 0) {
            this.circleHealth.setVisible(true);
        }
        else {
            this.circleHealth.setVisible(false);
            for(let i of getByType('health')) {
                this.luttes[i.tag].setVisible(false);
            }
        }


        
        if(this.batOverlap.key != 0) {
            let tmpText = '';
            if(this.batOverlap.type != 'field') {
                if(this.batOverlap.ref.name) {
                    tmpText+='Nom : '+this.batOverlap.ref.name+'\n';
                }
                tmpText+='Type : '+this.batOverlap.typeName+'\n';
            }
            else {
                if(!this.batOverlap.plant) {
                    if(this.batOverlap.ref.name) {
                        tmpText+='Nom : '+this.batOverlap.ref.name+'\n';
                    }
                    tmpText+='Type : '+this.batOverlap.typeName+'\n';
                }
            }
            if(this.batOverlap.type != 'field') {
                if(this.batOverlap.level < this.batOverlap.ref.lvlMax){
                    tmpText+='Niveau : '+this.batOverlap.level+' / '+this.batOverlap.ref.lvlMax+'\n';
                }
                else {
                    tmpText+='Niveau : Max'+'\n';
                }
            }
            if(this.batOverlap.ref.money && this.batOverlap.type != 'field' && this.batOverlap.type != 'animal') {
                let moneyPerSec = this.batOverlap.ref.money[this.batOverlap.level];
                tmpText+='Gain : '+moneyPerSec+'/s'+'\n';
            }
            if(this.batOverlap.type == 'animal') {
                tmpText+='Nourriture : '+this.batOverlap.feed+'%\n';
                tmpText+='Quantité : '+this.batOverlap.qt+' / 100\n';
                if(this.batOverlap.dead) {
                    tmpText+='MORT !\n';
                }
            }
            if(this.batOverlap.type == 'field') {
                if(this.batOverlap.plant) {
                    tmpText+='Culture : '+this.batOverlap.seed.name+'\n';
                    if(!this.batOverlap.dead) {
                        if(this.batOverlap.grow < this.batOverlap.seed.maxGrow){
                            tmpText+='Croissance : '+this.batOverlap.grow+' / '+this.batOverlap.seed.maxGrow+'\n';
                        }
                        else {
                            tmpText+='Croissance : Max'+'\n';
                        }
                        let win = this.batOverlap.seed.money * this.batOverlap.fertility/100 * (this.batOverlap.maxWeeds - this.batOverlap.weeds)/10;
                        tmpText += 'Gain : '+win+' / '+this.batOverlap.seed.money+'\n';
                    }
                    else {
                        tmpText+='Croissance : pourri'+'\n';
                    }
                }
                tmpText+='Fertilité : '+this.batOverlap.fertility+'\n';
                let sante = this.batOverlap.maxWeeds - this.batOverlap.weeds
                tmpText+='Santé : '+sante+' / '+this.batOverlap.maxWeeds+'\n';
                if(this.batOverlap.oldseed[0]){
                    tmpText+='Historique : '+this.batOverlap.oldseed[0].name+'\n';
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
            tmpText+='Type : '+this.batOverlap.typeName+'\n';
            if(this.batOverlap.ref.name) {
                tmpText+='Nom : '+this.batOverlap.ref.name+'\n';
            }
            if(this.batOverlap.type != 'field') {
                if(this.batOverlap.level < this.batOverlap.ref.lvlMax){
                    tmpText+='Niveau : '+this.batOverlap.level+' / '+this.batOverlap.ref.lvlMax+'\n';
                }
                else {
                    tmpText+='Niveau : Max'+'\n';
                }
            }
            if(this.batOverlap.type == 'animal') {
                tmpText+='Nourriture : '+this.batOverlap.feed+'%\n';
                tmpText+='Quantité : '+this.batOverlap.qt+' / 100\n';
                if(this.batOverlap.dead) {
                    tmpText+='MORT !\n';
                }
            }
            if(this.batOverlap.ref.money && this.batOverlap.type != 'field' && this.batOverlap.type != 'animal') {
                let moneyPerSec = this.batOverlap.ref.money[this.batOverlap.level];
                tmpText+='Gain : '+moneyPerSec+'/s'+'\n';
            }
            if(this.batOverlap.tag != 'build') {
                tmpText+='Description : '+this.batOverlap.ref.desc+'\n';
            }
            if(this.batOverlap.type == 'field') {
                if(this.batOverlap.plant) {
                    tmpText+='Culture : '+this.batOverlap.seed.name+'\n';
                    if(this.batOverlap.grow < this.batOverlap.seed.maxGrow){
                        tmpText+='Croissance : '+this.batOverlap.grow+' / '+this.batOverlap.seed.maxGrow+'\n';
                    }
                    else {
                        tmpText+='Croissance : Max'+'\n';
                    }
                    let climats = '';
                    for(let clm in this.batOverlap.seed.climat) {
                        climats+=getByTag(this.batOverlap.seed.climat[clm])[0].name+' ';
                    }
                    tmpText+='Fertilité : '+this.batOverlap.fertility+'\n';
                    let sante = this.batOverlap.maxWeeds - this.batOverlap.weeds;
                    tmpText+='Santé : '+sante+' / '+this.batOverlap.maxWeeds+'\n';
                    tmpText+='Climats : '+climats+'\n';
                    tmpText+='Description culture : '+this.batOverlap.seed.desc+'\n';
                }
                tmpText+='Historique : ';
                this.batOverlap.oldseed.forEach(value => {
                    tmpText+=value.name+' ';
                });
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


    closeButtons(){
        for(let i of getByType('health')) {
            this.luttes[i.tag].setVisible(false);
        }
        for(let i of getByType('fertility')) {
            this.engrais[i.tag].setVisible(false);
        }
        for(let i of getByType('sell')) {
            this.sells[i.tag].setVisible(false);
        }
        for(let i of getByType('meal')) {
            this.meals[i.tag].setVisible(false);
        }
        for(let i of getByType('plant')) {
            this.plants[i.tag].setVisible(false);
        }
        for(let i of getByType('animal')) {
            this.animals[i.tag].setVisible(false);
        }
        for(let i of getByType('struct')) {
            this.structs[i.tag].setVisible(false);
        }
        for(let i of getByType('field')) {
            this.fields[i.tag].setVisible(false);
        }
        for(let i of getByType('destroy')) {
            this.bull[i.tag].setVisible(false);
        }
    }




    seedyAdvice(type, ref, ref2){
        this.scene.pause(this.registry.get('climat')+'Scene');
        // Seedy 764x673  scale 0.8 => 611.2x538.4
        let seedy = this.add.image(window.innerWidth - 305.6, window.innerHeight - 269.2, 'seedyAdvice').setScrollFactor(0).setScale(0.8).setOrigin(0.5,0.5);
        let text = this.add.text(seedy.x - (seedy.width*0.8)/2, seedy.y - (seedy.height*0.8)/2, '', { lineSpacing:7, wordWrap: { width: 284 }, fontSize:17, fontFamily:'monospace', color:'#000000' }).setScrollFactor(0).setOrigin(0,0);
        switch(type){
            case 'lowMeal':
                text.setText('Certains de vos animaux manquent de nourritures, nourrissez les rapidement ou vous allez perdre du bien-être animal');
                break;
            case 'veryLowMeal':
                text.setText('Certains de vos animaux manquent cruellement de nourritures, nourrissez les au plus vite avant qu\'ils ne meurent');
                break;
            case 'noMeal':
                text.setText('Certains de vos animax n\'ont plus de nourriture, il ne vous reste que 10 secondes avant qu\'ils ne meurent');
                break;
            case 'deadAnimalClimat':
                let tmpText = 'Vos '+ref.name+' sont morte car elle ne sont pas dans le bon climat. Leur climat favorable est ';
                ref.climat.forEach(value => tmpText += getByTag(value)[0].name+', ');
                tmpText+='\nDétruisez le bâtiment our pouvoir reconstruire';
                text.setText(tmpText);
                break;
            default:
                seedy.destroy();
                text.destroy();
                this.scene.resume(this.registry.get('climat')+'Scene');
                break;
        }






        this.input.on('pointerdown', function() {
            seedy.destroy();
            text.destroy();
            this.scene.resume(this.registry.get('climat')+'Scene');
        }, this);
    }

}
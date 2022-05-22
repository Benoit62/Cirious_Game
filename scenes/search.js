class Search extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'searchScene' });
        
        this.search = [];

        this.icones = [];

        this.icones2 = [];

        this.circles = [];

        this.circles2 = [];
    }

    create ()
    {

        for(let i in this.registry.list) {
            let obj = this.registry.list[i];
            if(obj.type && obj.type == 'search') {
                this.search.push(obj);
            }
        }


        let nbCategori = this.search.length +1;
        let compt1 = 0;
        this.search.forEach(function(value){
            let catIcone = this.add.image((window.innerWidth/nbCategori)*(compt1+1), 65, value.tag+'-search').setScale(0.2).setInteractive();
            let shineCatIcon = this.add.image((window.innerWidth/nbCategori)*(compt1+1), 65, 'circle').setScale(0.2).setVisible(false);
            this.circles.push(shineCatIcon);
            let compt2 = 0;
            let nbUnderCat = value.children.length+1;
            let arraySearchIcone = [];
            let arraySearchIcone2 = [];
            value.children.forEach(function(value) {
                let searchIcone;
                if(value.type != 'struct') {
                    searchIcone = this.add.image((window.innerWidth/nbUnderCat)*(compt2+1), catIcone.y + 130, value.tag+'-search').setScale(0.15).setInteractive().setVisible(false);
                    if(!value.unlock) {
                        searchIcone.setAlpha(0.5);
                    }
                    searchIcone.on('pointerdown', function(){
                        if(this.registry.get('money') > value.unlockPrice) {
                            value.unlock = true;
                            searchIcone.setAlpha(1);
                            this.registry.set('money', this.registry.get('money') - value.unlockPrice);
                        }
                        else {
                            this.errorText('Vous n\'avez pas assez d\'argent');
                        }
                    }, this);
                    searchIcone.on('pointermove', function(){
                        this.displayText('unlock', value);
                    }, this);
                }
                else {
                    searchIcone = this.add.image((window.innerWidth/nbUnderCat)*(compt2+1), catIcone.y + 90, value.tag+'-search').setScale(0.15).setInteractive().setVisible(false);
                    let shineCatIcon2 = this.add.image((window.innerWidth/nbUnderCat)*(compt2+1), catIcone.y + 90, 'circle').setScale(0.15).setVisible(false);
                    this.circles2.push(shineCatIcon2);
                    let compt3 = 0;
                    let tmpArrayStructIcones = [];
                    let nbUnderCat2 = getByType(value.product).length+1;
                    getByType(value.product).forEach(function(value) {
                        let productIcone = this.add.image((window.innerWidth/nbUnderCat2)*(compt3+1), searchIcone.y + 75, value.tag+'-search').setScale(0.13).setInteractive().setVisible(false);
                        if(!value.unlock) {
                            productIcone.setAlpha(0.5);
                        }
                        productIcone.on('pointerdown', function(){
                            if(this.registry.get('money') > value.unlockPrice) {
                                if(value.need == '' || getByTag(value.need)[0].unlock) {
                                    value.unlock = true;
                                    productIcone.setAlpha(1);
                                    this.registry.set('money', this.registry.get('money') - value.unlockPrice);
                                }
                                else {
                                    this.errorText('Vous devez d\'abord débloquer la recherche : '+getByTag(value.need)[0].name);
                                }
                            }
                            else {
                                this.errorText('Vous n\'avez pas assez d\'argent');
                            }
                        }, this);
                        productIcone.on('pointermove', function(){
                            this.displayText('unlock', value);
                        }, this);


                        compt3++;
                        arraySearchIcone2.push(productIcone);
                        tmpArrayStructIcones.push(productIcone);
                        this.icones2.push(productIcone);
                    }, this);
                    searchIcone.on('pointerdown', function(){
                        arraySearchIcone2.forEach(img => img.visible = false);
                        tmpArrayStructIcones.forEach(img => img.visible = !img.visible);
                        this.circles2.forEach(function(img){
                            img.visible = false;
                        }, this);
                        shineCatIcon2.visible = !shineCatIcon2.visible;
                    }, this);
                    searchIcone.on('pointermove', function(){
                        this.displayText('struct', value);
                    }, this);
                }
                compt2++;
                arraySearchIcone.push(searchIcone);
                this.icones.push(searchIcone);
            }, this);

            catIcone.on('pointerdown', function(){
                this.icones.forEach(function(img){
                    img.visible = false;
                }, this);
                this.icones2.forEach(function(img){
                    img.visible = false;
                }, this);
                arraySearchIcone.forEach(img => img.visible = !img.visible);
                this.circles.forEach(function(img){
                    img.visible = false;
                }, this);
                if(arraySearchIcone2.length) arraySearchIcone2.forEach(img => img.visible = false);
                this.circles2.forEach(function(img){
                    img.visible = false;
                }, this);
                shineCatIcon.visible = !shineCatIcon.visible;
            }, this);

            catIcone.on('pointermove', function(){
                this.displayText('cat', value);
            }, this);
            compt1++;
        }, this);



        this.nom = this.make.text({
            x: window.innerWidth/2,
            y: window.innerHeight - 260,
            text: '',
            style:{
                color:'#ffffff',
                fontSize:40,
                fontFamily:'MC',
                align:'center',
                wordWrap:{
                    width:window.innerWidth
                },
                lineSpacing:10
            }
        }).setOrigin(0.5,0);

        this.prix = this.make.text({
            x: 20,
            y: window.innerHeight - 200,
            text: '',
            style:{
                color:'#0080ff',
                fontSize:25,
                fontFamily:'MC',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/4
                },
                lineSpacing:10
            }
        }).setOrigin(0,0);

        this.loss = this.make.text({
            x: window.innerWidth/2 - 20,
            y: window.innerHeight -200,
            text: '',
            style:{
                color:'#0080ff',
                fontSize:25,
                fontFamily:'MC',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/4
                },
                lineSpacing:10
            }
        }).setOrigin(1,0);


        this.apport = this.make.text({
            x: window.innerWidth/2 + 20,
            y: window.innerHeight - 200,
            text: '',
            style:{
                color:'#0080ff',
                fontSize:25,
                fontFamily:'MC',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/4
                },
                lineSpacing:10
            }
        }).setOrigin(0,0);

        this.costUse = this.make.text({
            x: window.innerWidth - 20,
            y: window.innerHeight - 200,
            text: '',
            style:{
                color:'#0080ff',
                fontSize:25,
                fontFamily:'MC',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/4
                },
                lineSpacing:10
            }
        }).setOrigin(1,0);


        this.desc = this.make.text({
            x: 25,
            y: window.innerHeight - 140,
            text: '',
            style:{
                color:'#ffffff ',
                fontSize:17,
                fontFamily:'MC',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/2 - 50
                },
                lineSpacing:10
            }
        });

        this.info = this.make.text({
            x: window.innerWidth/2 + 25,
            y: window.innerHeight - 140,
            text: '',
            style:{
                color:'#ffffff ',
                fontSize:17,
                fontFamily:'MC',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/2 - 50
                },
                lineSpacing:10
            }
        });

        this.barre = this.add.graphics();
        this.barre2 = this.add.graphics();
        this.barre3 = this.add.graphics();
        this.barre4 = this.add.graphics();
        this.barreHoriz = this.add.graphics();
        this.barreHoriz2 = this.add.graphics();


        let close = this.add.text(50, 50, 'X', { fontSize: 70, fontColor:'#ffffff', fontFamily:'MC'}).setOrigin(0.5,0.5).setInteractive().on('pointerdown', function(){
            this.scene.stop('searchScene');
            this.scene.setVisible(true, this.registry.get('gameScene')+'Scene');            
            this.scene.launch('headerScene');
            this.scene.launch('menuScene');
            this.search = [];
        }, this);

        this.input.keyboard.on('keydown_ESC', function () {
            this.scene.stop('searchScene');
            this.scene.setVisible(true, this.registry.get('gameScene')+'Scene');            
            this.scene.launch('headerScene');
            this.scene.launch('menuScene');
            this.search = [];
        }, this);

        
        this.add.image(window.innerWidth - 15, 18, 'dollar').setScale(0.07);
        this.moneyText = this.add.text(window.innerWidth - 30, 18, '0', { fontSize:25, fontFamily:'MC' }).setOrigin(1,0.5);

        this.registry.events.on('changedata', function(){
            this.moneyText.setText(this.registry.get('money'));
        }, this);

    }

    update() {
        
        
    }

    displayText(type, ref){
        switch(type) {
            case 'unlock':
                switch(ref.type) {
                    case 'fertility':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('Prix : '+ref.unlockPrice+' $');
                        this.loss.setText('Ecologie : '+ref.ecology);
                        this.apport.setText('Fertilité : '+ref.fertility);
                        this.costUse.setText('Coût d\'utilisation : '+ref.prix);
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        break;
                    case 'health':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('Prix : '+ref.unlockPrice+' $');
                        this.loss.setText('Ecologie : '+ref.ecology);
                        this.apport.setText('Santé : '+ref.health);
                        this.costUse.setText('Coût d\'utilisation : '+ref.prix);
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    case 'meal':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('Prix : '+ref.unlockPrice+' $');
                        this.loss.setText('Bien-être animal : '+ref.care);
                        this.apport.setText('Nourriture : '+ref.feed);
                        this.costUse.setText('Coût d\'utilisation : '+ref.prix);
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    case 'sell':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('Prix : '+ref.unlockPrice+' $');
                        this.loss.setText('Bien-être animal : '+ref.care);
                        this.apport.setText('Faim dans le monde : '+ref.hunger);
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    case 'water_product':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('Prix : '+ref.unlockPrice+' $');
                        this.apport.setText('Gain passif : + '+ref.passif);
                        if(ref.need) this.loss.setText('Requis : '+getByTag(ref.need)[0].name);
                        if(!ref.need) this.loss.setText('');
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    case 'electricity_product':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('Prix : '+ref.unlockPrice+' $');
                        this.apport.setText('Gain passif : + '+ref.passif);
                        if(ref.need) this.loss.setText('Requis : '+getByTag(ref.need)[0].name);
                        if(!ref.need) this.loss.setText('');
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    case 'methane_product':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('Prix : '+ref.unlockPrice+' $');
                        this.apport.setText('Gain passif : + '+ref.passif);
                        if(ref.need) this.loss.setText('Requis : '+getByTag(ref.need)[0].name);
                        if(!ref.need) this.loss.setText('');
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    default:
                        this.nom.setText('');
                        this.prix.setText('');
                        this.loss.setText('');
                        this.apport.setText('');
                        this.costUse.setText('');
                        this.desc.setText('');
                        this.info.setText('');
                        this.barre.clear();
                        break;
                }
                this.barreHoriz.fillStyle(0xffffff, 1);
                this.barreHoriz.fillRect(0, window.innerHeight - 156, window.innerWidth, 2);
                this.barreHoriz2.fillStyle(0xffffff, 1);
                this.barreHoriz2.fillRect(0, window.innerHeight - 216, window.innerWidth, 2);
                this.barre.fillStyle(0xffffff, 1);
                this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                this.barre2.fillStyle(0xffffff, 1);
                this.barre2.fillRect(window.innerWidth/4 - 1, window.innerHeight - 215, 2, 60);
                this.barre3.fillStyle(0xffffff, 1);
                this.barre3.fillRect(2*window.innerWidth/4 - 1, window.innerHeight - 215, 2, 60);
                this.barre4.fillStyle(0xffffff, 1);
                this.barre4.fillRect(3*window.innerWidth/4 - 1, window.innerHeight - 215, 2, 60);
                break;
            case 'cat':
                switch(ref.tag) {
                    case 'fertility':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('');
                        this.loss.setText('');
                        this.apport.setText('');
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    case 'health':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('');
                        this.loss.setText('');
                        this.apport.setText('');
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    case 'meal':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('');
                        this.loss.setText('');
                        this.apport.setText('');
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    case 'sell':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('');
                        this.loss.setText('');
                        this.apport.setText('');
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    case 'struct':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('');
                        this.loss.setText('');
                        this.apport.setText('');
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    default:
                        this.nom.setText('');
                        this.prix.setText('');
                        this.loss.setText('');
                        this.apport.setText('');
                        this.costUse.setText('');
                        this.desc.setText('');
                        this.info.setText('');
                        this.barre.clear();
                        break;
                }
                
                this.barreHoriz.clear();
                this.barreHoriz2.clear();
                this.barre.clear();
                this.barre2.clear();
                this.barre3.clear();
                this.barre4.clear();
                this.barreHoriz.fillStyle(0xffffff, 1);
                this.barreHoriz.fillRect(0, window.innerHeight - 156, window.innerWidth, 2);
                this.barre.fillStyle(0xffffff, 1);
                this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                break;
            case 'struct':
                switch(ref.tag) {
                    case 'tank':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('');
                        this.loss.setText('');
                        this.apport.setText('');
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    case 'solaire':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('');
                        this.loss.setText('');
                        this.apport.setText('');
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    case 'methane':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('');
                        this.loss.setText('');
                        this.apport.setText('');
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    case 'sell':
                        this.nom.setText(ref.name).setOrigin(0.5,0);
                        this.prix.setText('');
                        this.loss.setText('');
                        this.apport.setText('');
                        this.costUse.setText('');
                        this.desc.setText(ref.desc);
                        this.info.setText(ref.info);
                        this.barre.clear();
                        this.barre.fillStyle(0xffffff, 1);
                        this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                        break;
                    default:
                        this.nom.setText('');
                        this.prix.setText('');
                        this.loss.setText('');
                        this.apport.setText('');
                        this.costUse.setText('');
                        this.desc.setText('');
                        this.info.setText('');
                        this.barre.clear();
                        break;
                }
                this.barreHoriz.clear();
                this.barreHoriz2.clear();
                this.barre.clear();
                this.barre2.clear();
                this.barre3.clear();
                this.barre4.clear();
                this.barreHoriz.fillStyle(0xffffff, 1);
                this.barreHoriz.fillRect(0, window.innerHeight - 156, window.innerWidth, 2);
                this.barre.fillStyle(0xffffff, 1);
                this.barre.fillRect(window.innerWidth/2 - 1, window.innerHeight - 155, 2, 200);
                break;
            default:
                this.nom.setText('');
                this.prix.setText('');
                this.loss.setText('');
                this.apport.setText('');
                this.costUse.setText('');
                this.desc.setText('');
                this.info.setText('');
                this.barre.clear();
                break; 
            
        }
        
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

}
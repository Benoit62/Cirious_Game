class Search extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'searchScene' });
        
        this.search = [];

        this.icones = [];

        this.circles = [];
    }

    create ()
    {

        for(let i in this.registry.list) {
            console.log(this.registry.list[i]);
            let obj = this.registry.list[i];
            if(obj.type && obj.type == 'search') {
                this.search.push(obj);
            }
        }


        let nbCategori = this.search.length +1;
        let compt1 = 0;
        this.search.forEach(function(value){
            let catIcone = this.add.image((innerWidth/nbCategori)*(compt1+1), 75, value.tag+'-search').setScale(0.2).setInteractive();
            let shineCatIcon = this.add.image((innerWidth/nbCategori)*(compt1+1), 75, 'circle').setScale(0.2).setVisible(false);
            this.circles.push(shineCatIcon);
            let compt2 = 0;
            let nbUnderCat = value.children.length+1;
            let arraySearchIcone = [];
            value.children.forEach(function(value) {
                let searchIcone = this.add.image((innerWidth/nbUnderCat)*(compt2+1), catIcone.y + 130, value.tag+'-search').setScale(0.15).setInteractive().setVisible(false);
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
                    this.displayText(value.type, value);
                }, this);
                compt2++;
                arraySearchIcone.push(searchIcone);
                this.icones.push(searchIcone);
            }, this);

            catIcone.on('pointerdown', function(){
                this.icones.forEach(function(img){
                    img.visible = false;
                }, this);
                arraySearchIcone.forEach(img => img.visible = !img.visible);
                this.circles.forEach(function(img){
                    img.visible = false;
                }, this);
                shineCatIcon.visible = !shineCatIcon.visible;
            }, this);

            catIcone.on('pointermove', function(){
                this.displayText(value.name, 0, 0, 0, value.desc, value.info);
            }, this);
            compt1++;
        }, this);



        this.nom = this.make.text({
            x: 10,
            y: window.innerHeight - 200,
            text: '',
            style:{
                color:'#f00020',
                fontSize:25,
                fontFamily:'monospace',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/5 - 20
                },
                lineSpacing:10
            }
        });

        this.prix = this.make.text({
            x: 10,
            y: innerHeight - 150,
            text: '',
            style:{
                color:'#0080ff',
                fontSize:25,
                fontFamily:'monospace',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/5 - 20
                },
                lineSpacing:10
            }
        });

        this.loss = this.make.text({
            x: 10,
            y: innerHeight -100,
            text: '',
            style:{
                color:'#0080ff',
                fontSize:25,
                fontFamily:'monospace',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/5 - 20
                },
                lineSpacing:10
            }
        });


        this.apport = this.make.text({
            x: 10,
            y: innerHeight - 50,
            text: '',
            style:{
                color:'#0080ff',
                fontSize:25,
                fontFamily:'monospace',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/5 - 20
                },
                lineSpacing:10
            }
        });


        this.desc = this.make.text({
            x: innerWidth/5,
            y: window.innerHeight - 200,
            text: '',
            style:{
                fontSize:17,
                fontFamily:'monospace',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/2.5
                },
                lineSpacing:10
            }
        });

        this.info = this.make.text({
            x: 3*(innerWidth/5) + 10,
            y: window.innerHeight - 200,
            text: '',
            style:{
                color:'#7f00ff ',
                fontSize:17,
                fontFamily:'monospace',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/2.5
                },
                lineSpacing:10
            }
        });


        let close = this.add.text(50, 50, 'X', { fontSize: 70, fontColor:'#ffffff', fontFamily:'monospace'}).setOrigin(0.5,0.5).setInteractive().on('pointerdown', function(){
            this.scene.stop('searchScene');
            this.scene.setVisible(true, this.registry.get('climat')+'Scene');            
            this.scene.launch('headerScene');
            this.scene.launch('menuScene');
            this.search = [];
        }, this);

    }

    update() {
        
        
    }

    displayText(type, ref){
        switch(type) {
            case 'fertility':
                this.nom.setText(ref.name);
                this.prix.setText('Prix : '+ref.unlockPrice);
                this.loss.setText('Ecologie : '+ref.ecology);
                this.apport.setText('Fertilité : '+ref.fertility);
                this.desc.setText(ref.desc);
                this.info.setText(ref.info);
                break;
            default:
                this.nom.setText('');
                this.prix.setText('');
                this.loss.setText('');
                this.apport.setText('');
                this.desc.setText('');
                this.info.setText('');
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
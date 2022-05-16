class Search extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'searchScene' });
        
        this.search = [];

        this.icones = [];
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
            let catIcone = this.add.image((innerWidth/nbCategori)*(compt1+1), innerHeight/6, value.tag+'-search').setScale(0.2).setInteractive();
            let compt2 = 0;
            let nbUnderCat = value.children.length+1;
            let arraySearchIcone = [];
            value.children.forEach(function(value) {
                let searchIcone = this.add.image((innerWidth/nbUnderCat)*(compt2+1), 3*(innerHeight/6), value.tag+'-search').setScale(0.15).setInteractive().setVisible(false);
                if(!value.unlock) {
                    searchIcone.setAlpha(0.3);
                }
                searchIcone.on('pointerdown', function(){
                    value.unlock = true;
                    searchIcone.setAlpha(1);
                }, this);
                searchIcone.on('pointermove', function(){
                    this.displayText(value.name, value.prix, value.desc, value.info)
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
            }, this);

            catIcone.on('pointermove', function(){
                this.displayText(value.name, 0, value.desc, value.info)
            }, this);
            compt1++;
        }, this);



        this.nom = this.make.text({
            x: 10,
            y: innerHeight + (innerHeight - 4*(innerHeight/6))/3,
            text: '',
            style:{
                color:'#f00020',
                fontSize:20,
                fontFamily:'monospace',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/4
                },
                lineSpacing:10
            }
        });

        this.prix = this.make.text({
            x: 10,
            y: innerHeight + 2*(innerHeight - 4*(innerHeight/6))/3,
            text: '',
            style:{
                color:'#0080ff',
                fontSize:25,
                fontFamily:'monospace',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/4
                },
                lineSpacing:10
            }
        });


        this.desc = this.make.text({
            x: innerWidth/4,
            y: 4*(innerHeight/6),
            text: '',
            style:{
                fontSize:17,
                fontFamily:'monospace',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/3
                },
                lineSpacing:10
            }
        });

        this.info = this.make.text({
            x: innerWidth/2,
            y: 4*(innerHeight/6),
            text: '',
            style:{
                color:'#008000',
                fontSize:17,
                fontFamily:'monospace',
                align:'center',
                wordWrap:{
                    width:window.innerWidth/3
                },
                lineSpacing:10
            }
        });


        let close = this.add.text(innerWidth - 50, innerHeight - 50, 'X', { fontSize: 70, fontColor:'#ffffff'}).setOrigin(0.5,0.5).setInteractive();
        close.on('pointerdown', function(){
            this.scene.stop('searchScene');
            this.scene.setVisible(true, this.registry.get('climat')+'Scene');            
            this.scene.launch('headerScene');
            this.scene.launch('menuScene');
            this.search = [];
        }, this);

    }

    update() {
        
        
    }

    displayText(nom, prix, desc, info){
        this.nom.setText(nom);
        if(prix != 0) this.prix.setText(prix+' €');
        this.desc.setText(desc);
        this.info.setText(info);
    }

}
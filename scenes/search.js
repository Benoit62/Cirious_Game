class Search extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'searchScene' });
        
        this.search = [];
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
            let catIcone = this.add.image((innerWidth/nbCategori)*(compt1+1), innerHeight/4, value.tag+'-search').setScale(0.2).setInteractive();
            let compt2 = 0;
            let nbUnderCat = value.children.length+1;
            let arraySearchIcone = [];
            value.children.forEach(function(value) {
                let searchIcone = this.add.image((innerWidth/nbUnderCat)*(compt2+1), 3*(innerHeight/4), value.tag+'-search').setScale(0.15).setInteractive().setVisible(false);
                if(!value.unlock) {
                    searchIcone.setAlpha(0.3);
                }
                searchIcone.on('pointerdown', function(){
                    value.unlock = true;
                    searchIcone.setAlpha(1);
                }, this);
                compt2++;
                arraySearchIcone.push(searchIcone);
            }, this);

            catIcone.on('pointerdown', function(){
                arraySearchIcone.forEach(img => img.visible = !img.visible);
            }, this);
            compt1++;
        }, this);


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

}
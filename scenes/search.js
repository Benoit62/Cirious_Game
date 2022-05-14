class Search extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'searchScene' });
        
        this.search = [];
    }

    create ()
    {

        this.registry.set('search1', {
            type:'search',
            tag:'fertility',
            name:'Engrais',
            children:getByType('fertility')
        });

        for(let i in this.registry.list) {
            console.log(this.registry.list[i]);
            let obj = this.registry.list[i];
            if(obj.type && obj.type == 'search') {
                this.search.push(obj);
            }
        }

        console.log(this.search);

        this.input.on('pointerdown', function(){
            this.scene.stop('searchScene');
            this.scene.setVisible(true, this.registry.get('climat')+'Scene');            
            this.scene.launch('headerScene');
            this.scene.launch('menuScene');
        }, this);


        this.search.forEach(function(value){
            this.add.image(100, 100, value.tag+'-search').setScale(0.1);
            let compt = 1;
            value.children.forEach(function(value) {
                let text = value.name;
                if(value.unlock){
                    text+=' => unlock';
                }
                else {
                    text+=' => lock';
                }
                let searchIcone = this.add.text(100, 100 + 30 * compt, text, { lineSpacing:9, fontSize:17, color:'#ffffff' }).setOrigin(0.5,0.5).setInteractive();
                searchIcone.on('pointerdown', function(){
                    value.unlock = true;
                    searchIcone.setText(value.name+' => unlock');
                }, this);
                compt++;
            }, this);
        }, this);

    }

    update() {
        
        
    }

}
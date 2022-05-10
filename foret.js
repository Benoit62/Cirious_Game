class Foret extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'foretScene' });
        this.player;
        this.cursors;
        this.animal1;
        this.animal2;
        this.struct1;
        this.struct2;
        this.field1;
        this.field2;
    }

    create ()
    {
        const farm = this.add.image(0, 0, 'desert');
        //Phaser.Display.Align.In.Center(farm, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
        this.cameras.main.zoom = 0.9;

        // Player
        this.player = this.physics.add.sprite(800, -270, 'dude').setDepth(2000);
        //Phaser.Display.Align.In.Center(this.player, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight));
        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'down',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });


        // On décale la caméra par rapport à la hauteur du header
        this.cameras.main.setBounds(farm.x-farm.width/2, farm.y-farm.height/2-50, farm.width, farm.height+50);
        this.physics.world.setBounds(farm.x-farm.width/2, farm.y-farm.height/2, farm.width, farm.height);

        this.cameras.main.startFollow(this.player);


        this.player.setCollideWorldBounds(true);

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {

        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-160);
            //player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(160);

            //player.anims.play('down', true);
        }
        else
        {
            this.player.setVelocityY(0);
        }

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        } 
        else
        {
            this.player.setVelocityX(0);
        }

        if(!this.cursors.left.isDown && !this.cursors.right.isDown) {
            
            this.player.anims.play('turn', true);
        }
    }

}
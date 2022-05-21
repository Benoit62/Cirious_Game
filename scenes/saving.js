class Saving extends Phaser.Scene {

    constructor() {
        super({
            key: 'saving'
        });
    }
    init(){
        let jsonRegistry = JSON.stringify(this.registry.values);
        console.log(jsonRegistry);
        let jsonEurope = JSON.stringify(this.scene.get('europeScene').data.values);
        let jsonAride = JSON.stringify(this.scene.get('arideScene').data.values);
        let jsonTropic = JSON.stringify(this.scene.get('tropicScene').data.values);
        let jsonPolaire = JSON.stringify(this.scene.get('polaireScene').data.values);
        if(!sav) {
            saveData(jsonRegistry, jsonEurope, jsonAride, jsonTropic, jsonPolaire);
        }
        else {
            updateData(jsonRegistry, jsonEurope, jsonAride, jsonTropic, jsonPolaire);
        }
    }
    preload() {
        

    }
    create() {
        this.scene.bringToTop('saving');
        var blur = this.add.graphics();
        blur.fillStyle(0x060606, 0.5);
        blur.fillRect(-100, -100, window.innerWidth + 100, window.innerHeight + 100);

        var progressBox = this.add.graphics();
        var progressBar = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 60,
            text: 'Saving.',
            style: {
                font: '25px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: '0%',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);


        var tmp = 'Saving';
        //update bar et txt loading
        //magie noire
        function progress(value) {
            percentText.setText(parseInt(value) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 3 * value, 30);
            if (value % 20 == 12) {
                var points = '';
                for (let j = 0; j <= value % 3; j++) {
                    points += '.';
                }
                loadingText.setText(tmp + points);
            }
            
        };
        //event loop pour l'update
        var i = 0;
        var timedEvent = this.time.addEvent({
            delay: 25,
            callback: onEvent,
            callbackScope: this,
            loop: true
        });
        //callBack
        function onEvent() {
            //si la bar est full
            if (i == 100) {
                timedEvent.remove(false);
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                window.location.href = 'profil.php';
            } else {
                progress(i);
                i+=1;
            }
        }
        
    }

}

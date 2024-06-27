let config = {
    type: Phaser.AUTO,
    width: 611,
    height: 980,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload : preload,     //veut dire que le preload sera implémenté par la fonction preload, etc.
        create: create,     
        update : update   
    }
};

let game = new Phaser.Game(config);
let blinkingStarImage;
let inc = 0.007;
//let t = 0;
let snowflakes;
let hb;
let snowTimer;
let snowButton;
let soundButton;
let ribbonButton;
let christmasSong;
let ribbonBrightTween;
let merryChristmasText;

function preload() {
    this.load.image('background', './assets/images/back_2.png'); //paramètres de type string donnant un alias(avec lequel on appelera l'image dans le code) et path
    this.load.image('star', './assets/images/obj/star.png');
    this.load.image('tree2', './assets/images/tree_2.png');
    this.load.image('bowl1', './assets/images/obj/obj_08.png');
    this.load.image('snowflake', './assets/images/snowflake.png');
    this.load.image('hb', './assets/images/Happy-Birthday.png');
    this.load.image('ribbon','./assets/images/ribbon.png');
    this.load.image('ribbonClear','./assets/images/ribbonClear.png');
    this.load.image('snowButton', './assets/images/obj/obj_10.png');
    this.load.image('soundIcon', './assets/images/obj/obj_02.png');
    this.load.image('ribbonIcon', './assets/images/obj/obj_03.png');
    this.load.image('emptyButton', './assets/images/button.png');
    this.load.image('gift', './assets/images/obj/obj_09.png');
    this.load.audio('music1', './assets/audio/christmasMusic.mp3');
    
    
}

function create() {
    //dessiner le fond de l'écran
    let backgroundImage = this.add.image(0, 0, 'background');//permet d'ajouter l'image. 3 arguments : les deux premiers : positionnement en X et Y.
    backgroundImage.setOrigin(0, 0);
    backgroundImage.setScale(0.5);//redéfinit taille de l'image. Facteur multiplicatif. Point et non virgule !!! (virgule sert à séparer les arguments)


    //dessiner étoiles
    //let rndWidth = Phaser.Math.Between(0, 611);//permet de faire un nombre aléatoire avec Phaser
    //let rndHeight = Phaser.Math.Between(0, 490);
    for(let i = 0; i<60; i++ ){
        let starImage = this.add.image(Phaser.Math.Between(0, 611), Phaser.Math.Between(0, 490), 'star');
        starImage.alpha = Phaser.Math.Between(40, 100)/100;//transparence des étoiles. On ne peut avoir que des int avec cette fonction
        starImage.setScale(Phaser.Math.Between(20, 80)/100);
    }
    
    //Etoile clignotante
    blinkingStarImage = this.add.image(Phaser.Math.Between(0, 611), Phaser.Math.Between(0, 490), 'star');
    blinkingStarImage.alpha = Phaser.Math.Between(40, 100)/100;//transparence des étoiles. On ne peut avoir que des int avec cette fonction
    blinkingStarImage.setScale(Phaser.Math.Between(20, 80)/100);
    let blinkingStarTween = this.tweens.add({ // un objet avec pleins de proprietes
        targets: blinkingStarImage,//objet impacté
        alpha: 0.2,//propriete impactée
        duration: 2000,//en ms
        ease: "Power2",//fonction de easing. On en choisit une, naturelle
        yoyo: true,//quand ça atteint la valeur, retourne à valeur d'origine
        loop: -1//activée
    })

    //dessiner le sapin
    let treeImage = this.add.image(config.width/2, config.height/2, 'tree2');
    //OU
    //let treeImage = this.add.image(0, 0, 'tree2');
    //treeImage.setOrigin(-0.14, -0.2);//s'exprime en pourcentage de la résolution, entre 0 et 1
    treeImage.setScale(0.5);


    //ajouter ribbon
    let ribbon1 = this.add.image(config.width/2 - 25, config.height/2,'ribbon');
    ribbon1.setScale(0.57);
    let ribbonBright = this.add.image(config.width/2 - 25, config.height/2,'ribbonClear');
    ribbonBright.setScale(0.57);
    ribbonBright.alpha = 1;
    ribbonBrightTween = this.tweens.add({
        targets: ribbonBright,
        alpha: 0.2,
        duration: 1200,
        ease: "Power2",
        yoyo: true,
        loop: -1
    })


    //ajouter boules
    let bowl01 = this.add.image(config.width/2, config.height/2,'bowl1');
    bowl01.setScale(0.3);
    let bowl02 = this.add.image(config.width/2 - 100, config.height/2 + 40,'bowl1');
    bowl02.setScale(0.3);
    let bowl03 = this.add.image(config.width/2 + 110, config.height/2 + 70,'bowl1');
    bowl03.setScale(0.3);
    let bowl04 = this.add.image(config.width/2 + 100, config.height/2 + 250,'bowl1');
    bowl04.setScale(0.3);
    let bowl05 = this.add.image(config.width/2 - 130, config.height/2 + 270,'bowl1');
    bowl05.setScale(0.3);
    let bowl06 = this.add.image(config.width/2 - 30, config.height/2 + 150,'bowl1');
    bowl06.setScale(0.3);
    let bowl07 = this.add.image(config.width/2 + 35, config.height/2 - 150,'bowl1');
    bowl07.setScale(0.3);
    let bowl08 = this.add.image(config.width/2 - 55, config.height/2 - 68,'bowl1');
    bowl08.setScale(0.3);
    let bowl09 = this.add.image(config.width/2 - 5, config.height/2 - 240,'bowl1');
    bowl09.setScale(0.3);

    //ajouter cadeau
    let gift1 = this.add.image(450, 800, 'gift').setInteractive();
    gift1.on('pointerdown', giftButtonDown);

    //ajouter boutons
    snowButton = this.add.image(525, 910,'snowButton').setInteractive();//met une interactivité
    snowButton.setScale(0.4);
    snowButton.on('pointerdown', snowButtonDown);

    soundButton = this.add.image(70, 910,'soundIcon').setInteractive();
    soundButton.setScale(0.45);
    soundButton.on('pointerdown', soundButtonDown);
    soundButton.alpha = 0.3;

    ribbonButton = this.add.image(config.width/2, 910,'ribbonIcon').setInteractive();
    ribbonButton.setScale(0.4);
    ribbonButton.on('pointerdown', ribbonButtonDown);

    

    //neige
    snowflakes = this.physics.add.group({
        defaultKey: 'snowflake',
        maxSize: 600
    })

    //timer : toutes les 200millisecondes, appelle 600 fois la fonction letItSnow. Remplace le update() !
    snowTimer = this.time.addEvent({
        delay: 200, // ms
        callback: letItSnow,
        callbackScope: this,
        repeat: -1//nombre de fois qu'il faut répéter l'appel toutes les 500millisecondes. -& = l'infini
        });
    
    //happyBirthday
    //hb = this.add.image(config.width /2, config.height/2, "hb");
    //hb.setScale(0.3);

    //message du cadeau
    emptyButton = this.add.image(config.width/2, config.height/2 - 150,'emptyButton');
    emptyButton.alpha = 0;
    merryChristmasText = this.add.text(config.width/2 - 165, config.height/2 - 180, 'Joyeux Noël !',
        { fontFamily: 'Arial', fontSize: 54, color: '#6fc815' });
    merryChristmasText.alpha = 0;

    //créer musique
    christmasSong = this.sound.add('music1');

    
 
    
}

function update() {
    //blinkingStarImage.alpha -= inc;
    //if(blinkingStarImage.alpha <= 0 || blinkingStarImage.alpha >= 1) inc = -inc;

    //OU
    //t += 0.03;//on fait avancer le temps, on avance sur la sinusoïde entre 1 et -1 (ou zéro si on fait une valeur absolue)
    //blinkingStarImage.alpha = Math.abs(Math.sin(t));
    //c'est une fonction de easing, plus joli et naturel, car pas linéaire.
    //autour de zéro et de 1, se stabilise un peu

    snowflakes.getChildren().forEach(//pour chacun des enfants du groupe
        function(snowflake) {
            if (snowflake.y>980) snowflake.destroy();//détruit un flocon pour le remettre dans le pool
        }, this);//en JS on définit une fonction en argument d'une méthode
        //on définit une fonction là où on en a besoin.
    
    //hb.scale -= inc;
    //if(hb.scale <= 0.2 || hb.scale >= 0.6) inc = -inc;
    

}

function letItSnow() {
    let snowflake = snowflakes.get();
    if(snowflake)//génère un flocon à chaque frame ! C'est pourquoi ne tombent pas tous en même temps !
        {
            snowflake.setPosition(Phaser.Math.Between(0, 611), 0);
            snowflake.setVelocity(0, 100);
        }
}

function snowButtonDown(){
    //alert()//on utilise souvent alert() pour voir si ça marche! > pas vraiment de débuggueur
    //c'est le timer qui décide s'il neige ou pas, car c'est le timer qui appelle letItSnow
    
    snowTimer.paused = ! snowTimer.paused; // RETENIR !!!
    if (! snowTimer.paused){
        snowButton.alpha = 1;
    }
    else snowButton.alpha = 0.4;
   
}

function soundButtonDown(){
    if(christmasSong.isPlaying) {
        christmasSong.pause();
        soundButton.alpha = 0.3;
    }
    else {
        christmasSong.play();
        soundButton.alpha = 1;
    }
}

function ribbonButtonDown(){
    if(ribbonBrightTween.isPlaying()){
        ribbonBrightTween.pause();
        ribbonButton.alpha = 0.3;
    }
    else{
        ribbonBrightTween.resume();
        ribbonButton.alpha = 1;
    }
}

function giftButtonDown(){
    //alert();
    emptyButton.alpha = 1;
    merryChristmasText.alpha = 1;
}
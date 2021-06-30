class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocket02', './assets/rocket02.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship02', './assets/spaceship02.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield02', './assets/starfield02.png'); // new background 
        this.load.image('starfield03', './assets/starfield03.png'); // new background 2
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield02 = this.add.tileSprite(0, 0, 640, 480, 'starfield02').setOrigin(0, 0);
        this.starfield03 = this.add.tileSprite(0, 0, 640, 480, 'starfield03').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x696bff).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);  // color
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);  // color
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.3, 0);
        // add rocket (p2)
        this.p2Rocket = new Rocket02(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket02').setOrigin(0.6, 0);
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship02(this, game.config.width, borderUISize*4 + borderPadding*4, 'spaceship02', 0, 45).setOrigin(0,0);
        // define keys - restart
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // define keys - p1 play
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); // p1
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); //p1
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);//p1
        // define keys - p2 play
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H); // p2
        keyLEFT02 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J); //p2
        keyRIGHT02 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);//p2
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Tahoma',
            fontSize: '28px',
            backgroundColor: '#fcf800',
            color: '#ecbdf0',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*1.5, this.p1Score, scoreConfig);
        
        //GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'You will do better next time!', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to fight demons again', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // timeleft set
        this.timeLeft = this.add.text(borderUISize * 10 + borderPadding * 0.5, borderUISize * 1.5 + borderPadding*0.5, this.timerLeft, scoreConfig);
    }

    update() {
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if (!this.gameOver){
            this.ship01.update();               // update spaceships (x4)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.starfield.tilePositionX -= 4;
            this.starfield02.tilePositionX -= 2;
            this.starfield03.tilePositionX -= 6;
            this.p1Rocket.update();
            this.p2Rocket.update();
        }

        // check collisions for p1
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }

        // check collisions for p2
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p2Rocket, this.ship04)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship04);
        }
        console.log((game.settings.gameTimer - this.clock.elapsed)/1000);
        this.timeLeft.text = (game.settings.gameTimer - this.clock.elapsed) / 1000;
    }

    checkCollision(rocket, ship) { // p1
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    checkCollision(rocket02, ship) { // p2
        // simple AABB checking
        if (rocket02.x < ship.x + ship.width && 
            rocket02.x + rocket02.width > ship.x && 
            rocket02.y < ship.y + ship.height &&
            rocket02.height + rocket02.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
      }
}
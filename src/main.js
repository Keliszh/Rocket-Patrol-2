let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 2;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyH, keyLEFT02, keyRIGHT02;


/*------Possible attempt in this project------
(I am listing all that I think I should have done already, but I maybe misunderstood some rules, or I have done something I ddin't even notice.)
1. Tutorial
2. Display the time remaining in sec
3. Replace the UI with new artwork
4. Create new title screen with new artwork, typography, layout
5. Implement parallax scrolling in game
6. Create a new spaceship type with new artwork that is smaller faster and worth more points
7. Create new artwork for all of the in-game assets(Rocket, spaceships, explosion)
8. Create and implement a new weapon
9. Implement a simultaneous two-player mode.
10.Redesign the game's artwork, UI, and Sound to change it theme and aesthetic other than sci-fi
----------------------------------------------
*/
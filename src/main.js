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


/*------Xingwei Christopher Zhang---------
-------Rocket Patrol: Demon Slayer--------
--------------06 - 29 - 2021--------------
-----Possible Attempt in this Project-----
1. Tutorial
2. Display the time remaining in sec
3. Replace the UI with new artwork
4. Create new title screen with new artwork, typography, layout
5. Implement parallax scrolling in game
6. Create a new spaceship type with new artwork that is smaller faster and worth more points
7. Create new artwork for all of the in-game assets(Rocket, spaceships, explosion)
8. Create and implement a new weapon
9. Implement a simultaneous two-player mode
10.Redesign the game's artwork, UI, and Sound to change it theme and aesthetic other than sci-fi
----------------------------------------------
-I Want to Thank for People who Helped Me on the Ideas of Rocket Patro and Git Settings-
1. Isaac Karth
2. Guanchen Liu
3. Chenyang Xu
4. Yongbo Wang
They are My Teachers and My Teammates of CMPM120 2021 Summer.
*/
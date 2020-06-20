// Control related:
// Max delay between touches that still count as a double-tap (specified in milliseconds):
export const DOUBLE_TAP_TIMING = 400;

// Player related:
// Height of the player in-game as a fraction of screen height:
export const PLAYER_HEIGHT = 0.2;
// Vertical position of the player as a fraction of screen height:
export const PLAYER_POSITION = 0.8;
// Walking speed of the player as a fraction of screen height per second:
export const PLAYER_WALK_SPEED = 0.1;
// Running speed of the player as a fraction of screen height per second:
export const PLAYER_RUN_SPEED = 0.2;
// Player spritesheet:
export const PLAYER_SHEET = require('./assets/player.png');
// Number of columns in the player spritesheet:
export const PLAYER_SHEET_COLS = 64;
// Number of rows in the player spritesheet:
export const PLAYER_SHEET_ROWS = 8;
// Framerate of player animation:
export const PLAYER_ANIM_FPS = 10;

// Background related:
// Height of the background in-game as a fraction of screen height:
export const BACKGROUND_HEIGHT = 1;
// Right edge of the world as a fraction of screen height:
export const BACKGROUND_LIMIT = 13.5;
// Background 0 spritesheet:
export const BACKGROUND_SHEET_0 = require('./assets/background0.png');
// Background 1 spritesheet:
export const BACKGROUND_SHEET_1 = require('./assets/background1.png');
// Background 2 spritesheet:
export const BACKGROUND_SHEET_2 = require('./assets/background2.png');
// Background 3 spritesheet:
export const BACKGROUND_SHEET_3 = require('./assets/background3.png');
// Background 4 spritesheet:
export const BACKGROUND_SHEET_4 = require('./assets/background4.png');
// Background 5 spritesheet:
export const BACKGROUND_SHEET_5 = require('./assets/background5.png');
// Background 6 spritesheet:
export const BACKGROUND_SHEET_6 = require('./assets/background6.png');
// Number of columns in the background spritesheet(s):
export const BACKGROUND_SHEET_COLS = 1;
// Number of rows in the background spritesheet(s):
export const BACKGROUND_SHEET_ROWS = 1;
// Number of sprites in the background spritesheet(s):
export const BACKGROUND_SHEET_SPRITES = 1;
// Framerate of background animation:
export const BACKGROUND_ANIM_FPS = 5;

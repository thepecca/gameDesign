
var width = 1024;
var height = 768;
var game = new Phaser.Game (width, height, Phaser.WEBGL, '');



var cursors;
var fireButton;
var jumpButton;
var dragButton;
var pauseButton;
var player;
var enemies;
var ghostSpeed;
var living= 100;
var myArr = (''+Array(150)).split(',').map(function(){return this[0]++;}, [1]);
var playerHurt;
var playerPower;
var enemyStat;
var boxActive;
var hurtLevelStat;
var checkpointN;
var resx;
var resy;
var bulletsLeft;
var diamondsN;
var bufferConf = 0;
var choosePlayer;
var timeMode = 0;
var timeModeClock = 0;
var enableBuffer=0;
var renderFrame = 0;
var music;





var bufferState = {
    preload: function() {
        if (bufferConf == 0){
          game.load.image('start', 'assets/menu/start.png');
          game.load.image('play_button', 'assets/menu/play_button.png');
        }
        else if (bufferConf == 1){
          game.load.image('players_background', 'assets/menu/players_background.png');
          game.load.image('player1', 'assets/menu/player1.png');
          game.load.image('player2', 'assets/menu/player2.png');
        }
        else if (bufferConf == 2){
          game.load.image('time_background', 'assets/menu/time_background.png');
          game.load.image('classic_mode', 'assets/menu/classic_mode.png');
          game.load.image('time_mode', 'assets/menu/time_mode.png');
        }
        else if (bufferConf == 3){
          game.load.image('controls_background', 'assets/menu/sprite_pause.png');
          game.load.image('skip', 'assets/menu/skip.png');
        }
        else if (bufferConf == 4){
          game.load.image('render1A', 'assets/menu/render1A.png');
          game.load.image('render1B', 'assets/menu/render1B.png');
          game.load.image('skip', 'assets/menu/skip.png');
        }
        else if (bufferConf == 5){
          game.load.image('render2A', 'assets/menu/render2A.png');
          game.load.image('render2B', 'assets/menu/render2B.png');
          game.load.image('skip', 'assets/menu/skip.png');
        }
        else if (bufferConf == 6){
          game.load.image('render3A', 'assets/menu/render3A.png');
          game.load.image('render3B', 'assets/menu/render3B.png');
          game.load.image('skip', 'assets/menu/skip.png');
        }
        else if (bufferConf == 7){
          game.load.image('render4A', 'assets/menu/render4A.png');
          game.load.image('render4B', 'assets/menu/render4B.png');
          game.load.image('render4C', 'assets/menu/render4C.png');
          game.load.image('skip', 'assets/menu/skip.png');
        }
        else if (bufferConf == 8){
          game.load.image('render5A', 'assets/menu/render5A.png');
          game.load.image('render5B', 'assets/menu/render5B.png');
          game.load.image('render5C', 'assets/menu/render5C.png');
          game.load.image('skip', 'assets/menu/skip.png');
        }
        else if (bufferConf == 9){
          game.load.image('render6A', 'assets/menu/render6A.png');
          game.load.image('render6B', 'assets/menu/render6B.png');
          game.load.image('skip', 'assets/menu/skip.png');
        }
        else if (bufferConf == 10){
          game.load.image('end', 'assets/menu/end.png');
          game.load.spritesheet('scoreGemme', 'assets/menu/scoreGemme.png',250,72);
          game.load.spritesheet('scoreClessidra', 'assets/menu/scoreClessidra.png',250,72);
          game.load.image('restart_button', 'assets/menu/restart_button.png');
          game.load.image('autori_button', 'assets/menu/autori_button.png');
        }
        else if (bufferConf == 11){
          game.load.image('autori_background', 'assets/menu/autori_background.png');
        }
    },

    create: function() {
        game.plugins.add(Phaser.Plugin.ArcadeSlopes);
        game.scale.pageAlignHorizontally = true;
        //game.scale.pageAlignVertically = true;
        setTimeout(function() {
          enableBuffer=1;
        }, 100);
        images = game.add.group();
        images.inputEnableChildren = true;
        images.onChildInputDown.add(this.imageClick,this);
        if (bufferConf == 0){
          image0 = game.add.sprite(width/2, height/2, 'start');
          image1 = images.create(width/2-113, 399, 'play_button');
        }
        else if (bufferConf == 1){
          image0 = game.add.sprite(width/2, height/2, 'players_background');
          image1 = images.create(242, 245, 'player1');
          image1.name = 'player1';
          image2 = images.create(580, 245, 'player2');
          image2.name = 'player2';
        }
        else if (bufferConf == 2){
          image0 = game.add.sprite(width/2, height/2, 'time_background');
          image1 = images.create(220, 290, 'classic_mode');
          image1.name = 'classic_mode';
          image2 = images.create(595, 290, 'time_mode');
          image2.name = 'time_mode';
        }
        else if (bufferConf == 3){
          image0 = images.create(width/2, height/2, 'controls_background');
          image1 = images.create(750, 640, 'skip');
          image1.name = 'skip';
        }
        else if (bufferConf == 4){
          if(renderFrame==0){frame = 'render1A';renderFrame++;}
          else if(renderFrame==1){frame = 'render1B';renderFrame++;}
          image0 = images.create(width/2, height/2, frame);
          image1 = images.create(750, 640, 'skip');
          image1.name = 'skip';
        }
        else if (bufferConf == 5){
          if(renderFrame==0){frame = 'render2A';renderFrame++;}
          else if(renderFrame==1){frame = 'render2B';renderFrame++;}
          image0 = images.create(width/2, height/2, frame);
          image1 = images.create(750, 640, 'skip');
          image1.name = 'skip';
        }
        else if (bufferConf == 6){
          if(renderFrame==0){frame = 'render3A';renderFrame++;}
          else if(renderFrame==1){frame = 'render3B';renderFrame++;}
          image0 = images.create(width/2, height/2, frame);
          image1 = images.create(750, 640, 'skip');
          image1.name = 'skip';
        }
        else if (bufferConf == 7){
          if(renderFrame==0){frame = 'render4A';renderFrame++;}
          else if(renderFrame==1){frame = 'render4B';renderFrame++;}
          else if(renderFrame==2){frame = 'render4C';renderFrame++;}
          image0 = images.create(width/2, height/2, frame);
          image1 = images.create(750, 640, 'skip');
          image1.name = 'skip';
        }
        else if (bufferConf == 8){
          if(renderFrame==0){frame = 'render5A';renderFrame++;}
          else if(renderFrame==1){frame = 'render5B';renderFrame++;}
          else if(renderFrame==2){frame = 'render5C';renderFrame++;}
          image0 = images.create(width/2, height/2, frame);
          image1 = images.create(750, 640, 'skip');
          image1.name = 'skip';
        }
        else if (bufferConf == 9){
          if(renderFrame==0){frame = 'render6A';renderFrame++;}
          else if(renderFrame==1){frame = 'render6B';renderFrame++;}
          image0 = images.create(width/2, height/2, frame);
          image1 = images.create(750, 640, 'skip');
          image1.name = 'skip';
        }
        else if (bufferConf == 10){
          image0 = game.add.sprite(width/2, height/2, 'end');
          image1 = images.create(765, 560, 'autori_button');
          image2 = images.create(84, 560, 'restart_button');
          image2.name = 'play_button';
          image2.scale.set(0.7);
          if(!timeMode){
            diamondsCalc();
          }
          if(timeMode){
            timeCalc();
            text3 = game.add.text(0,500,'Il tuo tempo è di: ' + toHHMMSS(timeModeClock), {fill:"#ffffff",fontSize:40});
            text3.x = width/2 - text3.width/2;
          }
        }
        else if (bufferConf == 11){
          image0 = images.create(width/2, height/2, 'autori_background');
        }

        image0.anchor.set(0.5);
        game.world.sendToBack(image0);

    },


    imageClick: function(sprite) {
      if(enableBuffer){

        if(sprite.name=='player1'){choosePlayer=1;}
        else if(sprite.name=='player2'){choosePlayer=0;}

        if(sprite.name=='classic_mode'){timeMode = 0;}
        else if(sprite.name=='time_mode'){timeMode = 1; bufferConf= 10; enableBuffer=0; game.state.start('level1'); return}

        if(sprite.name=='skip'){
          if(bufferConf<5){ bufferConf=6; enableBuffer=0; game.state.start('level1'); return}
          else if(bufferConf==6){bufferConf=8; enableBuffer=0; game.state.start('level2'); return}
          else if(bufferConf==8){bufferConf=10; enableBuffer=0; game.state.start('buffer'); return}
        }

        if(sprite.name=='play_button' && bufferConf==10){bufferConf=0; enableBuffer=0; game.state.start('buffer'); return}

        if (bufferConf == 0){
          bufferConf = 1;
          enableBuffer=0;
          game.state.start('buffer');
        }
        else if (bufferConf == 1){
          bufferConf = 2;
          enableBuffer=0;
          game.state.start('buffer');
        }
        else if (bufferConf == 2){
          bufferConf = 3;
          enableBuffer=0;
          game.state.start('buffer');
        }
        else if (bufferConf == 3){
          bufferConf = 4;
          enableBuffer=0;
          game.state.start('buffer');
        }
        else if (bufferConf == 4){
          if(renderFrame==2){
            renderFrame = 0;
            bufferConf = 5;
          }
          enableBuffer=0;
          game.state.start('buffer');
        }
        else if (bufferConf == 5){
          enableBuffer=0;
          if(renderFrame==2){
            renderFrame = 0;
            bufferConf = 6;
            game.state.start('level1');
          }
          else {game.state.start('buffer');}
        }
        else if (bufferConf == 6){
          if(renderFrame==2){
            renderFrame = 0;
            bufferConf = 7;
          }
          enableBuffer=0;
          game.state.start('buffer');
        }
        else if (bufferConf == 7){
            enableBuffer=0;
          if(renderFrame==3){
            renderFrame = 0;
            bufferConf = 8;
            game.state.start('level2');
          }
          else{game.state.start('buffer');}
        }
        else if (bufferConf == 8){
          if(renderFrame==3){
            renderFrame = 0;
            bufferConf = 9;
          }
          enableBuffer=0;
          game.state.start('buffer');
        }
        else if (bufferConf == 9){
          if(renderFrame==2){
            renderFrame = 0;
            bufferConf = 10;
          }
          enableBuffer=0;
          game.state.start('buffer');
        }
        else if (bufferConf == 10){
          bufferConf = 11;
          enableBuffer=0;
          game.state.start('buffer');
        }
        else if (bufferConf == 11){
          bufferConf = 10;
          enableBuffer=0;
          game.state.start('buffer');
        }
    }
  }

}
game.state.add('buffer', bufferState);

var level1Stat = {
  preload: preload1,
  create: create1,
  update: update1
}
game.state.add('level1', level1Stat);

var level2Stat = {
  preload: preload2,
  create: create2,
  update: update2
}
game.state.add('level2', level2Stat);


game.state.start('buffer');


//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************

function preload1() {
    if(choosePlayer==1){game.load.spritesheet('player', 'assets/player1.png', 24, 42);}
    else if (choosePlayer==0){game.load.spritesheet('player', 'assets/player2.png', 24, 42);}
    game.load.spritesheet('player_rainbow', 'assets/player_rainbow.png', 24, 42);
    game.load.spritesheet('armor', 'assets/scheleton.png',18,50);
    game.load.tilemap('mappa', 'mappa1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('background', 'assets/background1.png');
    if(!timeMode){game.load.image('menubar', 'assets/menubar1.png');}
    else if(timeMode){game.load.image('menubar', 'assets/menubar2.png');}
    game.load.spritesheet('portal', 'assets/portal1.png',96,64);
    game.load.spritesheet('platform', 'assets/platform1.png');
    game.load.image('all_tiles', 'assets/all_tiles.png');
    game.load.image('chandelier', 'assets/chandelier.png');
    game.load.image('pebble', 'assets/pebble.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('box', 'assets/box.png');
    game.load.image('checkpoint', 'assets/checkpoint.png');
    game.load.image('slopes', 'assets/slopes1.png');
    game.load.image('sprite_pause', 'assets/menu/sprite_pause.png');
    game.load.image('pop_up1', 'assets/menu/pop_up1.png');
    game.load.image('pop_up2', 'assets/menu/pop_up2.png');
    game.load.audio('music_level1', ['assets/audio/music_level1.mp3']);
}

function preload2() {
    if(choosePlayer==1){game.load.spritesheet('player', 'assets/player1.png', 24, 42);}
    else if (choosePlayer==0){game.load.spritesheet('player', 'assets/player2.png', 24, 42);}
    game.load.spritesheet('player_rainbow', 'assets/player_rainbow.png', 24, 42);
    game.load.spritesheet('ghost', 'assets/ghost.png', 24, 50);
    game.load.spritesheet('armor', 'assets/armor.png',30,50);
    game.load.tilemap('mappa', 'mappa2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('background', 'assets/background2.png');
    if(!timeMode){game.load.image('menubar', 'assets/menubar1.png');}
    else if(timeMode){game.load.image('menubar', 'assets/menubar2.png');}
    game.load.spritesheet('hidden0', 'assets/hidden0.png');
    game.load.spritesheet('hidden1', 'assets/hidden1.png');
    game.load.spritesheet('hidden2', 'assets/hidden2.png');
    game.load.spritesheet('platform', 'assets/platform2.png');
    game.load.spritesheet('mirror', 'assets/mirror.png',72,100);
    game.load.spritesheet('mirrorhd', 'assets/mirrorhd.png',216,300);
    game.load.spritesheet('portal', 'assets/portal2.png',46,64);
    game.load.image('all_tiles', 'assets/all_tiles.png');
    game.load.image('chandelier', 'assets/chandelier.png');
    game.load.image('pebble', 'assets/pebble.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('box', 'assets/box.png');
    game.load.image('checkpoint', 'assets/checkpoint.png');
    game.load.image('mirrorFrag', 'assets/mirrorFrag.png');
    game.load.image('slopes', 'assets/slopes2.png');
    game.load.image('sprite_pause', 'assets/menu/sprite_pause.png');
    game.load.image('ghost_kill', 'assets/menu/ghost_kill.png');
    game.load.image('partial_frags', 'assets/menu/partial_frags.png');
    game.load.image('pop_up1', 'assets/menu/pop_up1.png');
    game.load.image('pop_up2', 'assets/menu/pop_up2.png');
    game.load.audio('music_level2', ['assets/audio/music_level2.mp3']);
}

//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
function create1() {

    var context = new AudioContext();
    context.resume();
    music = new Phaser.Sound(game,'music_level1',1,true);

    baseVars();


    createMap(1);

    objectsSetUp();

    playerSetUp();

    enemiesSetUp();

    weaponSetUp();

    createMap(0);

    menubar = game.add.image(0,0 ,'menubar');
    menubar.fixedToCamera = true;


    bulletsCounter = game.add.text(80,16, bulletsLeft, {fill:"#ffffff"});
    bulletsCounter.fixedToCamera = true;

    if(!timeMode){
      diamondsCounter = game.add.text(195,16, diamondsN, {fill:"#ffffff"});
      diamondsCounter.fixedToCamera = true;
    }

    //portal
    portal = game.add.sprite( 95*32, 2*32 , 'portal');

    //Platforms
    platformSetUp();

    game.camera.follow(player);

    //Stat update
    game.time.events.loop(1000, ticToc);

    //Time Mode
    if(timeMode){
      timeModeText = game.add.text(400,16,toHHMMSS(timeModeClock), {fill:"#ffffff"});
      timeModeText.x = width/2 - timeModeText.width/2;
      game.time.events.loop(1, function(){ timeModeClock++; });
      timeModeText.fixedToCamera = true;
    }

    //Control keys
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.F);
    dragButton = game.input.keyboard.addKey(Phaser.Keyboard.C);
    pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.M);

    if(!timeMode){gamePause('pop_up1');}

}

function create2() {

    music = new Phaser.Sound(game,'music_level2',1,true);

    baseVars2();

    createMap(1);

    objectsSetUp();

    playerSetUp();

    enemiesSetUp();

    weaponSetUp();

    createMap(0);

    //Ghost
    ghost = game.add.sprite(64,64, 'ghost');
    game.physics.arcade.enable(ghost);


    menubar = game.add.image(0,0 ,'menubar');
    menubar.fixedToCamera = true;


    bulletsCounter = game.add.text(80,16, bulletsLeft, {fill:"#ffffff"});
    bulletsCounter.fixedToCamera = true;

    if(!timeMode){
      diamondsCounter = game.add.text(195,16, diamondsN, {fill:"#ffffff"});
      diamondsCounter.fixedToCamera = true;
    }

    //mirror
    mirror = game.add.sprite(20,74, 'mirror',0);
    mirror.height =height/8;
    mirror.width =mirror.height*72/100;
    mirror.fixedToCamera = true;

    //portal
    portal = game.add.sprite( 97*32, 4*32 , 'portal',0);

    //Platforms
    platformSetUp();


    game.camera.follow(player);

    //Stat update
    game.time.events.loop(1000, ticToc);

    //Time Mode
    pause_mirror = 0;
    if(timeMode){
      game.time.events.loop(1, function(){ timeModeClock++; });
      timeModeText = game.add.text(400,16,toHHMMSS(timeModeClock), {fill:"#ffffff"});
      timeModeText.x = width/2 - timeModeText.width/2;
      timeModeText.fixedToCamera = true;
      pause_mirror = 1;
    }


    //Control keys
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.F);
    dragButton = game.input.keyboard.addKey(Phaser.Keyboard.C);
    pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.M);

    if(!timeMode){gamePause('pop_up2');}

}

//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************

function update1() {

    if(!music.isPlaying){music.play();}

    //Player
    game.physics.arcade.collide(player, play);
    game.physics.arcade.collide(player, slopes);
    hurtControl();
    powerControl();

    //Boxes
    game.physics.arcade.collide(player, boxes, function(player, box){boxActive = box;});
    game.physics.arcade.collide(boxes);
    game.physics.arcade.collide(boxes, hurts);
    game.physics.arcade.collide(boxes, play);
    game.physics.arcade.collide(boxes, slopes);
    boxControl();

    //Enemies interactions
    game.physics.arcade.collide(enemies, boxes);
    game.physics.arcade.overlap(player, enemies, function(p,e){ if(e.enemyStat==0){hitPlayer(10);} });
    game.physics.arcade.overlap(enemies, weapon.bullets, function(e, bullet) {e.enemyStat=10; bullet.kill(); });
    moveIt(armor0,3*32,16*31,60);
    moveIt(armor1,25*32,39*32,50);
    moveIt(armor2,72*32,92*32,200);

    //Checkpoint
    game.physics.arcade.overlap(player, checkpoints, function(player, checkpoint){ activate_checkpoint(checkpoint);});

    //Portal
    if(checkOverlap(player, portal)){
      music.destroy();
      if(!timeMode){game.state.start('buffer');}
      else if (timeMode){game.state.start('level2');}
    };

    //Platform
    game.physics.arcade.collide(player, platforms, function(player, platform) { platformLock(player, platform);});
    lockControl();


    //Powerup collect
    game.physics.arcade.overlap(player, chandeliers, function(player, chandelier){ collect_chandelier(chandelier,7);});

    //Bullet interactions
    game.physics.arcade.overlap(player, pebbles, function(player, pebble){ collect_pebble(pebble);});
    game.physics.arcade.collide(weapon.bullets, play, function(bullet){ bullet.kill(); });
    game.physics.arcade.collide(weapon.bullets, hurts, function(bullet){ bullet.kill(); });
    game.physics.arcade.collide(weapon.bullets, slopes, function(bullet){ bullet.kill(); });

    if(!timeMode){
      //Diamonds
      game.physics.arcade.overlap(player, diamonds, function(player, diamond) { collect_diamond(player, diamond);});
      diamondsCounter.text = diamondsN;
    }

    bulletsCounter.text = bulletsLeft;


    if(timeMode){
      timeModeText.text = toHHMMSS(timeModeClock);
      if(timeModeClock == 3600){timeModeText.x = width/2 - timeModeText.width/2; timeModeText.fixedToCamera = true;}
    }

    controls();


}

function update2() {

    if(!music.isPlaying){music.play();}

    //Player
    game.physics.arcade.collide(player, play);
    game.physics.arcade.collide(player, slopes);
    hurtControl();
    hiddenLayer();
    powerControl();

    //Boxes
    game.physics.arcade.collide(player, boxes, function(player, box){boxActive = box;});
    game.physics.arcade.collide(boxes);
    game.physics.arcade.collide(boxes, hurts);
    game.physics.arcade.collide(boxes, play);
    game.physics.arcade.collide(boxes, slopes);
    boxControl();

    //Ghost
    game.physics.arcade.overlap(player, ghost, function(){ hitPlayer(-5); gamePause('ghost_kill')});
    ghostControl(player.x, player.y);

    //Enemies interactions
    game.physics.arcade.collide(enemies, boxes);
    game.physics.arcade.overlap(player, enemies, function(p,e){ if(e.enemyStat==0){hitPlayer(10);} });
    game.physics.arcade.overlap(enemies, weapon.bullets, function(e, bullet) {e.enemyStat=10; bullet.kill(); });
    moveIt(armor0,10*32,15*32,30);
    moveIt(armor1,46*32,52*32,30);
    moveIt(armor2,54*32,67*32,80);

    //Checkpoint
    game.physics.arcade.overlap(player, checkpoints, function(player, checkpoint){ activate_checkpoint(checkpoint);});

    //Portal
    if(checkOverlap(player, portal)){  music.destroy(); endLevel();};

    //Platform
    game.physics.arcade.collide(player, platforms, function(player, platform) { platformLock(player, platform);});
    lockControl();

    //Mirror Frags
    game.physics.arcade.overlap(player, mirrorFrags, function(player, mirrorFrag){mirrorUpdate(mirrorFrag); pause(1, 'mirrorhd', pause_mirror, 3-living);});

    //Powerup collect
    game.physics.arcade.overlap(player, chandeliers, function(player, chandelier){ collect_chandelier(chandelier,7);});

    //Bullet interactions
    game.physics.arcade.overlap(player, pebbles, function(player, pebble){ collect_pebble(pebble);});
    game.physics.arcade.collide(weapon.bullets, play, function(bullet){ bullet.kill(); });
    game.physics.arcade.collide(weapon.bullets, hurts, function(bullet){ bullet.kill(); });
    game.physics.arcade.collide(weapon.bullets, slopes, function(bullet){ bullet.kill(); });

    if(!timeMode){
      //Diamonds
      game.physics.arcade.overlap(player, diamonds, function(player, diamond) { collect_diamond(player, diamond);});
      diamondsCounter.text = diamondsN;
    }

    bulletsCounter.text = bulletsLeft;


    if(timeMode){
      timeModeText.text = toHHMMSS(timeModeClock);
      if(timeModeClock == 3600){timeModeText.x = width/2 - timeModeText.width/2; timeModeText.fixedToCamera = true;}
    }

    controls();


}

//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************
function gamePause(sprite){

  game.paused = true;
  sprite_pause = game.add.sprite(game.camera.x,0, sprite);
  sprite_pause.inputEnabled = true;
  game.input.onDown.add(function(){
    if(enableBuffer){
      sprite_pause.destroy();
      game.paused = false;
      enableBuffer=0;
    }
  });
  var screenshotKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
  screenshotKey.onDown.add(function () {
    if(enableBuffer){
      sprite_pause.destroy();
      game.paused = false;
      enableBuffer=0;
    }
  });
  setTimeout(function() {
    enableBuffer=1;
  }, 1000);
}

function baseVars(){

  playerHurt = 0;
  playerPower = 0;
  boxActive = null;
  hurtLevelStat = 1;
  checkpointN = 0;
  resx=40;
  resy=64;
  bulletsLeft = 0;
  diamondsN = 0;
}

function baseVars2(){

  playerHurt = 0;
  playerPower = 0;
  enemyStat = 0;
  boxActive = null;
  hurtLevelStat = 1;
  checkpointN = 0;
  bulletsLeft = 0;
  resx=64;
  resy=661;
}

function toHHMMSS(secs) {
    var sec_num = parseInt(secs)
    var minutes = Math.floor(sec_num / 3600) % 60
    var seconds = Math.floor(sec_num / 60) % 60
    var primes = sec_num % 60
    return [minutes,seconds,primes]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}

function pause(sec,sprite, control, frame){
  if(!control){
    game.paused = true;
    sprite_use = game.add.sprite(game.camera.x + width/2, height/2, sprite);
    sprite_use.anchor.setTo(0.5, 0.5);
    if (sprite=='mirrorhd'){
      sprite_use.frame= frame;
    }
    setTimeout(function() {
      sprite_use.destroy();
      game.paused = false;
    }, sec * 1000);
  }
}

function resetWorld(fade){

  if(fade==1){
    game.camera.fade('#000000',2000);
    game.camera.onFadeComplete.add(function() {
      bulletsLeft = 0;
      playerHurt=0;
      playerPower=0;
      enemyStat=0;
      this.checkpoints.children.forEach(function(h) {
        h.revive();
      });
      //checkpoints.setAll('body.immovable', true);
      this.pebbles.children.forEach(function(h) {
        h.revive();
      });
      //pebbles.setAll('body.immovable', true);
      this.chandeliers.children.forEach(function(h) {
        h.revive();
      });
      //chandeliers.setAll('body.immovable', true);
      game.camera.reset(resx, resy);
      game.camera.follow(player);
      player.reset(resx, resy);
      if(game.state.current == "level1"){
        upDown.stop();
        platform0.position.setTo(95*32,14*32-1);
        platformTween();
      }
      if(game.state.current == "level2"){
        upDown.stop();
        platform0.position.setTo(70*32,21*32-1);
        platformTween();
        if(resx==64){ghost.reset(0, 192);}
        else{ghost.reset(resx-(width/2), 96)}
      }
    });
  }
  else if (fade==0){
    bulletsLeft = 0;
    playerHurt=0;
    playerPower=0;
    enemyStat=0;
    this.checkpoints.children.forEach(function(h) {
      h.revive();
    });
    //checkpoints.setAll('body.immovable', true);
    this.pebbles.children.forEach(function(h) {
      h.revive();
    });
    //pebbles.setAll('body.immovable', true);
    this.chandeliers.children.forEach(function(h) {
      h.revive();
    });
    //chandeliers.setAll('body.immovable', true);
    game.camera.reset(resx, resy);
    game.camera.follow(player);
    player.reset(resx, resy);
    if(game.state.current == "level1"){
      upDown.stop();
      platform0.position.setTo(95*32,14*32-1);
      platformTween();
    }
    if(game.state.current == "level2"){
      upDown.stop();
      platform0.position.setTo(70*32,21*32-1);
      platformTween();
      if(resx==64){ghost.reset(0, 192);}
      else{ghost.reset(resx-(width/2), 96)}
    }
  }
}

function endLevel(){

    if (!living){
      game.state.start('buffer');
    }
    else if(living){
      resx=64;
      resy=564;
      resetWorld(0);
      gamePause('partial_frags');
    }
}

function ticToc(){
  if(playerHurt>0){playerHurt-=1;}
  if(playerPower>0){playerPower-=1;}
  enemies.forEach(function(enemy){
    if(enemy.enemyStat>0){enemy.enemyStat-=1;}
  });
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function boxControl(){
  if (dragButton.isDown && player.body.onFloor()&& player.body.velocity.x != 0 && boxActive){
    boxActive.body.velocity.x = player.body.velocity.x;
  }
  else if (!dragButton.isDown){
    boxes.setAll('body.velocity.x',0);
    boxActive=false;
  }
}

function hurtControl(){
  if(playerPower==0){
    game.physics.arcade.collide(player, hurts, function(){ hitPlayer(10); });
  }
  else{
    game.physics.arcade.collide(player, hurts);
  }
}

function mirrorUpdate(mirrorFrag){
    mirrorFrag.destroy();
    living = mirrorFrags.countLiving();
    mirror.frame= 3-living;
    portal.frame= 3-living;
}

function ghostControl(x,y){
  ghostSpeed = game.physics.arcade.distanceBetween(player, ghost)/10;
  game.physics.arcade.moveToXY(ghost, x, y, ghostSpeed);
  if(ghost.body.velocity.x>0){
    ghost.frame= 0;
  }
  else if(ghost.body.velocity.x<0){
    ghost.frame= 1;
  }
}

function hitPlayer(sec){
  if ((playerHurt==0)&&(sec>0)){
    playerHurt = sec;
  }
  else if (((playerHurt>0)&&(playerHurt<(sec-1)))||(sec<0)) {
    player.kill();
    resetWorld(1);
  }
}

function collect_chandelier(c,sec){

  c.kill();
  playerHurt = 0;
  playerPower = sec;
  enemies.setAll('enemyStat' , sec);
  powerControl();
}

function powerControl(){
  if(playerPower>0){
    goldFlashControl(1);
    hurtLevelStat = 0;
  }
  else if(playerPower==0){
    goldFlashControl(0);
    hurtLevelStat = 1;
  }
  if(playerHurt>0){
    redFlashControl(1);
  }
  else if(playerHurt==0){
    redFlashControl(0);
  }
}

function goldFlashControl(stat){
  if(stat){
    goldFlash.resume();
      if((player.texture.baseTexture.source.src.substr(player.texture.baseTexture.source.src.length - 11) == "player1.png")||(player.texture.baseTexture.source.src.substr(player.texture.baseTexture.source.src.length - 11) == "player2.png")){player.loadTexture('player_rainbow');}
  }
  else if(!stat){
    goldFlash.pause();
    player.alpha = 1;
    if(player.texture.baseTexture.source.src.substr(player.texture.baseTexture.source.src.length - 18) == "player_rainbow.png"){player.loadTexture('player');}
  }
}

function redFlashControl(stat){
  if(stat){
    player.tint= 0xff0000;
    redFlash.resume();
  }
  else if(!stat){
    redFlash.pause();
    player.tint = 0xffffff;
    player.alpha = 1;
  }
}

function activate_checkpoint(c){

  checkpointN+=1;
  c.kill();
  resx= c.body.x;
  resy= c.body.y;
}

function collect_pebble(p){
  p.kill();
  bulletsLeft+=5;
}

function collect_diamond(p,d){
  d.kill();
  diamondsN+=1;
}

function diamondsCalc(){

  if(diamondsN == 0){
    var scoreImage = game.add.sprite(width/2, 190, 'scoreGemme', 0 );
    scoreImage.anchor.set(0.5);
  }
  else if((diamondsN > 0)&&(diamondsN < 8)){
    var scoreImage = game.add.sprite(width/2, 190, 'scoreGemme', 1 );
    scoreImage.anchor.set(0.5);
  }
  else if((diamondsN >7 )&&(diamondsN < 16)){
    var scoreImage = game.add.sprite(width/2, 190, 'scoreGemme', 2 );
    scoreImage.anchor.set(0.5);
  }
  else if((diamondsN >15 )&&(diamondsN < 20)){
    var scoreImage = game.add.sprite(width/2, 190, 'scoreGemme', 3 );
    scoreImage.anchor.set(0.5);
  }
  else if(diamondsN==20){
    var scoreImage = game.add.sprite(width/2, 190, 'scoreGemme', 3 );
    scoreImage.anchor.set(0.5);
    scoreImage.alpha = 0.75;
    game.add.tween(scoreImage).to( { alpha: 1 }, 750, Phaser.Easing.Linear.None, true, 0, -1, true);
    game.add.tween(scoreImage.scale).to( { x: 3, y:3 }, 750, Phaser.Easing.Linear.None, true, 0, -1, true);
  }
}

function timeCalc(){

  if(timeModeClock > 7200){
    var scoreImage = game.add.sprite(width/2, 190, 'scoreClessidra', 0 );
    scoreImage.anchor.set(0.5);
  }
  else if((timeModeClock > 6300)&&(timeModeClock < 7200)){
    var scoreImage = game.add.sprite(width/2, 190, 'scoreClessidra', 1 );
    scoreImage.anchor.set(0.5);
  }
  else if((timeModeClock >5700 )&&(timeModeClock < 6300)){
    var scoreImage = game.add.sprite(width/2, 190, 'scoreClessidra', 2 );
    scoreImage.anchor.set(0.5);
  }
  else if((timeModeClock >5100 )&&(timeModeClock < 5700)){
    var scoreImage = game.add.sprite(width/2, 190, 'scoreClessidra', 3 );
    scoreImage.anchor.set(0.5);
  }
  else if(timeModeClock <5100){
    var scoreImage = game.add.sprite(width/2, 190, 'scoreClessidra', 3 );
    scoreImage.anchor.set(0.5);
    scoreImage.alpha = 0.75;
    game.add.tween(scoreImage).to( { alpha: 1 }, 750, Phaser.Easing.Linear.None, true, 0, -1, true);
    game.add.tween(scoreImage.scale).to( { x: 3, y:3 }, 750, Phaser.Easing.Linear.None, true, 0, -1, true);
  }
}

function moveIt(e,leftlim, rightlim, speed){
  if(enemies.children.indexOf(e) > -1){
    if(e.enemyStat>0){
      e.alpha=0.5;
    }
    else if (e.enemyStat==0){
      e.alpha=1;
    }
  }
  if( e.x >= rightlim-e.width){
    e.body.velocity.x = -speed;
    if(enemies.children.indexOf(e) > -1){e.frame= 1;}
  }
  else if(e.x <= leftlim){
    e.body.velocity.x = speed;
    if(enemies.children.indexOf(e) > -1){e.frame= 0;}
  }
}

function hiddenLayer(){
  hidden.children.forEach(function(h) {
    if(game.physics.arcade.overlap(h, player)){
      h.alpha = 0.25;
    }
    else{
        h.alpha = 1;
    }
  });
}

function controls(){
  if ((cursors.down.isDown || fireButton.isDown) && bulletsLeft>0){
    weapon.fire();
  }

  if (pauseButton.isDown){
    gamePause('sprite_pause');
  }

  if ((jumpButton.isDown || cursors.up.isDown) && (player.body.onFloor() || game.physics.arcade.collide(player, boxes) || player.body.touching.down)) {
      player.body.velocity.y = -400;
  }


  if (cursors.left.isDown){
      //  Move to the left
      player.body.velocity.x = -150;
      weapon.fireAngle = 180 + 25;
      player.animations.play('left');
  }

  else if (cursors.right.isDown){

      //  Move to the right
      player.body.velocity.x = 150;
      weapon.fireAngle = 0 - 25;
      player.animations.play('right');
  }

  else{
      //  Stand still
      player.body.velocity.x = 0;
      player.animations.stop();
      player.frame = 5;
  }
}

function createMap(preload) {

  if(preload){
  map = game.add.tilemap('mappa');
  map.addTilesetImage('slopes');
  map.addTilesetImage('all_tiles');

  background = game.add.sprite(0, 0, 'background');
  //if(game.state.current == "level2"){background = map.createLayer('background');}


  slopes = map.createLayer('slopes');
  map.setCollision(myArr, true, slopes);

  game.slopes.convertTilemapLayer(slopes, 'arcadeslopes', 55);

  play = map.createLayer('play');
  map.setCollision(myArr, true, play);
  play.resizeWorld();

  hurts = map.createLayer('hurts');
  map.setCollision(myArr, true, hurts);

  }
  else{
    if(game.state.current == "level2"){
      hidden = game.add.physicsGroup();
      hidden0 = hidden.create(28*32,6*32,'hidden0');
      hidden1 = hidden.create(40*32,4*32,'hidden1');
      hidden2 = hidden.create(81*32,14*32,'hidden2');
    }

    foreground = map.createLayer('foreground');
  }
}

function objectsSetUp(){
  //checkpoints
  checkpoints = game.add.physicsGroup();
  map.createFromObjects('checkpoints', 'checkpoint', 'checkpoint', 0, true, false, checkpoints);
  checkpoints.setAll('body.immovable', true);

  //chandeliers
  chandeliers = game.add.physicsGroup();
  map.createFromObjects('powerup', 'chandelier', 'chandelier', 0, true, false, chandeliers);
  chandeliers.setAll('body.immovable', true);

  //bullets
  pebbles = game.add.physicsGroup();
  map.createFromObjects('ammo', 'pebble', 'pebble', 0, true, false, pebbles);
  pebbles.setAll('body.immovable', true);

  //boxes
  boxes = game.add.physicsGroup();
  map.createFromObjects('boxes', 'box', 'box', 0, true, false, boxes);
  boxes.setAll('body.gravity.y', 600);
  game.slopes.enable(boxes);

  if(!timeMode){
    //diamonds
    diamonds = game.add.physicsGroup();
    map.createFromObjects('diamonds', 'diamond', 'diamond', 0, true, false, diamonds);
    diamonds.setAll('body.immovable', true);
  }

  if(game.state.current == "level2"){
    //mirrorFrags
    mirrorFrags = game.add.physicsGroup();
    map.createFromObjects('mirrorFrags', 'mirrorFrag', 'mirrorFrag', 0, true, false, mirrorFrags);
    mirrorFrags.setAll('body.immovable', true);
  }

}

function playerSetUp(){
  // The player and its settings
  player = game.add.sprite(resx,resy, 'player');
  game.physics.arcade.enable(player);
  player.body.updateBounds();
  game.slopes.enable(player);
  player.body.slopes.preferY = true;
  player.body.fixedRotation = true;
  player.body.bounce.y = 0;
  player.body.gravity.y = 600;
  player.body.collideWorldBounds=true;
  if(choosePlayer<2){
    player.animations.add('left', [4,3,2,1,0], 10, true);
    player.animations.add('right', [6,7,8,9,10,11], 10, true);
  }
  if(choosePlayer==2){
    player.animations.add('left', [1], 1, true);
    player.animations.add('right', [0], 1, true);
  }
  redFlash = game.add.tween(player).to( { alpha: 0.25 }, 500, Phaser.Easing.Linear.None, true, 0, -1, false);
  goldFlash = game.add.tween(player).to( { alpha: 0.75}, 1000, Phaser.Easing.Linear.None, true, 0, -1, false);
}

function enemiesSetUp(){

  // The enemies and each armor
  enemies = game.add.physicsGroup();

  if(game.state.current == "level1"){
    armor0 = enemies.create(3*32,20*32-18, 'armor');
    armor1 = enemies.create(25*32,20*32-18, 'armor');
    armor2 = enemies.create(72*32,13*32-18, 'armor');
  }
  else if(game.state.current == "level2"){
    armor0 = enemies.create(10*32,20*32-18, 'armor');
    armor1 = enemies.create(46*32,6*32-18, 'armor');
    armor2 = enemies.create(54*32,11*32-18, 'armor');
  }

  enemies.forEach(function(enemy){
    enemy.height=50; enemy.width=24;
    enemy.enemyStat=0;
  });
  //armor0.body.velocity.x = 30;
  //armor1.body.velocity.x = 100;
  //armor2.body.velocity.x = 100;

}

function platformSetUp(){

  if(game.state.current == "level1"){
    platforms = game.add.group();
    platforms.enableBody = true;
    platform0 = platforms.create(95*32,14*32-1, 'platform');

    platforms.forEach(function(p){
      game.physics.enable(p, Phaser.Physics.ARCADE);
      p.body.allowGravity = false;
      p.body.immovable = true;
      //p.body.checkCollision.left = false;
      //p.body.checkCollision.right = false;
      //p.body.checkCollision.down = false;
    });

    platformTween()
  }

  if(game.state.current == "level2"){
    platforms = game.add.group();
    platforms.enableBody = true;
    platform0 = platforms.create(70*32,21*32-1, 'platform');

    platforms.forEach(function(p){
      game.physics.enable(p, Phaser.Physics.ARCADE);
      p.body.allowGravity = false;
      p.body.immovable = true;
      //p.body.checkCollision.left = false;
      //p.body.checkCollision.right = false;
      //p.body.checkCollision.down = false;
    });

    platformTween()
  }
}

function platformTween(){

  if(game.state.current == "level1"){
  upDown = game.add.tween(platform0).to({ y: platform0.position.y - (14*32) }, 5000, Phaser.Easing.Linear.None, true, 0,-1, true);
  upDown.pause();
  }

  if(game.state.current == "level2"){
  upDown = game.add.tween(platform0).to({ y: platform0.position.y - (15*32) }, 23000, Phaser.Easing.Linear.None, true, 0,-1, true);
  upDown.pause();
  }
}

function platformLock(s, platform) {

    upDown.resume();
    if (!s.locked) {
        s.locked = true;
        s.lockedTo = platform;
        s.body.velocity.y = 0;
    }
}

function lockControl(){

  if (player.locked) {
        if (player.body.right < player.lockedTo.body.x || player.body.x > player.lockedTo.body.right) {
            player.locked = false;
            player.lockedTo = null;
            upDown.pause();
        } else {
            player.x += player.lockedTo.deltaX;
            player.y += player.lockedTo.deltaY;
        }
    }
}

function weaponSetUp(){

  // The weapon and its settings
  weapon = game.add.weapon(3, "pebble");
  weapon.bullets.setAll("height",15);
  weapon.bullets.setAll("width",15);
  weapon.trackSprite(player,16,30);
  weapon.bulletGravity.y = 600;
  weapon.bulletSpeed = 400;
  weapon.fireAngle = 0;
  weapon.bullets.forEach((b) => {
      b.body.updateBounds();
      game.slopes.enable(b);
  }, this);
  weapon.onFire.add(function() {bulletsLeft--});

}

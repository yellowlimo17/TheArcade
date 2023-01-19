<template>
  <canvas ref="canvasFlap" id="gameCanvas" width="512px" height="512px"></canvas>
</template>
<script>
import { AppDB } from "../db-init.js";
import { AppAUTH } from "../db-init.js";
export default {
  data: () => ({}),
  mounted() {
    var cnvs = this.$refs.canvasFlap;
    var contx = cnvs.getContext("2d");

    //Vaiables
    var bat = {
      imageUp: new Image(),
      imageDown: new Image(),
      velocity: 0,
      velocityJump: -15,
      velocityMax: -3,
      x: 10,
      y: 150,
      lasty: 150,
      batUp: true,
      scale: 1,
      rotation: 0
    };

    var bg = {
      far1: new Image(),
      far1x: 0,
      middle1: new Image(),
      middle1x: 0,
      close1: new Image(),
      close1x: 0,
      far2: new Image(),
      far2x: 512,
      middle2: new Image(),
      middle2x: 512,
      close2: new Image(),
      close2x: 512
    };

    var ground = {
      one: new Image(),
      onex: 0,
      two: new Image(),
      twox: 512
    };

    var pipeNorth = new Image();
    var pipeSouth = new Image();

    var gap = 90;
    var constant;
    var gravity = 1.5;
    var score = 0;
    var gameInProgress = false;
    var keypressed = false;

    //var fly = new Audio();
    //var scor = new Audio();
    //var oof = new Audio();

    var pipe = [];

    pipe[0] = {
      x: cnvs.width,
      y: 0
    };

    function InstantiateVariables() {
      for (var i = 0; i < pipe.length; i++) {
        pipe[i].x -= 1000;
      }
      DrawPipes();

      pipe[0] = {
        x: cnvs.width,
        y: 0
      };

      bat.batUp = true;
      bat.velocity = 0;
      bat.x = 10;
      bat.y = 150;

      score = 0;
    }

    //Load Images
    bat.imageUp.src = require("../assets/FlappyBat/images/batUpNew.png");
    bat.imageDown.src = require("../assets/FlappyBat/images/batDownNew.png");

    bg.far1.src = require("../assets/FlappyBat/images/bgFar.png");
    bg.middle1.src = require("../assets/FlappyBat/images/bgMiddle.png");
    bg.close1.src = require("../assets/FlappyBat/images/bgClose.png");
    bg.far2.src = require("../assets/FlappyBat/images/bgFar.png");
    bg.middle2.src = require("../assets/FlappyBat/images/bgMiddle.png");
    bg.close2.src = require("../assets/FlappyBat/images/bgClose.png");

    ground.one.src = require("../assets/FlappyBat/images/ground.png");
    ground.two.src = require("../assets/FlappyBat/images/ground.png");

    pipeNorth.src = require("../assets/FlappyBat/images/pipeNorth.png");
    pipeSouth.src = require("../assets/FlappyBat/images/pipeSouth.png");

    // Load Audio Files
    //fly.src = require("../assets/FlappyBat/audio/fly.mp3");
    //scor.src = require("../assets/FlappyBat/audio/score.wav");
    //oof.src = require("../assets/FlappyBat/audio/oof.wav");

    //Key Listener and Event
    document.addEventListener("keydown", moveUp);
    document.addEventListener("keyup", function() {
      keypressed = false;
    });

    function moveUp() {
      if (gameInProgress) {
        if (keypressed == false) {
          bat.velocity = bat.velocityJump;
          //fly.currentTime = 0;
          //fly.play();
          keypressed = true;
        }
      } else {
        gameInProgress = true;
        bat.velocity = bat.velocityJump;
        // fly.currentTime = 0;
        //fly.play();
      }
    }

    setInterval(GameLoop, 20);

    function GameLoop() {
      if (gameInProgress) Update();
      Draw();
    }

    function Update() {
      UpdateBG();
      UpdateFG();
      UpdatePipes();
      UpdateCollision();
      UpdateBat();
    }

    function Draw() {
      DrawBG();
      DrawPipes();
      DrawBat();
      DrawFG();
      DrawScore();
    }

    //Update Functions
    function UpdateBG() {
      bg.far1x -= 0.2;
      bg.far2x -= 0.2;
      bg.middle1x -= 0.4;
      bg.middle2x -= 0.4;
      bg.close1x--;
      bg.close2x--;
      if (bg.far1x <= -512) bg.far1x = 511;
      if (bg.far2x <= -512) bg.far2x = 511;
      if (bg.middle1x <= -512) bg.middle1x = 511;
      if (bg.middle2x <= -512) bg.middle2x = 511;
      if (bg.close1x <= -512) bg.close1x = 511;
      if (bg.close2x <= -512) bg.close2x = 511;
    }

    function UpdateFG() {
      ground.onex--;
      ground.twox--;
      if (ground.onex <= -512) ground.onex = 511;
      if (ground.twox <= -512) ground.twox = 511;
    }

    function UpdateBatAnimation() {
      if (bat.lasty > bat.y) bat.batUp = false;
      else bat.batUp = true;
      bat.lasty = bat.y;
    }

    function UpdatePipes() {
      for (var i = 0; i < pipe.length; i++) {
        constant = pipeNorth.height + gap;
        pipe[i].x--;

        if (pipe[i].x == 100) {
          pipe.push({
            x: cnvs.width,
            y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
          });
        }

        if (pipe[i].x == 5) {
          score++;
          //scor.play();
        }
      }
    }

    function UpdateCollision() {
      for (var i = 0; i < pipe.length; i++) {
        //Checks For Fail Status
        if (
          (bat.x + 40 >= pipe[i].x &&
            bat.x <= pipe[i].x + pipeNorth.width &&
            (bat.y <= pipe[i].y + pipeNorth.height ||
              bat.y + 40 >= pipe[i].y + constant)) ||
          bat.y + 40 >= cnvs.height - ground.one.height
        ) {
          //oof.play();
          gameInProgress = false;
          GameOver();
          InstantiateVariables();
        }
      }
    }

    function UpdateBat() {
      bat.velocity *= 0.7;
      bat.y += bat.velocity;
      bat.y += gravity;
      UpdateBatAnimation();
    }

    function DrawScore() {
      contx.fillStyle = "#fff";
      contx.font = "20px Veranda";
      contx.fillText("Score: " + score, 10, cnvs.height - 20);
    }

    //Draw Functions
    function DrawBG() {
      contx.drawImage(bg.far1, bg.far1x, 0);
      contx.drawImage(bg.far2, bg.far2x, 0);
      contx.drawImage(bg.middle1, bg.middle1x, 0);
      contx.drawImage(bg.middle2, bg.middle2x, 0);
      contx.drawImage(bg.close1, bg.close1x, 0);
      contx.drawImage(bg.close2, bg.close2x, 0);
    }

    function DrawPipes() {
      for (var i = 0; i < pipe.length; i++) {
        constant = pipeNorth.height + gap;
        contx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        contx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
      }
    }

    function DrawBat() {
      if (!bat.batUp) contx.drawImage(bat.imageDown, bat.x, bat.y);
      else contx.drawImage(bat.imageUp, bat.x, bat.y);
      // contx.drawImage(bat.imageUp, bat.x, bat.y);
    }

    function DrawFG() {
      contx.drawImage(ground.one, ground.onex, cnvs.height - ground.one.height);
      contx.drawImage(ground.two, ground.twox, cnvs.height - ground.two.height);
    }

    //GAME OVER HIGH SCORE CODE
    function GameOver() {
      //********HUNTER PLACE CODE HERE****************************************************************************************************************************** */
      if (score > 0) {
        var user = AppAUTH.currentUser;
        AppDB.ref("Highscore")
          .push()
          .set({ Game: "FlappyBat", User: user.displayName, Score: score, Email: user.email});
      }
    }
  },
  methods: {}
};
</script>
<style scoped>
</style>
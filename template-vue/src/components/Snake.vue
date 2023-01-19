<template>
    <canvas ref="snake" id="snake" width="608" height="608"></canvas>
</template>

<script>
import { AppDB } from "../db-init.js";
import { AppAUTH } from "../db-init.js";
    // load images
    const ground = new Image();
        ground.src = require('../assets/img/ground.png');

    const foodImg = new Image();
        foodImg.src = require('../assets/img/food.png');

    export default {
        data: () => ({
        }),

        mounted() {
        const cvs = this.$refs.snake;
        const ctx = cvs.getContext("2d");

        // create unit
        const box = 32;

        // create the snake
        var snake  = [];

        // old head position
        //var snakeX = snake[0].x;
        //var snakeY = snake[0].y;

        snake[0] = {
            x : 9 * box,
            y : 10 * box
        };

        // create score 
        var score = 0;

        //control the snake
        var d = "Null";

        // create food
        var food = {
            x : Math.floor(Math.random() * 17 + 1) * box,
            y : Math.floor(Math.random() * 15 + 3) * box
        }

        //var gameInProgress = true;

        function InstantiateVariables()
        {
            for(var i = 0; i < snake.length;i++) snake.pop();
            snake[0] = {
                x : 9 * box,
                y : 10 * box
            };

            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i == 0)? "green" : "white";
                ctx.fillRect(snake[i].x, snake[i].y, box, box);

                ctx.strokeStyle = "red";
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }

            score = 0;
            d="Null";
        }
        
        document.addEventListener("keydown",direction);

        function direction(event) {
            let key = event.keyCode;

            if (key == 37 && d != "RIGHT") {
                
                d = "LEFT";
            }
            else if (key == 38 && d != "DOWN") {
                
                d = "UP";
            }
            else if (key == 39 && d != "LEFT") {
                
                d = "RIGHT";
            }
            else if (key == 40 && d != "UP") {
                
                d = "DOWN";
            }
        }

        function Game(){
            Update();
            Draw();
        }
        // check collision function
        function collision(head,array) {
            for (let i = 0; i < array.length; i++) {
                if (head.x == array[i].x && head.y == array[i].y) {
                    return true;
                }
            }
            return false;
        }
        function Update(){
            
            // old head position
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            // which direction
            if ( d == "LEFT") snakeX -= box;
            if ( d == "UP") snakeY -= box;
            if ( d == "RIGHT") snakeX += box;
            if ( d == "DOWN") snakeY += box;

            // if the snake eats the food
            if (snakeX == food.x && snakeY == food.y) {
                score++;


                food = {
                    x : Math.floor(Math.random() * 17 + 1) * box,
                    y : Math.floor(Math.random() * 15 + 3) * box
                }
            }
            else {
            // remove tail
            snake.pop();
            }

            // add new head
            let newHead = {
                x : snakeX,
                y : snakeY
            }

            // game over
            if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)) {
                //clearInterval(game);
                if(score > 0){
                var user = AppAUTH.currentUser;
                AppDB.ref("Highscore")
                .push()
                .set({Game: "Snake", User: user.displayName, Score: score, Email: user.email});
                }
                InstantiateVariables();
            }

            else snake.unshift(newHead);

        }
        // draw everyhting to canvas
        function Draw() {
            ctx.drawImage(ground, 0 , 0);

            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i == 0)? "green" : "white";
                ctx.fillRect(snake[i].x, snake[i].y, box, box);

                ctx.strokeStyle = "red";
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }

            ctx.drawImage(foodImg, food.x, food.y);

            ctx.fillStyle = "white";
            ctx.font = "45px Changa one";
            ctx.fillText(score, 2 * box, 1.6 * box);
        }

        // call draw funtion every 100 ms
        setInterval(Game,100);
        },
        methods: {
        }
    }
</script>

<style>
    /* canvas {
        display: grid;
        height: 87vh;
        margin: 0;
        place-items: center center;
    } */
</style>
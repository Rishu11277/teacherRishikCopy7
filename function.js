var human;
var tech, bullets, road, coins;
var score, gameState, equipment, amounts;
var botSound, playerImg, roadImg, coinImg, bulletImg, standingImg, techImg2
var bulletGroup, techGroup, coinGroup;
var bullet, techs;
var start, startImg;
var minutes, seconds, milliseconds, hours, minutesBest, secondsBest, millisecondsBest, hoursBest;
var coinSound, techSound, min1Sound, bulletSound, loseSound
var restart, restartImg;


function spawnBullets() {
    if (World.frameCount % Math.round(random(100, 200)) == 0) {
        bullets = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        bullets.addImage("shooting", bulletImg)
        bullets.scale = 0.2
        bullets.velocityY = 6
        bulletGroup.add(bullets)
    }
}

function spawnTech() {
    if (World.frameCount % Math.round(random(100, 200)) == 0) {
        tech = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        tech.scale = 0.2
        tech.velocityY = 6
        techGroup.add(tech)
        tech.addImage("floating", techImg2)
    }
}

function spawnCoins() {
    if (World.frameCount % Math.round(random(100, 200)) == 0) {
        coins = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        coins.scale = 0.2
        coins.velocityY = 6
        coinGroup.add(coins)
        coins.addImage("falling", coinImg)
    }
}

function reset() {
    score = 5



    amounts = 0
    equipment = 0
    milliseconds = 0

    seconds = 0
    minutes = 0
    hours = 0

    gameState = "Serve"

    restart.visible = false


}

function gamestate(state) {
    if (state == "Serve") {
        if (keyIsDown(32)) {
            gameState = "Play"
            start.destroy()
            road.visible = true
        }

        background("green")


        road.visible = false
        restart.destroy()


        /* if (mousePressedOver(start)) {

            } */

        let h5 = createElement(
            'p', 'Hit the coins and tech! If you get 50 tech, you will get 5 coins! <br> If you get 20 coins, you will get 2 more lives. <br> You will lose one life, if you get hit by a bullet.'
        );

        h5.style('color', 'blue');
        h5.position(width / 2, height / 100);
        h5.style("font-size", "20px")


        fill("Blue")
        textFont("Monospace")
        textSize(20)
        
        text("Press 'Start Button' to Start.", width / 60, height / 8.5)
        text("Lives: " + score, 20, 20)
        text("Tech: " + equipment, 20, 40)
        text("Coins: " + amounts, 20, 60)


        


    }

    if (state == "Over") {
        background("red")
        
        restart = createSprite(width / 2, height / 2 - 50)
        restart.scale = 0.25
        restart.addImage("button", restartImg)
        //restart.debug = true
        restart.setCollider("circle", 0, 0, 290)


        if (mousePressedOver(restart)) {
            reset()
        }

        human.visible = false
        techGroup.destroyEach()
        coinGroup.destroyEach()
        bulletGroup.destroyEach()
        road.visible = false

        fill("purple")
        textFont('monospace')
        textSize(50)
        text("You have lost!", width / 3, height / 2)
            
        fill("white")
        textFont("Monospace")
        textSize(20)
            
        text("Lives: " + score, 20, 20)
        text("Tech: " + equipment, 20, 40)
        text("Coins: " + amounts, 20, 60)
        text(str(hours) + ":" + str(minutes) + ":" + str(seconds), 20, 100)
            
        loseSound.play()

    }

    if (state == "Play") {
        road.visible = true
        human.changeAnimation("running", playerImg)
        human.x = World.mouseX
        road.velocityY = 7
        spawnBullets()
        spawnTech()
        spawnCoins()


        if (human.isTouching(coinGroup)) {
            coinSound.play()
        }

        if (human.isTouching(techGroup)) {
            techSound.play()
        }



        if (road.y > 868) {
            road.y = 686
        }


        milliseconds += 1


        if (milliseconds == 60) {
            milliseconds = 0


            seconds += 1


        }

        if (seconds == 60) {
            seconds = 0

            if (seconds == 0) {
                minutes += 1
            }

            min1Sound.play()
        }

        if (minutes == 60) {
            minutes = 0

            if (minutes == 0) {
                hours += 1
            }


        }


        if (bulletGroup.isTouching(human)) {
            bulletSound.play()

            for (let i = 0; i < bulletGroup.length; i++) {
                let sprite = bulletGroup.get(i)

                if (sprite.isTouching(human)) {
                    sprite.velocityY = 0
                    sprite.destroy()
                    score -= 1
                }
            }
        }


        if (coinGroup.isTouching(human)) {


            for (let i = 0; i < coinGroup.length; i++) {
                let sprite = coinGroup.get(i)

                if (sprite.isTouching(human)) {
                    sprite.velocityY = 0
                    sprite.destroy()
                    amounts += 1
                }
            }

        }



        if (techGroup.isTouching(human)) {


            for (let i = 0; i < techGroup.length; i++) {
                let sprite = techGroup.get(i)

                if (sprite.isTouching(human)) {
                    sprite.velocityY = 0
                    sprite.destroy()
                    equipment += 1
                }
            }

        }

        if (score <= 0) {
            gameState = "Over"
        }



        

        if (equipment == 5) {
            equipment = 0
            amounts += 1
        }

        if (amounts >= 10) {
            score += 2
            amounts = 0
        }

    }
    

    console.log(state)
}





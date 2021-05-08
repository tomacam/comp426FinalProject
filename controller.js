document.addEventListener('DOMContentLoaded' , () => {
    const grid = document.querySelector('.grid');
    const $root = $('#root');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let startPoint = 150;
    let doodlerBottomSpace = startPoint;
    let platformCount = 5;
    let score = 0;
    let platforms =[];
    let upTimerId;
    let downTimerId;
    let leftTimerId;
    let rightTimerId;
    let isJump = false;
    let isGoingLeft = false;
    let isGoingRight = false;
    let isGameOver = false;
    let inProgress = false;

    function start() {
        if(!isGameOver) {
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms,30);
            jump();
            document.addEventListener('keyup',control)

        }
    }

    const startGame = function() {
        let handleStartButtonPress = function(event) {
            event.preventDefault();
            console.log(inProgress);
            inProgress = true;
            start();

        }
        
        $root.on('click', '.startButton', handleStartButtonPress);
    
    }

    startGame();

    class Platform {
        constructor(newPlatformBottom) {
            this.bottom = newPlatformBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = doodlerLeftSpace + "px";
        doodler.style.bottom = doodlerBottomSpace + 'px';
    }


    function createPlatforms() {
        for (let i=0; i < platformCount; i++) {
            let platformGap = 600 / platformCount;
            let newPlatformBottom = 100 + i * platformGap;

            let newPlatform = new Platform(newPlatformBottom);
            platforms.push(newPlatform);
        }
    }

    function movePlatforms() {
        if(doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -=4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';

                if(platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove('platform');
                    platforms.shift()
                    score++;

                    let newPlatform = new Platform(600)

                    platforms.push(newPlatform);

                }
            })
        } 
    }

    function jump() {
        clearInterval(downTimerId);
        isJump = true;
        upTimerId = setInterval(function () {
            doodlerBottomSpace += 10; 
            doodler.style.bottom = doodlerBottomSpace+'px';
            if(doodlerBottomSpace > (startPoint + 200)) {
                fall()
            }
        }, 30)
    }

    function fall() {
        clearInterval(upTimerId);
        isJump = false;
        downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5; 
            doodler.style.bottom = doodlerBottomSpace + 'px';

            if(doodlerBottomSpace <= 0) {
                gameOver()
            }

            platforms.forEach(platform => {
                if( doodlerBottomSpace >= platform.bottom && (doodlerBottomSpace <= (platform.bottom+15)) && ((platform.left + 60) >= platform.left) && (doodlerLeftSpace <= (platform.left+85)) && !isJump && (doodlerBottomSpace < 540)) {
                    startPoint = doodlerBottomSpace;
                    jump()
                }
            })

        }, 30)
    }


    function control(e) {
        if(e.key === "ArrowLeft") {
            moveLeft();
        } else if(e.key === "ArrowRight") {
            moveRight();
        } else if(e.key === "ArrowUp") {
            moveStraight();
        } 
    }

    function moveLeft() {
        if(isGoingRight) {
            clearInterval(rightTimerId);
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerId = setInterval(function () {
            if(doodlerLeftSpace >= 0) {
            doodlerLeftSpace -=5;
            doodler.style.left = doodlerLeftSpace + 'px';
            } else {
                moveRight();
            }
        },50)
    }

    function moveRight() {
        if(isGoingLeft) {
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }
        isGoingRight = true;
        rightTimerId = setInterval(function () {
            if(doodlerLeftSpace <= 340) {
            doodlerLeftSpace +=5;
            doodler.style.left = doodlerLeftSpace + 'px';
            } else {
                moveLeft();
            }
        },50)
    }

    function moveStraight() {
        isGoingLeft = false;
        isGoingRight = false;
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
    }

    function gameOver() {
        console.log("game over")
        isGameOver = true;

        while(grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }
        $(".score").text(`SCORE: ${score}`);
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
        resetGame();
    }

    function resetGame() {
        doodlerLeftSpace = 50;
        startPoint = 150;
        doodlerBottomSpace = startPoint;
        platformCount = 5;
        isGameOver = false;
        platforms =[];
        upTimerId;
        downTimerId;
        isJump = false;
        isGoingLeft = false;
        isGoingRight = false;
        leftTimerId;
        rightTimerId;
        score = 0;
        inProgress = false;
    
    }
    
    

    

})



let moveSpeed = 3, gravity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById("bird-one");

let birdProps = bird.getBoundingClientRect();

let backGround = document.querySelector('.background').getBoundingClientRect();
let scoreValue = document.querySelector('.score-value');
let message = document.querySelector('.message');
let scoreTitle = document.querySelector('.score-title');

let gameState = 'Start';
img.style.display = 'none';
message.classList.add("messageStyle");


document.addEventListener("keydown", (e) => {
    if (e.key == 'Enter' && gameState != 'Play') {
        document.querySelectorAll('.pipe-sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        gameState = 'Play';
        message.innerHTML = '';
        scoreTitle.innerHTML = 'Score : ';
        scoreValue.innerHTML = '0';
        message.classList.remove("messageStyle");
        play();
    }
});


function play() {
    function move() {
        if (gameState != 'Play') return;

        let pipeSprite = document.querySelectorAll('.pipe-sprite');
        pipeSprite.forEach((element) => {
            let pipeSpriteProps = element.getBoundingClientRect();
            birdProps = bird.getBoundingClientRect();

            if (pipeSpriteProps.right <= 0) {
                element.remove();
            } else {
                if (birdProps.left < pipeSpriteProps.left + pipeSpriteProps.width && birdProps.left + birdProps.width > pipeSpriteProps.left && birdProps.top < pipeSpriteProps.top + pipeSpriteProps.height && birdProps.top + birdProps.height > pipeSpriteProps.top) {
                    gameState = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br> Press Enter to Restart';
                    message.classList.add("messageStyle");
                    img.style.display = 'none';
                    return;
                } else {
                    if (pipeSpriteProps.right < birdProps.left && pipeSpriteProps.right + moveSpeed >= birdProps.left && element.increaseScore == '1') {
                        scoreValue.innerHTML = + scoreValue.innerHTML + 1;
                    }
                    element.style.left = pipeSpriteProps.left - moveSpeed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    };
    requestAnimationFrame(move);

    let birdDy = 0;
    function applyGravity() {
        if (gameState != 'Play') return;
        birdDy = birdDy + gravity;
        document.addEventListener("keydown", (e) => {
            if (e.key == 'ArrowUp' || e.key == '') {
                img.src = "./CSS/Images/Bird-2.png";
                birdDy = -7.6;
            }
        });

        document.addEventListener("keyup", (e) => {
            if (e.key == 'ArrowUp' || e.key == '') {
                img.src = "./CSS/Images/Bird.png";
            }
        });

        if (birdProps.top <= 0 || birdProps.bottom >= backGround.bottom) {
            gameState = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove("messageStyle");
            return;
        }

        bird.style.top = birdProps.top + birdDy + 'px';
        birdProps = bird.getBoundingClientRect();
        requestAnimationFrame(applyGravity);
    }
    requestAnimationFrame(applyGravity);

    let pipeSeparation = 0;
    let pipeGap = 35;

    function createPipe() {
        if (gameState != 'Play') return;

        if (pipeSeparation > 115) {
            pipeSeparation = 0;
            let pipePosition = Math.floor(Math.random() * 43) + 8;
            let pipeSpriteInv = document.createElement('div');
            pipeSpriteInv.className = "pipe-sprite";
            pipeSpriteInv.style.top = pipePosition - 70 + 'vh';
            pipeSpriteInv.style.left = '100vw';

            document.body.appendChild(pipeSpriteInv);
            let pipeSprite = document.createElement('div');
            pipeSprite.className = "pipe-sprite";
            pipeSprite.style.top = pipePosition + pipeGap + 'vh';
            pipeSprite.style.left = '100vw';
            pipeSprite.increaseScore = '1';

            document.body.appendChild(pipeSprite);
        }
        pipeSeparation++;
        requestAnimationFrame(createPipe);
    }
    requestAnimationFrame(createPipe);
};
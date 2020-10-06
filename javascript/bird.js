import {
    lost
} from "./lost.js"

import {
    won
} from "./won.js"

var id = null;
var callBirdTimeout = null;
var wingsNumber = 0;
var revind = false;

var chooseDirection = ["left", "right"]

var chooseUpBelow = ["up", "down"]

var direction = null;

var bullets = 10;

var birdKilled = 0;
var selectClass = ["one", "two", "three", "four", "five"]

var change = false;

document.querySelector("body").addEventListener("click", () => {
    if (change) {
        let $bullets = document.querySelector(".bullets")
        if (bullets >= 1)
            $bullets.innerHTML = `Bullets : ${--bullets}`
    }
})

function bird() {

    do {
        document.querySelector("body").removeChild(document.querySelector(".bird"));
        let $bird = document.createElement("img");
        $bird.classList = "bird";
        document.querySelector("body").appendChild($bird);
        $bird.addEventListener("click", () => shot($bird.classList.value));

        if (document.querySelector(".lost")) {
            document.querySelector("body").removeChild(document.querySelector(".lost"))
        }
    } while (false);

    change = true;
    direction = chooseDirection[Math.floor(Math.random() * 2)]
    var $bird = document.querySelector(".bird");
    let top = Math.ceil(Math.random() * 40) * 10
    $bird.style.top = `${top}px`;
    let right = -1;
    let left = -1;

    let seconds = 0;

    let choose = 1;

    let changeBirdMotion = 0
    id = setInterval(() => {
        wings($bird, direction);
        // if bird reaches the end of screen it turns the flying direction of bird
        if (direction == "left") {
            $bird.style.left = "";
            $bird.style.right = `${right++}px`;
        } else if (direction == "right") {
            $bird.style.right = "";
            $bird.style.left = `${left++}px`;
        }

        if (changeBirdMotion >= 150) {
            choose = Math.ceil(Math.random() * 3)
            changeBirdMotion = 0
        }

        if (choose == 1) {
            if (top > 0)
                $bird.style.top = `${top--}px`
            else
                $bird.style.top = `${top++}px`
        } else if (choose == 2) {
            if (top < 400)
                $bird.style.top = `${top++}px`
            else
                $bird.style.top = `${top--}px`

        }

        if (right >= 1300) {
            direction = "right";
            right = -1;
        } else if (left >= 1300) {
            direction = "left";
            left = -1;
        }

        if (seconds == 3000) {
            clearInterval(id);
            showDog("noHunt");
        }

        if (bullets == 0) {
            clearInterval(id)
            lost()
        }
        if (birdKilled == 5) {
            clearInterval(id)
            won()
        }
        seconds++;
        changeBirdMotion++;
    }, 6);
}

function shot(bird) {
    // this function changes the image of bird from flying image to shot image and will make it fall from sky to ground
    clearInterval(id);
    change = false;
    // the below bar is updated to show the number of birds killed
    let $display = document.querySelector(`.${selectClass[birdKilled++]}`)
    // if (birdKilled == 5) birdKilled = 0
    $display.setAttribute("src", "assets/score-dead/0.png")

    // the image changed from flyin bird to shot bird.
    let $bird = document.querySelector(`.bird`);
    $bird.setAttribute("src", "assets/bird/shot/0.png");
    let top = parseInt(
        $bird.style.top
        .split("")
        .splice(0, $bird.style.top.split("").length - 2)
        .join("")
    );

    // making the shot bird fall from sky to ground
    let id1 = setTimeout(() => {
        let id2 = setInterval(() => {
            if (top <= 480) $bird.style.top = `${top++}px`;
            if (top == 460) {
                $bird.style.zIndex = "-1";
                clearInterval(id1);
                clearInterval(id2);
                showDog("hunt");
            }
        }, 1);
    }, 10);
}

function showDog(type = "hunt") {
    // when the bird falls on ground the dog holding birf image will appear
    let dog = document.querySelector(".dog");

    // if the bird flews away then the laughing dog comes up else the dog holding shot bird is show
    if (type == "hunt") dog.setAttribute("src", `assets/catch/1.png`);
    else {
        dog.setAttribute("src", `assets/catch/3.png`);
        let $bird = document.querySelector(`.bird`);
        $bird.style.display = "none";
    }
    let bottom = 132;
    let direction = "up";
    // the dog comes up and then goes down
    let id = setInterval(
        () => {
            if (bottom <= 185 && direction == "up") {
                dog.style.bottom = `${bottom++}px`;
            } else if (bottom >= 105) dog.style.bottom = `${bottom--}px`;
            else clearInterval(id);
            if (bottom == 185) direction = "down";
        },
        type == "hunt" ? 10 : 20
    );

    if (birdKilled == 5) {
        won()
    } else {
        // once the dog comes up and goes down after one second a new bird is created
        callBirdTimeout = setTimeout(createNewBird, 1000);
    }
}

function createNewBird() {
    // after dog image of showing dead bird is showm new bird is created
    clearInterval(callBirdTimeout);
    bird();
}

function wings($bird, direction) {
    // this function alernately changes the the flying bird image so that the imahe of bird looks flying
    if (!revind) {
        $bird.setAttribute("src", `assets/bird/${direction}/${wingsNumber}.png`);
        wingsNumber++;
        if (wingsNumber > 2) {
            revind = true;
        }
    } else {
        $bird.setAttribute("src", `assets/bird/${direction}/${--wingsNumber}.png`);
        if (wingsNumber == 0) revind = false;
    }
}


export {
    bird,
    shot
};
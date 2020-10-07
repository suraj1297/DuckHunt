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

var direction = null;

var direction2 = null;

var bullets = 10;

var birdKilled = 0;
var selectClass = ["one", "two", "three", "four", "five", "six"]

var change = false;

document.querySelector("body").addEventListener("click", () => {
    if (change) {
        document.querySelector(".gun").play()
        let $bullets = document.querySelector(".bullets")
        if (bullets >= 1)
            $bullets.innerHTML = `Bullets : ${--bullets}`
    }
})

function bird() {

    do {
        document.querySelector("body").removeChild(document.querySelector(".bird"));
        document.querySelector("body").removeChild(document.querySelector(".bird2"));

        // creating bird 1
        let $bird = document.createElement("img");
        $bird.classList = "bird";
        document.querySelector("body").appendChild($bird);
        $bird.addEventListener("click", () => shot($bird.classList.value));

        // creating bird 2
        let $bird2 = document.createElement("img");
        $bird2.classList = "bird2";
        document.querySelector("body").appendChild($bird2);
        $bird2.addEventListener("click", () => shot($bird2.classList.value));

        if (document.querySelector(".lost")) {
            document.querySelector("body").removeChild(document.querySelector(".lost"))
        }
    } while (false);

    change = true;
    // choosing flying direction for bird  and bird 2
    direction = chooseDirection[Math.floor(Math.random() * 2)]
    direction2 = chooseDirection[Math.floor(Math.random() * 2)]

    // creating bird 1 and bird 2
    var $bird = document.querySelector(".bird");
    var $bird2 = document.querySelector(".bird2");

    // setting position value for bird 1
    let top = Math.ceil(Math.random() * 40) * 10
    $bird.style.top = `${top}px`;
    let right = -1;
    let left = -1;

    // setting position value for bird 2
    let top2 = Math.ceil(Math.random() * 40) * 10
    $bird2.style.top = `${top2}px`;
    let right2 = -1;
    let left2 = -1;

    let seconds = 0;

    // will decide should the bird fly up or go down
    let choose = Math.ceil(Math.random() * 3);
    let choose2 = Math.ceil(Math.random() * 3)

    // will decide if bird should change it path or not or should contine its current path
    let changeBirdMotion = Math.floor(Math.random() * 20)
    let changeBirdMotion2 = Math.floor(Math.random() * 20)

    id = setInterval(async () => {
        // will get the approriate image of bird flying to make flying animation smoother 
        await wings($bird, direction);
        await wings($bird2, direction2);


        // if bird reaches the end of screen it turns the flying direction of bird 1
        if (direction == "left") {
            $bird.style.left = "";
            $bird.style.right = `${right++}px`;
        } else if (direction == "right") {
            $bird.style.right = "";
            $bird.style.left = `${left++}px`;
        }

        // if bird reaches the end of screen it turns the flying direction of bird 2
        if (direction2 == "left") {
            $bird2.style.left = "";
            $bird2.style.right = `${right2++}px`;
        } else if (direction2 == "right") {
            $bird2.style.right = "";
            $bird2.style.left = `${left2++}px`;
        }

        // if th bird has follwed its last path of motion for more than 150 secs then it will change its flyinh path
        // and will make the bird fly up down or staright in contrast to its last path
        if (changeBirdMotion >= 150) {
            choose = Math.ceil(Math.random() * 3)
            changeBirdMotion = 0
        }

        if (changeBirdMotion2 >= 150) {
            choose2 = Math.ceil(Math.random() * 3)
            changeBirdMotion2 = 0
        }

        // for choose 1 the bird 1 will fly up, for 2 it will fly down else it will fly straight
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

        // for choose2 == 1 the bird 2 will fly up, for 2 it will fly down else it will fly straight
        if (choose2 == 1) {
            if (top2 > 0)
                $bird2.style.top = `${top2--}px`
            else
                $bird2.style.top = `${top2++}px`
        } else if (choose2 == 2) {
            if (top2 < 400)
                $bird2.style.top = `${top2++}px`
            else
                $bird2.style.top = `${top2--}px`
        }

        // if the bird 1 reaches the end of the screen it will chnage its flying direction
        if (right >= 1300) {
            direction = "right";
            right = -1;
        } else if (left >= 1300) {
            direction = "left";
            left = -1;
        }

        // if the bird 2 reaces the end of the screen it will chnage its flying direction
        if (right2 >= 1300) {
            direction2 = "right";
            right2 = -1;
        } else if (left2 >= 1300) {
            direction2 = "left";
            left2 = -1;
        }


        if (Math.floor(Math.random() * 1000) <= 1) {
            document.querySelector(".quack").play()
        }

        if (seconds == 2500) {
            clearInterval(id);
            showDog("noHunt");
        }

        if (bullets == 0) {
            clearInterval(id)
            change = false;
            lost()
        }
        if (birdKilled == 5) {
            clearInterval(id)
            change = false;
            won()
        }
        seconds++;
        changeBirdMotion++;
        changeBirdMotion2++;
    }, 6);

}

function shot(bird) {
    // this function changes the image of bird from flying image to shot image and will make it fall from sky to ground
    // clearInterval(id);
    document.querySelector(".gun").play()
    // the below bar is updated to show the number of birds killed
    let $display = document.querySelector(`.${selectClass[birdKilled++]}`)
    // if (birdKilled == 5) birdKilled = 0
    $display.setAttribute("src", "assets/score-dead/0.png")

    // the image changed from flyin bird to shot bird.
    let $bird = document.querySelector(`.${bird}`);
    $bird.setAttribute("src", "assets/bird/shot/0.png");
    let top = parseInt(
        $bird.style.top
        .split("")
        .splice(0, $bird.style.top.split("").length - 2)
        .join("")
    );
    change = false;
    let $bullets = document.querySelector(".bullets")
    if (bullets >= 1)
        $bullets.innerHTML = `Bullets : ${--bullets}`
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
    if (type == "hunt") {
        document.querySelector(".dogDuck").play()
        dog.setAttribute("src", `assets/catch/1.png`);
    } else {
        document.querySelector(".laugh").play()
        dog.setAttribute("src", `assets/catch/3.png`);
        let $bird = document.querySelector(`.bird`);
        $bird.style.display = "none";
    }
    let bottom = 132;
    let direction = "up";
    // the dog comes up and then goes down
    let id = setInterval(
        () => {
            if (bottom <= 200 && direction == "up") {
                dog.style.bottom = `${bottom++}px`;
            } else if (bottom >= 105) dog.style.bottom = `${bottom--}px`;
            else clearInterval(id);
            if (bottom == 200) direction = "down";
        },
        20
    );

    if (birdKilled == 5) {
        setTimeout(() => won(), 3000)
    } else {
        // once the dog comes up and goes down after one second a new bird is created
        // callBirdTimeout = setTimeout(createNewBird, 4000);
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
        if (wingsNumber > 23) {
            revind = true;
        }
    } else {
        $bird.setAttribute("src", `assets/bird/${direction}/${--wingsNumber}.png`);
        if (wingsNumber == 0) revind = false;
    }
    return new Promise((resolve, reject) => resolve())
}


export {
    bird,
    shot
};
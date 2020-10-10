import { lost } from "./lost.js";

import { won } from "./won.js";

import { Killed } from "./Killed.js";

var id = null;
var callBirdTimeout = null;
var wingsNumber = 0;
var revind = false;

var chooseDirection = ["left", "right"];

var direction = null;

var selectClass = ["one", "two", "three", "four", "five", "six"];

var change = false;

const killed = new Killed();

document.querySelector("body").addEventListener("click", () => {
  if (change) {
    document.querySelector(".gun").play();
    let $bullets = document.querySelector(".bullets");
    if (killed.__proto__.bullets >= 1)
      $bullets.innerHTML = `Bullets : ${--killed.__proto__.bullets}`;
  }
});

function bird3() {
  do {
    if (document.querySelector(".bird3")) {
      document
        .querySelector("body")
        .removeChild(document.querySelector(".bird3"));
    }
    // creating bird 1
    let $bird = document.createElement("img");
    $bird.classList = "bird3";
    document.querySelector("body").appendChild($bird);
    $bird.addEventListener("click", () => shot($bird.classList.value));

    if (document.querySelector(".lost")) {
      document
        .querySelector("body")
        .removeChild(document.querySelector(".lost"));
    }
  } while (false);

  change = true;
  // choosing flying direction for bird  and bird 2
  direction = chooseDirection[Math.floor(Math.random() * 2)];

  // creating bird 1 and bird
  var $bird = document.querySelector(".bird3");

  // setting position value for bird 1
  let top = Math.ceil(Math.random() * 40) * 10;
  $bird.style.top = `${top}px`;
  let right = -1;
  let left = -1;

  let seconds = 0;

  // will decide should the bird fly up or go down
  let choose = Math.ceil(Math.random() * 3);

  // will decide if bird should change it path or not or should contine its current path
  let changeBirdMotion = Math.floor(Math.random() * 20);

  id = setInterval(async () => {
    // will get the approriate image of bird flying to make flying animation smoother
    await wings($bird, direction);

    // if bird reaches the end of screen it turns the flying direction of bird 1
    if (direction == "left") {
      $bird.style.left = "";
      $bird.style.right = `${right++}px`;
    } else if (direction == "right") {
      $bird.style.right = "";
      $bird.style.left = `${left++}px`;
    }

    // if th bird has follwed its last path of motion for more than 150 secs then it will change its flyinh path
    // and will make the bird fly up down or staright in contrast to its last path
    if (changeBirdMotion >= 150) {
      choose = Math.ceil(Math.random() * 3);
      changeBirdMotion = 0;
    }

    // for choose 1 the bird 1 will fly up, for 2 it will fly down else it will fly straight
    if (choose == 1) {
      if (top > 0) $bird.style.top = `${top--}px`;
      else $bird.style.top = `${top++}px`;
    } else if (choose == 2) {
      if (top < 400) $bird.style.top = `${top++}px`;
      else $bird.style.top = `${top--}px`;
    }

    // if the bird 1 reaches the end of the screen it will chnage its flying direction
    if (right >= 1300) {
      direction = "right";
      right = -1;
    } else if (left >= 1300) {
      direction = "left";
      left = -1;
    }

    if (Math.floor(Math.random() * 1000) <= 1) {
      document.querySelector(".quack").play();
    }

    if (seconds == 2500) {
      clearInterval(id);
      showDog("noHunt");
    }

    if (killed.__proto__.bullets == 0) {
      clearInterval(id);
      change = false;
      if (killed.__proto__.birdKilled !== 6) {
        change = false;
        lost();
      } else won("level2");
    }
    if (killed.__proto__.birdKilled == 6) {
      clearInterval(id);
      change = false;
      won("level2");
    }
    seconds++;
    changeBirdMotion++;
  }, 6);

  return Promise.resolve();
}

function shot(bird) {
  // this function changes the image of bird from flying image to shot image and will make it fall from sky to ground
  clearInterval(id);
  document.querySelector(".gun").play();
  // the below bar is updated to show the number of birds killed
  let $display = document.querySelector(
    `.${selectClass[killed.__proto__.birdKilled++]}`
  );
  // if (birdKilled == 5) birdKilled = 0
  $display.setAttribute("src", "assets/score-dead/0.png");

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
  let $bullets = document.querySelector(".bullets");
  if (killed.__proto__.bullets >= 1)
    $bullets.innerHTML = `Bullets : ${--killed.__proto__.bullets}`;
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

async function showDog(type = "hunt") {
  // when the bird falls on ground the dog holding birf image will appear
  let dog = document.querySelector(".dog");

  // if the bird flews away then the laughing dog comes up else the dog holding shot bird is show
  if (type == "hunt") {
    document.querySelector(".dogDuck").play();
    dog.setAttribute("src", `assets/catch/1.png`);
  } else {
    document.querySelector(".laugh").play();
    dog.setAttribute("src", `assets/catch/3.png`);
    let $bird = document.querySelector(`.bird3`);
    $bird.style.display = "none";
  }

  if (dog.style.bottom !== "105px" && type == "hunt") {
    dog.setAttribute("src", `assets/catch/2.png`);
  } else {
    let bottom = 105;
    killed.__proto__.dogDirection = "up";
    // the dog comes up and then goes down
    let id = setInterval(() => {
      if (bottom <= 200 && killed.__proto__.dogDirection == "up") {
        dog.style.bottom = `${bottom++}px`;
      } else if (bottom >= 105) dog.style.bottom = `${bottom--}px`;
      else clearInterval(id);
      if (bottom == 200) killed.__proto__.dogDirection = "down";
    }, 20);
  }

  if (killed.__proto__.birdKilled == 6) {
    setTimeout(() => {
      change = false;
      won("level2");
    }, 3000);
  } else {
    // once the dog comes up and goes down after one second a new bird is created
    callBirdTimeout = setTimeout(createNewBird, 4000);
  }
}

function createNewBird() {
  // after dog image of showing dead bird is showm new bird is created
  clearInterval(callBirdTimeout);
  bird3();
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
  return Promise.resolve();
}

export { bird3, shot };

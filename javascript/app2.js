import {
    drawBird
} from "./bird2-3.js"

import {
    drawDog
} from "./drawDog.js"

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.style.height = "99vh"

canvas.style.width = "100%"

canvas.style.backgroundImage = `url("assets/bush.png")`

window.onload = () => drawDog(ctx)


setTimeout(() => drawBird(), 5000)
function drawDog() {
    let $dog = document.querySelector(".dog")

    let position = -1
    let imageNumber = 0;
    let bottom = 160
    let id = setInterval(() => {
        if (position < 400) {
            $dog.setAttribute("src", `assets/sniff/${imageNumber++}.png`)
            $dog.style.left = `${position}px`
            if (imageNumber == 4) imageNumber = 0
        } else if (position == 400) {
            $dog.setAttribute("src", "assets/jump/0.png")
            $dog.style.bottom = `160px`
        } else if (position == 401) {
            $dog.setAttribute("src", "assets/jump/1.png")
            $dog.style.bottom = `160px`
        } else if (position == 402) {
            $dog.setAttribute("src", "assets/jump/1.png")
            $dog.style.zIndex = -1
        } else if (position <= 430) {
            $dog.setAttribute("src", "assets/jump/1.png")
            $dog.style.bottom = `${--bottom}px`
        } else {
            clearInterval(id)
        }
        position++
    }, 5)
}

export {
    drawDog
}
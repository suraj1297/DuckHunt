function won() {

    if (document.querySelector(".won")) {
        document.querySelector("body").removeChild(document.querySelector(".won"))
    }

    let $div = document.createElement("div")
    $div.classList = "won"
    let $p = document.createElement("p")
    $p.appendChild(document.createTextNode("You Just Won The Game! Congratulations!"))
    $p.classList = "text"
    $div.appendChild($p)

    let $button = document.createElement("div")
    $button.id = "try-again-won"
    $button.appendChild(document.createTextNode("Try Again"))
    $button.addEventListener("click", () => {
        location.reload()
    })
    $div.appendChild($button)

    let $buttonNext = document.createElement("div")
    $buttonNext.id = "next-level"
    $buttonNext.appendChild(document.createTextNode("Next Level"))
    $buttonNext.addEventListener("click", () => {
        location.reload()
    })
    $div.appendChild($buttonNext)

    document.querySelector("body").appendChild($div)
}

export {
    won
}
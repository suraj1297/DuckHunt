function lost() {

    if (document.querySelector(".lost")) {
        document.querySelector("body").removeChild(document.querySelector(".lost"))
    }
    let $div = document.createElement("div")
    $div.classList = "lost"
    let $p = document.createElement("p")
    $p.appendChild(document.createTextNode("You Just Lost The Game!"))
    $div.appendChild($p)

    let $button = document.createElement("div")
    $button.id = "try-again"
    $button.appendChild(document.createTextNode("TRY AGAIN"))
    $button.addEventListener("click", () => {
        location.reload()
    })
    $div.appendChild($button)

    document.querySelector("body").appendChild($div)
}

export {
    lost
}
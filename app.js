const inputBox = document.querySelector("#inputBox")
const submitForm = document.querySelector("#submitForm")
const grid = document.querySelector("#grid")
const snake = document.querySelector("#snakeBox")
const errorMessage = document.querySelector("#errorMessage")

createGrid = (x, y) => {
    grid.innerHTML = ""

    for (let i = 0; i < x * y; i++) {
        const pixel = document.createElement("div")
        pixel.style.width = `${400 / x}px`
        pixel.style.height = `${400 / y}px`
        pixel.classList.add("pixel")
        grid.append(pixel)
    }
}

snakeGrid = (arr, x, y) => {
    const newArray = []

    for(let i = 0; i < y; i++) {
        const row = []

        for(let j = 0; j < x; j++) {
            row.push(arr[x * i + j])
        }

        if(i % 2 === 1) {
            row.reverse()
        }

        newArray.push(row)
    }

    const finalArray = [].concat(...newArray);
    return finalArray
}

addGridColors = (e) => {
    e.preventDefault()

    const x = document.querySelector("#x-axis").value
    const y = document.querySelector("#y-axis").value
    createGrid(x, y)
    const pixels = document.querySelectorAll(".pixel")

    let colorInput = JSON.parse(inputBox.value)

    errorMessage.innerText = ""
    if (colorInput.length !== pixels.length) {
        errorMessage.innerText = "The number of colors does not match the number of pixels."
    }

    if (snake.checked) {
        colorInput = snakeGrid(colorInput, x, y)
    }

    colorInput.forEach((color, index) => {
        const pixel = pixels[index]
        const targetColor = `#${color}`
        function isHexCode(color) {
            return /^#[0-9A-F]{6}$/i.test(color);
        }
        if (!isHexCode(targetColor)) {
            errorMessage.innerText = "One or more pixels has an invalid color."
            pixel.innerText = "E"
            pixel.classList.add("errorPixel")
        } else {
            pixel.style.backgroundColor = targetColor
        }
    })
}

submitForm.addEventListener("submit", addGridColors)

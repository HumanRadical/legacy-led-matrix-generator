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
            pixel.innerHTML = `
            <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.0//EN'  'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'><svg height="32" style="overflow:visible;enable-background:new 0 0 32 32" viewBox="0 0 32 32" width="32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g id="Error_1_"><g id="Error"><circle cx="16" cy="16" id="BG" r="16" style="fill:#D72828;"/><path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" id="Exclamatory_x5F_Sign" style="fill:#E6E6E6;"/></g></g></g></svg>
            `
        } else {
            pixel.style.backgroundColor = targetColor
        }
    })
}

submitForm.addEventListener("submit", addGridColors)

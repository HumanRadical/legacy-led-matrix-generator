const textbox = document.querySelector("#textbox")
const form = document.querySelector("form")
const pixelGrid = document.querySelectorAll(".pixel")
const snake = document.querySelector("#snake")

snakeGrid = (array) => {
    const newArray = []

    for(let i = 0; i < 16; i++) {
        const row = []

        for(let j = 0; j < 16; j++) {
            row.push(array[16 * i + j])
        }

        if(i % 2 === 1) {
            row.reverse()
        }

        newArray.push(row)
    }

    const finalArray = [].concat(...newArray);
    return finalArray
}

addGridColors = () => {
    let colorInput = JSON.parse(textbox.value)

    if (snake.checked) {
        colorInput = snakeGrid(colorInput)
    }

    colorInput.forEach((color, index) => {
        const pixel = pixelGrid[index]
        pixel.style.backgroundColor = `#${color}`
    })
}

form.addEventListener("submit", addGridColors)
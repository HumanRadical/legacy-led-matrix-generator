const inputBox = document.querySelector("#inputBox")
const submitForm = document.querySelector("#submitForm")
const pixelGrid = document.querySelectorAll(".pixel")
const snake = document.querySelector("#snakeBox")

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

addGridColors = (e) => {
    e.preventDefault();
    let colorInput = JSON.parse(inputBox.value)

    if (snake.checked) {
        colorInput = snakeGrid(colorInput)
    }

    colorInput.forEach((color, index) => {
        const pixel = pixelGrid[index]
        pixel.style.backgroundColor = `#${color}`
    })
}

submitForm.addEventListener("submit", addGridColors)

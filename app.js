const inputBox = document.querySelector("#inputBox")
const submitForm = document.querySelector("#submitForm")
const grid = document.querySelector("#grid")
const snake = document.querySelector("#snakeBox")

createGrid = (x, y) => {
    grid.innerHTML = ""

    for (let i = 0; i < x * y; i++) {
        const pixel = document.createElement("div")
        pixel.style.width = `${400 / x}px`
        pixel.style.height = `${400 / y}px`
        pixel.style.display = "inline-block"
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

    if (snake.checked) {
        colorInput = snakeGrid(colorInput, x, y)
    }

    colorInput.forEach((color, index) => {
        const pixel = pixels[index]
        if (typeof pixel === "number") {
            pixel.style.backgroundColor = color
        }
        else {
            pixel.style.backgroundColor = `#${color}`
        }
    })
}

submitForm.addEventListener("submit", addGridColors)

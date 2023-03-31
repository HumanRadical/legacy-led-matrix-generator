const grid = document.querySelector("#grid")
const colorPicker = document.querySelector("#colorPicker")
const colorPresetForm = document.querySelector("#colorPresetForm")
const submitForm = document.querySelector("#submitForm")
const outputBox = document.querySelector("#outputBox")
const snakeBox = document.querySelector("#snakeBox")
const outputType = document.querySelector("#outputType")
const resetButton = document.querySelector("#resetButton")
let mouseDown = false

const createDrawGrid = (x, y) => {
    grid.innerHTML = ""

    for (let i = 0; i < x * y; i++) {
        const pixel = document.createElement("div")
        pixel.style.width = `${550 / x - 2}px`
        pixel.style.height = `${550 / y - 2}px`
        pixel.style.display = "inline-block"
        pixel.style.backgroundColor = "#000000"
        pixel.classList.add("pixel")
        pixel.classList.add("drawPixel")
        grid.append(pixel)
    }
}

createDrawGrid(16, 16)
const pixels = document.querySelectorAll(".pixel")

const colorInPixel = (event) => {
    event.preventDefault()

    if (event.target.id !== "grid"){
        if (colorPresetForm.colorPresets.value === "custom") {
            event.target.style.backgroundColor = colorPicker.value
        } else {
            event.target.style.backgroundColor = colorPresetForm.colorPresets.value
        }
    }
}

const snakeGrid = (arr, x, y) => {
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

    const finalArray = [].concat(...newArray)
    return finalArray
}

const convertToHex = (color) => {
    color = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (color && color.length === 4) ? 
        ("0" + parseInt(color[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(color[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(color[3],10).toString(16)).slice(-2) : ''
}

const outputCode = (event) => {
    event.preventDefault()
    outputBox.innerText = ""
    let pixelColors = []

    pixels.forEach((pixel, index) => {
        const color = pixel.style.backgroundColor

        if (outputType.value === "hex") {
            pixelColors[index] = `0x${convertToHex(color)}`
        } else {
            pixelColors[index] = `${color}`
        }
    })

    if (snakeBox.checked) {
        pixelColors = snakeGrid(pixelColors, 16, 16)
    }

    outputBox.innerText = `[${pixelColors.toString()}]`
}

const resetGrid = (event) => {
    event.preventDefault()

    for (pixel of pixels) {
        pixel.style.backgroundColor = "#000000"
    }
}

const colorInPixelIfMouseDown = (event) => {
    event.preventDefault

    if (mouseDown) {
        colorInPixel(event)
    }
}

grid.addEventListener("mousedown", () => {mouseDown = true})
document.addEventListener("mouseup", () => {mouseDown = false})
grid.addEventListener("mousemove", colorInPixelIfMouseDown)
grid.addEventListener("mousedown", colorInPixel)

resetButton.addEventListener("click", resetGrid)

submitForm.addEventListener("submit", outputCode)
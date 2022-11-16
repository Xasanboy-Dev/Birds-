const HOLE_HEIGHT = 120
const pipes = []
const PIPE_SPEED = 0.75
const PIPE_INTERVAL = 1500
let timeSInceLastPipe = 0
export function updatePipes(delta) {
    timeSInceLastPipe += delta
    if (timeSInceLastPipe > PIPE_INTERVAL) {
        timeSInceLastPipe -= PIPE_INTERVAL
        CreatePipe()
    }
    pipes.forEach(pipe => {
        pipe.left = pipe.left - delta * PIPE_SPEED
    })
}
function CreatePipe() {
    const pipeElem = document.createElement("div")
    const topElem = createPipeSegment("top")
    const bottomElem = createPipeSegment("bottom")
    pipeElem.append(topElem)
    pipeElem.append(bottomElem)
    pipeElem.classList.add("pipe")
    pipeElem.style.setProperty("--hole-top", randomNumberBetween(HOLE_HEIGHT * 1.5, window.innerHeight - HOLE_HEIGHT * 0.5))
    const pipe = {
        get left() {
            return parseFloat(getComputedStyle(pipeElem).getPropertyValue("--pipe-left"))
        },
        set left(value) {
            pipeElem.style.setProperty("--pipe-left", value)
        }
    }
    pipe.left = window.innerHeight
    document.body.append(pipeElem)
    pipes.push(pipe)
}
function createPipeSegment(position) {
    const segment = document.createElement("div")
    segment.classList.add("segment", position)
    return segment
}
function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
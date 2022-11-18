import { updateBird, setupBird, getBirdRect } from "./bird.js"
import { updatePipes, setPipes, getPassedPipeCount, getPipeRects } from "./pipe.js"
document.addEventListener("keypress", handleStart, { once: true })
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")
let lastTime
function updateLoop(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    updateBird(delta)
    updatePipes(delta)
    if (checkLose()) return handleLose()
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}
function checkLose() {
    const birdRect = getBirdRect()
    const INsidePipe = getPipeRects().some(rect => isCollasion(birdRect, rect))
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld || INsidePipe
}
function isCollasion(rects1, rects2) {
    return (rects1.left < rects2.right &&
        rects1.top < rects2.bottom &&
        rects1.right > rects2.left &&
        rects1.bottom > rects2.top
    )
}
function handleStart() {
    title.classList.add("hide")
    setupBird()
    setPipes()
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}
function handleLose() {
    setTimeout(() => {
        title.classList.remove("hide")
        subtitle.classList.remove("hide")
        subtitle.textContent = `${getPassedPipeCount()} Pipes`
        document.addEventListener("keypress", handleStart, { once: true })
    }, 100)
}
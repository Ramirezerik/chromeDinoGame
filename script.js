import { updateGround, setupGround } from './ground.js'
import { updateDino, setupDino, getDinoRect, setDinoLose } from './dino.js'
import { updateCactus, setupCactus, getCactusRects } from './cactus.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector('[data-world]')
const scoreElem = document.querySelector('[data-score]')
const startScreenElem = document.querySelector('[data-start-screen]')

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, {once: true})

setupGround()

//update loop. Runs every single frame & update all of our positions of our images
let lastTime
let speedScale
let score
function update(time) {
    if(lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime
    
    updateGround(delta, speedScale)
    updateDino(delta, speedScale)
    updateCactus(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    if(checkLose()) return handleLose()

    lastTime = time
    window.requestAnimationFrame(update)
}


function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}

function checkLose(){
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
    return(
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function updateScore(delta) {
    score += delta * .01
    scoreElem.textContent = Math.floor(score)
}


//this function will wipe out exisitng game once we lose
//and have our progress & score reset
function handleStart() {
    lastTime= null
    speedScale = 1
    score = 0
    setupGround()
    setupDino()
    setupCactus()
    startScreenElem.classList.add("hide")
    window.requestAnimationFrame(update)
}

function handleLose() {
    setDinoLose()
    setTimeout(()=> {
        document.addEventListener('keydown', handleStart, { once: true })
        startScreenElem.classList.remove('hide')
    }, 100)
}

//this function & if/else statement allows us to be able to scale to the
//change in web browser size
function setPixelToWorldScale(){
    let worldPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldPixelScale = window.innerHeight / WORLD_HEIGHT
    }
    worldElem.style.width = `${WORLD_WIDTH * worldPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldPixelScale}px`
}
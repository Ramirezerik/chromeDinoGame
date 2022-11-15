import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
//will alternatve between our 2 dino imgs to make it look like dino is moving
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100


let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
    dinoElem.src = "imgs/dino-lose.png"
}

function handleRun(delta, speedScale){
    if(isJumping){
        dinoElem.src = `imgs/dino-stationary.png`
        return
    }
    //this updates our frame to the next frame, looping through dino-run-0 & 1
    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}
function handleJump(delta){
    if(!isJumping) return

    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)
    
    if(getCustomProperty(dinoElem, "--bottom") <= 0) {
        setCustomProperty(dinoElem, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if(e.code !== "Space" || isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}

//left of on timestamp 40:35 https://www.youtube.com/watch?v=47eXVRJKdkU&list=PLZlA0Gpn_vH_XnZHin-Vjma8KylU-N0X8&index=7

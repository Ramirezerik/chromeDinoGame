import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

// we are keping the same speed as the ground so that they match
const SPEED = 0.1  
const CACTUS_INTERVAL_MIN = 50
const CACTUS_INTERVAL_MAX = 2000
// this will add cacti to our screen
const worldElem = document.querySelector('[data-world')

let nextCactusTime
export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        cactus.remove()
    })
}

export function updateCactus(delta, speedScale){
    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * 
        SPEED * -1)
        if (getCustomProperty(cactus, "--left") <= -100) {
            cactus.remove()
        }
    })

    if(nextCactusTime <= 0){
        createCactus()
        //as our game speed increases a cactus will spawn faster & faster
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN,
        CACTUS_INTERVAL_MAX) / speedScale

    }
    nextCactusTime -= delta
}

export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

function createCactus() {
    const cactus = document.createElement('img')
    cactus.dataset.cactus = true
    cactus.src = "imgs/cactus.png"
    cactus.classList.add('cactus')
    setCustomProperty(cactus, "--left", 100)
    worldElem.append(cactus)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



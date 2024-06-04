//cria tela e assets
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const audio2 = new Audio('hitHurt.wav');
const audio3 = new Audio('blipSelect.wav');

//pontuação e menu
const score = document.querySelector(".score--value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen")
const button = document.querySelector(".button-play");

const scoring = () => {
    score.innerText = parseInt(score.innerText) + 10
}

//Player1
const size = 30;
let Player = [
    {x: 120, y: 300}
]

let direction,loopId

const drawPlayer = () => {
    ctx.shadowColor = "rgb(0, 0, 139)"
    ctx.shadowBlur = 25
    ctx.fillStyle = "rgb(0, 0, 139)"
    Player.forEach((position, index)=>{
        if(index == Player.length - 1 ){
            ctx.fillStyle = "blue"
        }
        ctx.fillRect(position.x,position.y, size, size)
    })
    ctx.shadowBlur = 0    
}

const movePlayer = () => {
    if(!direction) return
    const head = Player[Player.length - 1]
    
    if (direction == "right"){
        Player.push({x: head.x + size , y: head.y})
    }
    if (direction == "left"){
        Player.push({x: head.x - size , y: head.y})
    }if (direction == "up"){
        Player.push({x: head.x , y: head.y - size})
    }if (direction == "down"){
        Player.push({x: head.x , y: head.y + size})
    }
}

//Player2
let Player2 = [
    {x: 450, y: 300}
]

let direction2

const drawPlayer2 = () => {
    ctx.shadowColor = "orange"
    ctx.shadowBlur = 25
    ctx.fillStyle = "orange"
    Player2.forEach((position, index)=>{
        if(index == Player2.length - 1 ){
            ctx.fillStyle = "yellow"
        }
        ctx.fillRect(position.x,position.y, size, size)
    })
    ctx.shadowBlur = 0    
}

const movePlayer2 = () => {
    if(!direction2) return
    const head = Player2[Player2.length - 1]
    
    if (direction2 == "right"){
        Player2.push({x: head.x + size , y: head.y})
    }
    if (direction2 == "left"){
        Player2.push({x: head.x - size , y: head.y})
    }if (direction2 == "up"){
        Player2.push({x: head.x , y: head.y - size})
    }if (direction2 == "down"){
        Player2.push({x: head.x , y: head.y + size})
    }
}

//regras do jogo
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30; i < canvas.width; i += 30){
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
    
}

const collision = () =>{
    const head = Player[Player.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = Player.length - 2
    
    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;
    
    const selfCollision = Player.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })
    
    if(wallCollision || selfCollision){
        gameOver()
    }
}

const collision2 = () =>{
    const head = Player2[Player2.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = Player2.length - 2
    
    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;
    
    const selfCollision = Player2.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })
    
    if(wallCollision || selfCollision){
        gameOver()
    }
}

const gameOver = () => {
    direction = undefined
    direction2 = undefined
    audio2.play()
    menu.style.display = "flex"
    //finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"
    loop() = false
}

const loop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    movePlayer()
    drawPlayer()
    collision()
    movePlayer2()
    drawPlayer2()
    collision2()
    
    loopId = setTimeout(() => {
        loop()         
    }, 250);
}

loop()

//controles player1
document.addEventListener("keydown", ({key}) => {
    if(key == "w" && direction  !=  "down"){
        direction = "up"
    }
    if(key == "s" && direction  !=  "up"){
        direction = "down"
    }
    if(key == "a" && direction  !=  "right"){
        direction = "left"
    }
    if(key == "d" && direction  !=  "left"){
        direction = "right"
    }
})

//controles player2
document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction2 != "left") {
        direction2 = "right"
    }

    if (key == "ArrowLeft" && direction2 != "right") {
        direction2 = "left"
    }

    if (key == "ArrowDown" && direction2 != "up") {
        direction2 = "down"
    }

    if (key == "ArrowUp" && direction2 != "down") {
        direction2 = "up"
    }
})

button.addEventListener("click", () => {
    audio3.play()
    //score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"
    Player = [{x: 120, y: 300}]
    Player2 = [{x: 450, y: 300}]
    loop() = true
})

//canvas.style.filter = "grayscale(100%)"
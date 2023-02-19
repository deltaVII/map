// Получение Элеметов ДОМ дерева
// Кнопки контроля приближения
const zoomInButton = document.getElementById('zoomIn')
const zoomOutButton = document.getElementById('zoomOut')

const zoomCounter = document.getElementById('zoomCounter')

// Кнопки контроля этажей
const floorUpButton = document.getElementById('floorUp')
const floorDownButton = document.getElementById('floorDown')

const floorCounter = document.getElementById('floorCounter')

// Элементы карты
const mapScrollpaneWarp = document.getElementById('map-scrollpane-warp')
const mapScrollpane = document.getElementById('map-scrollpane')
const svgContainer = document.getElementById('svgcontainer')

// Глобальные переменные
let globalMouseX;
let globalMouseY;

// Переменные скаляции
let curentZoom = 18
const zoomUnit = 8
const minZoom = 10 
const maxZoom = 50

// Переменные Этажей
let curentFloor = 1
const minFloor = 1
const maxFloor = 3

let karta1 = document.getElementById('karta')
//я рисовал по 2 карты каждого этажа но не сохранил карту 2 с отдалением. я бомбанул и удалил остальные. но лучше оставить их вдруг буду делать схему школы
let mass1 = ["url('image/1flM.svg')","url('image/2flM.svg')","url('image/3flM.svg')"]
let mass2 = ["url('image/1flO.svg')","url('image/2flO.svg')","url('image/3flO.svg')"]
let mass = mass1

// Переменные карты
// Переменные сдвига
let shiftX = 0
let shiftY = 0


// Функции
const setupElements = () => {
    zoomCounter.textContent = curentZoom/100 + 'x'
    floorCounter.textContent = curentFloor
}
const setMouseDefault = () => {
    globalMouseX, globalMouseY = null
}
function handleZoom(zoom){
    if ((curentZoom + zoom) >= minZoom 
    && (curentZoom + zoom) <= maxZoom){
        curentZoom += zoom
        zoomCounter.textContent = curentZoom/100 + 'x'
        svgContainer.style.transform = `scale(${curentZoom / 100})`

        
        //смена карты на отдаленную
        if (curentZoom<18) {
            mass=mass2
        }
        else{
            mass=mass1
        }
        karta1.style.backgroundImage=mass[curentFloor-1]
        
    } 

}

function handleFloorChange(increment){
    if ((curentFloor + increment) >= minFloor 
    && (curentFloor + increment) <= maxFloor){
        curentFloor += increment
        floorCounter.textContent = curentFloor 
        // floor set logic


        karta1.style.backgroundImage=mass[curentFloor-1]
        console.log(curentFloor,karta1)
        
    } 
}

function mapScroll(x, y) {    
    if ((globalMouseX) && (globalMouseY)){
        deltaX = globalMouseX - x
        deltaY = globalMouseY - y

        shiftX -= deltaX
        shiftY -= deltaY
    }


    globalMouseX = x
    globalMouseY = y
    mapScrollpane.style.transform = `translate(${shiftX}px, ${shiftY}px)`
}   

// Обработка событий
// События загрузки
window.onload = () => {
    setupElements()
    setMouseDefault()
}
// События боковой панели 
zoomInButton.addEventListener("click", () => {handleZoom(zoomUnit)})
zoomOutButton.addEventListener("click", () => {handleZoom(-zoomUnit)})
floorUpButton.addEventListener("click", () => {handleFloorChange(1)})
floorDownButton.addEventListener("click", () => {handleFloorChange(-1)})
// События карты
onmousemove = (event) => {
    event.preventDefault()
    if(event.buttons==1){ 
        mapScroll(event.clientX, event.clientY)
    }
}
onwheel = (event) => {
    delta = event.deltaY
    handleZoom(-((delta > 0) ? 1: -1) * zoomUnit)}


ontouchmove = (event) => {
    mapScroll(event.changedTouches[0].pageX,
            event.changedTouches[0].pageY)}

document.addEventListener("mouseup", setMouseDefault);
document.addEventListener("touchend", setMouseDefault)

handleZoom(0)
//костыль :D

//типо адаптивная верстка(на самом деле нет) 

let windowLet=document.getElementsByClassName("side-bar-item")

windowWi=window.innerWidth;
windowHe=window.innerHeight;
if (windowHe>windowWi) {
    for (let i=0; i!=6; i++) {
        document.getElementsByClassName('side-bar-item')[i].style.height = "7vh";
        document.getElementsByClassName('side-bar-item')[i].style.width = "7vh";
}
}
else{
    for (let i=0; i!=6; i++) {
        document.getElementsByClassName('side-bar-item')[i].style.height = "6vw";
        document.getElementsByClassName('side-bar-item')[i].style.width = "6vw";
    }
}


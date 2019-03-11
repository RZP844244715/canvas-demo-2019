var yyy = document.getElementById('canvas')
var lineWidth = '3'
autoSetCanvasSize(yyy)

listenToUser(yyy)

context = yyy.getContext('2d')
context.lineWidth = 3


function listenToUser(canvas) {
    var using = false
    var lastPoint = { x: undefined, y: undefined }
    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触碰设备
        canvas.ontouchstart = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawCircle(x, y, 0.1)
                lastPoint = { x: x, y: y }
                console.log(lastPoint)
            }
        }
        canvas.ontouchmove = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (!using) { return }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawCircle(x, y, 0.1)
                newPoint = { x: x, y: y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        //非触屏设备
        //按下鼠标
        canvas.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawCircle(x, y, 0.1)
                lastPoint = { x: x, y: y }
                console.log(lastPoint)
            }
        }
        //动鼠标
        canvas.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (!using) { return }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawCircle(x, y, 0.1)
                newPoint = { x: x, y: y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        //送开鼠标
        canvas.onmouseup = function (a) {
            using = false
        }

    }

}



function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}

function autoSetCanvasSize(canvas) {
    setCanvasSize()
    window.onresize = function () {
        setCanvasSize()
    }
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.height = pageHeight
        canvas.width = pageWidth
    }
}

var eraserEnabled = false

eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}
brush.onclick = function () {
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}



black.onclick = function () {
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function () {
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function () {
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function () {
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
}

thin.onclick = function(){
    lineWidth = '3'
    thin.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function(){
    lineWidth = '5'
    thick.classList.add('active')
    thin.classList.remove('active')
}

clear.onclick = function(){
    context.clearRect(0,0,yyy.width,yyy.height);
}
download.onclick = function(){
    var url = yyy.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画'
    a.click()
}
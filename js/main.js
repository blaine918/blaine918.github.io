const canvas = document.getElementById('draw');
const colorPicker = document.getElementById('color');
const lineWith = document.getElementById('line-width');
const selectedLineWidth = document.getElementById('selected-line-width');
const canvasWrapper = document.getElementById('canvas-wrapper');
const save = document.getElementById('save');
const erase = document.getElementById('erase');

const rect = canvasWrapper.getBoundingClientRect();
canvas.height = rect.height;
canvas.width = rect.width;

const context = canvas.getContext('2d');
const pos = { cx: 0, cy: 0, px: 0, py: 0 };
const option = {
    color: "black",
    lineWidth: 5,
    drawMode: true,
}

selectedLineWidth.innerText = option.lineWidth;
lineWith.value = option.lineWidth.toString();

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.height = 0;
    canvas.width = 0;
    const rect = canvasWrapper.getBoundingClientRect();
    canvas.height = rect.height;
    canvas.width = rect.width;
}

document.ontouchmove = function (e) { e.preventDefault(); }

canvas.addEventListener('mousemove', mousemove);

canvas.addEventListener('touchstart', touchstart);
canvas.addEventListener('touchmove', touchmove);

colorPicker.addEventListener('change', (e) => {
    option.color = e.target.value;
})

lineWith.addEventListener('input', (e) =>{
    option.lineWidth = +e.target.value;
    selectedLineWidth.innerText = e.target.value;
})


save.onclick = () =>{
    const link = document.createElement('a');
    link.setAttribute('download', 'test.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}

erase.onclick = () =>{
    option.drawMode = !option.drawMode;
    erase.innerText = option.drawMode ? 'Ластик' : 'Кисть'
}


function touchstart(e) {
    e.preventDefault();
    pos.cx = e.touches[0].offsetX;
    pos.cy = e.touches[0].offsetY - canvas.offsetTop;
}

function touchmove(e) {
    pos.px = pos.cx;
    pos.py = pos.cy;
    pos.cx = e.touches[0].clientX - canvas.offsetLeft;
    pos.cy = e.touches[0].clientY - canvas.offsetTop;
    draw();
}

function mousemove(e) {
    pos.px = pos.cx;
    pos.py = pos.cy;
    pos.cx = e.clientX - canvas.offsetLeft;
    pos.cy = e.clientY - canvas.offsetTop;
    if (e.buttons === 1) {
        draw();
    }
}

function draw() {
    context.beginPath();
    context.moveTo(pos.px, pos.py);
    context.lineTo(pos.cx, pos.cy);
    context.lineCap = 'round';
    context.globalCompositeOperation = option.drawMode ? 'source-over' : 'destination-out';
    context.strokeStyle = option.color;
    context.lineWidth = option.lineWidth;
    context.stroke();
    context.closePath();
}
let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let eraser = document.querySelector(".eraser");
let brush = document.querySelector(".brush");
let isPainting = false;
let lastPoint = {x: undefined, y: undefined};
let isErasing = false;

mouseListener();
buttonListener();

document.oncontextmenu = function() {
  return false;
};

function buttonListener() {
  eraser.onclick = e => {
    isErasing = true;
  };

  brush.onclick = e => {
    isErasing = false;
  };
}

function mouseListener() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  canvas.addEventListener("mousedown", e => {
    isPainting = true;
    let x = e.clientX;
    let y = e.clientY;
    if (!isErasing) {
      lastPoint = {x: x, y: y};
      drawCircle(x, y, 2.5);
    } else {
      context.clearRect(x - 5, y - 5, 10, 10);
    }
  });

  canvas.addEventListener("mousemove", e => {
    if (isPainting) {
      let x = e.clientX;
      let y = e.clientY;
      if (!isErasing) {
        drawCircle(x, y, 2.5);
        drawLine(lastPoint.x, lastPoint.y, x, y);
        lastPoint = {x: x, y: y};
      } else {
        context.clearRect(x - 5, y - 5, 10, 10);
      }
    }
  });

  canvas.addEventListener("mouseup", e => {
    isPainting = false;
  });
}

function drawCircle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
  context.closePath();
}

function drawLine(x1, y1, x2, y2) {
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

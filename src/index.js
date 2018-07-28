let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let eraser = document.querySelector(".eraser");
let brush = document.querySelector(".brush");
let colorPicker = document.querySelector(".color-picker");
let color = document.querySelector(".color");
let larger = document.querySelector(".larger");
let smaller = document.querySelector(".smaller");
let refresh = document.querySelector(".refresh");
let download = document.querySelector(".download");
let isPainting = false;
let lastPoint = {x: undefined, y: undefined};
let isErasing = false;
let defaultWidth = 5;

// import paintingListener from "./paintingListener.js";

paintingListener();
buttonListener();
pickerListener();

context.fillStyle = "#fff";
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = "#000";


document.oncontextmenu = e => {
  return false;
};

function pickerListener() {
  let picker = new Picker({
    parent: color,
    popup: "bottom",
    editor: false,
    alpha: false,
    color: "#000",
    layout: "default"
  });

  picker.onChange = color => {
    colorPicker.style.fill = color.rgbaString;
    context.fillStyle = color.rgbaString;
    context.strokeStyle = color.rgbaString;
  };
}

function paintingListener() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  if (document.body.ontouchstart === undefined) {
    canvas.addEventListener("mousedown", e => {
      isPainting = true;
      let x = e.clientX;
      let y = e.clientY;
      if (!isErasing) {
        lastPoint = {x: x, y: y};
        drawCircle(x, y, defaultWidth / 2);
      } else {
        context.clearRect(x - 10, y - 10, 20, 20);
      }
    });

    canvas.addEventListener("mousemove", e => {
      if (isPainting) {
        let x = e.clientX;
        let y = e.clientY;
        if (!isErasing) {
          drawCircle(x, y, defaultWidth / 2);
          drawLine(lastPoint.x, lastPoint.y, x, y, defaultWidth);
          lastPoint = {x: x, y: y};
        } else {
          context.clearRect(x - 10, y - 10, 20, 20);
        }
      }
    });

    canvas.addEventListener("mouseup", e => {
      isPainting = false;
    });
  } else {
    canvas.addEventListener("touchstart", e => {
      isPainting = true;
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      if (!isErasing) {
        lastPoint = {x: x, y: y};
        drawCircle(x, y, defaultWidth / 2);
      } else {
        context.clearRect(x - 10, y - 10, 20, 20);
      }
    });
    canvas.addEventListener("touchmove", e => {
      e.preventDefault();
      if (isPainting) {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        if (!isErasing) {
          drawCircle(x, y, defaultWidth / 2);
          drawLine(lastPoint.x, lastPoint.y, x, y, defaultWidth);
          lastPoint = {x: x, y: y};
        } else {
          context.clearRect(x - 10, y - 10, 20, 20);
        }
      }
    });
    canvas.addEventListener("touchend", e => {
      isPainting = false;
    });
  }

  function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    console.log("a");
  }

  function drawLine(x1, y1, x2, y2, width) {
    context.lineWidth = width;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }
}

function buttonListener() {
  eraser.onclick = e => {
    isErasing = true;
    eraser.classList.add("active");
    brush.classList.remove("active");
  };

  brush.onclick = e => {
    isErasing = false;
    brush.classList.add("active");
    eraser.classList.remove("active");
  };

  larger.onmousedown = e => {
    larger.classList.add("active");
  };

  larger.onmouseup = e => {
    larger.classList.remove("active");
    defaultWidth++;
  };

  smaller.onmousedown = e => {
    smaller.classList.add("active");
  };

  smaller.onmouseup = e => {
    smaller.classList.remove("active");
    defaultWidth--;
  };

  refresh.onmousedown = e => {
    refresh.classList.add("active");
  };

  refresh.onmouseup = e => {
    refresh.classList.remove("active");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  download.onmousedown = e => {
    download.classList.add("active");
  };

  download.onmouseup = e => {
    let imgURL = canvas.toDataURL("image/jpeg");
    let a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = imgURL;
    a.download = "canvasImage";
    a.click();
    download.classList.remove("active");
  };
}

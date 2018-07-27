function paintingListener(){
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

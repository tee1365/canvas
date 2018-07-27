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

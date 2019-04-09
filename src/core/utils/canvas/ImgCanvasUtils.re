let clipInspectorCanvasToCreateSnapshot = (imgContext, imgCanvas) =>
  imgContext##drawImage(imgCanvas, 90, 0, 200, 200, 0, 0, 50, 50);
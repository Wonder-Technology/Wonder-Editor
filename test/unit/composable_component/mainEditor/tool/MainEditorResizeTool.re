let resizeMainCanvasScreen = ResizeUtils.resizeMainCanvasScreen;

let resizeInspectorCanvasScreen = ResizeUtils.resizeInspectorCanvasScreen;

let resizeMainCanvasAndInspectorCanvas = () => {
  resizeMainCanvasScreen();
  resizeInspectorCanvasScreen();
};
open InspectorCanvasType;

let getContainerGameObject = inspectorCanvasRecord =>
  inspectorCanvasRecord.containerGameObject;

let setContainerGameObject = (containerGameObject, inspectorCanvasRecord) => {
  ...inspectorCanvasRecord,
  containerGameObject: Some(containerGameObject),
};
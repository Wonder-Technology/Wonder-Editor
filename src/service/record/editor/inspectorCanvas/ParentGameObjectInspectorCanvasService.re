open InspectorCanvasType;

let getParentGameObject = inspectorCanvasRecord =>
  inspectorCanvasRecord.parentGameObject;

let setParentGameObject = (parentGameObject, inspectorCanvasRecord) => {
  ...inspectorCanvasRecord,
  parentGameObject: Some(parentGameObject),
};
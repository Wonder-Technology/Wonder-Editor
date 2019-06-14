


function getContainerGameObject(inspectorCanvasRecord) {
  return inspectorCanvasRecord[/* containerGameObject */0];
}

function setContainerGameObject(containerGameObject, inspectorCanvasRecord) {
  return /* record */[
          /* containerGameObject */containerGameObject,
          /* basicSourceTextureCacheMap */inspectorCanvasRecord[/* basicSourceTextureCacheMap */1],
          /* materialSphereGameObjectInInspectorCanvas */inspectorCanvasRecord[/* materialSphereGameObjectInInspectorCanvas */2]
        ];
}

export {
  getContainerGameObject ,
  setContainerGameObject ,
  
}
/* No side effect */
